import { ClinicalCase, DifficultyLevel } from '../types';

export interface CaseConditionTemplate {
  title: string;
  specialty: string;
  system: string;
  difficulty: DifficultyLevel;
  chiefComplaint: string;
  vignetteBuilder: (age: number, gender: string, name: string) => {
    hpi: string;
    pmh: string[];
    medications: string[];
    allergies: string[];
    socialHistory: string;
    physicalExam: Record<string, string>;
    initialVitals: {
      bp: string;
      hr: string;
      rr: string;
      temp: string;
      spo2: string;
    };
  };
  stepsBuilder: (age: number, gender: string) => Array<{
    stepNumber: number;
    title: string;
    prompt: string;
    options: Array<{
      id: string;
      text: string;
      isCorrect: boolean;
      rationale: string;
      finding?: string;
    }>;
    correctOptionId: string;
    learningPoint: string;
  }>;
  finalDiagnosis: string;
  managementSummary: string;
  keyLearningPoints: string[];
}

export const CASE_TEMPLATES: CaseConditionTemplate[] = [
  // 1. CARDIOLOGY - ACS / Anterior STEMI
  {
    title: 'Acute Crushing Retrosternal Chest Pain with Diaphoresis',
    specialty: 'Cardiology & Emergency Medicine',
    system: 'Cardiovascular System',
    difficulty: 'Hard',
    chiefComplaint: 'Severe retrosternal pressure radiating to the left arm and jaw for 90 minutes.',
    vignetteBuilder: (age, gender) => ({
      hpi: `A ${age}-year-old ${gender} presents to the emergency department at 02:00 with sudden-onset heavy retrosternal chest pressure ("like an elephant sitting on the chest") that began while resting at home 90 minutes ago. Accompanied by nausea, cold diaphoresis, and progressive dyspnea. Has a 30 pack-year smoking history and type 2 diabetes.`,
      pmh: ['Type 2 Diabetes Mellitus (HbA1c 8.4%)', 'Hypertension', 'Dyslipidemia'],
      medications: ['Metformin 1000mg BD', 'Amlodipine 5mg Daily', 'Atorvastatin 20mg Daily'],
      allergies: ['No known drug allergies'],
      socialHistory: 'Current smoker (20 cigarettes/day for 25+ years), occasional alcohol.',
      physicalExam: {
        General: 'Pale, diaphoretic, clutching the sternum in severe distress (Levine sign).',
        Cardiovascular: 'Heart rate 98 bpm regular. S1 S2 present with soft S4 gallop. JVP 3 cm above sternal angle.',
        Respiratory: 'Bilateral fine inspiratory crackles at lung bases.',
        Abdomen: 'Soft, non-tender, no organomegaly.',
        Extremities: 'Cool, clammy peripheries with normal capillary refill and no pitting edema.'
      },
      initialVitals: {
        bp: '148/92 mmHg',
        hr: '98 bpm',
        rr: '22 /min',
        temp: '36.8 °C',
        spo2: '95% on room air'
      }
    }),
    stepsBuilder: () => [
      {
        stepNumber: 1,
        title: 'Initial 12-Lead ECG Analysis & Triage',
        prompt: 'The triage 12-lead ECG demonstrates 3 mm convex ST-segment elevation in leads V1–V4 with reciprocal ST-depression in leads II, III, and aVF. What is the immediate definitive reperfusion pathway?',
        options: [
          {
            id: 'A',
            text: 'Reassure patient, order serial hs-Troponin at 0 and 3 hours, and await cardiology ward consult in morning',
            isCorrect: false,
            rationale: 'In acute STEMI, time is myocardium. Awaiting serial troponins causes irreversible myocardial necrosis.'
          },
          {
            id: 'B',
            text: 'Activate primary Percutaneous Coronary Intervention (PCI) code immediately with target door-to-balloon time <90 minutes',
            isCorrect: true,
            rationale: 'Acute anterior STEMI requires emergent primary PCI reperfusion within 90 minutes of medical contact (or fibrinolytics within 30 min if PCI transfer >120 min).',
            finding: 'Coronary angiography reveals 99% thrombotic occlusion of the proximal Left Anterior Descending (LAD) coronary artery.'
          },
          {
            id: 'C',
            text: 'Administer oral Omeprazole for suspected gastroesophageal reflux and discharge home',
            isCorrect: false,
            rationale: 'The ECG clearly confirms anterior STEMI requiring emergent coronary reperfusion.'
          },
          {
            id: 'D',
            text: 'Perform urgent CT pulmonary angiography to rule out PE before considering catheterization',
            isCorrect: false,
            rationale: 'Diagnostic ECG criteria for STEMI mandate immediate coronary reperfusion without delaying for non-cardiac imaging.'
          }
        ],
        correctOptionId: 'B',
        learningPoint: 'In STEMI, immediate activation of the cardiac catheterization lab for primary PCI (target door-to-balloon <90 min) is paramount.'
      },
      {
        stepNumber: 2,
        title: 'Pre-Catheterization Pharmacotherapy (DAPT & Anticoagulation)',
        prompt: 'Which pharmacological loading regimen should be administered immediately prior to transfer to the catheterization laboratory in Australia?',
        options: [
          {
            id: 'A',
            text: 'Aspirin 300mg chewed + Ticagrelor 180mg loading dose + IV Unfractionated Heparin',
            isCorrect: true,
            rationale: 'Dual Antiplatelet Therapy (DAPT) with soluble Aspirin 300mg and a potent P2Y12 inhibitor (Ticagrelor 180mg) plus parenteral anticoagulation is standard pre-PCI therapy.',
            finding: 'Successful drug-eluting stent (DES) deployed to proximal LAD with TIMI-3 distal flow restored.'
          },
          {
            id: 'B',
            text: 'Oral Warfarin 10mg single dose and subcutaneous Enoxaparin',
            isCorrect: false,
            rationale: 'Warfarin takes days to achieve therapeutic INR and has no role in acute STEMI loading.'
          },
          {
            id: 'C',
            text: 'Intravenous Diltiazem and Digoxin bolus',
            isCorrect: false,
            rationale: 'Non-dihydropyridine calcium channel blockers are contraindicated in acute anterior STEMI.'
          },
          {
            id: 'D',
            text: 'High-dose oral NSAIDs (e.g., Ibuprofen 800mg) for pain relief',
            isCorrect: false,
            rationale: 'NSAIDs are strictly contraindicated in acute myocardial infarction due to increased risk of myocardial rupture.'
          }
        ],
        correctOptionId: 'A',
        learningPoint: 'DAPT (Aspirin 300mg + Ticagrelor 180mg) plus parenteral heparinization forms the cornerstone of acute STEMI pharmacological loading.'
      }
    ],
    finalDiagnosis: 'Acute ST-Elevation Myocardial Infarction (Anterior STEMI) secondary to acute proximal LAD plaque rupture.',
    managementSummary: 'Primary PCI with Drug-Eluting Stent, DAPT for 12 months, high-intensity statin (Atorvastatin 80mg), ACE inhibitor, cardioselective beta-blocker, and cardiac rehabilitation.',
    keyLearningPoints: [
      'Anterior STEMI = V1–V4 ST elevation (LAD occlusion). Door-to-balloon benchmark is <90 minutes.',
      'DAPT loading (Aspirin 300mg + Ticagrelor 180mg) is mandatory before coronary intervention.'
    ]
  },

  // 2. RESPIRATORY - Pulmonary Embolism
  {
    title: 'Acute Onset Pleuritic Chest Pain and Dyspnea Following Long-Haul Travel',
    specialty: 'Respiratory Medicine & Acute Care',
    system: 'Respiratory System',
    difficulty: 'Medium',
    chiefComplaint: 'Sudden onset left-sided chest pain and breathlessness for 4 hours.',
    vignetteBuilder: (age, gender) => ({
      hpi: `A ${age}-year-old ${gender} presents to the emergency department with acute left-sided pleuritic chest pain and shortness of breath that awoke her from sleep. She feels dizzy when standing up. She recently returned from a 14-hour long-haul flight from London to Sydney 4 days ago. Takes the combined oral contraceptive pill.`,
      pmh: ['Mild asthma (uses salbutamol PRN)', 'Menorrhagia on combined oral contraceptive pill'],
      medications: ['Ethinylestradiol/Levonorgestrel (COCP)', 'Salbutamol inhaler PRN'],
      allergies: ['No known drug allergies'],
      socialHistory: 'Non-smoker, drinks 2 glasses of wine on weekends. Office administrator.',
      physicalExam: {
        General: 'Anxious, tachypneic, speaking in short sentences. Mild central cyanosis on room air.',
        Cardiovascular: 'Tachycardic at 116 bpm, S1 S2 normal with prominent P2 component. JVP elevated 4cm above sternal angle.',
        Respiratory: 'Trachea central. Normal vesicular breath sounds bilaterally. Left lower chest tenderness on deep inspiration.',
        Abdomen: 'Soft, non-tender, bowel sounds normal.',
        Limbs: 'Left calf is 2.5 cm larger in circumference compared to right, with mild warmth and tenderness on deep palpation.'
      },
      initialVitals: {
        bp: '106/68 mmHg',
        hr: '116 bpm',
        rr: '26 /min',
        temp: '37.4 °C',
        spo2: '91% on room air'
      }
    }),
    stepsBuilder: () => [
      {
        stepNumber: 1,
        title: 'Initial Risk Stratification & Investigation Ordering',
        prompt: 'Calculate the pre-test probability for Pulmonary Embolism using Wells Criteria. What is the most appropriate next diagnostic step?',
        options: [
          {
            id: 'A',
            text: 'Low probability: Order High-Sensitivity D-Dimer test first',
            isCorrect: false,
            rationale: 'Wells score is >4 (Heart rate >100 = 1.5, Recent flight/immobilization = 1.5, Clinical signs of DVT = 3, PE #1 diagnosis = 3; total >6), indicating PE is LIKELY.'
          },
          {
            id: 'B',
            text: 'High probability: Administer supplemental oxygen and arrange urgent CT Pulmonary Angiogram (CTPA)',
            isCorrect: true,
            rationale: 'With a Wells score >4 (PE likely), D-dimer is not recommended because a negative test does not safely exclude PE. Direct diagnostic imaging with CTPA is indicated.',
            finding: 'CTPA demonstrates a large saddle embolus extending into the left main pulmonary artery with right ventricular strain.'
          },
          {
            id: 'C',
            text: 'Order a standard Chest X-Ray and perform Peak Expiratory Flow Rate to assess asthma flare',
            isCorrect: false,
            rationale: 'Asymmetrical leg swelling, tachycardia, and sudden pleuritic pain are not typical for asthma.'
          },
          {
            id: 'D',
            text: 'Order a Ventilation-Perfusion (V/Q) scan as first-line in all patients',
            isCorrect: false,
            rationale: 'CTPA is first-line in non-pregnant patients with normal renal function.'
          }
        ],
        correctOptionId: 'B',
        learningPoint: 'In patients with high pre-test probability (Wells Score > 4), proceed directly to CTPA rather than D-dimer.'
      },
      {
        stepNumber: 2,
        title: 'Risk Stratification & Immediate Management',
        prompt: 'The CTPA confirms massive subsegmental and lobar pulmonary embolism with right ventricular enlargement (RV/LV ratio > 1.0). Blood pressure remains 104/66 mmHg with elevated Troponin T (0.08 ug/L). How is this patient classified, and what is the definitive initial anticoagulant strategy?',
        options: [
          {
            id: 'A',
            text: 'Low-Risk PE: Outpatient management with Oral Rivaroxaban 15mg BD',
            isCorrect: false,
            rationale: 'Elevated troponin and RV dilation on CT place this patient into Intermediate-High Risk, requiring hospital admission.'
          },
          {
            id: 'B',
            text: 'Intermediate-High Risk (Submassive) PE: Inpatient admission with therapeutic Low Molecular Weight Heparin (Enoxaparin 1mg/kg BD) and close hemodynamic monitoring',
            isCorrect: true,
            rationale: 'Submassive PE (normotensive + RV dysfunction/elevated cardiac biomarkers) requires admission and therapeutic anticoagulation. Thrombolysis is reserved for hemodynamic decompensation (SBP <90 mmHg).',
            finding: 'Patient responds well to therapeutic Enoxaparin with progressive symptom resolution and stabilization.'
          },
          {
            id: 'C',
            text: 'High-Risk Massive PE: Immediate systemic thrombolysis with IV Alteplase 100mg over 2 hours',
            isCorrect: false,
            rationale: 'Systemic thrombolysis is indicated only for High-Risk (Massive) PE with persistent hypotension (SBP <90 mmHg).'
          },
          {
            id: 'D',
            text: 'Emergency surgical pulmonary embolectomy without anticoagulation',
            isCorrect: false,
            rationale: 'Surgical embolectomy is reserved for massive PE where thrombolysis is contraindicated or has failed.'
          }
        ],
        correctOptionId: 'B',
        learningPoint: 'Intermediate-High Risk PE requires therapeutic anticoagulation with close HDU monitoring; thrombolysis is reserved for hemodynamic collapse.'
      }
    ],
    finalDiagnosis: 'Acute Intermediate-High Risk (Submassive) Pulmonary Embolism secondary to Combined Oral Contraceptive Pill and Long-Haul Flight Immobilization.',
    managementSummary: 'Supplemental oxygen, therapeutic LMWH (Enoxaparin 1mg/kg BD), cessation of estrogen-containing contraception, transition to DOAC for 3-6 months.',
    keyLearningPoints: [
      'Wells Score > 4 = PE Likely -> Proceed straight to CTPA.',
      'Normotensive with RV strain + Troponin elevation = Intermediate-High Risk PE.'
    ]
  },

  // 3. SURGERY - Acute Appendicitis
  {
    title: 'Migratory Right Lower Quadrant Abdominal Pain & Peritonism',
    specialty: 'General Surgery & Acute Care',
    system: 'Gastrointestinal System',
    difficulty: 'Medium',
    chiefComplaint: 'Periumbilical pain migrating to right iliac fossa, nausea, and low-grade fever for 18 hours.',
    vignetteBuilder: (age, gender) => ({
      hpi: `A ${age}-year-old ${gender} presents with abdominal pain that started yesterday morning as dull crampy discomfort around the umbilicus. Over the past 6 hours, the pain shifted to the right lower quadrant and became sharp and constant. Exacerbated by walking, coughing, and car bumps. Has had 2 episodes of non-bilious vomiting and anorexia.`,
      pmh: ['Nil significant'],
      medications: ['None regularly'],
      allergies: ['Penicillin (rash in childhood)'],
      socialHistory: 'Non-smoker, university student.',
      physicalExam: {
        General: 'Flushed, lying still with right hip slightly flexed.',
        Abdomen: 'Marked localized tenderness at McBurney point. Positive Rovsing sign, positive Dunphy sign (cough pain). Localized rebound tenderness and guarding in RLQ.',
        Pelvic: 'No cervical motion tenderness, no adnexal masses.',
        Systemic: 'Normal heart and lung sounds.'
      },
      initialVitals: {
        bp: '118/72 mmHg',
        hr: '102 bpm',
        rr: '18 /min',
        temp: '38.1 °C',
        spo2: '99% on room air'
      }
    }),
    stepsBuilder: () => [
      {
        stepNumber: 1,
        title: 'Mandatory Initial Bedside Investigation in Females of Reproductive Age',
        prompt: 'Prior to requesting surgical consult or imaging in any female patient of reproductive age presenting with lower abdominal pain, what is the single most critical mandatory test?',
        options: [
          {
            id: 'A',
            text: 'Immediate urinary or serum beta-hCG pregnancy test to rule out ectopic pregnancy',
            isCorrect: true,
            rationale: 'In all women of reproductive age presenting with acute abdominal/pelvic pain, ruling out ruptured ectopic pregnancy with a beta-hCG test is mandatory.',
            finding: 'Urinary beta-hCG is negative. Full Blood Count reveals Leukocytosis (WBC 14.8 x 10^9/L with 84% neutrophils) and CRP 48 mg/L.'
          },
          {
            id: 'B',
            text: 'Immediate diagnostic laparotomy under general anesthesia without bloods',
            isCorrect: false,
            rationale: 'Ectopic pregnancy and other gynaecological differentials must be screened first.'
          },
          {
            id: 'C',
            text: 'Barium enema examination and oral colonoscopy',
            isCorrect: false,
            rationale: 'Barium enema and colonoscopy are strictly contraindicated in acute appendicitis due to perforation risk.'
          },
          {
            id: 'D',
            text: 'Discharge with antispasmodics for suspected irritable bowel syndrome',
            isCorrect: false,
            rationale: 'Fever, migrated pain, localized peritonism, and leukocytosis strongly indicate acute surgical abdomen.'
          }
        ],
        correctOptionId: 'A',
        learningPoint: 'Mandatory Rule: Always perform a pregnancy test (beta-hCG) in any female of childbearing potential with acute abdominal pain.'
      },
      {
        stepNumber: 2,
        title: 'Confirmatory Imaging & Definitive Surgical Management',
        prompt: 'In a non-pregnant young female patient with Alvarado score 8 (high probability acute appendicitis), what is the optimal imaging modality and definitive surgical management in Australia?',
        options: [
          {
            id: 'A',
            text: 'Graded-compression Abdominal/Pelvic Ultrasound (or CT abdomen/pelvis with IV contrast if US equivocal), followed by laparoscopic appendectomy and IV perioperative antibiotics',
            isCorrect: true,
            rationale: 'In young females, pelvic ultrasound is initial choice; CT abdomen with IV contrast is definitive if ultrasound is inconclusive. Laparoscopic appendectomy is standard of care.',
            finding: 'Ultrasound demonstrates a blind-ending, non-compressible tubular structure in RLQ measuring 8.5 mm in outer diameter with hypervascular wall and surrounding fat stranding.'
          },
          {
            id: 'B',
            text: 'Erect abdominal X-ray alone followed by 4 weeks of outpatient oral amoxicillin',
            isCorrect: false,
            rationale: 'Plain X-rays have very low sensitivity for appendicitis; antibiotic monotherapy has high recurrence rates.'
          },
          {
            id: 'C',
            text: 'Observation in emergency short stay for 72 hours without antibiotics or surgical consultation',
            isCorrect: false,
            rationale: 'Delaying intervention in acute appendicitis risks gangrene and perforation with generalized peritonitis.'
          },
          {
            id: 'D',
            text: 'Open total right hemicolectomy',
            isCorrect: false,
            rationale: 'Right hemicolectomy is reserved for appendiceal base tumours involving the cecum, not simple acute appendicitis.'
          }
        ],
        correctOptionId: 'A',
        learningPoint: 'Laparoscopic appendectomy preceded by targeted imaging (Ultrasound or contrast CT) and IV prophylaxis is the gold standard for acute appendicitis.'
      }
    ],
    finalDiagnosis: 'Acute Uncomplicated Suppurative Appendicitis.',
    managementSummary: 'Nil per os (NPO), IV isotonic fluid resuscitation, analgesia, single-dose IV prophylactic antibiotics, and urgent laparoscopic appendectomy.',
    keyLearningPoints: [
      'Migratory pain (periumbilical -> RLQ) is the most specific historical feature for acute appendicitis.',
      'Always check beta-hCG in women of reproductive age with abdominal pain.'
    ]
  },

  // 4. NEUROLOGY - Hyperacute Ischemic Stroke
  {
    title: 'Sudden Onset Right-Sided Facial Droop and Arm Weakness',
    specialty: 'Neurology & Stroke Medicine',
    system: 'Nervous System & Special Senses',
    difficulty: 'Hard',
    chiefComplaint: 'Right-sided face and arm weakness, difficulty speaking, onset 75 minutes ago.',
    vignetteBuilder: (age, gender) => ({
      hpi: `A ${age}-year-old ${gender} was sitting having breakfast at 07:30 when speech suddenly became slurred and indistinct. When attempting to stand, right arm and leg were weak. Right mouth drooping noted, 000 emergency ambulance called immediately. Last known well (LKW) was 07:25 (75 minutes prior to arrival in ED).`,
      pmh: ['Non-valvular Atrial Fibrillation (non-adherent with anticoagulation for 2 weeks)', 'Hypertension'],
      medications: ['Apixaban 5mg BD (missed doses)', 'Perindopril 5mg Daily'],
      allergies: ['No known allergies'],
      socialHistory: 'Retired teacher, non-smoker.',
      physicalExam: {
        General: 'Alert, frustrated by inability to express words fluently (expressive/Broca-type dysphasia). Follows simple 1-step commands.',
        Neurology: 'NIH Stroke Scale (NIHSS) score is 14. Right lower facial droop with forehead sparing (UMN pattern). Right upper extremity power 1/5, right lower extremity power 3/5. Extensor right plantar response (positive Babinski). Right homonymous hemianopia.',
        Cardiovascular: 'Irregularly irregular heart rhythm at 92 bpm. No carotid bruits auscultated.',
        Respiratory: 'Clear breath sounds bilaterally.'
      },
      initialVitals: {
        bp: '162/94 mmHg',
        hr: '92 bpm (Irregularly irregular)',
        rr: '16 /min',
        temp: '36.7 °C',
        spo2: '98% on room air'
      }
    }),
    stepsBuilder: () => [
      {
        stepNumber: 1,
        title: 'Emergency Hyperacute Stroke Imaging Protocol',
        prompt: 'The patient arrives within the 4.5-hour thrombolysis window. What is the immediate first-line neuroimaging required prior to any thrombolytic therapy?',
        options: [
          {
            id: 'A',
            text: 'Non-contrast Head CT (NCCT) and CT Angiography (CTA) from aortic arch to vertex to exclude hemorrhage and identify Large Vessel Occlusion (LVO)',
            isCorrect: true,
            rationale: 'Non-contrast CT is mandatory to immediately exclude intracranial hemorrhage before thrombolysis, while CTA identifies Large Vessel Occlusion (e.g. M1 MCA occlusion) eligible for endovascular thrombectomy (EVT).',
            finding: 'Non-contrast CT shows no intracranial hemorrhage (ASPECTS score 9). CTA reveals hyperdense vessel sign and cut-off in the M1 segment of the left Middle Cerebral Artery.'
          },
          {
            id: 'B',
            text: 'Routine 24-hour outpatient MRI brain without immediate CT imaging',
            isCorrect: false,
            rationale: 'Outpatient scheduling misses the critical hyperacute thrombolysis and thrombectomy windows.'
          },
          {
            id: 'C',
            text: 'Lumbar puncture to exclude subarachnoid hemorrhage before any brain scan',
            isCorrect: false,
            rationale: 'CT head must always precede lumbar puncture to evaluate intracranial hemorrhage and herniation risk.'
          },
          {
            id: 'D',
            text: 'Administer Aspirin 300mg orally and discharge with TIA clinic referral',
            isCorrect: false,
            rationale: 'Giving oral aspirin without excluding intracranial hemorrhage on CT is dangerous, and this is an acute disabling stroke with NIHSS 14.'
          }
        ],
        correctOptionId: 'A',
        learningPoint: 'Hyperacute stroke protocol requires immediate non-contrast CT head to rule out hemorrhage, followed by CTA for Large Vessel Occlusion identification.'
      },
      {
        stepNumber: 2,
        title: 'Reperfusion Decision Making (Thrombolysis & Endovascular Thrombectomy)',
        prompt: 'The patient has an acute Left MCA M1 occlusion presenting at 75 minutes post-onset with NIHSS 14. Coagulation profile shows normal aPTT/INR and patient has not taken Apixaban in 10 days. Blood pressure is 160/92 mmHg. What is the standard of care reperfusion strategy in Australia?',
        options: [
          {
            id: 'A',
            text: 'Intravenous Tenecteplase (or Alteplase 0.9 mg/kg) bolus followed immediately by transfer for Endovascular Clot Retrieval / Thrombectomy (EVT)',
            isCorrect: true,
            rationale: 'For patients presenting within 4.5 hours with a Large Vessel Occlusion (LVO) and no contraindications, combined bridging therapy with IV Thrombolysis (Tenecteplase/Alteplase) and Endovascular Thrombectomy (EVT) provides the highest rate of functional independence.',
            finding: 'Endovascular thrombectomy achieves TICI 3 complete recanalization of the left MCA. The patient achieves dramatic motor recovery.'
          },
          {
            id: 'B',
            text: 'Strict blood pressure lowering to SBP <90 mmHg with sodium nitroprusside',
            isCorrect: false,
            rationale: 'Aggressive hypotension compromises cerebral perfusion pressure in the ischemic penumbra and worsens stroke infarct volume.'
          },
          {
            id: 'C',
            text: 'Heparin infusion titrated to aPTT >100 seconds without thrombectomy',
            isCorrect: false,
            rationale: 'Full-dose therapeutic heparinization in acute ischemic stroke is not recommended due to high risk of hemorrhagic transformation.'
          },
          {
            id: 'D',
            text: 'Oral anticoagulation loading with 20mg Rivaroxaban immediately',
            isCorrect: false,
            rationale: 'Oral DOACs are not used for acute thrombus lysis in hyperacute stroke.'
          }
        ],
        correctOptionId: 'A',
        learningPoint: 'Bridging therapy (IV Thrombolysis + Endovascular Thrombectomy for LVO) is the gold standard for acute ischemic stroke within the therapeutic window.'
      }
    ],
    finalDiagnosis: 'Acute Cardioembolic Ischemic Stroke with Left Middle Cerebral Artery (MCA M1) Large Vessel Occlusion secondary to untreated Non-Valvular Atrial Fibrillation.',
    managementSummary: 'Intravenous thrombolysis with Tenecteplase, immediate Endovascular Thrombectomy, admission to Stroke Unit, continuous telemetry, dysphagia screening, and secondary prevention DOAC.',
    keyLearningPoints: [
      'Time is Brain: IV Thrombolysis window is up to 4.5 hours; Endovascular Thrombectomy is indicated for Large Vessel Occlusion.',
      'Blood pressure in acute ischemic stroke should NOT be lowered precipitously unless SBP > 185 mmHg before thrombolysis.'
    ]
  },

  // 5. PAEDIATRICS - Simple Febrile Seizure vs Meningitis
  {
    title: 'First-Episode Generalized Seizure in a Febrile Toddler',
    specialty: 'Paediatrics & Child Health',
    system: 'Nervous System & Special Senses',
    difficulty: 'Medium',
    chiefComplaint: 'Generalized shaking lasting 2 minutes with high fever in a 20-month-old toddler.',
    vignetteBuilder: (age, gender) => ({
      hpi: `A 20-month-old ${gender} is brought to the paediatric emergency department by anxious parents after experiencing a generalized tonic-clonic seizure lasting approximately 2 minutes at home. The child has had a runny nose, mild cough, and fever up to 39.2°C for 24 hours. The seizure stopped spontaneously without medication.`,
      pmh: ['Born at term, normal birth weight', 'Immunizations up to date on Australian National Immunisation Program (NIP)'],
      medications: ['Paracetamol syrup PRN (given 3 hours ago)'],
      allergies: ['No known allergies'],
      socialHistory: 'Attends day care 3 days/week. Both parents present and appropriately concerned.',
      physicalExam: {
        General: 'Alert, playful on mother lap, drinking oral fluids. No petechial or purpuric rash.',
        Neurology: 'Tone, power, and reflexes normal. Fontanelle flat (closed). Supple neck with full active range of motion. Negative Brudzinski and Kernig signs.',
        ENT: 'Right tympanic membrane erythematous and mildly bulging with loss of light reflex. Throat mildly injected without tonsillar exudate.',
        Respiratory: 'Clear chest, no tachypnea or subcostal retractions.',
        Abdomen: 'Soft, non-tender.'
      },
      initialVitals: {
        bp: '92/58 mmHg',
        hr: '124 bpm',
        rr: '24 /min',
        temp: '38.6 °C',
        spo2: '99% on room air'
      }
    }),
    stepsBuilder: () => [
      {
        stepNumber: 1,
        title: 'Diagnostic Classification & Red Flag Evaluation',
        prompt: 'How is this seizure classified based on clinical criteria, and what is the most appropriate initial investigation strategy according to Royal Children\'s Hospital (RCH) Melbourne guidelines?',
        options: [
          {
            id: 'A',
            text: 'Simple Febrile Convulsion: Clinical diagnosis with identifiable viral/otitis media focus; routine LP, bloods, and EEG/CT brain are NOT indicated in a well-appearing, alert child',
            isCorrect: true,
            rationale: 'Criteria for simple febrile seizure: age 6 months–6 years, generalized tonic-clonic, duration <15 minutes, no recurrence in 24 hours, and complete post-ictal recovery. In an alert, immunised child with an identifiable source (acute otitis media), invasive testing (LP/CT) is not warranted.',
            finding: 'Child remains alert, engaged, and afebrile following antipyresis with no neurological deficits.'
          },
          {
            id: 'B',
            text: 'Complex Febrile Seizure: Mandatory immediate emergency lumbar puncture and non-contrast CT head',
            isCorrect: false,
            rationale: 'This seizure is generalized, lasted 2 minutes (<15 min), occurred once in 24h, and child is alert without meningism; it is simple, not complex.'
          },
          {
            id: 'C',
            text: 'Status Epilepticus: Load with IV Phenytoin 20mg/kg over 30 minutes',
            isCorrect: false,
            rationale: 'Status epilepticus is defined as continuous seizure >=5 minutes or multiple without recovery; this seizure resolved after 2 minutes.'
          },
          {
            id: 'D',
            text: 'Initiate daily prophylactic Sodium Valproate therapy to prevent epilepsy',
            isCorrect: false,
            rationale: 'Anticonvulsant prophylaxis is not indicated for simple febrile seizures as risks far outweigh benefits.'
          }
        ],
        correctOptionId: 'A',
        learningPoint: 'Simple febrile convulsions in fully alert, vaccinated toddlers with clear fever sources do not require routine bloods, LP, EEG, or neuroimaging.'
      },
      {
        stepNumber: 2,
        title: 'Parental Counseling & Discharge Safety-Netting',
        prompt: 'What key advice should be provided to the parents regarding the risk of epilepsy, recurrence of febrile convulsions, and first aid management?',
        options: [
          {
            id: 'A',
            text: 'Reassure that long-term risk of epilepsy is low (~1-2%, similar to baseline population), febrile seizure recurrence is ~30%, advise on side-lying recovery position during future seizures, and avoid forceful mouth objects',
            isCorrect: true,
            rationale: 'Parents should be given clear reassurance that simple febrile seizures do not cause brain damage or intellectual disability, and the risk of future epilepsy is only minimally elevated above baseline. First aid education (recovery position, timing seizure, calling ambulance if >5 min) is essential.',
            finding: 'Parents express relief and understand first aid protocol.'
          },
          {
            id: 'B',
            text: 'Inform parents that the child has a 75% risk of developing severe epilepsy',
            isCorrect: false,
            rationale: 'The risk of epilepsy following simple febrile seizures is only ~1-2%.'
          },
          {
            id: 'C',
            text: 'Prescribe rectal diazepam for home use during any future mild temperature spikes',
            isCorrect: false,
            rationale: 'Routine home rescue benzodiazepines are not indicated for simple febrile seizures.'
          },
          {
            id: 'D',
            text: 'Advise continuous round-the-clock alternating paracetamol/ibuprofen to prevent future seizures',
            isCorrect: false,
            rationale: 'Antipyretics provide comfort but do NOT prevent the recurrence of febrile convulsions.'
          }
        ],
        correctOptionId: 'A',
        learningPoint: 'Educate parents on seizure first aid (side-lying position, call 000 if >5 min) and reassure that simple febrile seizures do not cause brain injury.'
      }
    ],
    finalDiagnosis: 'Simple Febrile Convulsion secondary to Acute Otitis Media / Viral Upper Respiratory Tract Infection.',
    managementSummary: 'Identification and supportive treatment of fever source (analgesia for otitis media), parental reassurance and first-aid education, discharge with GP follow-up.',
    keyLearningPoints: [
      'Simple Febrile Seizure: 6 mo - 6 yr, < 15 min, generalized, 1 per 24h, fully alert post-ictal.',
      'Antipyretics relieve discomfort but do not prevent seizure recurrence.'
    ]
  },

  // 6. WOMEN'S HEALTH / O&G - Acute Ectopic Pregnancy
  {
    title: 'Acute Unilateral Lower Abdominal Pain & Vaginal Spotting with Positive beta-hCG',
    specialty: "Women's Health (O&G) & Emergency",
    system: 'Reproductive System',
    difficulty: 'Hard',
    chiefComplaint: 'Right iliac fossa cramping, dark vaginal spotting, and 6-week amenorrhea.',
    vignetteBuilder: (age, gender) => ({
      hpi: `A ${age}-year-old G1P0 ${gender} presents to the emergency department with a 6-hour history of sharp right lower quadrant abdominal pain and dark brown vaginal spotting. Her last menstrual period was 6 weeks ago (normally regular 28-day cycles). She has a history of treated Chlamydia trachomatis pelvic infection 2 years ago.`,
      pmh: ['Pelvic Inflammatory Disease (Chlamydia) 2 years ago', 'Appendectomy at age 14'],
      medications: ['Folic acid 0.5mg Daily'],
      allergies: ['No known allergies'],
      socialHistory: 'Non-smoker, married, attempting conception.',
      physicalExam: {
        General: 'Pale, anxious, in moderate pain.',
        Cardiovascular: 'Heart rate 104 bpm, blood pressure 108/68 mmHg.',
        Abdomen: 'Localized tenderness and mild involuntary guarding in right iliac fossa. Bowel sounds present.',
        Pelvic: 'Speculum exam shows closed cervical os with minimal dark blood in vaginal vault. Bimanual exam reveals cervical motion tenderness (excitation) and tender 3 cm adnexal mass on the right side without mass on the left.'
      },
      initialVitals: {
        bp: '108/68 mmHg',
        hr: '104 bpm',
        rr: '18 /min',
        temp: '37.1 °C',
        spo2: '99% on room air'
      }
    }),
    stepsBuilder: () => [
      {
        stepNumber: 1,
        title: 'Diagnostic Imaging & Serum Biomarker Evaluation',
        prompt: 'Serum quantitative beta-hCG is 3,200 IU/L. What is the definitive diagnostic imaging modality of choice?',
        options: [
          {
            id: 'A',
            text: 'Urgent Transvaginal Ultrasound (TVUS) to assess for intrauterine pregnancy vs extrauterine adnexal gestational sac/mass and free fluid in the Pouch of Douglas',
            isCorrect: true,
            rationale: 'With a beta-hCG above the discriminatory zone (>1500-2000 IU/L), a normal intrauterine gestational sac should be visible on transvaginal ultrasound. Absence of intrauterine pregnancy with an adnexal mass confirms ectopic pregnancy.',
            finding: 'TVUS reveals an empty uterine cavity with thickened endometrium (14mm) and an ectopic right tubal mass (2.8 cm) containing a yolk sac, with moderate free fluid in the pouch of Douglas.'
          },
          {
            id: 'B',
            text: 'Abdominal CT with oral contrast to rule out diverticulitis',
            isCorrect: false,
            rationale: 'CT delivers ionizing radiation and is inferior to TVUS for pelvic reproductive structures.'
          },
          {
            id: 'C',
            text: 'Serum CA-125 level and pelvic MRI in 2 weeks',
            isCorrect: false,
            rationale: 'Ectopic pregnancy is an acute medical/surgical emergency; delaying imaging risks tubal rupture and exsanguination.'
          },
          {
            id: 'D',
            text: 'Perform dilatation and curettage (D&C) immediately in ED',
            isCorrect: false,
            rationale: 'D&C is not diagnostic first-line when non-invasive TVUS can directly visualize ectopic pregnancy.'
          }
        ],
        correctOptionId: 'A',
        learningPoint: 'Transvaginal Ultrasound (TVUS) plus quantitative beta-hCG is the diagnostic cornerstone for evaluating suspected ectopic pregnancy.'
      },
      {
        stepNumber: 2,
        title: 'Management Triage (Medical vs Surgical Salpingectomy)',
        prompt: 'The patient develops increasing right lower quadrant pain, heart rate increases to 118 bpm, and blood pressure drops to 92/56 mmHg. Repeat bedside FAST scan demonstrates expanding fluid in Morison pouch and pelvis. What is the immediate definitive management?',
        options: [
          {
            id: 'A',
            text: 'Emergent Laparoscopic (or open) Salpingectomy, large-bore IV access, IV fluid resuscitation, type and cross-match 2 units packed RBCs, and Anti-D immunoglobulin (if Rh-negative)',
            isCorrect: true,
            rationale: 'Signs of tubal rupture/hemoperitoneum (hypotension, tachycardia, peritoneal signs, free intraperitoneal fluid) mandate immediate surgical intervention (salpingectomy) and resuscitation. Methotrexate is strictly contraindicated in hemodynamic instability or ruptured ectopic.',
            finding: 'Laparoscopy reveals a ruptured right ampullary ectopic pregnancy with 600 mL hemoperitoneum. Successful right salpingectomy performed with complete hemostasis.'
          },
          {
            id: 'B',
            text: 'Single-dose Intramuscular Methotrexate (50 mg/m²) and outpatient monitoring',
            isCorrect: false,
            rationale: 'Methotrexate is contraindicated in hemodynamically unstable patients or when rupture/hemoperitoneum is present.'
          },
          {
            id: 'C',
            text: 'Oral Progesterone supplementation and bed rest for threatened miscarriage',
            isCorrect: false,
            rationale: 'Empty uterus with adnexal mass and hemoperitoneum is a ruptured ectopic, not threatened miscarriage.'
          },
          {
            id: 'D',
            text: 'Discharge with codeine for pain and repeat beta-hCG in 48 hours',
            isCorrect: false,
            rationale: 'Ruptured ectopic pregnancy with hemorrhagic shock is life-threatening if surgery is delayed.'
          }
        ],
        correctOptionId: 'A',
        learningPoint: 'Ruptured ectopic pregnancy with hemodynamic instability or hemoperitoneum mandates emergent surgical salpingectomy and resuscitation.'
      }
    ],
    finalDiagnosis: 'Ruptured Right Tubal Ectopic Pregnancy with Hemoperitoneum.',
    managementSummary: 'Urgent large-bore IV resuscitation, cross-matching, emergent laparoscopic salpingectomy, Anti-D immunoglobulin administration if Rh-negative.',
    keyLearningPoints: [
      'Discriminatory zone: beta-hCG > 1,500–2,000 IU/L should show intrauterine gestational sac on TVUS.',
      'Hemodynamic instability / hemoperitoneum = Immediate Surgery (Salpingectomy).'
    ]
  },

  // 7. PSYCHIATRY - Acute Mania (Bipolar I Disorder)
  {
    title: 'Acute Onset Decreased Need for Sleep, Pressured Speech & Grandiosity',
    specialty: 'Psychiatry & Mental Health',
    system: 'Mental Health & Psychiatry',
    difficulty: 'Medium',
    chiefComplaint: 'Sleeping 2 hours per night, rapid pressured speech, and grandiose spending spree for 6 days.',
    vignetteBuilder: (age, gender) => ({
      hpi: `A ${age}-year-old ${gender} is brought to the acute mental health unit by family members. Over the past 6 days, ${gender === 'man' ? 'he' : 'she'} has slept only 1-2 hours per night while reporting "infinite energy". Family notes continuous rapid, loud, uninterrupted speech (pressured speech), jumping from topic to topic (flight of ideas), and spending $18,000 on luxury sports cars believing they have received a secret government contract.`,
      pmh: ['Major Depressive Episode 3 years ago (treated with Sertraline)'],
      medications: ['Sertraline 50mg Daily (started 3 weeks ago by GP for low mood)'],
      allergies: ['No known allergies'],
      socialHistory: 'Works as marketing manager. No illicit drug history.',
      physicalExam: {
        General: 'Pacing around the room, flamboyantly dressed in bright mismatched colors, irritable when interrupted.',
        MentalStateExam: 'Speech: Rapid, loud, pressured, difficult to interrupt. Mood: Euphoric and irritable. Affect: Labile. Thought Process: Flight of ideas, loose associations. Thought Content: Grandiose delusions. Perception: No auditory or visual hallucinations. Insight/Judgment: Absent insight.',
        PhysicalExam: 'Normal vital signs aside from mild sinus tachycardia (96 bpm).'
      },
      initialVitals: {
        bp: '132/84 mmHg',
        hr: '96 bpm',
        rr: '16 /min',
        temp: '36.9 °C',
        spo2: '99% on room air'
      }
    }),
    stepsBuilder: () => [
      {
        stepNumber: 1,
        title: 'Initial Safety Assessment & Antidepressant Management',
        prompt: 'What is the immediate pharmacological action regarding current medications and diagnostic triage under the Australian Mental Health Act?',
        options: [
          {
            id: 'A',
            text: 'Immediately cease Sertraline (antidepressant-induced mania switch), evaluate for involuntary admission under the Mental Health Act for patient safety, and perform organic workup (toxicology, thyroid function)',
            isCorrect: true,
            rationale: 'Antidepressant monotherapy in bipolar disorder frequently precipitates manic switches. The antidepressant must be stopped immediately. Due to high financial/social risk and absent insight, involuntary psychiatric evaluation and admission under mental health legislation is indicated.',
            finding: 'Urine drug screen is negative. TSH and electrolytes are normal. Sertraline discontinued.'
          },
          {
            id: 'B',
            text: 'Double the Sertraline dose to 100mg Daily to treat agitated depression',
            isCorrect: false,
            rationale: 'Increasing the antidepressant will severely exacerbate manic psychosis and agitation.'
          },
          {
            id: 'C',
            text: 'Prescribe oral St. John\'s Wort and discharge with outpatient psychology appointment',
            isCorrect: false,
            rationale: 'Acute mania with grandiosity and financial recklessness requires urgent psychiatric containment and mood stabilization.'
          },
          {
            id: 'D',
            text: 'Administer high-dose tricyclic antidepressants (Amitriptyline)',
            isCorrect: false,
            rationale: 'TCAs have an even higher propensity to trigger manic switches and carry cardiotoxicity.'
          }
        ],
        correctOptionId: 'A',
        learningPoint: 'In acute mania, immediately discontinue all antidepressant medications and assess need for admission under mental health legislation.'
      },
      {
        stepNumber: 2,
        title: 'Definitive Acute Pharmacotherapy for Mania',
        prompt: 'Which first-line medication regimen is recommended for acute mania with agitation and psychotic features in Australia?',
        options: [
          {
            id: 'A',
            text: 'Atypical Second-Generation Antipsychotic (e.g. Olanzapine, Quetiapine, or Risperidone) +/- Mood Stabilizer (Lithium or Sodium Valproate) for rapid antimanic control',
            isCorrect: true,
            rationale: 'Second-generation antipsychotics (e.g. Olanzapine 10-20mg or Quetiapine) provide rapid antimanic and calming efficacy within 24-48 hours. Mood stabilizers (Lithium or Valproate) provide long-term maintenance.',
            finding: 'Patient responds to Olanzapine 15mg at night with restored sleep architecture and reduction in pressured speech.'
          },
          {
            id: 'B',
            text: 'Fluoxetine monotherapy with oral Zolpidem',
            isCorrect: false,
            rationale: 'SSRIs are contraindicated in active mania.'
          },
          {
            id: 'C',
            text: 'Long-term high-dose Benzodiazepine monotherapy for 6 months',
            isCorrect: false,
            rationale: 'Benzodiazepines are short-term adjuncts for acute behavioral agitation, not definitive antimanic agents.'
          },
          {
            id: 'D',
            text: 'Immediate Electroconvulsive Therapy (ECT) before attempting any oral medication',
            isCorrect: false,
            rationale: 'ECT is reserved for severe treatment-refractory mania, severe catatonia, or pregnancy, after medication trials.'
          }
        ],
        correctOptionId: 'A',
        learningPoint: 'Second-generation antipsychotics (e.g., Olanzapine, Quetiapine) +/- Lithium/Valproate form the first-line therapy for acute manic episodes.'
      }
    ],
    finalDiagnosis: 'Bipolar I Disorder – Acute Manic Episode with Grandiose Features (Antidepressant-Induced Switch).',
    managementSummary: 'Immediate cessation of SSRI, acute mood stabilization with Olanzapine, initiation of Lithium maintenance with baseline renal/thyroid monitoring, psychoeducation.',
    keyLearningPoints: [
      'DIG FAST criteria for mania: Distractibility, Impulsivity/Indiscretion, Grandiosity, Flight of ideas, Activity increase, Sleep deficit, Talkativeness/Pressure.',
      'Stop antidepressants immediately when mania develops.'
    ]
  },

  // 8. ENDOCRINOLOGY - Diabetic Ketoacidosis (DKA)
  {
    title: 'Nausea, Abdominal Pain, Kussmaul Breathing & Hyperglycemia',
    specialty: 'Endocrinology & Intensive Care',
    system: 'Endocrine & Metabolic',
    difficulty: 'Hard',
    chiefComplaint: 'Vomiting, diffuse abdominal pain, deep rapid breathing, and lethargy for 24 hours.',
    vignetteBuilder: (age, gender) => ({
      hpi: `A ${age}-year-old ${gender} with Type 1 Diabetes Mellitus presents to the resuscitation bay with a 1-day history of nausea, persistent vomiting, severe diffuse abdominal pain, and extreme thirst. Was diagnosed with gastroenteritis 2 days ago and omitted their basal-bolus insulin doses believing they "should not take insulin when not eating".`,
      pmh: ['Type 1 Diabetes Mellitus (diagnosed 5 years ago)'],
      medications: ['Insulin Glargine 22 units Nocté', 'Insulin Aspart with meals (omitted)'],
      allergies: ['No known allergies'],
      socialHistory: 'University student, non-smoker.',
      physicalExam: {
        General: 'Drowsy, severely dehydrated with dry mucous membranes, sunken eyes, and sweet fruity (acetone) breath odor.',
        Respiratory: 'Deep, rapid, labored respirations (Kussmaul breathing). Lungs clear.',
        Cardiovascular: 'Tachycardia (122 bpm), blood pressure 96/60 mmHg, capillary refill 4 seconds.',
        Abdomen: 'Diffuse abdominal tenderness without localized peritoneal rebound.'
      },
      initialVitals: {
        bp: '96/60 mmHg',
        hr: '122 bpm',
        rr: '30 /min',
        temp: '37.0 °C',
        spo2: '98% on room air'
      }
    }),
    stepsBuilder: () => [
      {
        stepNumber: 1,
        title: 'Diagnostic Confirmation & Blood Gas Interpretation',
        prompt: 'Arterial Blood Gas (ABG) and biochemistry show: pH 7.12, pCO2 20 mmHg, HCO3 8 mmol/L, Anion Gap 28 mmol/L, Blood Glucose 26.4 mmol/L, Blood beta-hydroxybutyrate ketones 5.8 mmol/L, Serum Potassium 4.8 mmol/L, Serum Sodium 131 mmol/L. What is the definitive diagnosis and primary initial resuscitation fluid?',
        options: [
          {
            id: 'A',
            text: 'Severe Diabetic Ketoacidosis (DKA): Initiate immediate aggressive IV isotonic crystalloid (0.9% Normal Saline 1000 mL over 1st hour)',
            isCorrect: true,
            rationale: 'Diagnostic triad of DKA: Hyperglycemia (>11 mmol/L), Ketosis (blood ketones >3.0 mmol/L), and Metabolic Acidosis (pH <7.30 or HCO3 <15). Fluid resuscitation with 0.9% Normal Saline is the primary first step to restore intravascular volume before or alongside insulin.',
            finding: 'After 1000 mL Normal Saline, blood pressure improves to 110/70 mmHg.'
          },
          {
            id: 'B',
            text: 'Hyperosmolar Hyperglycemic State (HHS): Administer 50% IV Dextrose bolus',
            isCorrect: false,
            rationale: 'Marked high anion gap acidosis and high ketones confirm DKA, not HHS. Dextrose bolus would worsen extreme hyperglycemia.'
          },
          {
            id: 'C',
            text: 'Lactic Acidosis from Metformin: Give 500 mL Sodium Bicarbonate IV infusion',
            isCorrect: false,
            rationale: 'Bicarbonate is not routinely recommended in DKA unless pH <6.9, and the patient has T1DM on insulin.'
          },
          {
            id: 'D',
            text: 'Administer subcutaneous long-acting insulin and discharge with oral rehydration salts',
            isCorrect: false,
            rationale: 'Severe DKA is a life-threatening endocrine emergency requiring ICU/HDU admission and continuous IV fixed-rate insulin infusion.'
          }
        ],
        correctOptionId: 'A',
        learningPoint: 'DKA management sequence: 1) Fluid resuscitation with 0.9% Saline, 2) Potassium monitoring/replacement, 3) Fixed-rate IV Insulin infusion (0.1 units/kg/h).'
      },
      {
        stepNumber: 2,
        title: 'Insulin & Potassium Replacement Protocol',
        prompt: 'Which protocol represents the correct management of intravenous insulin, potassium replacement, and glucose monitoring in DKA?',
        options: [
          {
            id: 'A',
            text: 'Continuous IV actrapid insulin infusion (0.1 units/kg/hr); add Potassium Chloride (20-30 mmol/L) to IV fluids once K+ < 5.5 mmol/L; add 5% or 10% Dextrose to fluids once BGL falls below 14 mmol/L to prevent hypoglycemia while continuing insulin until ketoacidosis resolves',
            isCorrect: true,
            rationale: 'Insulin drives potassium into cells; proactive potassium replacement prevents fatal arrhythmias. Dextrose infusion must be started when BGL drops <14 mmol/L to allow continuation of insulin until blood ketones <0.6 mmol/L and venous pH >7.30 (closure of anion gap).',
            finding: 'Repeat ABG at 6 hours demonstrates pH 7.34, HCO3 19 mmol/L, ketones 0.4 mmol/L, normal anion gap.'
          },
          {
            id: 'B',
            text: 'Stop insulin infusion immediately as soon as Blood Glucose falls below 15 mmol/L',
            isCorrect: false,
            rationale: 'Stopping insulin early causes rebound ketoacidosis; insulin must continue with added dextrose until acidosis/ketosis resolves.'
          },
          {
            id: 'C',
            text: 'Withhold all potassium until the patient has been hospitalized for 48 hours',
            isCorrect: false,
            rationale: 'Withholding potassium during insulin therapy precipitates lethal hypokalemia.'
          },
          {
            id: 'D',
            text: 'Give rapid IV bolus of 50 units of regular insulin without IV fluids',
            isCorrect: false,
            rationale: 'IV bolus insulin increases risk of cerebral edema and hypokalemic collapse.'
          }
        ],
        correctOptionId: 'A',
        learningPoint: 'Never stop insulin when blood glucose drops in DKA: add IV Dextrose and continue insulin until acidosis and ketones resolve.'
      }
    ],
    finalDiagnosis: 'Diabetic Ketoacidosis (DKA) precipitated by Insulin Omission during Acute Intercurrent Illness.',
    managementSummary: 'IV 0.9% Saline resuscitation, continuous IV Actrapid insulin (0.1 u/kg/h), potassium replacement, 5% Dextrose addition when BGL <14 mmol/L, sick-day rules education.',
    keyLearningPoints: [
      'DKA diagnostic criteria: BGL > 11 mmol/L, Ketones > 3.0 mmol/L, pH < 7.30 or HCO3 < 15.',
      'Sick-Day Rules: Never stop basal insulin during acute illness; check BGL and ketones every 2-4 hours.'
    ]
  },

  // 9. INFECTIOUS DISEASES - Sepsis & Septic Shock
  {
    title: 'High Fever, Rigors, Hypotension, and Altered Mental Status in an Elderly Patient',
    specialty: 'Infectious Diseases & Critical Care',
    system: 'Immune & Infectious Diseases',
    difficulty: 'Hard',
    chiefComplaint: 'Confusion, shivering rigors, fever of 39.4°C, and foul-smelling cloudy urine for 2 days.',
    vignetteBuilder: (age, gender) => ({
      hpi: `An ${age}-year-old ${gender} from a residential aged care facility is transferred to the Emergency Department due to acute confusion, lethargy, decreased oral intake, and fever. The nursing home reports progressive dysuria, cloudy foul-smelling urine, and urinary incontinence over the preceding 48 hours.`,
      pmh: ['Benign Prostatic Hypertrophy / Recurrent UTIs', 'Hypertension', 'Mild vascular cognitive impairment'],
      medications: ['Tamsulosin 0.4mg Daily', 'Amlodipine 5mg Daily'],
      allergies: ['No known allergies'],
      socialHistory: 'Lives in supported residential care.',
      physicalExam: {
        General: 'Confused, delirious (disoriented to time and place), flushed skin, shivering rigors.',
        Cardiovascular: 'Tachycardia at 128 bpm, blood pressure 84/48 mmHg (MAP 60 mmHg).',
        Respiratory: 'Tachypneic at 26 /min, lungs clear.',
        Abdomen: 'Suprapubic fullness and moderate tenderness; right costovertebral angle tenderness (renal angle pain).',
        Genitourinary: 'Indwelling catheter draining turbid dark amber urine with sediment.'
      },
      initialVitals: {
        bp: '84/48 mmHg',
        hr: '128 bpm',
        rr: '26 /min',
        temp: '39.4 °C',
        spo2: '94% on room air'
      }
    }),
    stepsBuilder: () => [
      {
        stepNumber: 1,
        title: 'Emergency Sepsis Six Protocol / Hour-1 Bundle',
        prompt: 'The patient has qSOFA score 3 (SBP <100, RR >=22, altered mentation) and serum lactate of 4.2 mmol/L. What is the mandatory immediate management bundle within 1 hour?',
        options: [
          {
            id: 'A',
            text: 'Sepsis Hour-1 Bundle: Deliver high-flow oxygen (target SpO2 94-98%), draw blood cultures prior to antibiotics, administer broad-spectrum IV antibiotics (e.g. Ceftriaxone + Gentamicin or Piperacillin-Tazobactam), rapid 30 mL/kg isotonic crystalloid bolus, check serial lactate, and measure hourly urine output via catheter',
            isCorrect: true,
            rationale: 'Surviving Sepsis Campaign guidelines mandate the Sepsis Six / Hour-1 Bundle: Blood cultures, IV antibiotics within 60 mins, 30 mL/kg crystalloid for hypotension/lactate >=4, lactate measurement, oxygen, and fluid balance monitoring.',
            finding: 'Blood and urine cultures drawn. Broad-spectrum IV antibiotics and 2000 mL Hartmann\'s solution infused over 45 minutes.'
          },
          {
            id: 'B',
            text: 'Administer oral trimethoprim and observe in ED short stay unit for 6 hours',
            isCorrect: false,
            rationale: 'Oral antibiotics are inadequate for life-threatening septic shock with multiorgan hypoperfusion.'
          },
          {
            id: 'C',
            text: 'Perform immediate non-contrast CT brain to investigate acute confusion before giving antibiotics',
            isCorrect: false,
            rationale: 'Antibiotics and resuscitation must never be delayed for neuroimaging in obvious urosepsis.'
          },
          {
            id: 'D',
            text: 'Administer high-dose loop diuretics to stimulate urine production',
            isCorrect: false,
            rationale: 'Diuretics in hypovolemic septic shock worsen circulatory collapse and kidney injury.'
          }
        ],
        correctOptionId: 'A',
        learningPoint: 'Sepsis Hour-1 Bundle: Blood cultures, IV broad-spectrum antibiotics within 1 hour, 30 mL/kg IV crystalloid fluid, lactate measurement, and urine output monitoring.'
      },
      {
        stepNumber: 2,
        title: 'Refractory Septic Shock & Vasopressor Support',
        prompt: 'Following 30 mL/kg IV crystalloid fluid resuscitation, blood pressure is 86/50 mmHg (MAP 62 mmHg) with persistent oliguria (<0.3 mL/kg/h) and lactate 3.8 mmol/L. What is the first-line vasopressor of choice?',
        options: [
          {
            id: 'A',
            text: 'Intravenous Noradrenaline (Norepinephrine) central infusion titrated to target Mean Arterial Pressure (MAP) >= 65 mmHg',
            isCorrect: true,
            rationale: 'In fluid-refractory septic shock, Noradrenaline (Norepinephrine) is the definitive first-line vasopressor of choice due to potent alpha-1 vasoconstriction with modest beta-1 inotropic support.',
            finding: 'Noradrenaline infusion initiated; MAP stabilizes at 68-72 mmHg with restoration of urine output and clearance of lactate.'
          },
          {
            id: 'B',
            text: 'Intravenous Dopamine high-dose infusion',
            isCorrect: false,
            rationale: 'Dopamine is associated with significantly higher tachyarrhythmias and increased mortality compared to Noradrenaline.'
          },
          {
            id: 'C',
            text: 'Oral Ephedrine tablets twice daily',
            isCorrect: false,
            rationale: 'Oral sympathomimetics have no efficacy in acute intensive care septic shock.'
          },
          {
            id: 'D',
            text: 'Intravenous Furosemide infusion',
            isCorrect: false,
            rationale: 'Furosemide depletes intravascular volume and exacerbates shock.'
          }
        ],
        correctOptionId: 'A',
        learningPoint: 'Noradrenaline (Norepinephrine) is the first-line vasopressor of choice in septic shock to maintain MAP >= 65 mmHg.'
      }
    ],
    finalDiagnosis: 'Septic Shock secondary to Acute Urosepsis / Pyelonephritis.',
    managementSummary: 'IV broad-spectrum antibiotics, 30 mL/kg crystalloid fluid loading, Noradrenaline vasopressor for target MAP >= 65 mmHg, source control (urinary catheterization / stent if obstruction), ICU admission.',
    keyLearningPoints: [
      'qSOFA criteria (1 point each): SBP <= 100, RR >= 22, Altered GCS. Score >= 2 = High risk of sepsis mortality.',
      'Target MAP >= 65 mmHg with Noradrenaline in fluid-refractory septic shock.'
    ]
  },

  // 10. GASTROENTEROLOGY - Acute Upper GI Bleeding
  {
    title: 'Hematemesis, Melena & Hemodynamic Instability in Chronic Peptic Ulcer Disease',
    specialty: 'Gastroenterology & Upper GI Surgery',
    system: 'Gastrointestinal System',
    difficulty: 'Hard',
    chiefComplaint: 'Vomiting frank red blood (300 mL) and passing pitch-black tarry stools with dizziness.',
    vignetteBuilder: (age, gender) => ({
      hpi: `A ${age}-year-old ${gender} presents to the emergency department after vomiting 300 mL of bright red blood and clots 1 hour ago. For the past 3 days, ${gender === 'man' ? 'he' : 'she'} has noted foul-smelling, sticky, black tarry stools (melena) and postural lightheadedness. Has been taking over-the-counter Naproxen (500mg BD) for osteoarthritis pain for 4 weeks.`,
      pmh: ['Osteoarthritis', 'Gastroesophageal Reflux Disease (GERD)', 'Hypertension'],
      medications: ['Naproxen 500mg BD (NSAID)', 'Perindopril 4mg Daily'],
      allergies: ['No known allergies'],
      socialHistory: 'Drinks 2 standard beers daily, non-smoker.',
      physicalExam: {
        General: 'Pale, diaphoretic, postural dizziness on sitting upright.',
        Cardiovascular: 'Heart rate 118 bpm, blood pressure 94/58 mmHg supine (drops to 78/46 mmHg on standing).',
        Abdomen: 'Epigastric tenderness without rebound or rigidity. Bowel sounds hyperactive.',
        Rectal: 'Digital rectal exam confirms gross jet-black melena on glove.'
      },
      initialVitals: {
        bp: '94/58 mmHg',
        hr: '118 bpm',
        rr: '20 /min',
        temp: '36.6 °C',
        spo2: '97% on room air'
      }
    }),
    stepsBuilder: () => [
      {
        stepNumber: 1,
        title: 'Initial Resuscitation & Pharmacotherapy in Acute Upper GI Bleeding',
        prompt: 'The patient has significant postural hypotension and active hematemesis (Glasgow-Blatchford Score 12). What is the immediate resuscitation and pharmacotherapy protocol prior to endoscopy?',
        options: [
          {
            id: 'A',
            text: 'Insert two large-bore IV cannulae (14-16G), rapid crystalloid fluid resuscitation, type and cross-match 4 units packed red blood cells, IV high-dose Proton Pump Inhibitor (Pantoprazole/Esomeprazole 80mg bolus + 8mg/hr infusion), withhold NSAIDs, and reverse anticoagulants',
            isCorrect: true,
            rationale: 'Resuscitation with wide-bore IV access and fluid/blood cross-match is the priority. High-dose IV PPI elevates intragastric pH (>6.0), stabilizing platelet clot formation over bleeding peptic ulcers.',
            finding: 'Hemoglobin returns at 72 g/L. Two units of packed RBCs transfused with hemodynamic stabilization.'
          },
          {
            id: 'B',
            text: 'Administer oral antacids and arrange outpatient barium swallow series in 1 week',
            isCorrect: false,
            rationale: 'Massive upper GI bleed with hemodynamic instability requires emergent inpatient resuscitation and endoscopy.'
          },
          {
            id: 'C',
            text: 'Perform immediate exploratory laparotomy without endoscopic evaluation',
            isCorrect: false,
            rationale: 'Upper endoscopy is the gold standard diagnostic and therapeutic modality before surgery.'
          },
          {
            id: 'D',
            text: 'Prescribe oral iron supplements and discharge with GP follow-up',
            isCorrect: false,
            rationale: 'Patient is actively bleeding with hemodynamic shock (Glasgow-Blatchford score 12).'
          }
        ],
        correctOptionId: 'A',
        learningPoint: 'Resuscitation in acute Upper GI bleed: 2 large-bore IVs, blood cross-match (transfuse if Hb < 70-80 g/L), IV PPI bolus + infusion, urgent endoscopy.'
      },
      {
        stepNumber: 2,
        title: 'Definitive Endoscopic Intervention & Forrest Classification',
        prompt: 'Urgent esophagogastroduodenoscopy (OGD) within 12 hours reveals a 2 cm posterior duodenal bulb ulcer with a visible spurting arterial vessel (Forrest Ia). What is the definitive dual endoscopic therapy?',
        options: [
          {
            id: 'A',
            text: 'Dual-modality Endoscopic Hemostasis (e.g. Adrenaline/Epinephrine injection PLUS thermal coagulation / through-the-scope mechanical hemoclips)',
            isCorrect: true,
            rationale: 'For high-risk bleeding peptic ulcers (Forrest Ia active spurting or Ib active oozing), combination therapy (Adrenaline injection + thermal coagulation or mechanical clips) is significantly superior to monotherapy in preventing rebleeding and need for surgery.',
            finding: 'Successful dual therapy (Adrenaline injection + 3 hemoclips applied) achieves complete hemostasis.'
          },
          {
            id: 'B',
            text: 'Diagnostic observation only without applying endoscopic therapy',
            isCorrect: false,
            rationale: 'Active arterial spurting carries >90% risk of persistent bleeding and mortality without therapeutic hemostasis.'
          },
          {
            id: 'C',
            text: 'Immediate total gastrectomy',
            isCorrect: false,
            rationale: 'Surgery is reserved only for endoscopic failure after two attempts or massive uncontrollable hemorrhage.'
          },
          {
            id: 'D',
            text: 'Placement of a Sengstaken-Blakemore balloon tube into the stomach',
            isCorrect: false,
            rationale: 'Balloon tamponade tubes are used exclusively for bleeding esophageal/gastric varices in cirrhosis, not duodenal ulcers.'
          }
        ],
        correctOptionId: 'A',
        learningPoint: 'High-risk bleeding peptic ulcers (Forrest Ia/Ib/IIa) mandate dual-modality endoscopic hemostasis (Adrenaline + Hemoclips/Thermal).'
      }
    ],
    finalDiagnosis: 'Severe Acute Upper Gastrointestinal Bleeding secondary to Bleeding Posterior Duodenal Peptic Ulcer (Forrest Ia) exacerbated by NSAID use.',
    managementSummary: 'Resuscitation, blood transfusion (Hb target 70-90 g/L), IV Pantoprazole infusion for 72h, dual-modality endoscopic hemostasis, cessation of NSAIDs, testing and eradication of Helicobacter pylori.',
    keyLearningPoints: [
      'Glasgow-Blatchford Score > 0 identifies patients requiring inpatient admission and urgent endoscopy.',
      'Test all peptic ulcer patients for Helicobacter pylori and treat with triple/quadruple eradication therapy.'
    ]
  },

  // 11. EMERGENCY & TOXICOLOGY - Acute Anaphylaxis
  {
    title: 'Sudden Urticaria, Lip Angioedema, Wheeze & Hypotension After Food Ingestion',
    specialty: 'Emergency Medicine & Clinical Immunology',
    system: 'Immune & Infectious Diseases',
    difficulty: 'Hard',
    chiefComplaint: 'Facial swelling, throat tightness, severe wheezing and lightheadedness 15 minutes after eating a meal.',
    vignetteBuilder: (age, gender) => ({
      hpi: `A ${age}-year-old ${gender} is rushed into the resuscitation room after developing diffuse itchy hives, tongue and lip swelling, hoarseness of voice, and severe breathlessness 15 minutes after eating seafood at a restaurant. Feeling faint and collapsed onto the chair.`,
      pmh: ['Mild seasonal allergic rhinitis', 'Eczema in childhood'],
      medications: ['Cetirizine 10mg PRN'],
      allergies: ['Shellfish / Crustaceans (previously had mild oral tingling)'],
      socialHistory: 'Non-smoker, university researcher.',
      physicalExam: {
        General: 'Extreme distress, stridor audible without stethoscope, generalized urticarial erythematous plaques with intense pruritus.',
        Airway: 'Edematous uvula and soft palate, hoarse voice.',
        Respiratory: 'Bilateral diffuse expiratory wheezing and prolonged expiratory phase. Tachypnea (28 /min).',
        Cardiovascular: 'Tachycardia (134 bpm), thready radial pulse, hypotension (82/46 mmHg).'
      },
      initialVitals: {
        bp: '82/46 mmHg',
        hr: '134 bpm',
        rr: '28 /min',
        temp: '36.8 °C',
        spo2: '88% on room air'
      }
    }),
    stepsBuilder: () => [
      {
        stepNumber: 1,
        title: 'Emergency Life-Saving First-Line Pharmacotherapy',
        prompt: 'What is the single most urgent, life-saving initial medication and route of administration for acute anaphylaxis?',
        options: [
          {
            id: 'A',
            text: 'Intramuscular Adrenaline (Epinephrine) 1:1,000 (0.5 mg in adults, 0.01 mg/kg in children) injected into the anterolateral aspect of the mid-thigh immediately',
            isCorrect: true,
            rationale: 'Intramuscular Adrenaline into the vastus lateralis is the FIRST-LINE life-saving intervention in anaphylaxis. It rapidly reverses peripheral vasodilation, reduces mucosal edema, and suppresses mast cell degranulation.',
            finding: 'Within 3 minutes of IM Adrenaline, airway stridor decreases, blood pressure rises to 102/64 mmHg, and SpO2 improves to 94% with high-flow oxygen.'
          },
          {
            id: 'B',
            text: 'Oral Promethazine and oral Cetirizine antihistamines',
            isCorrect: false,
            rationale: 'Oral antihistamines have slow onset and do not reverse bronchospasm, laryngeal edema, or circulatory collapse.'
          },
          {
            id: 'C',
            text: 'Intravenous Hydrocortisone 200mg as sole primary therapy',
            isCorrect: false,
            rationale: 'Corticosteroids take 4-6 hours to exert anti-inflammatory effects and have zero immediate life-saving action in acute shock.'
          },
          {
            id: 'D',
            text: 'Subcutaneous Adrenaline into the deltoid muscle',
            isCorrect: false,
            rationale: 'Subcutaneous absorption is erratic and significantly slower than intramuscular injection into the vascular vastus lateralis.'
          }
        ],
        correctOptionId: 'A',
        learningPoint: 'First-line therapy for anaphylaxis is ALWAYS Intramuscular Adrenaline 1:1000 (0.5 mg in adults) into the anterolateral mid-thigh without delay.'
      },
      {
        stepNumber: 2,
        title: 'Refractory Anaphylaxis & Discharge Safety Planning',
        prompt: 'If symptoms (hypotension or bronchospasm) fail to respond after 5 minutes, what is the next step, and what prescription/education must be provided on discharge?',
        options: [
          {
            id: 'A',
            text: 'Repeat IM Adrenaline every 5 minutes (or start IV Adrenaline infusion if refractory), observe for minimum 4-6 hours for biphasic reactions, prescribe 2x Adrenaline Auto-Injectors (EpiPen 300mcg), and provide ASCIA Action Plan with clinical immunology referral',
            isCorrect: true,
            rationale: 'Repeat doses of IM Adrenaline can be given every 5 minutes. Biphasic anaphylaxis occurs in up to 20% of cases, warranting 4-6h observation. Every patient must be discharged with dual auto-injectors and an ASCIA Action Plan.',
            finding: 'Patient recovers completely. Given EpiPen training with dummy trainer and registered with ASCIA action plan.'
          },
          {
            id: 'B',
            text: 'Discharge immediately after 15 minutes once blood pressure improves',
            isCorrect: false,
            rationale: 'Premature discharge ignores the dangerous risk of biphasic anaphylactic shock.'
          },
          {
            id: 'C',
            text: 'Advise that adrenaline auto-injectors are unnecessary if they carry oral antihistamines',
            isCorrect: false,
            rationale: 'Antihistamines do not prevent fatal anaphylaxis.'
          },
          {
            id: 'D',
            text: 'Prescribe 30 days of high-dose oral prednisolone and avoid testing',
            isCorrect: false,
            rationale: 'Prolonged steroid courses are not required; formal allergen confirmation via skin prick or specific IgE is indicated.'
          }
        ],
        correctOptionId: 'A',
        learningPoint: 'Discharge requirements after anaphylaxis: 2x Adrenaline Auto-Injectors (EpiPens), ASCIA Anaphylaxis Action Plan, and formal Immunology referral.'
      }
    ],
    finalDiagnosis: 'Severe Acute Anaphylactic Shock secondary to Ingested Crustacean/Shellfish IgE-mediated Hypersensitivity.',
    managementSummary: 'Immediate IM Adrenaline 0.5mg into mid-thigh, high-flow oxygen, IV fluid resuscitation (20 mL/kg), adjunctive antihistamines/corticosteroids, minimum 4-6 hour monitoring, dual EpiPen prescription and ASCIA Action Plan.',
    keyLearningPoints: [
      'Adrenaline IM (1:1000, 0.5 mg) is the sole first-line life-saving drug for anaphylaxis.',
      'Always prescribe two EpiPens and provide an ASCIA Action Plan for Anaphylaxis.'
    ]
  },

  // 12. SURGERY - Acute Cholecystitis & Biliary Colic
  {
    title: 'Severe Right Upper Quadrant Colicky Pain After Fatty Meals with Positive Murphy Sign',
    specialty: 'General Surgery & Gastroenterology',
    system: 'Gastrointestinal System',
    difficulty: 'Medium',
    chiefComplaint: 'Right upper quadrant abdominal pain radiating to right shoulder blade, fever, and nausea for 14 hours.',
    vignetteBuilder: (age, gender) => ({
      hpi: `A ${age}-year-old ${gender} presents with constant, severe right upper quadrant pain that developed after consuming fish and chips yesterday evening. The pain radiates around to the right infrascapular region (Boas sign) and is associated with persistent nausea and 2 episodes of bilious vomiting.`,
      pmh: ['Obesity (BMI 33 kg/m²)', 'Multiparous (G3P3)', 'Dyslipidemia'],
      medications: ['None regularly'],
      allergies: ['No known allergies'],
      socialHistory: 'Non-smoker, homemaker.',
      physicalExam: {
        General: 'Distressed, febrile (38.3°C), lying still.',
        Abdomen: 'Marked tenderness in right hypochondrium. Inspiratory arrest on deep palpation of right upper quadrant (Positive Murphy Sign). No generalized rigidity.',
        Sclera: 'No gross icterus/jaundice.'
      },
      initialVitals: {
        bp: '136/82 mmHg',
        hr: '98 bpm',
        rr: '18 /min',
        temp: '38.3 °C',
        spo2: '98% on room air'
      }
    }),
    stepsBuilder: () => [
      {
        stepNumber: 1,
        title: 'Diagnostic Imaging & Laboratory Triaging',
        prompt: 'What is the initial diagnostic imaging modality of choice for suspected acute calculous cholecystitis?',
        options: [
          {
            id: 'A',
            text: 'Abdominal / Hepatobiliary Ultrasound (USS) to evaluate gallbladder wall thickening (>3mm), pericholecystic fluid, sonographic Murphy sign, and gallstones',
            isCorrect: true,
            rationale: 'Transabdominal ultrasound is the gold standard initial investigation for acute cholecystitis with >90% sensitivity and specificity, detecting gallstones, acoustic shadowing, gallbladder wall edema (>3mm), and pericholecystic fluid.',
            finding: 'Ultrasound confirms multiple gallstones with an impacted 12mm calculus in the cystic duct, gallbladder wall thickening of 4.8 mm, pericholecystic fluid, and positive sonographic Murphy sign. Common bile duct (CBD) is normal at 4.5 mm with normal bilirubin.'
          },
          {
            id: 'B',
            text: 'Barium meal fluoroscopy',
            isCorrect: false,
            rationale: 'Barium studies are outdated and do not evaluate biliary pathology.'
          },
          {
            id: 'C',
            text: 'Colonoscopy to cecum',
            isCorrect: false,
            rationale: 'Colonoscopy does not evaluate gallbladder pathology.'
          },
          {
            id: 'D',
            text: 'Erect abdominal radiograph only',
            isCorrect: false,
            rationale: 'Only ~15% of gallstones are radiopaque on plain X-rays.'
          }
        ],
        correctOptionId: 'A',
        learningPoint: 'Transabdominal ultrasound is the initial gold standard imaging for suspected acute calculous cholecystitis.'
      },
      {
        stepNumber: 2,
        title: 'Definitive Surgical Management & Timing',
        prompt: 'In acute uncomplicated calculous cholecystitis, what is the definitive gold standard treatment and optimal surgical timing according to international and Australian guidelines?',
        options: [
          {
            id: 'A',
            text: 'Early Laparoscopic Cholecystectomy (performed during the index hospital admission, ideally within 72 hours of symptom onset) plus IV antibiotics',
            isCorrect: true,
            rationale: 'Early laparoscopic cholecystectomy during index admission (<72 hours) results in shorter hospital stays, fewer complications, and lower conversion to open surgery compared to delayed elective surgery.',
            finding: 'Successful uneventful laparoscopic cholecystectomy performed. Patient discharged on day 1 post-op.'
          },
          {
            id: 'B',
            text: 'Lifelong oral ursodeoxycholic acid therapy without surgery',
            isCorrect: false,
            rationale: 'Medical dissolution is ineffective for symptomatic acute cholecystitis with impacted calculi.'
          },
          {
            id: 'C',
            text: 'Extracorporeal shock-wave lithotripsy (ESWL)',
            isCorrect: false,
            rationale: 'ESWL has high recurrence rates and is not standard of care in acute cholecystitis.'
          },
          {
            id: 'D',
            text: 'Immediate open Whipple procedure (pancreaticoduodenectomy)',
            isCorrect: false,
            rationale: 'Whipple procedure is for periampullary malignancies, completely inappropriate for cholecystitis.'
          }
        ],
        correctOptionId: 'A',
        learningPoint: 'Early laparoscopic cholecystectomy during index admission (within 72 hours) is the treatment of choice for acute calculous cholecystitis.'
      }
    ],
    finalDiagnosis: 'Acute Calculous Cholecystitis secondary to Cystic Duct Calculus Impaction.',
    managementSummary: 'IV fluid hydration, analgesia (NSAIDs/opioids), IV antibiotics (e.g. Ceftriaxone + Metronidazole), and early index admission Laparoscopic Cholecystectomy.',
    keyLearningPoints: [
      'Murphy sign + fever + RUQ ultrasound findings (gallbladder wall > 3mm, pericholecystic fluid) = Acute Cholecystitis.',
      'Index admission early laparoscopic cholecystectomy (< 72h) is the gold standard.'
    ]
  }
];

