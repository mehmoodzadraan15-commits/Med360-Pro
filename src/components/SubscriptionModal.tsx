import React from 'react';
import { useExam } from '../context/ExamContext';
import {
  Crown,
  X,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  Award
} from 'lucide-react';

export const SubscriptionModal: React.FC = () => {
  const { isSubscriptionModalOpen, setIsSubscriptionModalOpen, userProfile, updateUserProfile } = useExam();

  if (!isSubscriptionModalOpen) return null;

  const handleSelectPlan = async (plan: string) => {
    await updateUserProfile({ subscriptionPlan: plan });
    setIsSubscriptionModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#091124] border border-red-500/40 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setIsSubscriptionModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-400">
            <Crown className="w-8 h-8 fill-amber-300 text-amber-300" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Med 360 Pro Pass
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Unlimited access to 10,000+ AMC MCQs, interactive OSCE clinical stations, case studies, and Dr. Jaanvi AI Clinical Tutor.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* 3 Months Plan */}
          <div className="p-5 rounded-2xl bg-[#0c162e] border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white">Standard Candidate</h3>
              <div className="text-2xl font-black text-white">$49 <span className="text-xs font-normal text-slate-400">/ 3 Months</span></div>
              <ul className="space-y-1.5 text-xs text-slate-300 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Full AMC Q-Bank Access
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Timed Practice & Mocks
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Performance Analytics
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSelectPlan('Pro Candidate (3 Months)')}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
            >
              Select 3-Month Plan
            </button>
          </div>

          {/* 12 Months All-Access Plan */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#1c0f18] to-[#0c162e] border border-red-500/50 flex flex-col justify-between space-y-4 shadow-xl shadow-red-950/30">
            <div className="space-y-2">
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-red-500 text-white font-bold text-[10px] uppercase tracking-wider">
                Best Value
              </div>
              <h3 className="text-base font-bold text-white">Med 360 All-Inclusive</h3>
              <div className="text-2xl font-black text-rose-400">$99 <span className="text-xs font-normal text-slate-400">/ 12 Months</span></div>
              <ul className="space-y-1.5 text-xs text-slate-200 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> Everything in Standard
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> 10,000+ Verified MCQs
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> Unlimited OSCE Stations & Cases
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> Dr. Jaanvi AI Clinical Tutor
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSelectPlan('Med 360 Pro All-Access (12 Months)')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 text-white font-bold text-xs shadow-md shadow-red-950/50"
            >
              Activate Pro All-Access
            </button>
          </div>
        </div>

        {/* Google Play Billing Compliance Notice */}
        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 text-center space-y-1">
          <p>
            Payments are securely billed through your official Google Play or app store account. Subscriptions auto-renew unless canceled 24h before renewal in your Google Play Store settings.
          </p>
          <div className="flex items-center justify-center gap-3 text-[10px] text-slate-500">
            <span>• No Hidden Surcharges</span>
            <span>• Instant Account Unlock</span>
            <span>• Cancel Anytime in Play Store</span>
          </div>
        </div>
      </div>
    </div>
  );
};
