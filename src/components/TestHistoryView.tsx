import React from 'react';
import { useExam } from '../context/ExamContext';
import { TestSession } from '../types';
import {
  History,
  Trophy,
  Clock,
  Trash2,
  PlayCircle,
  Award,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const TestHistoryView: React.FC = () => {
  const { testHistory, resumeTest, deleteTestHistoryItem, setCurrentTab, startNewTest } = useExam();

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
          <History className="w-4 h-4" /> Examination Performance Log
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Past Test Sessions & Mock Blocks</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Review previous test performance, check score progression, and re-examine completed questions
        </p>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {testHistory.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 space-y-3">
            <Trophy className="w-12 h-12 mx-auto opacity-30 text-slate-500" />
            <h3 className="text-base font-bold text-slate-200">No test sessions completed yet</h3>
            <p className="text-xs text-slate-400">
              Start a custom practice or timed mock exam block to begin logging your USMLE and AMC performance records.
            </p>
            <button
              onClick={() => setCurrentTab('practice')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs inline-flex items-center gap-2 transition-all shadow-md"
            >
              <PlayCircle className="w-4 h-4" /> Start Your First Block
            </button>
          </div>
        ) : (
          testHistory.map((test) => {
            const accuracy = test.accuracyPercentage || 0;
            const isPassing = accuracy >= 60;

            return (
              <div
                key={test.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-bold font-mono">
                      {test.examType}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono text-[11px]">
                      {test.mode === 'tutor' ? '⚡ Tutor Mode' : '⏱️ Timed Mock'}
                    </span>
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(test.completedAt || test.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-100">{test.title}</h3>

                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span>
                      {test.questions.length} Questions ({test.correctCount || 0} Correct)
                    </span>
                    {test.usmleScaledScore && (
                      <span className="text-blue-400 font-mono font-bold">
                        USMLE Score: {test.usmleScaledScore}
                      </span>
                    )}
                  </div>
                </div>

                {/* Score & Action Button */}
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <div className={`text-2xl font-extrabold font-mono ${accuracy >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {accuracy}%
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {isPassing ? 'Passing' : 'Review Needed'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => resumeTest(test)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                      {test.isCompleted ? 'Review Block' : 'Resume'}
                    </button>
                    <button
                      onClick={() => deleteTestHistoryItem(test.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-colors"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
