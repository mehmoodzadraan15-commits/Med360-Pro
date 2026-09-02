import React, { useState } from 'react';
import { useExam } from '../context/ExamContext';
import { Calculator as CalcIcon, X, Activity, RefreshCw } from 'lucide-react';

export const CalculatorModal: React.FC = () => {
  const { isCalcModalOpen, setIsCalcModalOpen } = useExam();
  const [activeTab, setActiveTab] = useState<'standard' | 'medical'>('medical');

  // Standard Calc state
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // Medical Formulas state
  // 1. Anion Gap
  const [na, setNa] = useState('');
  const [cl, setCl] = useState('');
  const [hco3, setHco3] = useState('');
  
  // 2. Corrected Calcium
  const [ca, setCa] = useState('');
  const [alb, setAlb] = useState('');

  // 3. MAP
  const [sbp, setSbp] = useState('');
  const [dbp, setDbp] = useState('');

  // 4. BMI
  const [weightKg, setWeightKg] = useState('');
  const [heightCm, setHeightCm] = useState('');

  // Standard calc handlers
  const handleDigit = (digit: string) => {
    if (waitingForOperand) {
      setCalcDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setCalcDisplay(calcDisplay === '0' ? digit : calcDisplay + digit);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setCalcDisplay('0.');
      setWaitingForOperand(false);
    } else if (!calcDisplay.includes('.')) {
      setCalcDisplay(calcDisplay + '.');
    }
  };

  const handleClear = () => {
    setCalcDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleOperator = (nextOp: string) => {
    const inputValue = parseFloat(calcDisplay);
    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const result = calculate(prevValue, inputValue, operator);
      setCalcDisplay(String(result));
      setPrevValue(result);
    }
    setWaitingForOperand(true);
    setOperator(nextOp);
  };

  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case '+': return first + second;
      case '-': return first - second;
      case '×': return first * second;
      case '÷': return second !== 0 ? first / second : 0;
      default: return second;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(calcDisplay);
    if (operator && prevValue !== null) {
      const result = calculate(prevValue, inputValue, operator);
      setCalcDisplay(String(result));
      setPrevValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  // Medical calculations
  const anionGap = (parseFloat(na) || 0) - ((parseFloat(cl) || 0) + (parseFloat(hco3) || 0));
  const correctedCalcium = (parseFloat(ca) || 0) + 0.8 * (4.0 - (parseFloat(alb) || 4.0));
  const map = ((parseFloat(sbp) || 0) + 2 * (parseFloat(dbp) || 0)) / 3;
  const bmiHeightM = (parseFloat(heightCm) || 0) / 100;
  const bmi = bmiHeightM > 0 ? (parseFloat(weightKg) || 0) / (bmiHeightM * bmiHeightM) : 0;

  if (!isCalcModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
              <CalcIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Medical Exam Calculator</h2>
              <p className="text-xs text-slate-400">Standard math & clinical formula calculators</p>
            </div>
          </div>
          <button
            onClick={() => setIsCalcModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 p-2 gap-2">
          <button
            onClick={() => setActiveTab('medical')}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'medical'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            Clinical Formulas (Anion Gap, Ca++, MAP, BMI)
          </button>
          <button
            onClick={() => setActiveTab('standard')}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'standard'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <CalcIcon className="w-4 h-4" />
            Standard Keypad
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 scrollbar-thin">
          {activeTab === 'medical' ? (
            <div className="space-y-4">
              {/* 1. Anion Gap */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm text-slate-200">Serum Anion Gap</span>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Normal: 8 – 12 mEq/L
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Na+ (mEq/L)</label>
                    <input
                      type="number"
                      value={na}
                      onChange={(e) => setNa(e.target.value)}
                      placeholder="140"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Cl- (mEq/L)</label>
                    <input
                      type="number"
                      value={cl}
                      onChange={(e) => setCl(e.target.value)}
                      placeholder="100"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">HCO3- (mEq/L)</label>
                    <input
                      type="number"
                      value={hco3}
                      onChange={(e) => setHco3(e.target.value)}
                      placeholder="24"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 font-mono"
                    />
                  </div>
                </div>
                <div className="mt-3 p-2.5 bg-slate-900 rounded-lg flex items-center justify-between">
                  <span className="text-xs text-slate-400">Calculated Gap: Na - (Cl + HCO3)</span>
                  <span className={`text-base font-bold font-mono ${anionGap > 12 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {na && cl && hco3 ? `${anionGap.toFixed(1)} mEq/L` : '—'}
                  </span>
                </div>
              </div>

              {/* 2. Corrected Calcium */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm text-slate-200">Corrected Calcium for Hypoalbuminemia</span>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    Normal: 8.5 – 10.2 mg/dL
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Total Calcium (mg/dL)</label>
                    <input
                      type="number"
                      value={ca}
                      onChange={(e) => setCa(e.target.value)}
                      placeholder="8.0"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Serum Albumin (g/dL)</label>
                    <input
                      type="number"
                      value={alb}
                      onChange={(e) => setAlb(e.target.value)}
                      placeholder="2.5"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 font-mono"
                    />
                  </div>
                </div>
                <div className="mt-3 p-2.5 bg-slate-900 rounded-lg flex items-center justify-between">
                  <span className="text-xs text-slate-400">Corrected Ca = Ca + 0.8 × (4.0 - Alb)</span>
                  <span className="text-base font-bold font-mono text-cyan-400">
                    {ca ? `${correctedCalcium.toFixed(2)} mg/dL` : '—'}
                  </span>
                </div>
              </div>

              {/* 3. MAP & BMI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* MAP */}
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="font-semibold text-xs text-slate-200 block mb-2">Mean Arterial Pressure (MAP)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={sbp}
                      onChange={(e) => setSbp(e.target.value)}
                      placeholder="SBP (120)"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-100 font-mono"
                    />
                    <input
                      type="number"
                      value={dbp}
                      onChange={(e) => setDbp(e.target.value)}
                      placeholder="DBP (80)"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-100 font-mono"
                    />
                  </div>
                  <div className="mt-2 text-right">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {sbp && dbp ? `${map.toFixed(1)} mm Hg` : '—'}
                    </span>
                  </div>
                </div>

                {/* BMI */}
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="font-semibold text-xs text-slate-200 block mb-2">Body Mass Index (BMI)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      placeholder="Weight (kg)"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-100 font-mono"
                    />
                    <input
                      type="number"
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      placeholder="Height (cm)"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-100 font-mono"
                    />
                  </div>
                  <div className="mt-2 text-right">
                    <span className="text-xs font-mono font-bold text-purple-400">
                      {bmi > 0 ? `${bmi.toFixed(1)} kg/m²` : '—'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Standard Keypad */
            <div>
              {/* Display */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-right font-mono text-2xl font-bold text-emerald-400 mb-4 overflow-x-auto">
                {calcDisplay}
              </div>

              {/* Grid of keys */}
              <div className="grid grid-cols-4 gap-2.5">
                <button onClick={handleClear} className="p-3 bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 rounded-xl font-bold">C</button>
                <button onClick={() => setCalcDisplay(String(parseFloat(calcDisplay) * -1))} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold">±</button>
                <button onClick={() => setCalcDisplay(String(Math.sqrt(Math.max(0, parseFloat(calcDisplay)))))} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold">√</button>
                <button onClick={() => handleOperator('÷')} className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg">÷</button>

                <button onClick={() => handleDigit('7')} className="p-3 bg-slate-800/80 hover:bg-slate-750 rounded-xl font-semibold text-base">7</button>
                <button onClick={() => handleDigit('8')} className="p-3 bg-slate-800/80 hover:bg-slate-750 rounded-xl font-semibold text-base">8</button>
                <button onClick={() => handleDigit('9')} className="p-3 bg-slate-800/80 hover:bg-slate-750 rounded-xl font-semibold text-base">9</button>
                <button onClick={() => handleOperator('×')} className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg">×</button>

                <button onClick={() => handleDigit('4')} className="p-3 bg-slate-800/80 hover:bg-slate-750 rounded-xl font-semibold text-base">4</button>
                <button onClick={() => handleDigit('5')} className="p-3 bg-slate-800/80 hover:bg-slate-750 rounded-xl font-semibold text-base">5</button>
                <button onClick={() => handleDigit('6')} className="p-3 bg-slate-800/80 hover:bg-slate-750 rounded-xl font-semibold text-base">6</button>
                <button onClick={() => handleOperator('-')} className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg">-</button>

                <button onClick={() => handleDigit('1')} className="p-3 bg-slate-800/80 hover:bg-slate-750 rounded-xl font-semibold text-base">1</button>
                <button onClick={() => handleDigit('2')} className="p-3 bg-slate-800/80 hover:bg-slate-750 rounded-xl font-semibold text-base">2</button>
                <button onClick={() => handleDigit('3')} className="p-3 bg-slate-800/80 hover:bg-slate-750 rounded-xl font-semibold text-base">3</button>
                <button onClick={() => handleOperator('+')} className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg">+</button>

                <button onClick={() => handleDigit('0')} className="p-3 bg-slate-800/80 hover:bg-slate-750 rounded-xl font-semibold text-base col-span-2">0</button>
                <button onClick={handleDecimal} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold text-lg">.</button>
                <button onClick={handleEquals} className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-lg">=</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
