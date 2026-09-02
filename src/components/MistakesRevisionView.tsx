import React from 'react';
import { useExam } from '../context/ExamContext';
import {
  RotateCcw,
  AlertTriangle,
  Play,
  CheckCircle2,
  Layers,
  ArrowRight,
  TrendingDown,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const MistakesRevisionView: React.FC = () => {
  const { performanceStats, startNewTest, questions, setCurrentTab } = useExam();

  const incorrectCount = performanceStats.totalIncorrect;

  const handleStartMistakesDrill = async () => {
    await startNewTest({
      examType: 'AMC CAT MCQ',
      mode: 'tutor',
      title: 'Targeted Mistakes Revision Drill',
      subjects: [],
      systems: [],
      difficulties: [],
      questionCount: Math.min(50, Math.max(10, incorrectCount)),
      timePerQuestionSec: 72,
      statusFilter: 'incorrect'
    });
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <RotateCcw className="w-6 h-6 text-orange-400" />
            "My Mistakes" Revision Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Targeted active recall practice specifically for questions you previously answered incorrectly.
          </p>
        </div>

        {incorrectCount > 0 && (
          <button
            onClick={handleStartMistakesDrill}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-bold text-xs shadow-lg shadow-orange-950/40 flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Launch Mistakes Drill ({incorrectCount} Qs)</span>
          </button>
        )}
      </div>

      {/* Summary Stat Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1c0f0d] via-[#120a1c] to-[#080e1c] border border-orange-500/30 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-orange-950/60 border border-orange-500/40 text-orange-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              {incorrectCount} Questions in Your Revision Queue
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Reviewing your incorrect questions until mastery reaches 100% is the highest-yield method for AMC CAT MCQ success.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400">Total Answered</span>
            <div className="text-xl font-bold text-white mt-1">
              {performanceStats.totalQuestionsAnswered}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400">Correct on First Attempt</span>
            <div className="text-xl font-bold text-emerald-400 mt-1">
              {performanceStats.totalCorrect}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400">Need Review</span>
            <div className="text-xl font-bold text-orange-400 mt-1">
              {incorrectCount}
            </div>
          </div>
        </div>
      </div>

      {/* Weak Topics List */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-red-400" />
          Weakest Topic Areas
        </h3>

        {performanceStats.weakTopics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {performanceStats.weakTopics.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0b1326] border border-slate-800 flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400">{item.subject}</span>
                  <h4 className="text-sm font-bold text-white">{item.topic}</h4>
                  <div className="text-xs text-red-400 font-semibold">
                    {item.accuracy}% Accuracy ({item.incorrectCount} missed)
                  </div>
                </div>

                <button
                  onClick={async () => {
                    await startNewTest({
                      examType: 'AMC CAT MCQ',
                      mode: 'tutor',
                      title: `${item.topic} Targeted Drill`,
                      subjects: [item.subject],
                      systems: [],
                      difficulties: [],
                      questionCount: 15,
                      timePerQuestionSec: 72,
                      statusFilter: 'all'
                    });
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold shrink-0"
                >
                  Drill Topic
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-[#0b1326] border border-slate-800 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold text-white">No active incorrect questions!</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Keep practicing in the Question Bank or Mock Exam modules. When you answer any question incorrectly, it will automatically populate here for revision.
            </p>
            <button
              onClick={() => setCurrentTab('bank')}
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs inline-flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Go to Question Bank</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
