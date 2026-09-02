import React, { useState, useMemo } from 'react';
import { useExam } from '../context/ExamContext';
import {
  Bookmark,
  FileText,
  Trash2,
  PlayCircle,
  Search,
  BookOpen,
  Bot,
  Save,
  Check,
  Sparkles,
} from 'lucide-react';

export const BookmarksAndNotes: React.FC = () => {
  const {
    questions,
    toggleBookmark,
    updateQuestionNote,
    openAiTutorForQuestion,
    startNewTest,
    setCurrentTab,
  } = useExam();

  const [activeSubTab, setActiveSubTab] = useState<'bookmarks' | 'notes'>('bookmarks');
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const bookmarkedQuestions = useMemo(() => {
    return questions.filter((q) => q.isBookmarked);
  }, [questions]);

  const questionsWithNotes = useMemo(() => {
    return questions.filter((q) => q.userNote && q.userNote.trim().length > 0);
  }, [questions]);

  const displayedList = useMemo(() => {
    const list = activeSubTab === 'bookmarks' ? bookmarkedQuestions : questionsWithNotes;
    if (!search.trim()) return list;
    const s = search.toLowerCase();
    return list.filter(
      (q) =>
        q.topic.toLowerCase().includes(s) ||
        q.vignette.toLowerCase().includes(s) ||
        (q.userNote && q.userNote.toLowerCase().includes(s)) ||
        q.educationalObjective.toLowerCase().includes(s)
    );
  }, [activeSubTab, bookmarkedQuestions, questionsWithNotes, search]);

  const handleStartReviewBlock = async () => {
    const pool = activeSubTab === 'bookmarks' ? bookmarkedQuestions : questionsWithNotes;
    if (pool.length === 0) return;

    await startNewTest({
      examType: 'All Exams',
      mode: 'tutor',
      title: activeSubTab === 'bookmarks' ? 'Bookmarked High-Yield Review' : 'High-Yield Notes Review',
      subjects: [],
      systems: [],
      difficulties: [],
      questionCount: Math.min(20, pool.length),
      timePerQuestionSec: 90,
      statusFilter: activeSubTab === 'bookmarks' ? 'bookmarked' : 'all',
    });
    setCurrentTab('practice');
  };

  const handleSaveNote = async (id: string) => {
    await updateQuestionNote(id, editText);
    setEditingId(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-yellow-400" />
              Saved Bookmarks & High-Yield Notes
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Review your saved questions, personalized mnemonics, and flagged high-yield concepts
            </p>
          </div>

          <button
            onClick={handleStartReviewBlock}
            disabled={displayedList.length === 0}
            className="px-5 py-2.5 bg-yellow-600 hover:bg-yellow-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-md shadow-yellow-600/20"
          >
            <PlayCircle className="w-4 h-4" />
            Practice This Set ({Math.min(20, displayedList.length)} Qs)
          </button>
        </div>

        {/* Tab & Search Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
            <button
              onClick={() => setActiveSubTab('bookmarks')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                activeSubTab === 'bookmarks'
                  ? 'bg-yellow-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" /> Bookmarks ({bookmarkedQuestions.length})
            </button>
            <button
              onClick={() => setActiveSubTab('notes')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                activeSubTab === 'notes'
                  ? 'bg-cyan-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> My Notes ({questionsWithNotes.length})
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search saved items..."
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-yellow-500"
            />
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {displayedList.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30 text-slate-500" />
            <h3 className="text-base font-bold text-slate-200">
              No {activeSubTab === 'bookmarks' ? 'bookmarked questions' : 'study notes'} found
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Click the bookmark icon or write custom notes during MCQ practice to save high-yield clinical pearls here.
            </p>
          </div>
        ) : (
          displayedList.map((q) => (
            <div
              key={q.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold">
                      {q.exam}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {q.subject}
                    </span>
                    <span className="text-amber-400 font-mono">
                      Key: Option {q.correctOptionId}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-100">{q.topic}</h3>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => toggleBookmark(q.id)}
                    className="p-2 text-yellow-400 hover:text-slate-400 transition-colors"
                    title="Remove Bookmark"
                  >
                    <Bookmark className={`w-4 h-4 ${q.isBookmarked ? 'fill-yellow-400' : ''}`} />
                  </button>
                  <button
                    onClick={() => openAiTutorForQuestion(q)}
                    className="p-2 text-purple-400 hover:text-purple-300 transition-colors"
                    title="Ask AI Clinical Tutor"
                  >
                    <Bot className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Vignette Preview */}
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed bg-slate-950/60 p-2.5 rounded-xl border border-slate-850">
                {q.vignette}
              </p>

              {/* Educational Objective */}
              <div className="text-xs text-blue-300 font-medium">
                🎯 {q.educationalObjective}
              </div>

              {/* User Note Box */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center justify-between text-slate-400 mb-1.5">
                  <span className="font-semibold flex items-center gap-1 text-cyan-400">
                    <FileText className="w-3.5 h-3.5" /> My Personal Study Note:
                  </span>
                  {editingId !== q.id ? (
                    <button
                      onClick={() => {
                        setEditingId(q.id);
                        setEditText(q.userNote || '');
                      }}
                      className="text-cyan-400 hover:text-cyan-300 text-[11px]"
                    >
                      {q.userNote ? 'Edit' : '+ Add Note'}
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSaveNote(q.id)}
                        className="text-emerald-400 hover:text-emerald-300 text-[11px] font-bold"
                      >
                        Save
                      </button>
                      <button onClick={() => setEditingId(null)} className="text-slate-400 text-[11px]">
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                {editingId === q.id ? (
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={2}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-100"
                  />
                ) : (
                  <p className="text-slate-300 italic">
                    {q.userNote || 'No custom notes attached yet.'}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
