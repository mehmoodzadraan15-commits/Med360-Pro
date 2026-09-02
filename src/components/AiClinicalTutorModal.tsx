import React, { useState } from 'react';
import { useExam } from '../context/ExamContext';
import { Bot, Sparkles, Send, X, Lightbulb, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';

export const AiClinicalTutorModal: React.FC = () => {
  const { isAiTutorOpen, setIsAiTutorOpen, activeTutorQuestion } = useExam();
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: "👋 Hello, Doctor! I am your AI Clinical Tutor. Ask me any pathophysiological question, distractor elimination reasoning, high-yield mnemonic request, or exam strategy on this clinical case.",
    },
  ]);
  const [isConsulting, setIsConsulting] = useState(false);

  const presetQueries = [
    'Explain why each wrong distractor fails in this case',
    'Give me a First Aid / AMC memory mnemonic for this topic',
    'Step-by-step pathophysiology mechanism breakdown',
    'What are the key differentiating clinical features from similar conditions?',
    'What are the gold-standard first-line guidelines for this diagnosis?',
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || prompt;
    if (!textToSend.trim() || isConsulting) return;

    const userMsg = { sender: 'user' as const, text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setPrompt('');
    setIsConsulting(true);

    try {
      const payload = {
        questionText: activeTutorQuestion ? `${activeTutorQuestion.vignette}\n\n${activeTutorQuestion.question}` : 'General Medical Question',
        options: activeTutorQuestion?.options || [],
        userAnswer: activeTutorQuestion?.userLastAnswer,
        correctAnswer: activeTutorQuestion ? `${activeTutorQuestion.correctOptionId}: ${activeTutorQuestion.options.find(o => o.id === activeTutorQuestion.correctOptionId)?.text}` : '',
        explanation: activeTutorQuestion?.explanation || '',
        prompt: textToSend,
        examType: activeTutorQuestion?.exam || 'USMLE & AMC',
      };

      const res = await fetch('/api/ai/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const reply = data.response || data.error || 'Review the clinical vignette for age, onset, and classic physical findings.';
      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `High-Yield Summary: Focus on the patient's age, chronicity of symptoms, and pivotal diagnostic findings in the question stem to rule out distractors methodically.`,
        },
      ]);
    } finally {
      setIsConsulting(false);
    }
  };

  if (!isAiTutorOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-100">AI Clinical Professor</h2>
                <span className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  <Sparkles className="w-3 h-3" /> USMLE & AMC Tutor
                </span>
              </div>
              <p className="text-xs text-slate-400">Deep clinical reasoning, differential diagnoses, and mnemonic generator</p>
            </div>
          </div>
          <button
            onClick={() => setIsAiTutorOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Case Context Pill if question is active */}
        {activeTutorQuestion && (
          <div className="px-6 py-2.5 bg-slate-950/90 border-b border-slate-800 text-xs flex items-center justify-between text-slate-300">
            <div className="flex items-center gap-2 truncate pr-4">
              <BookOpen className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="text-slate-400">Active Case:</span>
              <span className="font-semibold text-slate-200 truncate">{activeTutorQuestion.topic}</span>
              <span className="text-slate-400 font-mono">({activeTutorQuestion.exam})</span>
            </div>
            <span className="shrink-0 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono">
              Key: Option {activeTutorQuestion.correctOptionId}
            </span>
          </div>
        )}

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin bg-slate-900/50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[82%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-950/90 text-slate-200 border border-slate-800 shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isConsulting && (
            <div className="flex gap-3 justify-start items-center text-xs text-purple-400 py-2">
              <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin" />
              </div>
              <span>Clinical Professor is analyzing pathophysiology & exam pearls...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-5 py-2.5 bg-slate-950/70 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-[11px] text-slate-400 flex items-center gap-1 shrink-0">
            <Lightbulb className="w-3 h-3 text-amber-400" /> Prompts:
          </span>
          {presetQueries.map((q, idx) => (
            <button
              key={idx}
              disabled={isConsulting}
              onClick={() => handleSend(q)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white whitespace-nowrap transition-colors border border-slate-700/60 disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex gap-2">
          <input
            type="text"
            id="ai-tutor-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about this case (e.g. Why is Option C incorrect?)"
            className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
          />
          <button
            onClick={() => handleSend()}
            disabled={!prompt.trim() || isConsulting}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold rounded-xl flex items-center gap-2 text-sm transition-all shadow-md"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};
