import React from 'react';
import { useExam } from '../context/ExamContext';
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  Award,
  Play,
  Zap,
  Target,
  FileText,
  AlertCircle
} from 'lucide-react';

export const MockExamsView: React.FC = () => {
  const { startNewTest, testHistory } = useExam();

  const handleLaunchMock = async (
    title: string,
    examType: 'AMC CAT MCQ' | 'USMLE Step 1' | 'USMLE Step 2 CK',
    questionCount: number,
    timeMins: number
  ) => {
    await startNewTest({
      examType,
      mode: 'timed_exam',
      title,
      subjects: [],
      systems: [],
      difficulties: [],
      questionCount,
      timePerQuestionSec: Math.round((timeMins * 60) / questionCount),
      statusFilter: 'all'
    });
  };

  const mockPresets = [
    {
      id: 'amc-full-mock-1',
      title: 'AMC CAT MCQ Full-Length Mock Examination 1',
      examType: 'AMC CAT MCQ' as const,
      questionCount: 150,
      timeMins: 210, // 3.5 hrs
      description: 'Official standard 150-item Computer Adaptive Test (CAT) simulation with real test timing, scaled score estimation, and standard passing threshold (250/350).',
      badge: 'Official Simulation',
      color: 'border-cyan-500/40 bg-gradient-to-b from-[#0c1836] to-[#070e20]'
    },
    {
      id: 'amc-mini-mock',
      title: 'AMC CAT MCQ Half-Length Mock (75 Questions)',
      examType: 'AMC CAT MCQ' as const,
      questionCount: 75,
      timeMins: 105,
      description: 'Balanced representation of Adult Medicine, Surgery, Women’s Health, Paediatrics, Mental Health, and Australian Population Ethics.',
      badge: 'High Yield',
      color: 'border-blue-500/40 bg-gradient-to-b from-[#0c1836] to-[#070e20]'
    },
    {
      id: 'usmle-step2-mock',
      title: 'USMLE Step 2 CK Comprehensive Clinical Mock',
      examType: 'USMLE Step 2 CK' as const,
      questionCount: 100,
      timeMins: 120,
      description: 'Clinical diagnosis, management algorithms, next best step in patient care, and preventive medicine.',
      badge: 'USMLE Step 2',
      color: 'border-purple-500/40 bg-gradient-to-b from-[#130b2e] to-[#070e20]'
    },
    {
      id: 'usmle-step1-mock',
      title: 'USMLE Step 1 Basic Medical Sciences Mock',
      examType: 'USMLE Step 1' as const,
      questionCount: 80,
      timeMins: 96,
      description: 'Mechanisms of disease, pathology, clinical pharmacology, physiology, and medical genetics.',
      badge: 'USMLE Step 1',
      color: 'border-emerald-500/40 bg-gradient-to-b from-[#0a201a] to-[#070e20]'
    },
    {
      id: 'amc-emergency-sprint',
      title: 'AMC Emergency & Acute Care Sprint',
      examType: 'AMC CAT MCQ' as const,
      questionCount: 40,
      timeMins: 48,
      description: 'Resuscitation protocols, shock, toxicology, trauma management, and critical airway algorithms.',
      badge: 'Specialty Drill',
      color: 'border-rose-500/40 bg-gradient-to-b from-[#240b15] to-[#070e20]'
    }
  ];

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-blue-400" />
          Full-Length Mock Examinations
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Simulate official test center conditions with timed CAT scoring, question pausing, and detailed diagnostic reports.
        </p>
      </div>

      {/* Preset Mock Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockPresets.map((mock) => (
          <div
            key={mock.id}
            className={`p-6 rounded-3xl border ${mock.color} shadow-xl flex flex-col justify-between space-y-4`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-bold text-cyan-300">
                  {mock.badge}
                </span>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{mock.timeMins} Mins</span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {mock.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                {mock.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400">
                {mock.questionCount} Questions
              </span>

              <button
                onClick={() =>
                  handleLaunchMock(
                    mock.title,
                    mock.examType,
                    mock.questionCount,
                    mock.timeMins
                  )
                }
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-950/40 flex items-center gap-2 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Start Mock Exam</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
