import React, { useState } from 'react';
import { useExam } from '../context/ExamContext';
import { TestSession, Question } from '../types';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Sparkles,
  Award,
  BookOpen,
  ArrowRight,
  Filter,
  Bot,
  Bookmark,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ExamScoreReportProps {
  session: TestSession;
}

export const ExamScoreReport: React.FC<ExamScoreReportProps> = ({ session }) => {
  const { exitActiveTest, setCurrentTab, openAiTutorForQuestion, toggleBookmark } = useExam();
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'flagged'>('all');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  const filteredQuestions = session.questions.filter((q) => {
    const userAns = session.userAnswers[q.id];
    const isCorrect = userAns === q.correctOptionId;
    const isFlagged = session.flaggedQuestionIds.includes(q.id);

    if (reviewFilter === 'incorrect') return !isCorrect;
    if (reviewFilter === 'flagged') return isFlagged;
    return true;
  });

  const accuracy = session.accuracyPercentage || 0;
  const isPassing = accuracy >= 60;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 animate-fadeIn">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold font-mono">
                {session.examType}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Completed on {new Date(session.completedAt || session.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">{session.title}</h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => exitActiveTest()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors shadow-md"
            >
              Start New Test Block
            </button>
            <button
              onClick={() => {
                exitActiveTest();
                setCurrentTab('dashboard');
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-bold rounded-xl transition-colors"
            >
              Dashboard
            </button>
          </div>
        </div>

        {/* Scaled Score Hero Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* USMLE 3-Digit Score */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Estimated Scaled Score
            </span>
            <div className="text-4xl font-extrabold text-blue-400 font-mono my-1">
              {session.usmleScaledScore || 220}
            </div>
            <span className="text-xs text-slate-400">
              {isPassing ? '✅ Passing Performance' : '⚠️ Below Passing Cutoff'}
            </span>
          </div>

          {/* Percentile Rank */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Percentile Rank
            </span>
            <div className="text-4xl font-extrabold text-purple-400 font-mono my-1">
              {session.percentileRank || 50}th
            </div>
            <span className="text-xs text-slate-400">Among all examinees</span>
          </div>

          {/* Accuracy Percentage */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Block Accuracy
            </span>
            <div className={`text-4xl font-extrabold font-mono my-1 ${accuracy >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {accuracy}%
            </div>
            <span className="text-xs text-slate-400">
              {session.correctCount} Correct / {session.incorrectCount} Incorrect / {session.unansweredCount} Omitted
            </span>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" /> Question-by-Question Review
            </h2>
            <p className="text-xs text-slate-400">Examine distractors, high-yield pearls, and learning objectives</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setReviewFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                reviewFilter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({session.questions.length})
            </button>
            <button
              onClick={() => setReviewFilter('incorrect')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                reviewFilter === 'incorrect' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Incorrect ({session.incorrectCount})
            </button>
            <button
              onClick={() => setReviewFilter('flagged')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                reviewFilter === 'flagged' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Flagged ({session.flaggedQuestionIds.length})
            </button>
          </div>
        </div>

        {/* Question List Accordion */}
        <div className="space-y-3">
          {filteredQuestions.map((q, idx) => {
            const userAns = session.userAnswers[q.id];
            const isCorrect = userAns === q.correctOptionId;
            const isExpanded = expandedQuestionId === q.id;

            return (
              <div
                key={q.id}
                className="bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 transition-all"
              >
                {/* Header Row */}
                <div
                  className="flex items-center justify-between gap-3 cursor-pointer"
                  onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isCorrect
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {isCorrect ? '✓' : '✗'}
                    </span>
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-200 truncate">{q.topic}</div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {q.subject} • {q.system}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                      Your answer: <strong className={isCorrect ? 'text-emerald-400' : 'text-rose-400'}>{userAns || 'None'}</strong> | Key: <strong className="text-emerald-400">{q.correctOptionId}</strong>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(q.id);
                      }}
                      className="p-1 text-slate-400 hover:text-yellow-400 transition-colors"
                    >
                      <Bookmark className={`w-4 h-4 ${q.isBookmarked ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                    </button>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {/* Expanded Question Review Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-4 text-xs sm:text-sm animate-fadeIn">
                    {/* Vignette */}
                    <div className="p-3 bg-slate-900 rounded-xl text-slate-300 whitespace-pre-line leading-relaxed text-xs">
                      {q.vignette}
                    </div>

                    {/* Question Prompt */}
                    <p className="font-semibold text-slate-100">{q.question}</p>

                    {/* Options list with correct/incorrect markers */}
                    <div className="space-y-1.5">
                      {q.options.map((opt) => {
                        const isChosen = userAns === opt.id;
                        const isRight = opt.id === q.correctOptionId;

                        let style = 'bg-slate-900 text-slate-300';
                        if (isRight) style = 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-100 font-semibold';
                        else if (isChosen && !isRight) style = 'bg-rose-950/60 border border-rose-500/50 text-rose-100';

                        return (
                          <div key={opt.id} className={`p-2.5 rounded-xl text-xs flex items-center justify-between ${style}`}>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold">{opt.id}.</span>
                              <span>{opt.text}</span>
                            </div>
                            {isRight && <span className="text-[10px] font-bold text-emerald-400 uppercase">Correct Key</span>}
                            {isChosen && !isRight && <span className="text-[10px] font-bold text-rose-400 uppercase">Your Choice</span>}
                          </div>
                        );
                      })}
                    </div>

                    {/* Educational Objective */}
                    <div className="p-3 bg-blue-950/40 border border-blue-500/30 rounded-xl text-xs text-blue-200">
                      <strong className="text-blue-400">Educational Objective: </strong>
                      {q.educationalObjective}
                    </div>

                    {/* Explanation */}
                    <div className="p-3.5 bg-slate-900 rounded-xl space-y-2 text-xs leading-relaxed text-slate-300">
                      <span className="font-bold text-slate-200 block">Explanation</span>
                      <p>{q.explanation}</p>
                    </div>

                    {/* AI Professor Trigger */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => openAiTutorForQuestion(q)}
                        className="px-3 py-1.5 bg-purple-600/90 hover:bg-purple-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                      >
                        <Bot className="w-3.5 h-3.5" /> Consult AI Professor on this Question
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
