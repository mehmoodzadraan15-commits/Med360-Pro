import React, { useState } from 'react';
import { useExam } from '../context/ExamContext';
import { Smartphone, X, Copy, Check, Terminal, FileCode, CheckCircle2, ShieldCheck, Download } from 'lucide-react';

export const AndroidApkGuideModal: React.FC = () => {
  const { isApkModalOpen, setIsApkModalOpen } = useExam();
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const capConfigCode = `{
  "appId": "com.medpreppro.app",
  "appName": "MedPrep Pro",
  "webDir": "dist",
  "server": {
    "androidScheme": "https"
  },
  "android": {
    "allowMixedContent": true,
    "captureInput": true
  }
}`;

  const buildCommands = `# 1. Install Capacitor Native Tooling
npm install @capacitor/core @capacitor/cli @capacitor/android

# 2. Compile Web App
npm run build

# 3. Add Android Platform
npx cap add android

# 4. Sync Web Assets to Android Project
npx cap sync android

# 5. Build Debug APK via Gradle
cd android
./gradlew assembleDebug

# Output APK path:
# android/app/build/outputs/apk/debug/app-debug.apk`;

  if (!isApkModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-100">Android APK Build Configuration</h2>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Capacitor & PWA Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">Native Android app packaging with offline IndexedDB storage</p>
            </div>
          </div>
          <button
            onClick={() => setIsApkModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 scrollbar-thin">
          {/* Key Advantages Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-1">
                <ShieldCheck className="w-4 h-4" /> Offline-First Engine
              </div>
              <p className="text-[11px] text-slate-400">
                Full 5,000+ question bank runs 100% offline on Android devices via high-speed IndexedDB.
              </p>
            </div>
            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs mb-1">
                <CheckCircle2 className="w-4 h-4" /> Touch Optimized
              </div>
              <p className="text-[11px] text-slate-400">
                Native bottom navigation, strike-through gesture elimination, and 44px+ touch targets.
              </p>
            </div>
            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-1">
                <Download className="w-4 h-4" /> Instant PWA Mode
              </div>
              <p className="text-[11px] text-slate-400">
                Can also be installed instantly via "Add to Home Screen" on Chrome / Android browser.
              </p>
            </div>
          </div>

          {/* Section 1: Step-by-Step Terminal Commands */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Step 1: Terminal APK Compilation Commands
              </span>
              <button
                onClick={() => handleCopy(buildCommands, 'commands')}
                className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-750 text-slate-300 transition-colors"
              >
                {copiedSection === 'commands' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Commands</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
              {buildCommands}
            </pre>
          </div>

          {/* Section 2: capacitor.config.json */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-cyan-400" />
                Step 2: Root Configuration (capacitor.config.json)
              </span>
              <button
                onClick={() => handleCopy(capConfigCode, 'config')}
                className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-750 text-slate-300 transition-colors"
              >
                {copiedSection === 'config' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Config</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              {capConfigCode}
            </pre>
          </div>

          {/* Section 3: Android Studio & Signed Release Guide */}
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2 text-xs text-slate-300">
            <h4 className="font-semibold text-slate-100 text-sm">Step 3: Generating Signed Production APK / AAB for Google Play</h4>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-400 leading-relaxed">
              <li>Open the <code className="text-cyan-300">android/</code> directory in <strong className="text-slate-200">Android Studio</strong>.</li>
              <li>Navigate to <strong className="text-slate-200">Build &gt; Generate Signed Bundle / APK</strong>.</li>
              <li>Select <strong className="text-slate-200">Android App Bundle (.aab)</strong> for Play Store or <strong className="text-slate-200">APK</strong> for direct device sideloading.</li>
              <li>Generate a new keystore password and alias, then select <strong className="text-slate-200">Release</strong> variant.</li>
              <li>The output APK/AAB is immediately ready for distribution to medical students and clinicians!</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>Configuration file <code className="text-cyan-400">capacitor.config.json</code> is pre-created in project root</span>
          <button
            onClick={() => setIsApkModalOpen(false)}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
