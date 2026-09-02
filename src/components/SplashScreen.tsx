import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Med360Logo } from './Med360Logo';
import { Activity, ShieldCheck, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const timer1 = setTimeout(() => setProgress(45), 300);
    const timer2 = setTimeout(() => setProgress(85), 700);
    const timer3 = setTimeout(() => setProgress(100), 1100);
    const timer4 = setTimeout(() => onFinish(), 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070c18] text-white p-6 overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Main Logo & Animated Stethoscope */}
      <div className="relative flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-8"
        >
          <Med360Logo size="xl" showSubtitle={true} />
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-1.5 max-w-sm"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5" />
            AMC & USMLE Medical Exam Preparation
          </div>
          <p className="text-slate-400 text-sm font-medium pt-1">
            Clinical MCQ Question Bank • OSCE Stations • Mock Simulator
          </p>
        </motion.div>

        {/* Pulse / ECG Line */}
        <div className="w-64 my-8 h-1 bg-slate-800/80 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-red-500 rounded-full"
            initial={{ width: '10%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Loading status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 text-xs text-slate-500"
        >
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Synchronizing 10,000+ medical clinical database...</span>
        </motion.div>
      </div>

      {/* Footer Credentials */}
      <div className="absolute bottom-6 text-center text-[11px] text-slate-500 font-medium">
        <p>Curated & Reviewed by Senior Specialists • Clinical Guidance by Dr. Jaanvi</p>
      </div>
    </motion.div>
  );
};
