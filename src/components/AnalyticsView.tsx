import React from 'react';
import { useExam } from '../context/ExamContext';
import {
  BarChart3,
  Target,
  Trophy,
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Award,
  BookOpen,
  RotateCcw
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { performanceStats, testHistory, totalQuestionCount } = useExam();

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-emerald-400" />
          Candidate Performance Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Real-time diagnostic breakdown of subject mastery, AMC scaled score projection, and timing efficiency.
        </p>
      </div>

      {/* Top Scaled Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0b1326] border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400">Predicted AMC Scaled Score</span>
          <div className="text-3xl font-black text-blue-400">{performanceStats.amcScaledScore} <span className="text-sm font-normal text-slate-400">/ 350</span></div>
          <div className="text-xs text-emerald-400 font-semibold">{performanceStats.amcPassProbability}% Pass Probability</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0b1326] border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400">Overall Accuracy</span>
          <div className="text-3xl font-black text-emerald-400">{performanceStats.overallAccuracy}%</div>
          <div className="text-xs text-slate-400">{performanceStats.totalCorrect} correct out of {performanceStats.totalQuestionsAnswered} answered</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0b1326] border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400">Average Response Time</span>
          <div className="text-3xl font-black text-cyan-400">{performanceStats.averageSecondsPerQuestion}s</div>
          <div className="text-xs text-slate-400">Target pace: ≤ 72s per question</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0b1326] border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400">Tests Completed</span>
          <div className="text-3xl font-black text-purple-400">{performanceStats.totalTestsCompleted}</div>
          <div className="text-xs text-slate-400">{testHistory.length} total test records</div>
        </div>
      </div>

      {/* Subject Mastery Breakdown */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#091124] border border-slate-800 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-cyan-400" />
          Subject Proficiency & Accuracy
        </h2>

        <div className="space-y-4">
          {Object.entries(performanceStats.subjectAccuracy).map(([subject, statsVal]) => {
            const stats = statsVal as { correct: number; total: number };
            const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
            return (
              <div key={subject} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                  <span className="text-white">{subject}</span>
                  <span className={pct >= 65 ? 'text-emerald-400 font-bold' : pct > 45 ? 'text-amber-400 font-bold' : 'text-slate-400 font-bold'}>
                    {pct}% ({stats.correct}/{stats.total} Qs)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      pct >= 65 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : pct > 45 ? 'bg-amber-500' : 'bg-slate-700'
                    }`}
                    style={{ width: `${Math.max(5, pct)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weak Topics Analysis */}
      {performanceStats.weakTopics.length > 0 && (
        <div className="p-6 rounded-3xl bg-[#1a0f12] border border-red-500/30 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Priority Weak Areas Identified
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            {performanceStats.weakTopics.map((wt, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-medium">{wt.subject}</span>
                <h4 className="font-bold text-white">{wt.topic}</h4>
                <div className="text-red-400 font-bold">{wt.accuracy}% accuracy ({wt.incorrectCount} missed)</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
