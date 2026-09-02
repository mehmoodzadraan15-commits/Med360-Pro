import React, { useState, useEffect } from 'react';
import { useExam } from '../context/ExamContext';
import { getUserInitials } from '../utils/userUtils';
import {
  User,
  Crown,
  Calendar,
  Award,
  Flame,
  Download,
  Upload,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  FileText,
  Sliders,
  Type,
  CreditCard,
  Lock,
  Scale
} from 'lucide-react';

export const CandidateProfileView: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    fontSize,
    setFontSize,
    resetAllData,
    setIsSubscriptionModalOpen,
    setIsDisclaimerModalOpen,
    totalQuestionCount
  } = useExam();

  const [name, setName] = useState(userProfile.name);
  const [targetExam, setTargetExam] = useState(userProfile.targetExam);
  const [examDate, setExamDate] = useState(userProfile.examDate);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setName(userProfile.name);
    setTargetExam(userProfile.targetExam);
    setExamDate(userProfile.examDate);
  }, [userProfile.name, userProfile.targetExam, userProfile.examDate]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserProfile({
      name,
      targetExam,
      examDate
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <User className="w-6 h-6 text-cyan-400" />
          Candidate Profile & Study Plan
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Manage your exam targets, display preferences, and Med 360 Pro Pass subscription.
        </p>
      </div>

      {/* Profile Card & Plan Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#091124] border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-cyan-950/50 tracking-tight transition-all">
              {getUserInitials(name || userProfile.name)}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">{name || userProfile.name}</h2>
              <p className="text-xs text-slate-400">Targeting {targetExam || userProfile.targetExam}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[11px] font-bold">
                  {userProfile.subscriptionPlan}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-amber-400" /> {userProfile.studyStreakDays} Day Streak
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsSubscriptionModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-950/40"
          >
            <Crown className="w-4 h-4 fill-amber-300 text-amber-300" />
            <span>Manage Pro Pass</span>
          </button>
        </div>

        {/* Edit Candidate Information Form */}
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold">Candidate Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold">Target Examination</label>
              <select
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:outline-none focus:border-cyan-500"
              >
                <option value="AMC CAT MCQ">AMC CAT MCQ Examination</option>
                <option value="AMC Clinical Exam">AMC Clinical Examination</option>
                <option value="USMLE Step 1">USMLE Step 1</option>
                <option value="USMLE Step 2 CK">USMLE Step 2 CK</option>
                <option value="Medical Finals">Medical University Finals</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold">Scheduled Exam Date</label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {isSaved && (
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Profile details saved successfully!
              </span>
            )}
            <div className="ml-auto">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-950/40"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Vignette Typography / Font Size Selector */}
      <div className="p-6 rounded-3xl bg-[#091124] border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Type className="w-4 h-4 text-cyan-400" />
          Clinical Vignette Reading Size
        </h3>
        <p className="text-xs text-slate-400">
          Adjust the clinical text size for maximum readability during long examination sessions.
        </p>

        <div className="grid grid-cols-4 gap-2 pt-2 text-xs font-bold">
          {(['sm', 'base', 'lg', 'xl'] as const).map((size) => (
            <button
              key={size}
              onClick={() => setFontSize(size)}
              className={`py-2.5 rounded-xl border transition-all ${
                fontSize === size
                  ? 'bg-cyan-600 text-white border-cyan-500'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {size.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Legal & Compliance Hub for Google Play & Medical Guidelines */}
      <div className="p-6 rounded-3xl bg-[#091124] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Legal, Billing & Medical Policies
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Review Google Play Store compliance, educational disclaimers, in-app billing rules, and data privacy policies.
            </p>
          </div>
          <button
            onClick={() => setIsDisclaimerModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all"
          >
            Open Legal Center
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          <button
            onClick={() => setIsDisclaimerModalOpen(true)}
            className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-850 text-left transition-all group"
          >
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <ShieldAlert className="w-4 h-4" />
              <span>Medical Disclaimer</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
              Strict educational preparation use; does not constitute clinical treatment advice.
            </p>
          </button>

          <button
            onClick={() => setIsDisclaimerModalOpen(true)}
            className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/50 hover:bg-slate-850 text-left transition-all group"
          >
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
              <CreditCard className="w-4 h-4" />
              <span>Play Billing Policy</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
              Google Play In-App purchases, transparent pricing, renewal, and cancellation terms.
            </p>
          </button>

          <button
            onClick={() => setIsDisclaimerModalOpen(true)}
            className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850 text-left transition-all group"
          >
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
              <Lock className="w-4 h-4" />
              <span>Privacy Policy</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
              Candidate data protection, local IndexedDB storage, and GDPR compliance.
            </p>
          </button>

          <button
            onClick={() => setIsDisclaimerModalOpen(true)}
            className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-850 text-left transition-all group"
          >
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
              <FileText className="w-4 h-4" />
              <span>Terms of Service</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
              EULA, non-affiliation clause, intellectual property rights, and user license.
            </p>
          </button>
        </div>
      </div>

      {/* App Policies & Reset Hub */}
      <div className="p-6 rounded-3xl bg-[#091124] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white">Reset Study History & Cache</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Clear all test session attempts, bookmarks, and return to default database state.
          </p>
        </div>

        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to reset all test statistics? This action cannot be undone.')) {
              resetAllData();
            }
          }}
          className="px-4 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-400 border border-red-500/40 text-xs font-bold transition-all"
        >
          Reset All Practice Data
        </button>
      </div>
    </div>
  );
};
