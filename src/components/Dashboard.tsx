import React from 'react';
import { useExam } from '../context/ExamContext';
import {
  Layers,
  GraduationCap,
  Stethoscope,
  FileCheck2,
  Sparkles,
  RotateCcw,
  BarChart3,
  Bookmark,
  Play,
  Flame,
  Target,
  Trophy,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Award,
  ChevronRight,
  Activity,
  Calendar
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    setCurrentTab,
    startNewTest,
    resumeTest,
    totalQuestionCount,
    performanceStats,
    testHistory,
    userProfile,
    osceStations,
    clinicalCases,
    highYieldTopics,
    setIsSubscriptionModalOpen,
    setIsDisclaimerModalOpen
  } = useExam();

  const handleStartRapidSprint = async () => {
    await startNewTest({
      examType: userProfile.targetExam || 'AMC CAT MCQ',
      mode: 'timed_exam',
      title: 'Daily Rapid Sprint (20 Questions)',
      subjects: [],
      systems: [],
      difficulties: [],
      questionCount: 20,
      timePerQuestionSec: 72,
      statusFilter: 'all'
    });
  };

  const handleStartFullMock = async () => {
    await startNewTest({
      examType: 'AMC CAT MCQ',
      mode: 'timed_exam',
      title: 'AMC CAT MCQ Full Mock Examination (150 Questions)',
      subjects: [],
      systems: [],
      difficulties: [],
      questionCount: 150,
      timePerQuestionSec: 84, // 210 mins total
      statusFilter: 'all'
    });
  };

  const completedOsceCount = osceStations.filter((s) => s.isCompleted).length;
  const completedCasesCount = clinicalCases.filter((c) => c.isCompleted).length;

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Hero Banner with Clinical Aesthetics & Candidate Info */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1836] via-[#091226] to-[#050914] border border-cyan-500/30 p-6 sm:p-8 shadow-xl shadow-cyan-950/30">
        {/* Glow orb accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/15 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>AMC & USMLE Medical Exam Preparation</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Welcome back, <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{userProfile.name}</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Targeting <strong className="text-white font-semibold">{userProfile.targetExam}</strong>. You have access to <strong className="text-cyan-400">{totalQuestionCount.toLocaleString()}+</strong> high-yield MCQs, OSCE clinical stations, and real-time analytics curated by Dr. Jaanvi.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                Exam Date: <strong className="text-white">{userProfile.examDate}</strong>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Study Streak: <strong className="text-amber-400">{userProfile.studyStreakDays} Days</strong>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <Award className="w-3.5 h-3.5 text-rose-400" />
                Plan: <strong className="text-rose-400">{userProfile.subscriptionPlan}</strong>
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            <button
              id="btn-start-rapid-sprint"
              onClick={handleStartRapidSprint}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-2.5 transition-all transform active:scale-95"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Start Daily 20Q Sprint</span>
            </button>

            <button
              id="btn-start-amc-mock"
              onClick={handleStartFullMock}
              className="px-5 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 text-white font-bold text-sm border border-slate-700 flex items-center justify-center gap-2.5 transition-all"
            >
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>Full AMC Mock Exam</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Metric Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Questions in Bank */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0b1326] border border-slate-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>MCQ Database</span>
            <div className="p-1.5 rounded-lg bg-cyan-950/50 border border-cyan-500/30 text-cyan-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {totalQuestionCount.toLocaleString()}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Active verified MCQs
            </p>
          </div>
        </div>

        {/* Overall Accuracy */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0b1326] border border-slate-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>Overall Accuracy</span>
            <div className="p-1.5 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-emerald-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              {performanceStats.overallAccuracy}%
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {performanceStats.totalCorrect} / {performanceStats.totalQuestionsAnswered} answered correctly
            </p>
          </div>
        </div>

        {/* Predicted AMC Score */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0b1326] border border-slate-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>Predicted AMC Score</span>
            <div className="p-1.5 rounded-lg bg-blue-950/50 border border-blue-500/30 text-blue-400">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-blue-400">
                {performanceStats.amcScaledScore}
              </span>
              <span className="text-xs text-slate-400 font-medium">/ 350 (Pass: 250)</span>
            </div>
            <p className="text-xs text-emerald-400 font-medium mt-1">
              {performanceStats.amcPassProbability}% Pass Probability
            </p>
          </div>
        </div>

        {/* Tests & OSCE Stations Completed */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0b1326] border border-slate-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>Clinical Completed</span>
            <div className="p-1.5 rounded-lg bg-rose-950/50 border border-rose-500/30 text-rose-400">
              <Stethoscope className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {performanceStats.totalTestsCompleted} <span className="text-sm font-normal text-slate-400">Tests</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {completedOsceCount} OSCEs • {completedCasesCount} Cases
            </p>
          </div>
        </div>
      </div>

      {/* 8 Primary Navigation Feature Modules (Matching user screenshot) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            Med 360 Core Clinical Modules
          </h2>
          <span className="text-xs text-slate-400">Select any module to begin</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Question Bank Explorer */}
          <div
            id="module-card-bank"
            onClick={() => setCurrentTab('bank')}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-b from-[#0e172e] to-[#091022] border border-cyan-500/30 hover:border-cyan-400/70 p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/40 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {totalQuestionCount.toLocaleString()}+ MCQs
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                  Question Bank
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Adult & Paediatric subjects, system-wise drills, customizable timers & instant tutor mode.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-semibold text-cyan-400">
              <span>Open Q-Bank</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 2. Full-Length Mock Exams */}
          <div
            id="module-card-mock"
            onClick={() => setCurrentTab('mock')}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-b from-[#0e172e] to-[#091022] border border-blue-500/30 hover:border-blue-400/70 p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/40 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-blue-950/80 border border-blue-500/40 text-blue-400 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  AMC & USMLE
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                  Mock Examinations
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Full 150Q AMC CAT MCQ simulator, USMLE timed tests & scaled scoring reports.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-semibold text-blue-400">
              <span>Launch Mock</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 3. OSCE Clinical Stations */}
          <div
            id="module-card-osce"
            onClick={() => setCurrentTab('osce')}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-b from-[#0e172e] to-[#091022] border border-rose-500/30 hover:border-rose-400/70 p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-950/40 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-400 group-hover:scale-110 transition-transform">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  {osceStations.length} Stations
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors">
                  OSCE Clinical Stations
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  History taking, physical exams, communication (SPIKES), emergency cases, marking checklists.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-semibold text-rose-400">
              <span>Practice OSCE</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 4. Interactive Case Studies */}
          <div
            id="module-card-cases"
            onClick={() => setCurrentTab('cases')}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-b from-[#0e172e] to-[#091022] border border-amber-500/30 hover:border-amber-400/70 p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-950/40 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-400 group-hover:scale-110 transition-transform">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {clinicalCases.length}+ Cases
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  Clinical Case Studies
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Step-by-step patient presentations with vitals, diagnostic branching, and management rationales.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-semibold text-amber-400">
              <span>Open Cases</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 5. High-Yield Topics Revision */}
          <div
            id="module-card-highyield"
            onClick={() => setCurrentTab('highyield')}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-b from-[#0e172e] to-[#091022] border border-purple-500/30 hover:border-purple-400/70 p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/40 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-400 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  Clinical Pearls
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">
                  High-Yield Revision
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Key summaries, clinical pearls, red flags, diagnostic criteria, and common exam traps.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-semibold text-purple-400">
              <span>Explore High-Yield</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 6. "My Mistakes" Revision Hub */}
          <div
            id="module-card-mistakes"
            onClick={() => setCurrentTab('mistakes')}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-b from-[#0e172e] to-[#091022] border border-orange-500/30 hover:border-orange-400/70 p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-950/40 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-orange-950/80 border border-orange-500/40 text-orange-400 group-hover:scale-110 transition-transform">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  {performanceStats.totalIncorrect} Incorrect
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                  My Mistakes
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Targeted revision drills for questions you previously answered incorrectly.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-semibold text-orange-400">
              <span>Review Mistakes</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 7. Performance Analytics */}
          <div
            id="module-card-analytics"
            onClick={() => setCurrentTab('analytics')}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-b from-[#0e172e] to-[#091022] border border-emerald-500/30 hover:border-emerald-400/70 p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/40 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Detailed Radar
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Performance Analytics
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Subject mastery radar, system proficiency, average response time, and pass probability.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span>View Analytics</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 8. Bookmarks & Annotations */}
          <div
            id="module-card-bookmarks"
            onClick={() => setCurrentTab('bookmarks')}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-b from-[#0e172e] to-[#091022] border border-indigo-500/30 hover:border-indigo-400/70 p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/40 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-400 group-hover:scale-110 transition-transform">
                  <Bookmark className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Notes & Flags
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                  Bookmarks & Notes
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Access flagged questions, custom study notes, and saved high-yield clinical pearls.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-semibold text-indigo-400">
              <span>View Bookmarks</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Sessions & Weak Topics Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Test Sessions */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              Recent Practice & Mock Tests
            </h3>
            <button
              onClick={() => setCurrentTab('bank')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              Start New Test
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {testHistory.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#0b1326] border border-slate-800/80 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
                <Play className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">No test sessions recorded yet</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Start an AMC CAT MCQ drill or a full mock exam to track your scaled score and progress.
                </p>
              </div>
              <button
                onClick={handleStartRapidSprint}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs inline-flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5" />
                Launch 20Q Sprint Now
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {testHistory.slice(0, 4).map((test) => (
                <div
                  key={test.id}
                  className="p-4 rounded-xl bg-[#0b1326] border border-slate-800/80 hover:border-slate-700 transition-colors flex items-center justify-between gap-4"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white truncate">{test.title}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        test.isCompleted
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}>
                        {test.isCompleted ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span>{test.questions.length} Questions</span>
                      <span>•</span>
                      <span>{new Date(test.createdAt).toLocaleDateString()}</span>
                      {test.isCompleted && test.accuracyPercentage !== undefined && (
                        <>
                          <span>•</span>
                          <span className="font-bold text-cyan-400">
                            {test.accuracyPercentage}% ({test.score}/{test.totalQuestions})
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => resumeTest(test)}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5"
                  >
                    {test.isCompleted ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Review</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Resume</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Weak Topics & Recommended Actions */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Recommended Focus Areas
          </h3>

          <div className="p-5 rounded-2xl bg-[#0b1326] border border-slate-800/80 space-y-4">
            {performanceStats.weakTopics.length > 0 ? (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">
                  Based on your recent attempts, Dr. Jaanvi recommends prioritizing these topics:
                </p>
                {performanceStats.weakTopics.map((topic, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-200 truncate">{topic.topic}</span>
                      <span className="text-red-400 font-bold">{topic.accuracy}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: `${topic.accuracy}%` }}
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setCurrentTab('mistakes')}
                  className="w-full mt-2 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-red-400 text-xs font-bold transition-all"
                >
                  Start Weakness Drill
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-center py-4">
                <CheckCircle2 className="w-10 h-10 text-cyan-400 mx-auto" />
                <p className="text-xs text-slate-300 font-medium">
                  Complete at least 20 practice questions to unlock personalized weak topic identification and AMC score projections.
                </p>
                <button
                  onClick={handleStartRapidSprint}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs inline-flex items-center gap-2"
                >
                  <Play className="w-3.5 h-3.5" />
                  Start 20Q Assessment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Official Medical Disclaimer Card */}
      <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0" />
          <span>
            <strong>Educational Purpose:</strong> Med 360 by Dr. Jaanvi is intended strictly for medical exam preparation and clinical education.
          </span>
        </div>
        <button
          onClick={() => setIsDisclaimerModalOpen(true)}
          className="text-cyan-400 hover:underline font-semibold shrink-0"
        >
          View Full Disclaimer & Policies
        </button>
      </div>
    </div>
  );
};
