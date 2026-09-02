import React, { useState, useMemo } from 'react';
import { useExam } from '../context/ExamContext';
import { LAB_REFERENCE_VALUES } from '../data/labValues';
import { Search, X, Copy, Check, FlaskConical, Filter } from 'lucide-react';

export const LabValuesModal: React.FC = () => {
  const { isLabModalOpen, setIsLabModalOpen } = useExam();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set(LAB_REFERENCE_VALUES.map((l) => l.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredValues = useMemo(() => {
    return LAB_REFERENCE_VALUES.filter((item) => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.referenceRangeUS.toLowerCase().includes(search.toLowerCase()) ||
        (item.clinicalSignificance && item.clinicalSignificance.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [search, selectedCategory]);

  const handleCopy = (item: typeof LAB_REFERENCE_VALUES[0]) => {
    navigator.clipboard.writeText(`${item.name}: ${item.referenceRangeUS} (${item.referenceRangeSI})`);
    setCopiedName(item.name);
    setTimeout(() => setCopiedName(null), 1800);
  };

  if (!isLabModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Standard Laboratory Reference Values
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  USMLE & AMC
                </span>
              </h2>
              <p className="text-xs text-slate-400">Official reference intervals for examination blocks</p>
            </div>
          </div>
          <button
            id="close-lab-values-btn"
            onClick={() => setIsLabModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              id="lab-search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search test (e.g., Sodium, PaO2, AST)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Category Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-750'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
          {filteredValues.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <FlaskConical className="w-12 h-12 mx-auto mb-3 opacity-30 text-slate-500" />
              <p className="text-sm">No laboratory tests found matching "{search}".</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredValues.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/60 border border-slate-800 hover:border-slate-700 rounded-xl p-3.5 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="font-semibold text-sm text-slate-200">{item.name}</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-750">
                        {item.category}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 my-2 bg-slate-900/80 p-2 rounded-lg text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">US Units</span>
                        <span className="font-mono font-medium text-emerald-400">{item.referenceRangeUS}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">SI Units</span>
                        <span className="font-mono font-medium text-cyan-400">{item.referenceRangeSI}</span>
                      </div>
                    </div>

                    {item.clinicalSignificance && (
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 italic">
                        💡 {item.clinicalSignificance}
                      </p>
                    )}
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                    <span>Clinical Reference</span>
                    <button
                      onClick={() => handleCopy(item)}
                      className="flex items-center gap-1 text-slate-400 hover:text-slate-200 text-xs px-2 py-1 rounded bg-slate-800/60 hover:bg-slate-800 transition-colors"
                    >
                      {copiedName === item.name ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filteredValues.length} of {LAB_REFERENCE_VALUES.length} standard reference values</span>
          <button
            onClick={() => setIsLabModalOpen(false)}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition-colors"
          >
            Close Sheet
          </button>
        </div>
      </div>
    </div>
  );
};
