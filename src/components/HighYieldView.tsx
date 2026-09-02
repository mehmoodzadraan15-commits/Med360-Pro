import React, { useState } from 'react';
import { useExam } from '../context/ExamContext';
import { HighYieldTopic } from '../types';
import {
  Sparkles,
  Search,
  Bookmark,
  Award,
  AlertTriangle,
  Flame,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Play,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

export const HighYieldView: React.FC = () => {
  const { highYieldTopics, toggleHighYieldBookmark, startNewTest } = useExam();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);

  const subjects = ['all', 'Medicine', 'Surgery', "Women's Health (O&G)", 'Paediatrics', 'Population Health & Ethics'];

  const filteredTopics = highYieldTopics.filter((topic) => {
    if (selectedSubject !== 'all' && topic.subject !== selectedSubject) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        topic.title.toLowerCase().includes(q) ||
        topic.summary.toLowerCase().includes(q) ||
        topic.system.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handlePracticeQuestionsForTopic = async (topic: HighYieldTopic) => {
    await startNewTest({
      examType: 'AMC CAT MCQ',
      mode: 'tutor',
      title: `${topic.title} High-Yield Practice`,
      subjects: [topic.subject],
      systems: [topic.system],
      difficulties: [],
      questionCount: 15,
      timePerQuestionSec: 72,
      statusFilter: 'all'
    });
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-400" />
            High-Yield Clinical Revision
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Essential high-frequency exam concepts, clinical pearls, red flags, and common pitfalls curated by Dr. Jaanvi.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search high-yield pearls..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#091124] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {subjects.map((sub) => (
          <button
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedSubject === sub
                ? 'bg-purple-600 text-white shadow-md shadow-purple-950/40'
                : 'bg-[#091124] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {sub === 'all' ? 'All Subjects' : sub}
          </button>
        ))}
      </div>

      {/* Topics Accordion List */}
      <div className="space-y-4">
        {filteredTopics.map((topic) => {
          const isExpanded = expandedTopicId === topic.id;

          return (
            <div
              key={topic.id}
              className="rounded-3xl bg-[#091124] border border-slate-800 hover:border-slate-700 transition-all overflow-hidden"
            >
              {/* Header Header */}
              <div
                onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                className="p-5 sm:p-6 cursor-pointer flex items-start justify-between gap-4 select-none"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[11px] font-bold">
                      {topic.subject}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      {topic.system}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-rose-950/50 text-rose-400 border border-rose-800 text-[10px] font-bold">
                      AMC {topic.amcRelevance}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {topic.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {topic.summary}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleHighYieldBookmark(topic.id);
                    }}
                    className="p-2 rounded-xl text-slate-500 hover:text-purple-400"
                  >
                    <Bookmark className={`w-4 h-4 ${topic.isBookmarked ? 'fill-purple-400 text-purple-400' : ''}`} />
                  </button>
                  <div className="p-2 rounded-xl bg-slate-800 text-slate-300">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded Detailed Content */}
              {isExpanded && (
                <div className="p-6 border-t border-slate-800/80 bg-[#070d1c] space-y-5 animate-fadeIn">
                  {/* Key Facts */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-cyan-400" /> Core Clinical Facts
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                      {topic.keyFacts.map((fact, idx) => (
                        <li key={idx} className="leading-relaxed">{fact}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Clinical Pearls */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#0e1634] to-cyan-950/40 border border-purple-500/30 space-y-2">
                    <span className="text-xs font-black uppercase text-purple-300 tracking-wide flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-purple-400" /> Dr. Jaanvi High-Yield Pearls
                    </span>
                    <ul className="space-y-1 text-xs text-purple-100 list-disc list-inside">
                      {topic.clinicalPearls.map((pearl, idx) => (
                        <li key={idx} className="leading-relaxed">{pearl}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Red Flags & Common Traps */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/30 space-y-1.5">
                      <span className="text-xs font-bold text-red-400 uppercase flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" /> Critical Red Flags
                      </span>
                      <ul className="space-y-1 text-xs text-red-200 list-disc list-inside">
                        {topic.redFlags.map((rf, idx) => (
                          <li key={idx} className="leading-relaxed">{rf}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-1.5">
                      <span className="text-xs font-bold text-amber-400 uppercase flex items-center gap-1.5">
                        <Flame className="w-4 h-4" /> Common Exam Traps
                      </span>
                      <ul className="space-y-1 text-xs text-amber-200 list-disc list-inside">
                        {topic.commonExamTraps.map((trap, idx) => (
                          <li key={idx} className="leading-relaxed">{trap}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Quick Launch MCQs Button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handlePracticeQuestionsForTopic(topic)}
                      className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-950/50 flex items-center gap-2"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Practice MCQs on this Topic</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
