import React, { useState, useEffect } from 'react';
import { useExam } from '../context/ExamContext';
import { Question } from '../types';
import {
  Clock,
  Flag,
  Bookmark,
  FlaskConical,
  Calculator,
  Bot,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff,
  Strikethrough,
  Grid,
  Maximize2,
  FileText,
  Send,
  X,
  Layers,
  Award,
  RotateCcw,
  Lightbulb,
  Zap
} from 'lucide-react';
import { ExamScoreReport } from './ExamScoreReport';

export const PracticeMode: React.FC = () => {
  const {
    activeTest,
    submitTestAnswer,
    clearQuestionAnswer,
    toggleFlagQuestion,
    toggleCrossOption,
    navigateTestQuestion,
    finishTestSession,
    exitActiveTest,
    toggleBookmark,
    updateQuestionNote,
    setIsLabModalOpen,
    setIsCalcModalOpen,
    openAiTutorForQuestion,
    fontSize,
    startNewTest,
    setCurrentTab,
    testHistory
  } = useExam();

  const [timeRemaining, setTimeRemaining] = useState<number>(
    activeTest ? activeTest.timeRemainingSeconds : 0
  );
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [instantFeedback, setInstantFeedback] = useState<boolean>(true);
  const [isGridOpen, setIsGridOpen] = useState<boolean>(false);
  const [noteText, setNoteText] = useState<string>('');
  const [isEditingNote, setIsEditingNote] = useState<boolean>(false);

  // Sync timer when active test changes
  useEffect(() => {
    if (activeTest) {
      setTimeRemaining(activeTest.timeRemainingSeconds);
      setShowExplanation(false);
    }
  }, [activeTest?.id]);

  // Reset explanation visibility when question changes
  useEffect(() => {
    setShowExplanation(false);
  }, [activeTest?.currentQuestionIndex]);

  // Timer countdown
  useEffect(() => {
    if (!activeTest || activeTest.isCompleted || activeTest.isPaused) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishTestSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeTest, finishTestSession]);

  // If no test is active, show an intuitive Exam Launcher
  if (!activeTest) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-fadeIn">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c1836] via-[#091226] to-[#050914] border border-cyan-500/30 shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Interactive Examination Simulator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Start a Practice Exam Block
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Choose a timed test simulation or tutor mode with instant explanations, tailored for AMC CAT MCQ and USMLE Step 2 CK.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Quick 20Q Sprint */}
          <div className="p-6 rounded-2xl bg-[#0b1326] border border-cyan-500/30 hover:border-cyan-400/60 shadow-lg flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[11px] font-bold border border-cyan-500/20">
                  Daily Quick Drill
                </span>
                <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" /> 24 Mins
                </span>
              </div>
              <h3 className="text-base font-bold text-white">20-Question Rapid Sprint</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                High-yield multi-specialty question set to test your diagnostic reflexes and pacing.
              </p>
            </div>
            <button
              onClick={() =>
                startNewTest({
                  examType: 'AMC CAT MCQ',
                  mode: 'timed_exam',
                  title: 'Daily Rapid Sprint (20 Questions)',
                  subjects: [],
                  systems: [],
                  difficulties: [],
                  questionCount: 20,
                  timePerQuestionSec: 72,
                  statusFilter: 'all'
                })
              }
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-cyan-950/40"
            >
              <span>Launch 20Q Sprint</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 50Q Tutor Mode */}
          <div className="p-6 rounded-2xl bg-[#0b1326] border border-blue-500/30 hover:border-blue-400/60 shadow-lg flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[11px] font-bold border border-blue-500/20">
                  Instant Learning
                </span>
                <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                  <Bot className="w-3 h-3 text-blue-400" /> Tutor Mode
                </span>
              </div>
              <h3 className="text-base font-bold text-white">50Q High-Yield Study Block</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Solve questions with immediate step-by-step rationales, distractor breakdowns, and learning pearls.
              </p>
            </div>
            <button
              onClick={() =>
                startNewTest({
                  examType: 'AMC CAT MCQ',
                  mode: 'tutor',
                  title: '50Q AMC Clinical Tutor Block',
                  subjects: [],
                  systems: [],
                  difficulties: [],
                  questionCount: 50,
                  timePerQuestionSec: 72,
                  statusFilter: 'all'
                })
              }
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-950/40"
            >
              <span>Launch Tutor Block</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 150Q Official AMC CAT Mock */}
          <div className="p-6 rounded-2xl bg-[#0b1326] border border-purple-500/30 hover:border-purple-400/60 shadow-lg flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-[11px] font-bold border border-purple-500/20">
                  Official Standard
                </span>
                <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-purple-400" /> 3.5 Hours
                </span>
              </div>
              <h3 className="text-base font-bold text-white">150Q Full AMC CAT Mock</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Complete computer-adaptive test simulation with standard 250/350 scaled scoring and pass probability.
              </p>
            </div>
            <button
              onClick={() =>
                startNewTest({
                  examType: 'AMC CAT MCQ',
                  mode: 'timed_exam',
                  title: 'AMC CAT MCQ Full Mock Examination (150 Questions)',
                  subjects: [],
                  systems: [],
                  difficulties: [],
                  questionCount: 150,
                  timePerQuestionSec: 84,
                  statusFilter: 'all'
                })
              }
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-purple-950/40"
            >
              <span>Start Full Mock Exam</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Secondary options */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            onClick={() => setCurrentTab('bank')}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 flex items-center gap-2 transition-all"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Customize Questions in Question Bank</span>
          </button>
          <button
            onClick={() => setCurrentTab('mock')}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 flex items-center gap-2 transition-all"
          >
            <Award className="w-4 h-4 text-purple-400" />
            <span>Browse Full-Length Mocks Catalog</span>
          </button>
        </div>
      </div>
    );
  }

  // Show score report once test is finished
  if (activeTest.isCompleted) {
    return <ExamScoreReport session={activeTest} />;
  }

  const currentQIndex = activeTest.currentQuestionIndex || 0;
  const currentQ: Question = activeTest.questions[currentQIndex] || activeTest.questions[0];

  if (!currentQ) {
    return (
      <div className="max-w-md mx-auto p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
        <p className="text-sm text-slate-300">No questions available in this session.</p>
        <button
          onClick={exitActiveTest}
          className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const userAns = activeTest.userAnswers[currentQ.id];
  const isFlagged = activeTest.flaggedQuestionIds.includes(currentQ.id);
  const crossedOptions = activeTest.crossedOptions[currentQ.id] || [];

  // Format timer HH:MM:SS
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optionId: string) => {
    if (currentQ.isMultipleChoice) {
      const currentSelected = Array.isArray(userAns) ? [...userAns] : (userAns ? [userAns] : []);
      const updated = currentSelected.includes(optionId)
        ? currentSelected.filter((id) => id !== optionId)
        : [...currentSelected, optionId];
      submitTestAnswer(currentQ.id, updated);

      const isMultiChoiceCorrect =
        currentQ.correctOptionIds &&
        updated.length === currentQ.correctOptionIds.length &&
        updated.every((id) => currentQ.correctOptionIds?.includes(id));
      const hasAnyWrong = updated.some((id) => !currentQ.correctOptionIds?.includes(id));

      if (hasAnyWrong || isMultiChoiceCorrect || activeTest.mode === 'tutor' || instantFeedback) {
        setShowExplanation(true);
      }
    } else {
      submitTestAnswer(currentQ.id, optionId);
      const isCorrect = isOptionCorrect(optionId);
      // Immediately display explanation and high yield pearls on wrong answer or tutor/feedback mode
      if (!isCorrect || activeTest.mode === 'tutor' || instantFeedback) {
        setShowExplanation(true);
      }
    }
  };

  const handleRetryQuestion = () => {
    clearQuestionAnswer(currentQ.id);
    setShowExplanation(false);
  };

  const handleSaveNote = async () => {
    await updateQuestionNote(currentQ.id, noteText);
    setIsEditingNote(false);
  };

  // Font size multiplier
  const fontSizeClasses = {
    sm: 'text-xs leading-relaxed',
    base: 'text-sm sm:text-base leading-relaxed',
    lg: 'text-base sm:text-lg leading-relaxed',
    xl: 'text-lg sm:text-xl leading-relaxed'
  };

  const isOptionSelected = (optionId: string) => {
    if (Array.isArray(userAns)) {
      return userAns.includes(optionId);
    }
    return userAns === optionId;
  };

  const isOptionCorrect = (optionId: string) => {
    if (currentQ.isMultipleChoice && currentQ.correctOptionIds) {
      return currentQ.correctOptionIds.includes(optionId);
    }
    return currentQ.correctOptionId === optionId;
  };

  const isCurrentQuestionCorrect = () => {
    if (!userAns) return false;
    if (currentQ.isMultipleChoice && currentQ.correctOptionIds) {
      if (!Array.isArray(userAns)) return false;
      return (
        userAns.length === currentQ.correctOptionIds.length &&
        userAns.every((id) => currentQ.correctOptionIds?.includes(id))
      );
    }
    return userAns === currentQ.correctOptionId;
  };

  const isAnswerEvaluated = Boolean(userAns) && (showExplanation || activeTest.mode === 'tutor' || instantFeedback || activeTest.isCompleted);

  return (
    <div className="max-w-5xl mx-auto space-y-4 pb-16 animate-fadeIn">
      {/* Top Test Navigation Bar */}
      <div className="sticky top-14 z-30 bg-[#091124]/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 shadow-lg">
        {/* Question Counter & Exam Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsGridOpen(!isGridOpen)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700"
          >
            <Grid className="w-3.5 h-3.5 text-cyan-400" />
            <span>Q {currentQIndex + 1} / {activeTest.questions.length}</span>
          </button>

          <span className="hidden md:inline text-xs font-semibold text-slate-400 truncate max-w-xs">
            {activeTest.title}
          </span>
        </div>

        {/* Center Countdown Timer */}
        <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono text-xs sm:text-sm font-black border ${
          timeRemaining < 300
            ? 'bg-red-950/80 text-red-400 border-red-500/40 animate-pulse'
            : 'bg-slate-900 text-cyan-400 border-slate-800'
        }`}>
          <Clock className="w-3.5 h-3.5" />
          <span>{formatTime(timeRemaining)}</span>
        </div>

        {/* Clinical Tools & Actions */}
        <div className="flex items-center gap-1.5">
          {/* Instant Feedback Toggle */}
          <button
            onClick={() => setInstantFeedback(!instantFeedback)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              instantFeedback
                ? 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                : 'bg-slate-800/80 text-slate-400 hover:text-white border-slate-700'
            }`}
            title="Instant explanation & high-yield pearls when attempting wrong answer"
          >
            <Zap className={`w-3.5 h-3.5 ${instantFeedback ? 'text-amber-400 fill-amber-400' : ''}`} />
            <span className="hidden sm:inline">{instantFeedback ? 'Instant Feedback: ON' : 'Feedback: OFF'}</span>
          </button>

          {/* Flag Question */}
          <button
            onClick={() => toggleFlagQuestion(currentQ.id)}
            className={`p-2 rounded-xl text-xs font-bold border transition-all ${
              isFlagged
                ? 'bg-amber-950 text-amber-400 border-amber-500/50'
                : 'bg-slate-800/80 text-slate-400 hover:text-white border-slate-700'
            }`}
            title="Flag for Review"
          >
            <Flag className={`w-4 h-4 ${isFlagged ? 'fill-amber-400' : ''}`} />
          </button>

          {/* Bookmark Question */}
          <button
            onClick={() => toggleBookmark(currentQ.id)}
            className={`p-2 rounded-xl text-xs font-bold border transition-all ${
              currentQ.isBookmarked
                ? 'bg-indigo-950 text-indigo-400 border-indigo-500/50'
                : 'bg-slate-800/80 text-slate-400 hover:text-white border-slate-700'
            }`}
            title="Bookmark this Question"
          >
            <Bookmark className={`w-4 h-4 ${currentQ.isBookmarked ? 'fill-indigo-400' : ''}`} />
          </button>

          {/* Lab Values */}
          <button
            onClick={() => setIsLabModalOpen(true)}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-cyan-400 border border-slate-700 transition-all"
            title="Standard Lab Reference Values"
          >
            <FlaskConical className="w-4 h-4" />
          </button>

          {/* Calculator */}
          <button
            onClick={() => setIsCalcModalOpen(true)}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-cyan-400 border border-slate-700 transition-all"
            title="Calculator"
          >
            <Calculator className="w-4 h-4" />
          </button>

          {/* AI Clinical Tutor */}
          <button
            onClick={() => openAiTutorForQuestion(currentQ)}
            className="px-2.5 py-1.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-400 border border-cyan-500/40 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Bot className="w-4 h-4" />
            <span className="hidden sm:inline">AI Tutor</span>
          </button>

          {/* Exit / End Exam */}
          <button
            onClick={finishTestSession}
            className="px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-400 border border-red-500/40 text-xs font-bold transition-all ml-1"
          >
            Finish
          </button>
        </div>
      </div>

      {/* Question Grid Navigator Drawer */}
      {isGridOpen && (
        <div className="p-4 rounded-2xl bg-[#0b1326] border border-slate-800 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">Question Grid Navigator</span>
            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> Answered
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Flagged
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700" /> Unanswered
              </span>
            </div>
          </div>

          <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-15 gap-1.5 max-h-48 overflow-y-auto p-1">
            {activeTest.questions.map((q, idx) => {
              const hasAns = activeTest.userAnswers[q.id] !== undefined;
              const isFlg = activeTest.flaggedQuestionIds.includes(q.id);
              const isCurrent = idx === currentQIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    navigateTestQuestion(idx);
                    setIsGridOpen(false);
                  }}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isCurrent
                      ? 'ring-2 ring-cyan-400 bg-cyan-600 text-white'
                      : isFlg
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : hasAns
                      ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-500/30'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Question Card (Matching Screenshot 4) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#091124] border border-slate-800/80 shadow-xl space-y-6">
        {/* Meta badges: Subject, System, Difficulty, Mode */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
              {currentQ.subject}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold">
              {currentQ.system}
            </span>
            {currentQ.cohort && (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                {currentQ.cohort}
              </span>
            )}
            {currentQ.isMultipleChoice && (
              <span className="px-2.5 py-1 rounded-lg bg-rose-950/50 border border-rose-500/30 text-rose-400 text-xs font-bold">
                Multiple Choice ({currentQ.requiredSelectionsCount || 3} selections required)
              </span>
            )}
          </div>

          <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
            currentQ.difficulty === 'Easy'
              ? 'text-emerald-400 bg-emerald-950/40'
              : currentQ.difficulty === 'Hard'
              ? 'text-red-400 bg-red-950/40'
              : 'text-amber-400 bg-amber-950/40'
          }`}>
            {currentQ.difficulty} Difficulty
          </span>
        </div>

        {/* Clinical Vignette */}
        <div className="space-y-4">
          <div className={`text-slate-200 whitespace-pre-line font-normal ${fontSizeClasses[fontSize]}`}>
            {currentQ.vignette}
          </div>

          {/* Optional Clinical Image */}
          {currentQ.imageUrl && (
            <div className="my-4 rounded-2xl overflow-hidden border border-slate-700 bg-black/40 max-h-80 flex items-center justify-center">
              <img
                src={currentQ.imageUrl}
                alt="Clinical Findings"
                referrerPolicy="no-referrer"
                className="max-h-80 object-contain"
              />
            </div>
          )}

          {/* Question Lead-in Prompt */}
          <div className="pt-2 border-t border-slate-800/60">
            <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
              {currentQ.question}
            </h2>
          </div>
        </div>

        {/* Options List (Matching Screenshot 4 with strikethrough, selection & instant feedback) */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((opt) => {
            const isSelected = isOptionSelected(opt.id);
            const isCrossed = crossedOptions.includes(opt.id);
            const isCorrect = isOptionCorrect(opt.id);

            let optionStyling = 'bg-[#0c162e] border-slate-800 hover:border-slate-700 text-slate-200';

            if (isAnswerEvaluated) {
              if (isCorrect) {
                optionStyling = 'bg-emerald-950/40 border-emerald-500 text-emerald-100 font-semibold ring-1 ring-emerald-500/40 shadow-lg shadow-emerald-950/30';
              } else if (isSelected && !isCorrect) {
                optionStyling = 'bg-rose-950/50 border-rose-500 text-rose-100 font-semibold ring-1 ring-rose-500/50 shadow-lg shadow-rose-950/40';
              } else {
                optionStyling = 'bg-[#0a1224] border-slate-800/80 text-slate-400 opacity-75';
              }
            } else if (isSelected) {
              optionStyling = 'bg-cyan-950/60 border-cyan-500 text-white font-semibold shadow-md shadow-cyan-950/40';
            }

            return (
              <div
                key={opt.id}
                className={`group relative rounded-2xl border p-4 transition-all flex flex-col gap-2 cursor-pointer ${optionStyling} ${
                  isCrossed ? 'opacity-40 line-through' : ''
                }`}
                onClick={() => handleOptionSelect(opt.id)}
              >
                <div className="flex items-start justify-between gap-3.5">
                  <div className="flex items-start gap-3.5 flex-1">
                    {/* Option Letter Indicator */}
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                        isAnswerEvaluated
                          ? isCorrect
                            ? 'bg-emerald-500 text-white shadow-sm'
                            : isSelected
                            ? 'bg-rose-500 text-white shadow-sm'
                            : 'bg-slate-800 text-slate-400'
                          : isSelected
                          ? 'bg-cyan-500 text-white'
                          : 'bg-slate-800 group-hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      {opt.id}
                    </div>

                    {/* Option Text */}
                    <div className="flex-1 text-xs sm:text-sm leading-relaxed pt-0.5 font-medium">
                      {opt.text}
                    </div>
                  </div>

                  {/* Badges & Strike Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {isAnswerEvaluated && isSelected && !isCorrect && (
                      <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[11px] font-black uppercase tracking-wide flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>Incorrect Choice</span>
                      </span>
                    )}

                    {isAnswerEvaluated && isCorrect && (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-black uppercase tracking-wide flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Correct Key</span>
                      </span>
                    )}

                    {/* Strike Option Toggle Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCrossOption(currentQ.id, opt.id);
                      }}
                      className="p-1 rounded-lg text-slate-600 hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Cross out / Strike option"
                    >
                      <Strikethrough className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Inline Distractor Analysis on wrong attempt or answer evaluation */}
                {isAnswerEvaluated && currentQ.distractorExplanations?.[opt.id] && (isSelected || isCorrect || showExplanation) && (
                  <div
                    className={`mt-1 pt-2.5 border-t text-xs leading-relaxed ${
                      isCorrect
                        ? 'border-emerald-500/30 text-emerald-200'
                        : isSelected
                        ? 'border-rose-500/30 text-rose-200 font-medium'
                        : 'border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="font-bold mr-1">
                      {isCorrect ? '✓ Why this key is correct:' : '✗ Why this option is incorrect:'}
                    </span>
                    {currentQ.distractorExplanations[opt.id]}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Controls: Previous, Check Answer, Next */}
        <div className="flex items-center justify-between gap-3 pt-6 border-t border-slate-800/80">
          <button
            onClick={() => navigateTestQuestion(currentQIndex - 1)}
            disabled={currentQIndex === 0}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Try Again button when answered */}
            {userAns && !isCurrentQuestionCorrect() && (
              <button
                onClick={handleRetryQuestion}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            )}

            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                showExplanation
                  ? 'bg-purple-900/60 text-purple-300 border border-purple-500/40'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-950/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{showExplanation ? 'Hide Rationale' : 'View Explanation'}</span>
            </button>

            {currentQIndex < activeTest.questions.length - 1 ? (
              <button
                onClick={() => {
                  setShowExplanation(false);
                  navigateTestQuestion(currentQIndex + 1);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-950/40 transition-all"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={finishTestSession}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-950/40 transition-all"
              >
                <span>Submit Exam</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Explanation & High-Yield Options Box (When Checked, Wrong Answer Attempted, or Review Mode) */}
      {(showExplanation || activeTest.isCompleted || (userAns && isAnswerEvaluated)) && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#091228] border border-cyan-500/40 shadow-2xl space-y-6 animate-fadeIn">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">
                Clinical Explanation & High-Yield Options
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAiTutorForQuestion(currentQ)}
                className="px-3 py-1.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900 text-cyan-400 border border-cyan-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Ask Dr. Jaanvi AI Tutor</span>
              </button>
            </div>
          </div>

          {/* Focused Wrong Answer Banner & Distractor Breakdown */}
          {userAns && !isCurrentQuestionCorrect() && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/80 via-[#180e1e] to-amber-950/60 border border-rose-500/50 space-y-3 shadow-lg">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-rose-300">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span className="text-sm font-black uppercase tracking-wider">
                    Incorrect Option Selected: Option {Array.isArray(userAns) ? userAns.join(', ') : userAns}
                  </span>
                </div>
                <button
                  onClick={handleRetryQuestion}
                  className="px-3 py-1 rounded-xl bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-500/40 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Re-test Recall</span>
                </button>
              </div>

              {/* Selected Distractor Analysis */}
              {typeof userAns === 'string' && currentQ.distractorExplanations?.[userAns] && (
                <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 space-y-1">
                  <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    Why Option {userAns} is clinically incorrect:
                  </span>
                  <p className="text-xs sm:text-sm text-rose-100 leading-relaxed font-medium">
                    {currentQ.distractorExplanations[userAns]}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Correct Answer Confirmation Banner */}
          {userAns && isCurrentQuestionCorrect() && (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center gap-2.5 text-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-sm font-black uppercase tracking-wider block">
                    Correct Key! (Option {currentQ.correctOptionId})
                  </span>
                  <span className="text-xs text-emerald-200 font-medium">
                    Review the high-yield pearls and learning points below.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* High-Yield Clinical Pearl Box */}
          {currentQ.highYieldPearl && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/60 via-[#151233] to-cyan-950/60 border border-purple-500/50 shadow-lg space-y-2">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400 shrink-0" />
                <span className="text-xs font-black uppercase tracking-wider text-purple-300">
                  High-Yield Clinical Pearl & Exam Rule
                </span>
              </div>
              <p className="text-xs sm:text-sm text-purple-100 font-bold leading-relaxed">
                {currentQ.highYieldPearl}
              </p>
            </div>
          )}

          {/* Key Learning Point */}
          {currentQ.keyLearningPoint && (
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-xs font-black uppercase text-amber-300 tracking-wide">
                  Key Learning Point & Board Takeaway
                </span>
                <p className="text-xs sm:text-sm text-amber-100 font-medium leading-relaxed">
                  {currentQ.keyLearningPoint}
                </p>
              </div>
            </div>
          )}

          {/* Educational Objective */}
          {currentQ.educationalObjective && (
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                Educational Objective
              </span>
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                {currentQ.educationalObjective}
              </p>
            </div>
          )}

          {/* Core Explanation */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Diagnostic & Therapeutic Rationale
            </span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              {currentQ.explanation}
            </div>
          </div>

          {/* Detailed Distractor Breakdown (Options Analysis) */}
          {currentQ.distractorExplanations && Object.keys(currentQ.distractorExplanations).length > 0 && (
            <div className="space-y-2.5 pt-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Comprehensive Distractor Analysis (Options Breakdown)
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {currentQ.options.map((opt) => {
                  const isKey = isOptionCorrect(opt.id);
                  const isUser = opt.id === userAns;
                  const distractorDesc = currentQ.distractorExplanations?.[opt.id];
                  if (!distractorDesc && !isKey) return null;

                  return (
                    <div
                      key={opt.id}
                      className={`p-3.5 rounded-xl border text-xs leading-relaxed space-y-1 ${
                        isKey
                          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100'
                          : isUser
                          ? 'bg-rose-950/30 border-rose-500/40 text-rose-100'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span className="flex items-center gap-2">
                          <span
                            className={`w-5 h-5 rounded flex items-center justify-center text-[11px] font-black ${
                              isKey
                                ? 'bg-emerald-500 text-white'
                                : isUser
                                ? 'bg-rose-500 text-white'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {opt.id}
                          </span>
                          <span>{opt.text}</span>
                        </span>
                        {isKey && (
                          <span className="text-[10px] text-emerald-400 uppercase font-black">
                            Correct Key
                          </span>
                        )}
                        {isUser && !isKey && (
                          <span className="text-[10px] text-rose-400 uppercase font-black">
                            Your Selection (Incorrect)
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-xs pl-7 ${
                          isKey ? 'text-emerald-200/90' : isUser ? 'text-rose-200/90' : 'text-slate-400'
                        }`}
                      >
                        {distractorDesc || currentQ.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Candidate Custom Note Input */}
          <div className="pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">Personal Study Notes</span>
              {!isEditingNote && (
                <button
                  onClick={() => {
                    setNoteText(currentQ.userNote || '');
                    setIsEditingNote(true);
                  }}
                  className="text-xs text-cyan-400 hover:underline font-semibold"
                >
                  {currentQ.userNote ? 'Edit Note' : '+ Add Note'}
                </button>
              )}
            </div>

            {isEditingNote ? (
              <div className="space-y-2">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Type your personal mnemonic or review notes here..."
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 h-20"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsEditingNote(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveNote}
                    className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs text-white font-bold"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            ) : currentQ.userNote ? (
              <p className="text-xs text-slate-300 italic bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                "{currentQ.userNote}"
              </p>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
