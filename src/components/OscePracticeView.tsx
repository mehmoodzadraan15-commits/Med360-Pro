import React, { useState } from 'react';
import { useExam } from '../context/ExamContext';
import { OsceStation } from '../types';
import {
  Stethoscope,
  Clock,
  CheckCircle2,
  Bookmark,
  Play,
  Award,
  ChevronRight,
  AlertTriangle,
  User,
  Heart,
  Activity,
  FileText,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff
} from 'lucide-react';

export const OscePracticeView: React.FC = () => {
  const { osceStations, toggleOsceBookmark, saveOsceScore } = useExam();

  const [activeStation, setActiveStation] = useState<OsceStation | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [stationTimer, setStationTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false);

  const categories = [
    'all',
    'History Taking',
    'Physical Examination',
    'Communication Skills',
    'Emergency Management',
    'Mental Health'
  ];

  const filteredStations = osceStations.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  const handleStartStation = (station: OsceStation) => {
    setActiveStation(station);
    setStationTimer(station.durationMinutes * 60);
    setIsTimerRunning(true);
    setCheckedItems({});
    setShowModelAnswer(false);
  };

  const handleToggleChecklist = (itemId: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleFinishStation = async () => {
    if (!activeStation) return;
    setIsTimerRunning(false);

    let totalPoints = 0;
    let earnedPoints = 0;

    activeStation.checklist.forEach((item) => {
      totalPoints += item.points;
      if (checkedItems[item.id]) {
        earnedPoints += item.points;
      }
    });

    const scorePercentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
    await saveOsceScore(activeStation.id, scorePercentage);
    setShowModelAnswer(true);
  };

  // Format timer MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-rose-400" />
            AMC Clinical OSCE Stations
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Timed interactive stations covering history taking, physical exams, communication (SPIKES), and emergency management.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 bg-[#091124] p-1.5 rounded-2xl border border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Stations' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Active Station In-Progress Modal / View */}
      {activeStation ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#091124] border border-rose-500/40 shadow-2xl space-y-6 animate-fadeIn">
          {/* Station Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="px-2.5 py-1 rounded-lg bg-rose-950/50 border border-rose-500/30 text-rose-400 text-xs font-bold">
                {activeStation.category}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {activeStation.title}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm font-bold text-cyan-400">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>{formatTime(stationTimer)}</span>
              </div>
              <button
                onClick={() => setActiveStation(null)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                Close Station
              </button>
            </div>
          </div>

          {/* Setting & Clinical Scenario */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 p-5 rounded-2xl bg-[#0c162e] border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Clinical Setting & Candidate Instructions
              </span>
              <p className="text-xs sm:text-sm text-slate-200 font-medium">
                <strong>Setting:</strong> {activeStation.setting}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeStation.scenario}
              </p>

              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-200 mb-1.5">Candidate Tasks:</h4>
                <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                  {activeStation.candidateInstructions.map((ins, i) => (
                    <li key={i}>{ins}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Patient Profile & Baseline Vitals */}
            <div className="p-5 rounded-2xl bg-[#0c162e] border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-4 h-4" />
                Simulated Patient Vitals
              </span>
              <div className="space-y-1.5 text-xs text-slate-300">
                <p><strong>Name:</strong> {activeStation.patientProfile.name} ({activeStation.patientProfile.age} yo {activeStation.patientProfile.gender})</p>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1 font-mono text-[11px] text-cyan-300">
                  <div>BP: {activeStation.patientProfile.vitals.bp}</div>
                  <div>HR: {activeStation.patientProfile.vitals.hr}</div>
                  <div>RR: {activeStation.patientProfile.vitals.rr}</div>
                  <div>Temp: {activeStation.patientProfile.vitals.temp}</div>
                  <div>SpO2: {activeStation.patientProfile.vitals.spo2}</div>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal pt-1">
                  <strong>Complaint:</strong> {activeStation.patientProfile.presentingComplaint}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Candidate Marking Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Candidate Self-Assessment Marking Checklist
              </h3>
              <span className="text-xs text-slate-400">
                Check off items you performed during this station
              </span>
            </div>

            <div className="space-y-2">
              {activeStation.checklist.map((item) => {
                const isChecked = checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => handleToggleChecklist(item.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                        : 'bg-[#0c162e] border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isChecked ? 'bg-emerald-500 text-white' : 'border border-slate-600'
                      }`}
                    >
                      {isChecked && '✓'}
                    </div>
                    <div className="flex-1 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <span>{item.task}</span>
                        {item.isMandatory && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">
                            Mandatory Pass Item
                          </span>
                        )}
                      </div>
                      {item.clinicalPearl && isChecked && (
                        <p className="text-xs text-emerald-300 mt-1 font-medium italic">
                          Pearl: {item.clinicalPearl}
                        </p>
                      )}
                    </div>
                    <span className="text-xs font-bold text-slate-400 shrink-0">
                      {item.points} pts
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action to Complete & Reveal Model Answer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setShowModelAnswer(!showModelAnswer)}
              className="text-xs text-cyan-400 hover:underline font-bold flex items-center gap-1.5"
            >
              {showModelAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showModelAnswer ? 'Hide Model Consultation' : 'Show Model Consultation & Examiner Tips'}</span>
            </button>

            <button
              onClick={handleFinishStation}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold shadow-lg shadow-rose-950/50 flex items-center gap-2 transition-all"
            >
              <Award className="w-4 h-4" />
              <span>Score & Complete Station</span>
            </button>
          </div>

          {/* Model Answer & Examiner Tips */}
          {showModelAnswer && (
            <div className="p-6 rounded-2xl bg-[#0c1836] border border-cyan-500/40 space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-cyan-400">
                  Model Clinical Consultation
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  {activeStation.modelAnswer}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-1.5">
                  <span className="text-xs font-bold text-amber-400 uppercase flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Common Candidate Pitfalls
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                    {activeStation.commonMistakes.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-1.5">
                  <span className="text-xs font-bold text-purple-400 uppercase flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Examiner High-Yield Criteria
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                    {activeStation.highYieldPoints.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Stations Cards List */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStations.map((station) => (
            <div
              key={station.id}
              className="p-5 rounded-2xl bg-[#0b1326] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[11px] font-bold">
                    {station.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5" /> {station.durationMinutes} mins
                    </span>
                    <button
                      onClick={() => toggleOsceBookmark(station.id)}
                      className="text-slate-500 hover:text-indigo-400 p-1"
                    >
                      <Bookmark className={`w-4 h-4 ${station.isBookmarked ? 'fill-indigo-400 text-indigo-400' : ''}`} />
                    </button>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white">
                  {station.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {station.scenario}
                </p>

                {station.isCompleted && station.userScore !== undefined && (
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Last Score: {station.userScore}%
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {station.checklist.length} Marking Items
                </span>
                <button
                  onClick={() => handleStartStation(station)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-rose-950/40 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Start Station</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
