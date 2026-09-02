import React, { useState } from 'react';
import { useExam } from '../context/ExamContext';
import {
  ShieldAlert,
  CreditCard,
  Lock,
  FileText,
  X,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Smartphone
} from 'lucide-react';

export type PolicyTab = 'disclaimer' | 'billing' | 'privacy' | 'terms';

export const LegalPoliciesModal: React.FC = () => {
  const { isDisclaimerModalOpen, setIsDisclaimerModalOpen } = useExam();
  const [activeTab, setActiveTab] = useState<PolicyTab>('disclaimer');

  if (!isDisclaimerModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="w-full max-w-4xl bg-[#091124] border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#060c1c]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  Compliance & Legal Center
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Google Play & AMC Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Medical Disclaimer • Google Play Billing Policy • Privacy Policy • Terms of Service
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsDisclaimerModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex items-center gap-1 sm:gap-2 px-6 py-2.5 border-b border-slate-800/80 bg-slate-950/60 overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setActiveTab('disclaimer')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === 'disclaimer'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Medical Disclaimer</span>
          </button>

          <button
            onClick={() => setActiveTab('billing')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === 'billing'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-rose-400" />
            <span>Google Play Billing Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === 'privacy'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === 'terms'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>Terms of Service</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed custom-scrollbar">
          {/* TAB 1: MEDICAL DISCLAIMER */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-black text-amber-300 text-sm uppercase tracking-wide">
                    Mandatory Clinical Education Notice
                  </h3>
                  <p className="text-amber-100/90 text-xs font-medium">
                    Med 360 by Dr. Jaanvi is strictly a supplemental test preparation and simulation software for medical candidates. It is NOT a clinical decision support system, diagnostic tool, or substitute for professional medical consultation.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#0c162e] border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">1. Scope of Educational Content</h4>
                  <p>
                    All clinical vignettes, multi-stage case studies, OSCE marking criteria, diagnostic rationale, pharmaceutical dosages, lab interpretations, and Dr. Jaanvi AI Tutor interactions are created solely for exam preparation (including the Australian Medical Council AMC CAT MCQ, AMC Clinical Examination, USMLE Step 1/2 CK, PLAB, and university medical finals).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0c162e] border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">2. No Doctor-Patient Relationship</h4>
                  <p>
                    Use of Med 360 does not establish a doctor-patient or healthcare provider relationship. Patients experiencing acute medical symptoms or health inquiries must consult a qualified, licensed medical practitioner or contact emergency services (000 in Australia, 911 in the USA, 999 in the UK).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0c162e] border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">3. Clinical Guidelines & Prescribing Variability</h4>
                  <p>
                    While content is aligned with standard Australian guidelines (Therapeutic Guidelines eTG, Royal Children's Hospital RCH, Australian Medicines Handbook AMH, RACGP Red Book) and international clinical protocols, medical science evolves continuously. Medical practitioners must independently verify drug dosages, contraindications, and treatment pathways with current local statutory formularies.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0c162e] border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">4. Independent Non-Affiliation</h4>
                  <p>
                    Med 360 is independently developed and published. The application is not endorsed, accredited, or officially affiliated with the Australian Medical Council (AMC), the National Board of Medical Examiners (NBME), or the General Medical Council (GMC). All trademarked examination names are used purely for descriptive, curriculum-matching purposes under nominative fair use.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GOOGLE PLAY BILLING POLICY */}
          {activeTab === 'billing' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40 flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-black text-rose-300 text-sm uppercase tracking-wide">
                    Google Play In-App Purchases & Subscription Compliance
                  </h3>
                  <p className="text-rose-100/90 text-xs font-medium">
                    This policy governs all digital subscriptions, trial access, in-app feature unlocks, and cancellations processed via Google Play Billing in compliance with the Google Play Developer Distribution Agreement.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#0c162e] border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">1. Google Play In-App Billing Enforcement</h4>
                  <p>
                    All digital items, including the <strong>Med 360 Standard Candidate (3-Month Pass)</strong> and <strong>Med 360 Pro All-Access (12-Month Pass)</strong>, are transacted exclusively via Google Play's official in-app billing system when downloaded from the Google Play Store. No external payment links are requested inside the native Android package.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0c162e] border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">2. Transparent Pricing & Currency</h4>
                  <p>
                    Subscription prices, applicable local taxes (such as GST/VAT), and billing frequency are clearly displayed prior to purchase confirmation. Payment is charged directly to the user's Google Play account upon purchase verification.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0c162e] border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">3. Automatic Renewal & Cancellation</h4>
                  <p>
                    Subscriptions automatically renew unless canceled at least 24 hours before the end of the current billing cycle. You may manage, pause, or cancel your subscription at any time directly through the Google Play Store app under:
                  </p>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/60 text-xs text-cyan-300 font-mono">
                    Google Play Store &gt; Profile Icon &gt; Payments & Subscriptions &gt; Subscriptions &gt; Med 360 &gt; Cancel Subscription
                  </div>
                  <p className="text-slate-400 text-xs">
                    Upon cancellation, you retain full Pro access until the conclusion of the paid billing period.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0c162e] border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">4. Refund Policy</h4>
                  <p>
                    Refund requests for purchases made via Google Play are handled in accordance with Google Play Refund Policies. Users may request a refund within 48 hours directly through Google Play Order History.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 flex items-start gap-3">
                <Lock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-black text-cyan-300 text-sm uppercase tracking-wide">
                    User Data Privacy & Security Policy
                  </h3>
                  <p className="text-cyan-100/90 text-xs font-medium">
                    Effective Date: September 2026. Med 360 respects your privacy and is committed to protecting candidate personal data in compliance with GDPR, Australian Privacy Principles (APPs), and Google Play User Data policies.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#0c162e] border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">1. Information We Collect</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                    <li><strong>Candidate Profile:</strong> Chosen candidate display name, target examination (e.g., AMC CAT MCQ), and target exam date.</li>
                    <li><strong>Study Progress & Performance:</strong> Question attempt history, accuracy percentages by organ system, OSCE completion scores, flagged questions, and clinical notes.</li>
                    <li><strong>Device Diagnostics:</strong> Non-identifying crash telemetry and reading preferences (such as selected font size and dark theme settings).</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#0c162e] border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">2. Offline & Local Storage Architecture</h4>
                  <p>
                    Med 360 utilizes browser and device <strong>IndexedDB Local Storage</strong>. Your test attempts, study notes, and bookmarks are cached locally on your device for offline study capabilities.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0c162e] border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">3. No Sale of Personal Information</h4>
                  <p>
                    We do NOT sell, rent, or trade your personal data, exam scores, or study habits to third-party advertising brokers or pharmaceutical marketing entities.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0c162e] border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">4. Data Deletion & Account Erasure</h4>
                  <p>
                    You maintain complete ownership of your study history. You can permanently wipe all locally stored exam records, bookmarks, and notes at any time using the <em>"Reset All Practice Data"</em> button in the Profile section.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/40 flex items-start gap-3">
                <FileText className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-black text-purple-300 text-sm uppercase tracking-wide">
                    Terms of Service & End User License Agreement (EULA)
                  </h3>
                  <p className="text-purple-100/90 text-xs font-medium">
                    By accessing or using the Med 360 application on web or mobile platforms, you agree to be bound by the following Terms of Service.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#0c162e] border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">1. License Grant & Permitted Use</h4>
                  <p>
                    Med 360 grants you a revocable, non-exclusive, non-transferable, limited personal license to download, install, and use the application solely for your own personal educational purposes in preparing for medical licensing examinations.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0c162e] border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">2. Intellectual Property & Anti-Scraping</h4>
                  <p>
                    All test questions, clinical vignettes, OSCE station scripts, high-yield clinical pearls, visual diagrams, and code are the exclusive intellectual property of Med 360. You may not copy, reverse-engineer, mass-scrape, redistribute, or republish question bank content without prior written permission.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0c162e] border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">3. Limitation of Liability</h4>
                  <p>
                    Under no circumstances shall Med 360, its developers, or Dr. Jaanvi be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this software, examination outcomes, or clinical decisions made outside of the educational testing environment.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0c162e] border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">4. Modifications & Governing Law</h4>
                  <p>
                    We reserve the right to modify these terms at any time. Continued use of the platform constitutes agreement to the modified terms. These terms are governed by and construed in accordance with applicable statutory laws.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-slate-800 bg-[#060c1c]">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Complies with Google Play Developer Policies & Medical Guidelines</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDisclaimerModalOpen(false)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-950/40 transition-all"
            >
              I Acknowledge & Agree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MedicalDisclaimerModal = LegalPoliciesModal;

