import React, { useState, useMemo } from 'react';
import { useExam } from '../context/ExamContext';
import {
  Search,
  X,
  Layers,
  Stethoscope,
  FileCheck2,
  Sparkles,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    questions,
    osceStations,
    clinicalCases,
    highYieldTopics,
    setCurrentTab,
    startNewTest
  } = useExam();

  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim() || query.length < 2) return null;
    const q = query.toLowerCase();

    const matchedQuestions = questions.filter((item) =>
      item.question.toLowerCase().includes(q) ||
      item.vignette.toLowerCase().includes(q) ||
      item.topic.toLowerCase().includes(q) ||
      item.subject.toLowerCase().includes(q)
    ).slice(0, 5);

    const matchedOsce = osceStations.filter((item) =>
      item.title.toLowerCase().includes(q) ||
      item.scenario.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedCases = clinicalCases.filter((item) =>
      item.title.toLowerCase().includes(q) ||
      item.chiefComplaint.toLowerCase().includes(q) ||
      item.specialty.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedTopics = highYieldTopics.filter((item) =>
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.subject.toLowerCase().includes(q)
    ).slice(0, 4);

    return {
      questions: matchedQuestions,
      osce: matchedOsce,
      cases: matchedCases,
      topics: matchedTopics
    };
  }, [query, questions, osceStations, clinicalCases, highYieldTopics]);

  if (!isSearchModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center p-4 pt-16 sm:pt-24 animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#091124] border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions, topics, OSCE stations, clinical cases..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="px-2.5 py-1 rounded-lg bg-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {!searchResults ? (
            <div className="text-center py-12 space-y-2 text-slate-400 text-xs">
              <p>Type at least 2 characters to search across the entire Med 360 database.</p>
              <div className="flex justify-center gap-2 pt-2">
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700 text-slate-300 text-[11px]">
                  "Preeclampsia"
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700 text-slate-300 text-[11px]">
                  "Atrial Fibrillation"
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700 text-slate-300 text-[11px]">
                  "Intussusception"
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* High-Yield Topics */}
              {searchResults.topics.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> High-Yield Topics ({searchResults.topics.length})
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.topics.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          setCurrentTab('highyield');
                          setIsSearchModalOpen(false);
                        }}
                        className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <h4 className="text-xs font-bold text-white">{t.title}</h4>
                          <p className="text-[11px] text-slate-400">{t.subject} • {t.system}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-purple-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MCQs */}
              {searchResults.questions.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> Questions ({searchResults.questions.length})
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.questions.map((q) => (
                      <div
                        key={q.id}
                        onClick={async () => {
                          setIsSearchModalOpen(false);
                          await startNewTest({
                            examType: 'AMC CAT MCQ',
                            mode: 'tutor',
                            title: `Question Search: ${q.topic}`,
                            subjects: [q.subject],
                            systems: [],
                            difficulties: [],
                            questionCount: 10,
                            timePerQuestionSec: 72,
                            statusFilter: 'all'
                          });
                        }}
                        className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 cursor-pointer flex items-center justify-between"
                      >
                        <div className="min-w-0 pr-3">
                          <h4 className="text-xs font-bold text-white truncate">{q.question}</h4>
                          <p className="text-[11px] text-slate-400">{q.subject} • {q.topic}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* OSCE Stations */}
              {searchResults.osce.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5" /> OSCE Stations ({searchResults.osce.length})
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.osce.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          setCurrentTab('osce');
                          setIsSearchModalOpen(false);
                        }}
                        className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/50 cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <h4 className="text-xs font-bold text-white">{s.title}</h4>
                          <p className="text-[11px] text-slate-400">{s.category}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-rose-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