// Generation matrix for building 500+ diverse, realistic cases
export function generate500PlusClinicalCases(count: number = 520): ClinicalCase[] {
  const cases: ClinicalCase[] = [];
  const names = [
    'Arthur Pendelton', 'Sarah Jenkins', 'Liam O\'Connor', 'Emily Watson', 'David Zhang',
    'Fatima Al-Mansoor', 'Michael Henderson', 'Jessica Nguyen', 'Robert Campbell', 'Chloe Dubois',
    'Alexander Rossi', 'Priya Sharma', 'Thomas Wright', 'Grace Kelly', 'Daniel Murphy',
    'Hannah Schmidt', 'James Wilson', 'Olivia Martin', 'Benjamin Lee', 'Sophia Taylor'
  ];

  const specialtyModifiers = [
    'Emergency & Acute Care', 'Inpatient Hospitalist Service', 'Australian Rural General Practice',
    'Specialist Outpatient Clinic', 'Intensive Care Unit (ICU)', 'Surgical Pre-Admission / Triage'
  ];

  const difficultyLevels: DifficultyLevel[] = ['Easy', 'Medium', 'Hard', 'Expert'];

  for (let i = 0; i < count; i++) {
    const templateIndex = i % CASE_TEMPLATES.length;
    const template = CASE_TEMPLATES[templateIndex];
    const name = names[i % names.length];
    const difficulty = difficultyLevels[i % difficultyLevels.length];
    const isMale = i % 2 === 0;
    const age = 18 + ((i * 11) % 65);
    const genderStr = isMale ? 'man' : 'woman';
    const patientGender = isMale ? 'Male' : 'Female';

    const vignetteData = template.vignetteBuilder(age, genderStr, name);
    const stepsData = template.stepsBuilder(age, genderStr);

    const caseId = `case-study-${(i + 1).toString().padStart(4, '0')}`;
    const modifier = specialtyModifiers[i % specialtyModifiers.length];
    const caseTitle = `${template.title} [Case #${i + 1}]`;

    const generatedCase: ClinicalCase = {
      id: caseId,
      title: caseTitle,
      specialty: `${template.specialty} • ${modifier}`,
      system: template.system,
      difficulty,
      patientAge: age,
      patientGender,
      chiefComplaint: template.chiefComplaint,
      hpi: vignetteData.hpi,
      pmh: vignetteData.pmh,
      medications: vignetteData.medications,
      allergies: vignetteData.allergies,
      socialHistory: vignetteData.socialHistory,
      physicalExam: vignetteData.physicalExam,
      initialVitals: vignetteData.initialVitals,
      steps: stepsData,
      finalDiagnosis: template.finalDiagnosis,
      managementSummary: template.managementSummary,
      keyLearningPoints: template.keyLearningPoints,
      isCompleted: false
    };

    cases.push(generatedCase);
  }

  return cases;
}
