import React, { useState, useMemo } from 'react';
import { useExam } from '../context/ExamContext';
import { ClinicalCase, DifficultyLevel } from '../types';
import {
  FileCheck2,
  Activity,
  Heart,
  User,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Clock,
  Award,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Stethoscope,
  BookOpen,
  Check,
  Brain,
  ShieldAlert,
  Sliders,
  Play,
  Layers,
  X,
  Target,
  BarChart3,
  CheckSquare,
  Square
} from 'lucide-react';

interface CaseSessionResult {
  caseId: string;
  title: string;
  specialty: string;
  difficulty: string;
  totalSteps: number;
  correctSteps: number;
  score: number;
  finalDiagnosis?: string;
}

export const ClinicalCasesView: React.FC = () => {
  const { clinicalCases, completeCase } = useExam();

  // Multi-case session state
  const [sessionCases, setSessionCases] = useState<ClinicalCase[]>([]);
  const [currentSessionIndex, setCurrentSessionIndex] = useState<number>(0);
  const [sessionResults, setSessionResults] = useState<CaseSessionResult[]>([]);
  const [isSessionFinished, setIsSessionFinished] = useState<boolean>(false);

  // Active Single Case State (derived from currentSessionIndex or standalone)
  const [activeCase, setActiveCase] = useState<ClinicalCase | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [stepScores, setStepScores] = useState<Record<number, boolean>>({});
  const [isCompletedSummaryOpen, setIsCompletedSummaryOpen] = useState<boolean>(false);

  // Configuration Modal State
  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false);
  const [configCaseCount, setConfigCaseCount] = useState<number>(5);
  const [configSpecialty, setConfigSpecialty] = useState<string>('All');
  const [configDifficulty, setConfigDifficulty] = useState<string>('All');
  const [configStatus, setConfigStatus] = useState<'All' | 'Unattempted' | 'Completed'>('All');
  const [configShuffle, setConfigShuffle] = useState<boolean>(true);

  // Checkbox Selection for Manual Batching
  const [selectedCaseIds, setSelectedCaseIds] = useState<string[]>([]);

  // Catalog Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Unattempted' | 'Completed'>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  // Filter clinical cases for catalog
  const filteredCases = useMemo(() => {
    return clinicalCases.filter((c) => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = c.title.toLowerCase().includes(q);
        const matchComplaint = c.chiefComplaint.toLowerCase().includes(q);
        const matchSpecialty = c.specialty.toLowerCase().includes(q);
        const matchDiagnosis = c.finalDiagnosis?.toLowerCase().includes(q);
        const matchId = c.id.toLowerCase().includes(q);
        if (!matchTitle && !matchComplaint && !matchSpecialty && !matchDiagnosis && !matchId) {
          return false;
        }
      }

      // Specialty filter
      if (selectedSpecialty !== 'All') {
        const s = selectedSpecialty.toLowerCase();
        if (!c.specialty.toLowerCase().includes(s) && !c.system.toLowerCase().includes(s)) {
          return false;
        }
      }

      // Difficulty filter
      if (selectedDifficulty !== 'All') {
        if (c.difficulty !== selectedDifficulty) {
          return false;
        }
      }

      // Status filter
      if (selectedStatus === 'Unattempted' && c.isCompleted) return false;
      if (selectedStatus === 'Completed' && !c.isCompleted) return false;

      return true;
    });
  }, [clinicalCases, searchQuery, selectedSpecialty, selectedDifficulty, selectedStatus]);

  // Filtered cases for modal configuration
  const modalEligibleCases = useMemo(() => {
    return clinicalCases.filter((c) => {
      if (configSpecialty !== 'All') {
        const s = configSpecialty.toLowerCase();
        if (!c.specialty.toLowerCase().includes(s) && !c.system.toLowerCase().includes(s)) {
          return false;
        }
      }
      if (configDifficulty !== 'All' && c.difficulty !== configDifficulty) {
        return false;
      }
      if (configStatus === 'Unattempted' && c.isCompleted) return false;
      if (configStatus === 'Completed' && !c.isCompleted) return false;
      return true;
    });
  }, [clinicalCases, configSpecialty, configDifficulty, configStatus]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredCases.length / itemsPerPage));
  const paginatedCases = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCases.slice(start, start + itemsPerPage);
  }, [filteredCases, currentPage, itemsPerPage]);

  // Start single case
  const handleStartCase = (c: ClinicalCase) => {
    setSessionCases([c]);
    setCurrentSessionIndex(0);
    setSessionResults([]);
    setIsSessionFinished(false);
    loadCase(c);
  };

  // Helper to load a case into active workspace
  const loadCase = (c: ClinicalCase) => {
    setActiveCase(c);
    setCurrentStepIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setStepScores({});
    setIsCompletedSummaryOpen(false);
  };

  // Launch multi-case session from config modal
  const handleLaunchSession = () => {
    if (modalEligibleCases.length === 0) return;

    let pool = [...modalEligibleCases];
    if (configShuffle) {
      pool.sort(() => Math.random() - 0.5);
    }
    const count = Math.min(configCaseCount, pool.length);
    const selected = pool.slice(0, count);

    setSessionCases(selected);
    setCurrentSessionIndex(0);
    setSessionResults([]);
    setIsSessionFinished(false);
    setIsConfigModalOpen(false);
    loadCase(selected[0]);
  };

  // Launch session from selected checkboxes
  const handleLaunchSelectedCases = () => {
    if (selectedCaseIds.length === 0) return;
    const selected = clinicalCases.filter((c) => selectedCaseIds.includes(c.id));
    if (selected.length === 0) return;

    setSessionCases(selected);
    setCurrentSessionIndex(0);
    setSessionResults([]);
    setIsSessionFinished(false);
    loadCase(selected[0]);
  };

  // Quick preset launch
  const handleQuickCountLaunch = (count: number) => {
    setConfigCaseCount(count);
    setIsConfigModalOpen(true);
  };

  const handleStartRandomCase = () => {
    if (clinicalCases.length === 0) return;
    const randomIndex = Math.floor(Math.random() * clinicalCases.length);
    handleStartCase(clinicalCases[randomIndex]);
  };

  const handleSelectOption = (optId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optId);
  };

  const handleSubmitStep = () => {
    if (!selectedOptionId || !activeCase) return;
    const currentStep = activeCase.steps[currentStepIndex];
    const isCorrect = selectedOptionId === currentStep.correctOptionId;

    setStepScores((prev) => ({
      ...prev,
      [currentStepIndex]: isCorrect
    }));
    setIsAnswerSubmitted(true);
  };

  const handleNextStep = async () => {
    if (!activeCase) return;

    if (currentStepIndex < activeCase.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
    } else {
      // Completed all steps for active case
      const totalSteps = activeCase.steps.length;
      const correctCount = Object.values(stepScores).filter(Boolean).length;
      const finalScore = Math.round((correctCount / totalSteps) * 100);
      await completeCase(activeCase.id, finalScore);

      // Record result in session
      const resultEntry: CaseSessionResult = {
        caseId: activeCase.id,
        title: activeCase.title,
        specialty: activeCase.specialty,
        difficulty: activeCase.difficulty,
        totalSteps,
        correctSteps: correctCount,
        score: finalScore,
        finalDiagnosis: activeCase.finalDiagnosis
      };

      setSessionResults((prev) => {
        const filtered = prev.filter((r) => r.caseId !== activeCase.id);
        return [...filtered, resultEntry];
      });

      setIsCompletedSummaryOpen(true);
    }
  };

  const handleProceedToNextCaseInSession = () => {
    if (currentSessionIndex < sessionCases.length - 1) {
      const nextIdx = currentSessionIndex + 1;
      setCurrentSessionIndex(nextIdx);
      loadCase(sessionCases[nextIdx]);
    } else {
      setIsSessionFinished(true);
    }
  };

  const handleToggleSelectCase = (caseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCaseIds((prev) =>
      prev.includes(caseId) ? prev.filter((id) => id !== caseId) : [...prev, caseId]
    );
  };

  const handleSelectAllOnPage = () => {
    const pageIds = paginatedCases.map((c) => c.id);
    const allSelected = pageIds.every((id) => selectedCaseIds.includes(id));
    if (allSelected) {
      setSelectedCaseIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedCaseIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  // Specialty category list
  const specialties = [
    'All',
    'Cardiology',
    'Respiratory',
    'Surgery',
    'Neurology',
    'Paediatrics',
    "Women's Health",
    'Psychiatry',
    'Endocrine',
    'Infectious',
    'Emergency'
  ];

  // Stats
  const completedCount = clinicalCases.filter((c) => c.isCompleted).length;
  const avgScore = completedCount > 0
    ? Math.round(
        clinicalCases
          .filter((c) => c.isCompleted)
          .reduce((acc, curr) => acc + (curr.score || 0), 0) / completedCount
      )
    : 0;

  // Session aggregate stats
  const aggregateSessionScore = useMemo(() => {
    if (sessionResults.length === 0) return 0;
    const total = sessionResults.reduce((acc, r) => acc + r.score, 0);
    return Math.round(total / sessionResults.length);
  }, [sessionResults]);

  const totalDecisionStepsSolved = useMemo(() => {
    return sessionResults.reduce(
      (acc, r) => ({
        correct: acc.correct + r.correctSteps,
        total: acc.total + r.totalSteps
      }),
      { correct: 0, total: 0 }
    );
  }, [sessionResults]);

  return (
    <div className="space-y-6 pb-24 animate-fadeIn">
      {/* Header & Stats Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0b1329] border border-amber-500/20 shadow-xl">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Med 360 Case Bank • 500+ Verified Scenarios</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
            <FileCheck2 className="w-7 h-7 text-amber-400" />
            Clinical Case Studies
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Multi-stage diagnostic decision pathways, investigations, and emergency management protocols. Choose the exact number of cases you wish to solve in your study session.
          </p>
        </div>

        {/* Quick Batching & Start Session CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-3.5 py-2 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-[11px] text-slate-400 font-semibold">Total Cases</div>
            <div className="text-lg font-black text-amber-400">{clinicalCases.length}</div>
          </div>
          <div className="px-3.5 py-2 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-[11px] text-slate-400 font-semibold">Completed</div>
            <div className="text-lg font-black text-emerald-400">{completedCount}</div>
          </div>
          {completedCount > 0 && (
            <div className="px-3.5 py-2 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-[11px] text-slate-400 font-semibold">Avg Score</div>
              <div className="text-lg font-black text-cyan-400">{avgScore}%</div>
            </div>
          )}

          {/* Start Custom Case Session Button */}
          <button
            id="btn-choose-cases-count"
            onClick={() => setIsConfigModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-950/60 transition-all active:scale-95"
          >
            <Sliders className="w-4 h-4" />
            <span>Choose Cases to Solve</span>
          </button>
        </div>
      </div>

      {/* Quick Preset Count Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#081022] border border-slate-800/80 text-xs">
        <div className="flex items-center gap-2 text-slate-300 font-semibold">
          <Target className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Quick Launch by Number of Cases:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {[1, 3, 5, 10, 20, 30].map((num) => (
            <button
              key={num}
              onClick={() => {
                setConfigCaseCount(num);
                setIsConfigModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-amber-500/20 text-slate-200 hover:text-amber-300 border border-slate-800 hover:border-amber-500/40 font-bold transition-all"
            >
              {num} {num === 1 ? 'Case' : 'Cases'}
            </button>
          ))}
          <button
            onClick={() => {
              setConfigCaseCount(50);
              setIsConfigModalOpen(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-black border border-amber-500/30 font-bold transition-all"
          >
            Custom / All
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SESSION AGGREGATE SCORECARD (When all cases in the batch are finished) */}
      {/* ========================================================================= */}
      {isSessionFinished ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#091124] border border-emerald-500/50 shadow-2xl space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Session Completed Successfully
                </span>
                <h2 className="text-2xl font-black text-white">
                  Case Studies Session Scorecard
                </h2>
                <p className="text-xs text-slate-400">
                  Solved {sessionCases.length} case {sessionCases.length === 1 ? 'study' : 'studies'} across multiple clinical specialties
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block font-semibold">Average Accuracy</span>
                <span className="text-3xl font-black text-emerald-400">{aggregateSessionScore}%</span>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div>
                <span className="text-[11px] text-slate-400 block font-semibold">Decision Steps</span>
                <span className="text-lg font-bold text-cyan-300">
                  {totalDecisionStepsSolved.correct} / {totalDecisionStepsSolved.total}
                </span>
              </div>
            </div>
          </div>

          {/* Cases Breakdown Table */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>Solved Cases Breakdown ({sessionResults.length} Cases)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sessionResults.map((res, idx) => (
                <div
                  key={res.caseId}
                  className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-black flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold">
                          {res.specialty.split('•')[0]}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {res.difficulty}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white mt-1 line-clamp-1">
                        {res.title}
                      </h4>
                      {res.finalDiagnosis && (
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          <strong className="text-slate-300">Diagnosis:</strong> {res.finalDiagnosis}
                        </p>
                      )}
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`px-2.5 py-1 rounded-xl text-xs font-black border ${
                          res.score >= 70
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                            : 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                        }`}
                      >
                        {res.score}%
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-1">
                        {res.correctSteps}/{res.totalSteps} steps
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                setIsSessionFinished(false);
                setActiveCase(null);
                setSessionCases([]);
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
            >
              Return to Case Studies Bank
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setIsSessionFinished(false);
                  setIsConfigModalOpen(true);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-950/40 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Start New Case Session</span>
              </button>
            </div>
          </div>
        </div>
      ) : activeCase ? (
        /* ========================================================================= */
        /* ACTIVE CASE SIMULATION VIEW */
        /* ========================================================================= */
        <div className="p-6 sm:p-8 rounded-3xl bg-[#091124] border border-amber-500/40 shadow-2xl space-y-6 animate-fadeIn">
          {/* Top Session Progress Bar (When solving multi-case session) */}
          {sessionCases.length > 1 && (
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-amber-400" />
                  Case Session: Case {currentSessionIndex + 1} of {sessionCases.length}
                </span>
                <span className="text-slate-400 text-[11px]">
                  {Math.round(((currentSessionIndex) / sessionCases.length) * 100)}% of session finished
                </span>
              </div>
              {/* Visual Case Indicators */}
              <div className="flex items-center gap-1.5">
                {sessionCases.map((sc, sIdx) => {
                  const isCurrent = sIdx === currentSessionIndex;
                  const res = sessionResults.find((r) => r.caseId === sc.id);
                  return (
                    <div
                      key={sc.id}
                      className={`h-2 flex-1 rounded-full transition-all ${
                        isCurrent
                          ? 'bg-amber-400 ring-2 ring-amber-400/40'
                          : res
                          ? res.score >= 70
                            ? 'bg-emerald-500'
                            : 'bg-rose-500'
                          : 'bg-slate-800'
                      }`}
                      title={`Case ${sIdx + 1}: ${sc.title} ${res ? `(${res.score}%)` : ''}`}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Top Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-amber-950/50 border border-amber-500/30 text-amber-400 text-[11px] font-bold">
                  {activeCase.specialty}
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300 text-[11px] font-semibold">
                  {activeCase.difficulty}
                </span>
                {sessionCases.length > 1 && (
                  <span className="px-2 py-0.5 rounded-lg bg-cyan-950/50 text-cyan-300 border border-cyan-500/30 text-[11px] font-bold">
                    Case {currentSessionIndex + 1} / {sessionCases.length}
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {activeCase.title}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300">
                Decision Step {currentStepIndex + 1} of {activeCase.steps.length}
              </div>
              <button
                onClick={() => {
                  setActiveCase(null);
                  setSessionCases([]);
                  setIsSessionFinished(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
              >
                Exit Session
              </button>
            </div>
          </div>

          {/* Patient Overview Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-bold text-amber-400 border-b border-slate-800/60 pb-2">
                <User className="w-4 h-4" />
                <span>Patient Demographics & Clinical Presentation</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Age / Gender:</span>
                  <strong className="text-slate-200">{activeCase.patientAge}yo {activeCase.patientGender}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">System:</span>
                  <strong className="text-slate-200">{activeCase.system}</strong>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500 block">Chief Complaint:</span>
                  <strong className="text-amber-300">{activeCase.chiefComplaint}</strong>
                </div>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/50">
                <p>{activeCase.hpi}</p>
              </div>

              {/* Past History & Meds */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/30 border border-slate-800/40 space-y-1">
                  <span className="text-slate-400 font-bold block">Past Medical History:</span>
                  <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                    {activeCase.pmh.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/30 border border-slate-800/40 space-y-1">
                  <span className="text-slate-400 font-bold block">Current Medications & Allergies:</span>
                  <div className="text-slate-300">
                    <div><strong>Meds:</strong> {activeCase.medications.join(', ') || 'None reported'}</div>
                    <div><strong>Allergies:</strong> {activeCase.allergies.join(', ') || 'NKDA'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vitals & Physical Exam */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 border-b border-slate-800/60 pb-2">
                <Activity className="w-4 h-4" />
                <span>Baseline Vital Signs</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/60 text-center">
                  <span className="text-slate-500 block text-[10px]">Blood Pressure</span>
                  <strong className="text-slate-200 text-xs">{activeCase.initialVitals.bp}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/60 text-center">
                  <span className="text-slate-500 block text-[10px]">Heart Rate</span>
                  <strong className="text-slate-200 text-xs">{activeCase.initialVitals.hr}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/60 text-center">
                  <span className="text-slate-500 block text-[10px]">Resp Rate</span>
                  <strong className="text-slate-200 text-xs">{activeCase.initialVitals.rr}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/60 text-center">
                  <span className="text-slate-500 block text-[10px]">Temperature</span>
                  <strong className="text-slate-200 text-xs">{activeCase.initialVitals.temp}</strong>
                </div>
                <div className="col-span-2 p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/60 text-center">
                  <span className="text-slate-500 block text-[10px]">Oxygen Saturation</span>
                  <strong className="text-cyan-300 text-xs">{activeCase.initialVitals.spo2}</strong>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <span className="text-slate-400 font-bold block">Physical Examination Findings:</span>
                <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar text-[11px] text-slate-300">
                  {Object.entries(activeCase.physicalExam).map(([system, finding]) => (
                    <div key={system} className="p-1.5 rounded-lg bg-slate-950/30 border border-slate-800/30">
                      <strong className="text-amber-400">{system}:</strong> {finding}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Steps Section */}
          {!isCompletedSummaryOpen ? (
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Diagnostic & Management Step {currentStepIndex + 1} of {activeCase.steps.length}
                </span>
                <h3 className="text-base font-bold text-white">
                  {activeCase.steps[currentStepIndex]?.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                  {activeCase.steps[currentStepIndex]?.prompt}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {activeCase.steps[currentStepIndex]?.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  let optionStyle = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700';

                  if (isAnswerSubmitted) {
                    if (opt.isCorrect) {
                      optionStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/30';
                    } else if (isSelected && !opt.isCorrect) {
                      optionStyle = 'bg-rose-950/50 border-rose-500 text-rose-200 ring-1 ring-rose-500/30';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-amber-500/10 border-amber-500 text-amber-200';
                  }

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2.5 ${optionStyle}`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                            isAnswerSubmitted && opt.isCorrect
                              ? 'bg-emerald-500 text-white'
                              : isAnswerSubmitted && isSelected && !opt.isCorrect
                              ? 'bg-rose-500 text-white'
                              : isSelected
                              ? 'bg-amber-500 text-black'
                              : 'bg-slate-900 border border-slate-700 text-slate-300'
                          }`}
                        >
                          {opt.id}
                        </div>
                        <span className="text-xs sm:text-sm leading-relaxed flex-1 font-medium">
                          {opt.text}
                        </span>
                        {isAnswerSubmitted && opt.isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        )}
                        {isAnswerSubmitted && isSelected && !opt.isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        )}
                      </div>

                      {/* Feedback & Findings on submission */}
                      {isAnswerSubmitted && (isSelected || opt.isCorrect) && (
                        <div className="mt-2 pt-2 border-t border-slate-800/80 text-xs space-y-1.5">
                          <p className="leading-relaxed">
                            <strong className="text-slate-200">
                              {opt.isCorrect ? '✓ Gold Standard Rationale: ' : '✗ Distractor Analysis: '}
                            </strong>
                            {opt.rationale}
                          </p>
                          {opt.finding && opt.isCorrect && (
                            <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
                              <strong>Imaging / Lab Finding:</strong> {opt.finding}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end pt-3">
                {!isAnswerSubmitted ? (
                  <button
                    disabled={!selectedOptionId}
                    onClick={handleSubmitStep}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-30 text-slate-950 font-bold text-xs shadow-md shadow-amber-950/50 flex items-center gap-2 transition-all"
                  >
                    <span>Confirm Clinical Decision</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleNextStep}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-bold text-xs shadow-md shadow-cyan-950/50 flex items-center gap-2 transition-all"
                  >
                    <span>
                      {currentStepIndex < activeCase.steps.length - 1
                        ? 'Next Decision Step'
                        : 'View Full Case Summary'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Completed Summary View for active case */
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-emerald-500/40 space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">Case Study Completed!</h3>
                    <p className="text-xs text-slate-400">
                      Comprehensive Clinical Debrief & Therapeutic Gold Standards
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Accuracy Score</div>
                  <div className="text-2xl font-black text-emerald-400">
                    {Math.round(
                      (Object.values(stepScores).filter(Boolean).length / activeCase.steps.length) * 100
                    )}
                    %
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold text-amber-400 block">Final Diagnosis:</span>
                  <p className="text-slate-200 font-semibold">{activeCase.finalDiagnosis}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold text-cyan-400 block">
                    Management & Disposition Summary:
                  </span>
                  <p className="text-slate-300 leading-relaxed">{activeCase.managementSummary}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 block">
                    Key High-Yield Learning Pearls:
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 leading-relaxed">
                    {activeCase.keyLearningPoints.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons: Next Case vs Finish Session */}
              <div className="flex flex-wrap justify-between items-center gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => loadCase(activeCase)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-2 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retry This Case</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setActiveCase(null);
                      setSessionCases([]);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all"
                  >
                    Back to Case Bank
                  </button>

                  {sessionCases.length > 1 && currentSessionIndex < sessionCases.length - 1 ? (
                    <button
                      onClick={handleProceedToNextCaseInSession}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-950/50 transition-all"
                    >
                      <span>Proceed to Next Case ({currentSessionIndex + 2} of {sessionCases.length})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : sessionCases.length > 1 ? (
                    <button
                      onClick={() => setIsSessionFinished(true)}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all"
                    >
                      <Award className="w-4 h-4" />
                      <span>Finish Session & View Scorecard</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleStartRandomCase}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-950/40 transition-all"
                    >
                      <span>Next Random Case</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ========================================================================= */
        /* CASES BANK CATALOG & FILTER VIEW */
        /* ========================================================================= */
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="p-5 rounded-2xl bg-[#091124] border border-slate-800/80 space-y-4">
            {/* Search Input */}
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search 500+ cases by condition, symptom, presentation, specialty, or case ID..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500/60 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setCurrentPage(1);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Status & Difficulty Dropdowns */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <select
                  value={selectedDifficulty}
                  onChange={(e) => {
                    setSelectedDifficulty(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-amber-500/60"
                >
                  <option value="All">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                  <option value="Expert">Expert</option>
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value as any);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-amber-500/60"
                >
                  <option value="All">All Status</option>
                  <option value="Unattempted">Unattempted</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Specialty Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
              {specialties.map((spec) => {
                const isActive = selectedSpecialty === spec;
                return (
                  <button
                    key={spec}
                    onClick={() => {
                      setSelectedSpecialty(spec);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-amber-500 text-black shadow-md shadow-amber-950/40 font-bold'
                        : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {spec}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Summary & Multi-Select Bar */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 px-1 gap-2">
            <div className="flex items-center gap-3">
              <span>
                Showing <strong className="text-slate-200">{filteredCases.length}</strong> cases matching your filters (Page {currentPage} of {totalPages})
              </span>
              <button
                onClick={handleSelectAllOnPage}
                className="text-[11px] text-amber-400 hover:underline font-semibold flex items-center gap-1"
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Select / Deselect Page</span>
              </button>
            </div>

            {filteredCases.length > 0 && (
              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-2 text-xs font-bold text-slate-300">{currentPage}</span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-30"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Floating Action Bar when Cases are manually checked */}
          {selectedCaseIds.length > 0 && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-6 py-3.5 rounded-2xl bg-slate-900/95 border border-amber-500/60 shadow-2xl shadow-black/80 flex items-center gap-4 backdrop-blur-md animate-fadeIn">
              <div className="text-xs">
                <span className="text-slate-400">Selected: </span>
                <strong className="text-amber-400 font-black">{selectedCaseIds.length} Cases</strong>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedCaseIds([])}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Clear Selection
                </button>
                <button
                  onClick={handleLaunchSelectedCases}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-amber-950/40"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Solve {selectedCaseIds.length} Selected</span>
                </button>
              </div>
            </div>
          )}

          {/* Cases Grid */}
          {paginatedCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedCases.map((c) => {
                const isSelected = selectedCaseIds.includes(c.id);
                return (
                  <div
                    key={c.id}
                    className={`p-5 rounded-2xl bg-[#0b1326] border transition-all flex flex-col justify-between space-y-4 group cursor-pointer ${
                      isSelected
                        ? 'border-amber-500 ring-1 ring-amber-500/30 bg-[#0e172e]'
                        : 'border-slate-800 hover:border-amber-500/40'
                    }`}
                    onClick={() => handleStartCase(c)}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 truncate">
                          {/* Checkbox for custom selection */}
                          <button
                            type="button"
                            onClick={(e) => handleToggleSelectCase(c.id, e)}
                            className="text-slate-400 hover:text-amber-400 transition-colors"
                            title="Select case for batch session"
                          >
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-amber-400" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                            )}
                          </button>
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold truncate max-w-[140px]">
                            {c.specialty.split('•')[0]}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-semibold shrink-0">
                          {c.steps.length} Steps • {c.difficulty}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                        {c.title}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {c.chiefComplaint}
                      </p>

                      {c.isCompleted && (
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded-lg border border-emerald-500/30">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Completed ({c.score}%)
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">
                        {c.patientAge}yo {c.patientGender} • {c.system}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartCase(c);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-950/40 transition-all active:scale-95"
                      >
                        <span>Solve Case</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-[#0b1326] border border-slate-800/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">No Clinical Cases Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No clinical cases matched your search query "{searchQuery}" and selected filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSpecialty('All');
                  setSelectedDifficulty('All');
                  setSelectedStatus('All');
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Bottom Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage(1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs disabled:opacity-30"
              >
                First
              </button>
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 text-xs flex items-center gap-1 disabled:opacity-30"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
              <span className="px-4 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 text-xs flex items-center gap-1 disabled:opacity-30"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage(totalPages);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs disabled:opacity-30"
              >
                Last
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* CASE STUDIES NUMBER & CONFIGURATION MODAL */}
      {/* ========================================================================= */}
      {isConfigModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div
            className="w-full max-w-xl p-6 sm:p-7 rounded-3xl bg-[#091124] border border-amber-500/40 shadow-2xl space-y-6 animate-scaleIn max-h-[90vh] overflow-y-auto custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Configure Case Study Session</h3>
                  <p className="text-xs text-slate-400">
                    Select number of case studies to solve & customize scope
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsConfigModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step 1: Number of Case Studies */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  1. Number of Case Studies to Solve
                </label>
                <span className="px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black">
                  {configCaseCount} {configCaseCount === 1 ? 'Case' : 'Cases'} (~{configCaseCount * 3} Decision Steps)
                </span>
              </div>

              {/* Quick Presets */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[1, 3, 5, 10, 20, 30].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setConfigCaseCount(num)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      configCaseCount === num
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-950/40 font-black'
                        : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              {/* Slider for precision */}
              <div className="space-y-1 pt-1">
                <input
                  type="range"
                  min="1"
                  max={Math.min(50, Math.max(5, modalEligibleCases.length))}
                  value={configCaseCount}
                  onChange={(e) => setConfigCaseCount(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>1 Case (Quick Drill)</span>
                  <span>10 Cases (Exam Block)</span>
                  <span>{Math.min(50, Math.max(5, modalEligibleCases.length))} Cases (Full Session)</span>
                </div>
              </div>
            </div>

            {/* Step 2: Specialty / Organ System Scope */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                2. Specialty / Organ System Filter
              </label>
              <select
                value={configSpecialty}
                onChange={(e) => setConfigSpecialty(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500/60"
              >
                <option value="All">All Specialties (Comprehensive 500+ Cases)</option>
                <option value="Cardiology">Cardiology & Hemodynamics</option>
                <option value="Respiratory">Respiratory Medicine</option>
                <option value="Surgery">General Surgery & Trauma</option>
                <option value="Neurology">Neurology & Stroke</option>
                <option value="Paediatrics">Paediatrics & Neonatology</option>
                <option value="Women's Health">Women's Health (O&G)</option>
                <option value="Psychiatry">Psychiatry & Behavioral Health</option>
                <option value="Endocrine">Endocrinology & Metabolism</option>
                <option value="Infectious">Infectious Diseases</option>
                <option value="Emergency">Acute & Emergency Resuscitation</option>
              </select>
            </div>

            {/* Step 3: Difficulty & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  3. Difficulty Level
                </label>
                <select
                  value={configDifficulty}
                  onChange={(e) => setConfigDifficulty(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500/60"
                >
                  <option value="All">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  4. Attempt Status
                </label>
                <select
                  value={configStatus}
                  onChange={(e) => setConfigStatus(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500/60"
                >
                  <option value="All">All Cases</option>
                  <option value="Unattempted">Unattempted Only (Fresh Cases)</option>
                  <option value="Completed">Completed Only (Revision)</option>
                </select>
              </div>
            </div>

            {/* Shuffle & Info */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <Shuffle className="w-4 h-4 text-amber-400" />
                <span className="text-slate-300 font-medium">Randomize Case Order (Exam Simulation)</span>
              </div>
              <input
                type="checkbox"
                checked={configShuffle}
                onChange={(e) => setConfigShuffle(e.target.checked)}
                className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
              />
            </div>

            {/* Summary Banner */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
              <span className="text-amber-300 font-semibold">
                Matching available cases in bank:
              </span>
              <strong className="text-amber-400 font-black">
                {modalEligibleCases.length} Cases Available
              </strong>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsConfigModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLaunchSession}
                disabled={modalEligibleCases.length === 0}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 disabled:opacity-40 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-950/50 transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>
                  Start Session ({Math.min(configCaseCount, modalEligibleCases.length)} Cases)
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
