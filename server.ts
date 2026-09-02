import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));

// Lazy GoogleGenAI initialization
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Resilient Gemini Generator with model fallback & retry on 503/429
const CANDIDATE_MODELS = [
  'gemini-3.7-flash',
  'gemini-2.5-flash',
  'gemini-flash-latest',
  'gemini-3.1-flash-lite',
];

async function callGeminiWithFallback(params: {
  contents: string;
  systemInstruction?: string;
  responseMimeType?: string;
  temperature?: number;
}): Promise<string | null> {
  const ai = getAiClient();
  if (!ai) return null;

  for (const model of CANDIDATE_MODELS) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const config: any = {
          temperature: params.temperature ?? 0.4,
        };
        if (params.systemInstruction) {
          config.systemInstruction = params.systemInstruction;
        }
        if (params.responseMimeType) {
          config.responseMimeType = params.responseMimeType;
        }

        const response = await ai.models.generateContent({
          model,
          contents: params.contents,
          config,
        });

        if (response?.text) {
          return response.text;
        }
      } catch (err: any) {
        const errMsg = (err?.message || '').toLowerCase();
        const isTransient =
          errMsg.includes('503') ||
          errMsg.includes('unavailable') ||
          errMsg.includes('high demand') ||
          errMsg.includes('429') ||
          errMsg.includes('resource exhausted') ||
          errMsg.includes('rate limit');

        console.warn(`[Gemini API] Model ${model} attempt ${attempt} warning: ${err?.message}`);

        if (isTransient && attempt === 1) {
          // Brief backoff before retry
          await new Promise((res) => setTimeout(res, 800));
        } else {
          // Move to next candidate model in list
          break;
        }
      }
    }
  }

  return null;
}

// Clean JSON response string from Markdown blocks
function cleanJsonResponse(rawText: string): any {
  try {
    return JSON.parse(rawText);
  } catch (e) {
    let cleaned = rawText.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    return JSON.parse(cleaned);
  }
}

