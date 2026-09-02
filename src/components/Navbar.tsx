import React from 'react';
import { useExam, Med360Tab } from '../context/ExamContext';
import { Med360Logo } from './Med360Logo';
import { getUserInitials } from '../utils/userUtils';
import {
  Search,
  FlaskConical,
  Calculator,
  Bot,
  Crown,
  Sparkles,
  Layers,
  FileCheck2,
  Stethoscope,
  Flame,
  ShieldAlert,
  User
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentTab,
    setCurrentTab,
    activeTest,
    setIsLabModalOpen,
    setIsCalcModalOpen,
    setIsAiTutorOpen,
    setIsSearchModalOpen,
    setIsSubscriptionModalOpen,
    setIsDisclaimerModalOpen,
    userProfile
  } = useExam();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080e1c]/95 backdrop-blur-md border-b border-slate-800/80 px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div
          id="nav-brand-logo"
          onClick={() => setCurrentTab('dashboard')}
          className="cursor-pointer hover:opacity-95 transition-opacity shrink-0"
        >
          <Med360Logo size="sm" showSubtitle={true} />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/60">
          <button
            id="nav-link-dashboard"
            onClick={() => setCurrentTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'dashboard'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Dashboard
          </button>
          <button
            id="nav-link-bank"
            onClick={() => setCurrentTab('bank')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'bank'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Q-Bank
          </button>
          <button
            id="nav-link-mock"
            onClick={() => setCurrentTab('mock')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'mock'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Mock Exams
          </button>
          <button
            id="nav-link-osce"
            onClick={() => setCurrentTab('osce')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'osce'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            OSCE Stations
          </button>
          <button
            id="nav-link-cases"
            onClick={() => setCurrentTab('cases')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'cases'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Cases
          </button>
          <button
            id="nav-link-highyield"
            onClick={() => setCurrentTab('highyield')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'highyield'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            High Yield
          </button>
          <button
            id="nav-link-mistakes"
            onClick={() => setCurrentTab('mistakes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'mistakes'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Mistakes
          </button>
          <button
            id="nav-link-analytics"
            onClick={() => setCurrentTab('analytics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'analytics'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Analytics
          </button>
        </nav>

        {/* Action Controls & Clinical Tools */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Streak Badge */}
          <div
            id="nav-streak-badge"
            title="Candidate Study Streak"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold"
          >
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{userProfile.studyStreakDays}d Streak</span>
          </div>

          {/* Global Search Button */}
          <button
            id="nav-btn-search"
            onClick={() => setIsSearchModalOpen(true)}
            title="Search 10,000+ MCQs & Topics (Ctrl+K)"
            className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60 border border-slate-800/60 transition-all flex items-center gap-1 text-xs"
          >
            <Search className="w-4 h-4" />
            <span className="hidden md:inline font-medium text-slate-400">Search</span>
          </button>

          {/* Lab Reference Ranges */}
          <button
            id="nav-btn-labs"
            onClick={() => setIsLabModalOpen(true)}
            title="Standard Medical Lab Values"
            className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60 border border-slate-800/60 transition-all"
          >
            <FlaskConical className="w-4 h-4" />
          </button>

          {/* Calculator */}
          <button
            id="nav-btn-calculator"
            onClick={() => setIsCalcModalOpen(true)}
            title="Medical & Clinical Calculator"
            className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60 border border-slate-800/60 transition-all"
          >
            <Calculator className="w-4 h-4" />
          </button>

          {/* AI Clinical Tutor */}
          <button
            id="nav-btn-ai-tutor"
            onClick={() => setIsAiTutorOpen(true)}
            title="Dr. Jaanvi AI Clinical Tutor"
            className="p-2 rounded-xl text-cyan-400 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 transition-all flex items-center gap-1 text-xs font-semibold"
          >
            <Bot className="w-4 h-4" />
            <span className="hidden sm:inline">AI Tutor</span>
          </button>

          {/* Med 360 Pro Pass / Subscription */}
          <button
            id="nav-btn-pro-pass"
            onClick={() => setIsSubscriptionModalOpen(true)}
            className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-red-950/40 border border-red-400/30 transition-all"
          >
            <Crown className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span className="hidden sm:inline">Pro Pass</span>
          </button>

          {/* User Profile Avatar */}
          <button
            id="nav-btn-profile"
            onClick={() => setCurrentTab('profile')}
            title={`Candidate Profile (${userProfile?.name || 'Profile'})`}
            className="p-1 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all ml-1"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold tracking-tight">
              {getUserInitials(userProfile?.name)}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
