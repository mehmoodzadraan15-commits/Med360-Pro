import React, { useState } from 'react';
import { useExam } from '../context/ExamContext';
import { Question } from '../types';
import {
  FileSpreadsheet,
  Upload,
  Download,
  Sparkles,
  Database,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Bot,
  Zap,
  Layers,
  FileCode,
  Check,
  RefreshCw,
} from 'lucide-react';

export const QuestionImportExport: React.FC = () => {
  const {
    questions,
    totalQuestionCount,
    expandDatabase5000,
    trimDatabaseTo,
    importQuestions,
    resetDatabase,
    refreshQuestions,
    isLoading,
  } = useExam();

  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [importCount, setImportCount] = useState<number>(5000);
  const [targetTrimCount, setTargetTrimCount] = useState<number>(5000);
  const [isTrimming, setIsTrimming] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [expandProgress, setExpandProgress] = useState<number>(0);
  const [customTopic, setCustomTopic] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiExamType, setAiExamType] = useState('USMLE Step 1');
  const [aiGeneratedSuccess, setAiGeneratedSuccess] = useState(false);

  const [aiSubject, setAiSubject] = useState('Internal Medicine');
  const [aiSystem, setAiSystem] = useState('Cardiovascular System');
  const [aiErrorMessage, setAiErrorMessage] = useState<string | null>(null);

  // 1-Click Trim / Fix to Exactly Target Count (e.g. 5,000 questions)
  const handleTrimDatabase = async (count: number = 5000) => {
    setIsTrimming(true);
    try {
      const finalCount = await trimDatabaseTo(count);
      setImportStatus(`Question bank successfully trimmed to exactly ${finalCount.toLocaleString()} questions (bookmarks & notes preserved)!`);
      setTimeout(() => setImportStatus(null), 6000);
    } catch (e: any) {
      setImportStatus(`Error adjusting question count: ${e.message || 'IndexedDB error'}`);
    } finally {
      setIsTrimming(false);
    }
  };

  // 1-Click 5,000+ Question Generator
  const handleBulkExpand = async () => {
    setIsExpanding(true);
    setExpandProgress(10);
    try {
      const timer = setInterval(() => {
        setExpandProgress((p) => Math.min(95, p + 15));
      }, 300);

      const inserted = await expandDatabase5000(importCount);
      clearInterval(timer);
      setExpandProgress(100);
      setImportStatus(`Successfully generated and indexed ${inserted.toLocaleString()} medical exam questions into IndexedDB!`);
      setTimeout(() => setImportStatus(null), 5000);
    } catch (e: any) {
      setImportStatus(`Error during bulk expansion: ${e.message || 'IndexedDB error'}`);
    } finally {
      setIsExpanding(false);
    }
  };

  // JSON / CSV File Upload Handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        let parsedQuestions: Question[] = [];

        if (file.name.endsWith('.json')) {
          parsedQuestions = JSON.parse(text);
        } else if (file.name.endsWith('.csv')) {
          // Simple CSV parser for questions
          const lines = text.split('\n');
          parsedQuestions = lines.slice(1).filter(l => l.trim()).map((line, idx) => {
            const cols = line.split(',');
            return {
              id: `csv-${Date.now()}-${idx}`,
              exam: (cols[0] || 'USMLE Step 1') as any,
              subject: (cols[1] || 'Internal Medicine') as any,
              system: (cols[2] || 'Cardiovascular System') as any,
              topic: cols[3] || 'Clinical Case',
              difficulty: (cols[4] || 'Medium') as any,
              vignette: cols[5] || 'A patient presents with symptoms.',
              question: cols[6] || 'What is the most likely diagnosis?',
              options: [
                { id: 'A', text: cols[7] || 'Option A' },
                { id: 'B', text: cols[8] || 'Option B' },
                { id: 'C', text: cols[9] || 'Option C' },
                { id: 'D', text: cols[10] || 'Option D' },
                { id: 'E', text: cols[11] || 'Option E' },
              ],
              correctOptionId: cols[12] || 'A',
              explanation: cols[13] || 'Explanation for correct choice.',
              educationalObjective: cols[14] || 'Educational objective.',
            };
          });
        }

        if (Array.isArray(parsedQuestions) && parsedQuestions.length > 0) {
          const inserted = await importQuestions(parsedQuestions);
          setImportStatus(`Successfully imported ${inserted.toLocaleString()} questions from ${file.name}`);
        } else {
          setImportStatus('Failed to parse questions. Please ensure valid JSON/CSV array format.');
        }
      } catch (err: any) {
        setImportStatus(`Error parsing file: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  // AI Single Question Synthesis via Gemini API
  const handleAiGenerate = async () => {
    if (!customTopic.trim() || isGeneratingAi) return;
    setIsGeneratingAi(true);
    setAiGeneratedSuccess(false);
    setAiErrorMessage(null);

    try {
      const res = await fetch('/api/ai/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam: aiExamType,
          examType: aiExamType,
          subject: aiSubject,
          system: aiSystem,
          topic: customTopic,
          difficulty: 'Hard',
          count: 1,
        }),
      });

      const data = await res.json();
      const generatedQ = data.question || (Array.isArray(data.questions) ? data.questions[0] : null);

      if (generatedQ) {
        await importQuestions([generatedQ]);
        setAiGeneratedSuccess(true);
        setCustomTopic('');
        setTimeout(() => setAiGeneratedSuccess(false), 5000);
      } else if (data.error) {
        setAiErrorMessage(`AI service note: ${data.error}`);
      }
    } catch (e: any) {
      console.error('AI Generation error:', e);
      setAiErrorMessage('Network request error. Please try again.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Export JSON Database
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `MedPrepPro_QuestionBank_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Database className="w-4 h-4" /> High-Capacity Database Management
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">5,000+ Question Engine & Bulk Import</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Scale your local offline question bank up to 5,000–50,000+ questions using the high-speed procedural generator or upload your custom JSON / CSV files.
        </p>

        {/* Current IndexedDB Stats Bar */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-4 mt-2">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">IndexedDB Storage</span>
            <span className="text-xl font-extrabold text-emerald-400 font-mono">
              {questions.length.toLocaleString()} Questions Active
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="header-trim-5000-btn"
              onClick={() => handleTrimDatabase(5000)}
              disabled={isTrimming}
              className="px-3.5 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {isTrimming ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Layers className="w-3.5 h-3.5" />}
              Set Exactly 5,000 Qs
            </button>
            <button
              onClick={handleExportJSON}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Export JSON
            </button>
            <button
              onClick={async () => {
                if (confirm('Reset question bank to original default state?')) {
                  await resetDatabase();
                }
              }}
              className="px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Factory Reset
            </button>
          </div>
        </div>

        {/* High Question Count Banner (>5,000) */}
        {questions.length > 5000 && (
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="font-bold">Over Capacity ({questions.length.toLocaleString()} questions logged):</span>
                <span className="text-slate-300 block sm:inline sm:ml-1.5">
                  Would you like to trim the bank to exactly 5,000 questions? All your bookmarks and notes will be safely preserved.
                </span>
              </div>
            </div>
            <button
              id="banner-trim-5000-btn"
              onClick={() => handleTrimDatabase(5000)}
              disabled={isTrimming}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl shrink-0 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              {isTrimming ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
              Trim to 5,000 Questions Now
            </button>
          </div>
        )}

        {importStatus && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{importStatus}</span>
          </div>
        )}
      </div>

      {/* Grid: Trim/Capacity Adjuster, Expansion Generator & Custom Upload */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 0: Exact Capacity Adjuster / Trimmer */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-amber-800/40 rounded-3xl p-6 shadow-xl space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Layers className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Cap & Trim
              </span>
            </div>

            <h3 className="text-lg font-bold text-white">Set Exact Question Bank Size</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Instantly adjust or trim your IndexedDB question bank to an exact target number. Keeps all bookmarked items & study notes.
            </p>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-semibold text-slate-300">Target Database Capacity</label>
              <div className="grid grid-cols-3 gap-2">
                {[1000, 2500, 5000].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setTargetTrimCount(count)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                      targetTrimCount === count
                        ? 'bg-amber-600 text-white border-amber-500 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {count.toLocaleString()} Qs
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            id="trim-exact-count-btn"
            onClick={() => handleTrimDatabase(targetTrimCount)}
            disabled={isTrimming}
            className="w-full py-3.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-slate-950 font-extrabold rounded-2xl flex items-center justify-center gap-2 text-sm transition-all shadow-lg shadow-amber-600/30 hover:scale-102 cursor-pointer"
          >
            {isTrimming ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Setting to {targetTrimCount.toLocaleString()}...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Set Exactly {targetTrimCount.toLocaleString()} Questions
              </>
            )}
          </button>
        </div>
        {/* Card 1: 1-Click 5,000+ Question Synthesizer */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-800/30 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Zap className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                High Speed Engine
              </span>
            </div>

            <h3 className="text-lg font-bold text-white">Instant 5,000+ Question Pack Expansion</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Auto-generate 5,000 authentic clinical vignettes spanning Cardiology, Pulmonology, Neurology, Nephrology, OB/GYN, Pediatrics, and AMC Australian ethics into IndexedDB.
            </p>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-semibold text-slate-300">Select Batch Size</label>
              <div className="grid grid-cols-3 gap-2">
                {[1000, 2500, 5000].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setImportCount(count)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                      importCount === count
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    +{count.toLocaleString()} Qs
                  </button>
                ))}
              </div>
            </div>

            {isExpanding && (
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs text-emerald-400 font-mono">
                  <span>Synthesizing & indexing questions...</span>
                  <span>{expandProgress}%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${expandProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <button
            id="expand-5000-questions-btn"
            onClick={handleBulkExpand}
            disabled={isExpanding}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-sm transition-all shadow-lg shadow-emerald-600/30 hover:scale-102 cursor-pointer"
          >
            {isExpanding ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Generating {importCount.toLocaleString()} Questions...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate & Save +{importCount.toLocaleString()} Questions
              </>
            )}
          </button>
        </div>

        {/* Card 2: Custom JSON / CSV Upload */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                <Upload className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                JSON / CSV
              </span>
            </div>

            <h3 className="text-lg font-bold text-white">Import External Question Files</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload your existing medical school decks, custom NBME question banks, or exported CSV spreadsheets.
            </p>

            {/* Upload Dropzone */}
            <label className="border-2 border-dashed border-slate-700 hover:border-blue-500 bg-slate-950/60 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors group text-center">
              <Upload className="w-8 h-8 text-slate-500 group-hover:text-blue-400 transition-colors mb-2" />
              <span className="text-xs font-bold text-slate-200">Click to browse or drop file here</span>
              <span className="text-[11px] text-slate-500 mt-0.5">Supports .JSON and .CSV question formats</span>
              <input
                type="file"
                accept=".json,.csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl text-[11px] text-slate-400 border border-slate-800">
            💡 Imported questions are saved directly to your device's high-performance IndexedDB and remain accessible 100% offline.
          </div>
        </div>
      </div>

      {/* Card 3: AI Clinical Case Synthesizer (Gemini Flash) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
          <Bot className="w-4 h-4" /> AI-Powered Clinical Scenario Generator
        </div>
        <h3 className="text-lg font-bold text-white">Generate Custom Question for Any Medical Sub-Topic</h3>
        <p className="text-xs text-slate-400">
          Want practice on a very specific clinical presentation? Use the Gemini 2.5 Flash server-side integration to craft authentic exam-quality vignettes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Target Examination</label>
            <select
              value={aiExamType}
              onChange={(e) => setAiExamType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100"
            >
              <option value="USMLE Step 1">USMLE Step 1</option>
              <option value="USMLE Step 2 CK">USMLE Step 2 CK</option>
              <option value="AMC CAT MCQ">AMC CAT MCQ</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Discipline / Subject</label>
            <select
              value={aiSubject}
              onChange={(e) => setAiSubject(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100"
            >
              <option value="Internal Medicine">Internal Medicine</option>
              <option value="Pathology">Pathology</option>
              <option value="Pharmacology">Pharmacology</option>
              <option value="Physiology">Physiology</option>
              <option value="Biochemistry">Biochemistry</option>
              <option value="Microbiology">Microbiology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Obstetrics & Gynecology">Obstetrics & Gynecology</option>
              <option value="Surgery">Surgery</option>
              <option value="Psychiatry">Psychiatry</option>
              <option value="Emergency Medicine">Emergency Medicine</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Organ System</label>
            <select
              value={aiSystem}
              onChange={(e) => setAiSystem(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100"
            >
              <option value="Cardiovascular System">Cardiovascular System</option>
              <option value="Respiratory System">Respiratory System</option>
              <option value="Gastrointestinal & Hepatic">Gastrointestinal & Hepatic</option>
              <option value="Renal & Urinary System">Renal & Urinary System</option>
              <option value="Nervous System & Special Senses">Nervous System & Special Senses</option>
              <option value="Endocrine & Metabolic">Endocrine & Metabolic</option>
              <option value="Musculoskeletal & Dermatology">Musculoskeletal & Dermatology</option>
              <option value="Hematology & Oncology">Hematology & Oncology</option>
              <option value="Immune & Infectious Diseases">Immune & Infectious Diseases</option>
              <option value="Reproductive & Genitourinary">Reproductive & Genitourinary</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <label className="text-xs font-semibold text-slate-300 block mb-1">Clinical Topic / Disease Entity</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="e.g., Pheochromocytoma localization, Kawasaki disease management, Melioidosis in Australia"
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-purple-500"
              />
              <button
                onClick={handleAiGenerate}
                disabled={!customTopic.trim() || isGeneratingAi}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-md shrink-0 cursor-pointer"
              >
                {isGeneratingAi ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                Generate Q
              </button>
            </div>
          </div>
        </div>

        {aiErrorMessage && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{aiErrorMessage}</span>
          </div>
        )}

        {aiGeneratedSuccess && (
          <div className="p-3 bg-purple-500/10 border border-purple-500/30 text-purple-300 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span>AI question successfully generated and indexed in your Question Bank!</span>
          </div>
        )}
      </div>
    </div>
  );
};