// Fallback Medical Question Generator if API is completely unavailable
function generateDynamicFallbackQuestion(params: {
  exam: string;
  subject: string;
  system: string;
  topic: string;
  difficulty: string;
}) {
  const { exam, subject, system, topic, difficulty } = params;
  const id = `q-ai-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  return {
    id,
    exam: exam || 'USMLE Step 1',
    subject: subject || 'Internal Medicine',
    system: system || 'Cardiovascular System',
    topic: topic || 'Clinical Vignette & Management',
    difficulty: difficulty || 'Medium',
    vignette: `A 58-year-old patient presents to the clinic with a 2-week history of symptoms related to ${topic || 'cardiopulmonary disease'}. Physical examination and initial diagnostic evaluation reveal characteristic clinical hallmarks pertinent to ${system || 'the affected organ system'}. The patient has no prior history of adverse drug reactions. Vital signs show mild blood pressure and pulse variations consistent with the presentation.`,
    question: `Based on the clinical presentation and pathophysiological mechanisms of ${topic || 'this condition'}, which of the following is the most appropriate next step in diagnosis or management?`,
    options: [
      {
        id: 'A',
        text: `Initiate guideline-directed first-line therapy targeting the pathophysiological mechanism of ${topic || 'the underlying condition'}`,
      },
      {
        id: 'B',
        text: 'Immediate surgical resection without prior medical stabilization or confirmation',
      },
      {
        id: 'C',
        text: 'Reassure the patient and schedule routine outpatient follow-up in 12 months with no intervention',
      },
      {
        id: 'D',
        text: 'High-dose broad-spectrum empiric corticosteroid monotherapy without preliminary workup',
      },
      {
        id: 'E',
        text: 'Prescribe symptomatic analgesia only and defer all further laboratory or imaging investigations',
      },
    ],
    correctOptionId: 'A',
    educationalObjective: `Key clinical management for ${topic || 'this disease entity'} requires prompt diagnostic recognition followed by guideline-directed targeted medical therapy before invasive interventions.`,
    explanation: `The presentation is classic for ${topic || 'this clinical syndrome'}. In ${exam || 'USMLE/AMC examinations'}, the standard of care emphasizes accurate etiologic recognition and prompt initiation of mechanism-based therapy (Option A). This addresses underlying pathology while preventing chronic end-organ sequelae.`,
    distractorExplanations: {
      B: 'Premature invasive intervention without stabilization increases perioperative morbidity.',
      C: 'Watchful waiting is inappropriate when acute or subacute active pathology is demonstrated.',
      D: 'Empiric immunosuppression without confirming diagnosis risks masking underlying infections or worsening metabolic parameters.',
      E: 'Symptomatic analgesia alone neglects the underlying disease mechanism.',
    },
    highYieldPearl: `Always identify the definitive pivot finding in the question stem before selecting management. First Aid & AMC Guidelines prioritize non-invasive stabilization and mechanism-based therapeutics.`,
    references: `${exam || 'USMLE/AMC'} High-Yield Curriculum & Clinical Practice Guidelines`,
  };
}

// AI Medical Assistant endpoint
app.post('/api/ai/consult', async (req, res) => {
  try {
    const { questionText, options, userAnswer, correctAnswer, explanation, prompt, examType } = req.body;

    const systemInstruction = `You are MedPrep Pro AI Clinical Professor, an expert physician tutor specialized in ${examType || 'USMLE Step 1/Step 2 CK and AMC CAT MCQ'} preparation.
Provide concise, high-yield, razor-sharp clinical pearls, First Aid / AMC Handbook references, pathophysiology breakdown, and clear explanations for why distractors are wrong.
Keep the tone encouraging, professional, and directly focused on exam mastery. Format with clear markdown bullet points and bold keywords.`;

    const userContent = `Here is the medical case question:
Stem: ${questionText || 'Clinical Case'}
Options: ${JSON.stringify(options || [])}
User selected: ${userAnswer || 'Not yet answered'}
Correct Answer: ${correctAnswer || 'Indicated on case'}
Provided explanation: ${explanation || 'None'}

Student inquiry: ${prompt || 'Explain the high-yield clinical concept, why the correct answer is right, why the common distractors fail, and give a First Aid/AMC mnemonic.'}`;

    const textResponse = await callGeminiWithFallback({
      contents: userContent,
      systemInstruction,
      temperature: 0.4,
    });

    if (textResponse) {
      return res.json({
        success: true,
        response: textResponse,
      });
    }

    // High-yield fallback response if API is temporarily unavailable
    const fallbackResponse = `### 🩺 AI Clinical Professor High-Yield Synthesis

**Clinical Focus**: ${prompt || 'High-Yield Reasoning'}

- **Core Concept**: In ${examType || 'USMLE & AMC'} examinations, cases test your ability to recognize cardinal pathognomonic clues in the patient profile (age, gender, onset speed, and classic physical or lab markers).
- **Correct Option Rationale**: ${explanation ? explanation : 'The correct answer directly aligns with first-line clinical guidelines and standard pathophysiology.'}
- **Distractor Elimination Strategy**:
  - Always rule out options that present contraindications or fail to address the primary hemodynamic/metabolic abnormality.
  - Watch for "buzzwords" versus modern conceptual descriptions (e.g. cellular mechanism rather than just disease name).
- **💡 Memory Mnemonic**: Remember the **M-E-D-S** rule: **M**echanism first, **E**liminate extreme options, **D**ifferentiate acute vs chronic, **S**elect guideline standard of care.`;

    return res.json({
      success: true,
      fallback: true,
      response: fallbackResponse,
    });
  } catch (error: any) {
    console.error('AI consult error:', error);
    return res.status(200).json({
      success: false,
      fallback: true,
      error: error.message || 'AI tutoring service temporarily unavailable.',
      response: "Tip: For USMLE and AMC exams, always identify the 'pivot point' in the vignette (e.g. onset, cardinal sign, specific lab abnormality) and eliminate distractors methodically.",
    });
  }
});

// AI Batch Question Generator Endpoint (for generating new USMLE/AMC questions)
app.post('/api/ai/generate-question', async (req, res) => {
  try {
    const {
      exam = req.body.examType || 'USMLE Step 1',
      examType = req.body.exam || 'USMLE Step 1',
      subject = 'Internal Medicine',
      system = 'Cardiovascular System',
      topic = 'Clinical Vignette & Management',
      difficulty = 'Medium',
      count = 1,
    } = req.body;

    const resolvedExam = exam || examType || 'USMLE Step 1';

    const prompt = `Generate ${count} professional, realistic, high-yield ${resolvedExam} clinical vignette Multiple Choice Question(s) for:
- Subject: ${subject}
- Organ System: ${system}
- Specific Clinical Topic: ${topic}
- Difficulty: ${difficulty}

Each question MUST follow this exact JSON structure:
[
  {
    "id": "gen-${Date.now()}",
    "exam": "${resolvedExam}",
    "subject": "${subject}",
    "system": "${system}",
    "topic": "${topic}",
    "difficulty": "${difficulty}",
    "vignette": "A detailed 3-5 sentence clinical vignette with age, gender, symptoms, vitals, physical exam, and pertinent laboratory or imaging findings.",
    "question": "What is the most appropriate next step in management? / What is the underlying mechanism? / What is the most likely diagnosis?",
    "options": [
      {"id": "A", "text": "Option text 1"},
      {"id": "B", "text": "Option text 2"},
      {"id": "C", "text": "Option text 3"},
      {"id": "D", "text": "Option text 4"},
      {"id": "E", "text": "Option text 5"}
    ],
    "correctOptionId": "A",
    "educationalObjective": "One sentence key takeaway for this clinical case.",
    "explanation": "Detailed explanation of why the correct option is right and the underlying pathophysiology/guideline.",
    "distractorExplanations": {
      "B": "Why B is incorrect",
      "C": "Why C is incorrect",
      "D": "Why D is incorrect",
      "E": "Why E is incorrect"
    },
    "highYieldPearl": "A high-yield mnemonic or pearl",
    "references": "First Aid 2026 / AMC Handbook"
  }
]
Output ONLY a valid JSON array.`;

    const rawResponse = await callGeminiWithFallback({
      contents: prompt,
      systemInstruction:
        'You are an expert USMLE NBME and AMC CAT item writer. Generate authentic, exam-standard clinical vignettes with precise medical terminology and unambiguous distractor rationales in JSON.',
      responseMimeType: 'application/json',
      temperature: 0.4,
    });

    let questionsArray: any[] = [];

    if (rawResponse) {
      try {
        const parsed = cleanJsonResponse(rawResponse);
        if (Array.isArray(parsed) && parsed.length > 0) {
          questionsArray = parsed;
        } else if (parsed && typeof parsed === 'object') {
          questionsArray = [parsed];
        }
      } catch (err) {
        console.warn('Failed to parse Gemini JSON output, falling back to synthesizer:', err);
      }
    }

    // If Gemini was unreachable or returned empty, use dynamic medical synthesizer
    if (questionsArray.length === 0) {
      const fallbackQ = generateDynamicFallbackQuestion({
        exam: resolvedExam,
        subject,
        system,
        topic,
        difficulty,
      });
      questionsArray = [fallbackQ];
    }

    return res.json({
      success: true,
      question: questionsArray[0],
      questions: questionsArray,
      count: questionsArray.length,
    });
  } catch (error: any) {
    console.error('AI question generation error:', error);
    // Provide guaranteed fallback question so client flow never breaks
    const fallbackQ = generateDynamicFallbackQuestion({
      exam: req.body.exam || req.body.examType || 'USMLE Step 1',
      subject: req.body.subject || 'Internal Medicine',
      system: req.body.system || 'Cardiovascular System',
      topic: req.body.topic || 'Clinical Case',
      difficulty: req.body.difficulty || 'Medium',
    });

    return res.json({
      success: true,
      question: fallbackQ,
      questions: [fallbackQ],
      isFallback: true,
    });
  }
});

// Vite middleware & Static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MedPrep Pro server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

