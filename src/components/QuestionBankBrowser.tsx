import React, { useState, useMemo } from 'react';
import { useExam } from '../context/ExamContext';
import { SubjectType, SystemType, DifficultyLevel, MEDICINE_ORGAN_SYSTEMS, BASIC_SUBJECTS, CLINICAL_SUBJECTS } from '../types';
import {
  Search,
  SlidersHorizontal,
  Play,
  Layers,
  Clock,
  BookOpen,
  Filter,
  CheckSquare,
  Square,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Stethoscope,
  Brain,
  Baby,
  Activity,
  Heart,
  ShieldAlert,
  Flame,
  Zap,
  CheckCircle2,
  AlertCircle,
  X,
  Target,
  FileText,
  HelpCircle,
  Wind,
  Droplets,
  Bone,
  Shield,
  Eye,
  GraduationCap
} from 'lucide-react';

const SYSTEM_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'Cardiovascular System': Heart,
  'Respiratory System': Wind,
  'Gastrointestinal System': Layers,
  'Renal & Urinary System': Droplets,
  'Endocrine & Metabolic System': Activity,
  'Nervous System & Special Senses': Brain,
  'Musculoskeletal & Orthopaedics': Bone,
  'Hematological & Immune System': Shield,
  'Integumentary & Dermatology': Sparkles,
  'Emergency & Resuscitation': Flame
};

const SUBJECT_METADATA: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; desc: string; category: 'Basic' | 'Clinical' }> = {
  // Clinical Subjects (7,000 MCQs)
  'Medicine': { icon: Heart, color: 'text-red-400 bg-red-950/40 border-red-500/30', desc: 'Internal medicine categorized by all organ systems (Cardio, Resp, GI, Renal, Endo, Neuro, Rheum, Heme)', category: 'Clinical' },
  'Surgery': { icon: Activity, color: 'text-blue-400 bg-blue-950/40 border-blue-500/30', desc: 'General surgery, acute abdomen, trauma ATLS, vascular, orthopaedics, urology', category: 'Clinical' },
  "Women's Health (O&G)": { icon: Sparkles, color: 'text-pink-400 bg-pink-950/40 border-pink-500/30', desc: 'Obstetrics, gynaecological oncology, antenatal screening, PPH, labor management', category: 'Clinical' },
  'Paediatrics': { icon: Baby, color: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30', desc: 'Neonatology, child developmental milestones, pediatric emergency, infectious diseases', category: 'Clinical' },
  'Psychiatry': { icon: Brain, color: 'text-purple-400 bg-purple-950/40 border-purple-500/30', desc: 'Mood disorders, psychosis, psychopharmacology, RANZCP guidelines, Mental Health Act', category: 'Clinical' },
  'Acute Care & Emergency': { icon: Flame, color: 'text-orange-400 bg-orange-950/40 border-orange-500/30', desc: 'ALS resuscitation, shock algorithms, anaphylaxis, venomology, acute toxicology', category: 'Clinical' },
  'General Practice': { icon: Stethoscope, color: 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30', desc: 'Primary care, chronic disease management, RACGP Red Book preventive screening', category: 'Clinical' },
  'Population Health & Ethics': { icon: ShieldAlert, color: 'text-teal-400 bg-teal-950/40 border-teal-500/30', desc: 'Informed consent, Australian healthcare law, MBS/PBS rules, Indigenous health', category: 'Clinical' },
  'Radiology & Imaging': { icon: Eye, color: 'text-indigo-400 bg-indigo-950/40 border-indigo-500/30', desc: 'Chest X-ray patterns, CT head acute stroke, trauma ultrasound, emergency radiology', category: 'Clinical' },
  'Dermatology': { icon: Sparkles, color: 'text-rose-400 bg-rose-950/40 border-rose-500/30', desc: 'Skin malignancies, inflammatory dermatoses, drug eruptions, blistering disorders', category: 'Clinical' },
  'Ophthalmology & ENT': { icon: Eye, color: 'text-amber-400 bg-amber-950/40 border-amber-500/30', desc: 'Acute red eye, glaucoma, retinal detachment, epistaxis, vertigo, otitis media', category: 'Clinical' },

  // Basic Subjects (3,000 MCQs)
  'Anatomy': { icon: Layers, color: 'text-teal-400 bg-teal-950/40 border-teal-500/30', desc: 'Neuroanatomy, cranial nerves, Circle of Willis, brachial plexus, abdominal anatomy', category: 'Basic' },
  'Physiology': { icon: Activity, color: 'text-sky-400 bg-sky-950/40 border-sky-500/30', desc: 'Cardiovascular PV loops, renal clearance, respiratory compliance, acid-base balance', category: 'Basic' },
  'Pathology': { icon: Stethoscope, color: 'text-amber-400 bg-amber-950/40 border-amber-500/30', desc: 'Cellular adaptation, inflammation, neoplasia adenoma-carcinoma sequence, systemic pathology', category: 'Basic' },
  'Pharmacology': { icon: Zap, color: 'text-indigo-400 bg-indigo-950/40 border-indigo-500/30', desc: 'Receptor kinetics, autonomic pharmacology, toxidromes, antimicrobials, cardiovascular drugs', category: 'Basic' },
  'Biochemistry': { icon: Activity, color: 'text-green-400 bg-green-950/40 border-green-500/30', desc: 'Inborn errors of metabolism, enzyme kinetics, vitamin pathways, Galactosemia', category: 'Basic' },
  'Microbiology & Immunology': { icon: Shield, color: 'text-violet-400 bg-violet-950/40 border-violet-500/30', desc: 'Types I-IV hypersensitivity reactions, bacteriology, virology, opportunistic infections', category: 'Basic' },
  'Genetics & Embryology': { icon: Sparkles, color: 'text-fuchsia-400 bg-fuchsia-950/40 border-fuchsia-500/30', desc: 'Chromosomal aneuploidies, quadruple maternal serum screening, embryological development', category: 'Basic' },
  'Behavioral Science & Biostatistics': { icon: GraduationCap, color: 'text-blue-400 bg-blue-950/40 border-blue-500/30', desc: 'Study designs, Odds Ratio vs Relative Risk, sensitivity/specificity, ethics & bias', category: 'Basic' }
};

export const QuestionBankBrowser: React.FC = () => {
  const { questions, startNewTest, totalQuestionCount } = useExam();

  // Category Tab Filter: All, Basic (3000), Clinical (7000)
  const [activeCategoryTab, setActiveCategoryTab] = useState<'all' | 'Basic' | 'Clinical'>('all');
  
  // Cohort & Filtering state
  const [activeCohort, setActiveCohort] = useState<'Adult' | 'Paediatric' | 'all'>('Adult');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedSystems, setSelectedSystems] = useState<string[]>([]);
  const [selectedExamType, setSelectedExamType] = useState<'AMC CAT MCQ' | 'USMLE Step 1' | 'USMLE Step 2 CK' | 'All Exams'>('AMC CAT MCQ');
  
  // Medicine Organ System Expander
  const [isMedicineExpanded, setIsMedicineExpanded] = useState(true);

  // Subject Exam Starter Modal State (Triggered when clicking any subject or organ system)
  const [examModalConfig, setExamModalConfig] = useState<{
    isOpen: boolean;
    subject?: string;
    system?: string;
    title: string;
    totalAvailable: number;
    questionCount: number;
    mode: 'timed_exam' | 'tutor';
    statusFilter: 'all' | 'unused' | 'incorrect' | 'bookmarked';
    difficulty: DifficultyLevel | 'all';
    timePerQuestionSec: number;
  }>({
    isOpen: false,
    title: '',
    totalAvailable: 50,
    questionCount: 20,
    mode: 'timed_exam',
    statusFilter: 'all',
    difficulty: 'all',
    timePerQuestionSec: 72
  });

  // Calculate question counts per subject and per organ system
  const subjectGroups = useMemo(() => {
    const map: Record<string, { total: number; adultCount: number; paedCount: number; topics: Set<string>; questions: any[] }> = {};

    questions.forEach((q) => {
      const sub = q.subject;
      if (!map[sub]) {
        map[sub] = { total: 0, adultCount: 0, paedCount: 0, topics: new Set(), questions: [] };
      }
      map[sub].total++;
      if (q.cohort === 'Paediatric') map[sub].paedCount++;
      else map[sub].adultCount++;
      map[sub].topics.add(q.topic);
      map[sub].questions.push(q);
    });

    return map;
  }, [questions]);

  // Calculate question counts for Medicine Organ Systems
  const medicineSystemCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    MEDICINE_ORGAN_SYSTEMS.forEach(sys => {
      counts[sys.id] = 0;
    });

    questions.forEach(q => {
      if (q.subject === 'Medicine' || !q.subject || q.subject === 'Cardiology' || q.subject === 'Respiratory Medicine' || q.subject === 'Gastroenterology' || q.subject === 'Nephrology' || q.subject === 'Endocrinology' || q.subject === 'Neurology') {
        if (q.system && counts[q.system] !== undefined) {
          counts[q.system]++;
        }
      }
    });

    return counts;
  }, [questions]);

  // Total Basic vs Clinical counts
  const categoryCounts = useMemo(() => {
    let basic = 0;
    let clinical = 0;

    questions.forEach(q => {
      const meta = SUBJECT_METADATA[q.subject];
      if (meta && meta.category === 'Basic') {
        basic++;
      } else {
        clinical++;
      }
    });

    return {
      basic: basic > 0 ? basic : 3000,
      clinical: clinical > 0 ? clinical : 7000,
      total: questions.length > 0 ? questions.length : 10000
    };
  }, [questions]);

  // Filtered Subject list based on Search & Category Tab
  const filteredSubjects = useMemo(() => {
    let list = Object.keys(SUBJECT_METADATA);

    if (activeCategoryTab === 'Basic') {
      list = list.filter(sub => SUBJECT_METADATA[sub]?.category === 'Basic');
    } else if (activeCategoryTab === 'Clinical') {
      list = list.filter(sub => SUBJECT_METADATA[sub]?.category === 'Clinical');
    }

    if (!searchQuery) return list;

    return list.filter((sub) => {
      const matchesName = sub.toLowerCase().includes(searchQuery.toLowerCase());
      const group = subjectGroups[sub];
      const matchesTopic = group && Array.from(group.topics).some((t: unknown) =>
        typeof t === 'string' && t.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return matchesName || matchesTopic;
    });
  }, [activeCategoryTab, searchQuery, subjectGroups]);

  // Handle clicking a subject card to prompt for MCQ count
  const handleOpenSubjectExamPrompt = (subject: string) => {
    const group = subjectGroups[subject];
    const available = group ? group.total : (SUBJECT_METADATA[subject]?.category === 'Basic' ? 375 : 700);
    const initialCount = Math.min(20, Math.max(5, available));

    setExamModalConfig({
      isOpen: true,
      subject,
      system: undefined,
      title: `${subject} Examination Drill`,
      totalAvailable: available,
      questionCount: initialCount,
      mode: 'timed_exam',
      statusFilter: 'all',
      difficulty: 'all',
      timePerQuestionSec: 72
    });
  };

  // Handle clicking a specific Medicine Organ System to prompt for MCQ count
  const handleOpenMedicineSystemPrompt = (system: (typeof MEDICINE_ORGAN_SYSTEMS)[0]) => {
    const count = medicineSystemCounts[system.id] || system.count;
    const initialCount = Math.min(20, Math.max(5, count));

    setExamModalConfig({
      isOpen: true,
      subject: 'Medicine',
      system: system.id,
      title: `Medicine: ${system.label}`,
      totalAvailable: count,
      questionCount: initialCount,
      mode: 'timed_exam',
      statusFilter: 'all',
      difficulty: 'all',
      timePerQuestionSec: 72
    });
  };

  // Launch the exam with the user-selected MCQ count and options
  const handleConfirmLaunchExam = async () => {
    const subjects = examModalConfig.subject ? [examModalConfig.subject] : [];
    const systems = examModalConfig.system ? [examModalConfig.system] : [];

    await startNewTest({
      examType: selectedExamType,
      mode: examModalConfig.mode,
      title: `${examModalConfig.title} (${examModalConfig.questionCount} MCQs)`,
      subjects,
      systems,
      difficulties: examModalConfig.difficulty === 'all' ? [] : [examModalConfig.difficulty],
      questionCount: examModalConfig.questionCount,
      timePerQuestionSec: examModalConfig.timePerQuestionSec,
      statusFilter: examModalConfig.statusFilter,
      cohort: activeCohort
    });

    setExamModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-cyan-400" />
            AMC & Medical Question Bank (10,000 MCQs)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Choose any Basic or Clinical subject, select your desired number of MCQs, and launch your exam.
          </p>
        </div>

        {/* Adult vs Paediatric Cohort Toggle */}
        <div className="flex items-center gap-2 bg-[#091124] p-1.5 rounded-2xl border border-slate-800 self-stretch sm:self-auto">
          <button
            id="tab-cohort-adult"
            onClick={() => setActiveCohort('Adult')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCohort === 'Adult'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-950/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Adult Health
          </button>
          <button
            id="tab-cohort-paediatric"
            onClick={() => setActiveCohort('Paediatric')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCohort === 'Paediatric'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Paediatric Health
          </button>
          <button
            id="tab-cohort-all"
            onClick={() => setActiveCohort('all')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCohort === 'all'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Cohorts
          </button>
        </div>
      </div>

      {/* Primary Category Selector Tabs (All 10,000 vs Basic 3,000 vs Clinical 7,000) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          id="btn-cat-all"
          onClick={() => setActiveCategoryTab('all')}
          className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
            activeCategoryTab === 'all'
              ? 'bg-gradient-to-r from-cyan-950/80 to-[#0d1c3a] border-cyan-500 text-white shadow-lg shadow-cyan-950/40'
              : 'bg-[#0b1326] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
          }`}
        >
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">Complete Repository</div>
            <div className="text-base font-extrabold text-white mt-0.5">All Subjects</div>
            <div className="text-xs text-slate-400 mt-1">10,000 Total MCQs Available</div>
          </div>
          <div className="text-xl font-black text-cyan-400">10,000</div>
        </button>

        <button
          id="btn-cat-basic"
          onClick={() => setActiveCategoryTab('Basic')}
          className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
            activeCategoryTab === 'Basic'
              ? 'bg-gradient-to-r from-amber-950/80 to-[#221708] border-amber-500 text-white shadow-lg shadow-amber-950/40'
              : 'bg-[#0b1326] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
          }`}
        >
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">Foundational Sciences</div>
            <div className="text-base font-extrabold text-white mt-0.5">Basic Subjects</div>
            <div className="text-xs text-slate-400 mt-1">Anatomy, Phys, Path, Pharm, Bio</div>
          </div>
          <div className="text-xl font-black text-amber-400">3,000</div>
        </button>

        <button
          id="btn-cat-clinical"
          onClick={() => setActiveCategoryTab('Clinical')}
          className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
            activeCategoryTab === 'Clinical'
              ? 'bg-gradient-to-r from-rose-950/80 to-[#240b17] border-rose-500 text-white shadow-lg shadow-rose-950/40'
              : 'bg-[#0b1326] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
          }`}
        >
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-rose-400">Clinical Disciplines</div>
            <div className="text-base font-extrabold text-white mt-0.5">Clinical Subjects</div>
            <div className="text-xs text-slate-400 mt-1">Medicine (All Systems), Surgery, O&G</div>
          </div>
          <div className="text-xl font-black text-rose-400">7,000</div>
        </button>
      </div>

      {/* MEDICINE ORGAN SYSTEMS SPECIALIZED SECTION (When All or Clinical is active) */}
      {(activeCategoryTab === 'all' || activeCategoryTab === 'Clinical') && (
        <div className="rounded-2xl bg-gradient-to-b from-[#101935] to-[#0b1326] border border-rose-500/40 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-400">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black text-white">
                    Medicine (Categorized by Organ Systems)
                  </h2>
                  <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    3,200+ MCQs
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click any organ system below to select the number of MCQs and start an exam drill.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsMedicineExpanded(!isMedicineExpanded)}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700"
            >
              <span>{isMedicineExpanded ? 'Hide Organ Systems' : 'Show All 10 Organ Systems'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMedicineExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {isMedicineExpanded && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
              {MEDICINE_ORGAN_SYSTEMS.map((system) => {
                const IconComponent = SYSTEM_ICONS[system.id] || Heart;
                const count = medicineSystemCounts[system.id] || system.count;

                return (
                  <div
                    key={system.id}
                    id={`btn-medicine-system-${system.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => handleOpenMedicineSystemPrompt(system)}
                    className="group relative cursor-pointer rounded-xl bg-[#091124] hover:bg-[#121f42] border border-slate-800 hover:border-cyan-500/60 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400 group-hover:text-white group-hover:bg-cyan-600 transition-colors">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-black text-cyan-400 group-hover:text-cyan-300">
                          {count.toLocaleString()} MCQs
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                        {system.label}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {system.specialty}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-cyan-400">
                      <span>Choose Qs & Start</span>
                      <Play className="w-3 h-3 fill-current" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Search & Exam Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#0b1326] p-3 rounded-2xl border border-slate-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            id="input-search-qbank"
            type="text"
            placeholder="Search subjects, clinical topics, diseases, or organ systems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedExamType}
            onChange={(e) => setSelectedExamType(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="AMC CAT MCQ">AMC CAT MCQ Standard</option>
            <option value="USMLE Step 1">USMLE Step 1 (Foundational)</option>
            <option value="USMLE Step 2 CK">USMLE Step 2 CK (Clinical)</option>
            <option value="All Exams">All Exam Formats</option>
          </select>
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSubjects.map((subject) => {
          const meta = SUBJECT_METADATA[subject] || {
            icon: Stethoscope,
            color: 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30',
            desc: 'Clinical topics, diagnostic investigations & management',
            category: 'Clinical'
          };
          const Icon = meta.icon;
          const group = subjectGroups[subject];
          const topicCount = group ? group.topics.size : 12;
          const isBasic = meta.category === 'Basic';
          const defaultCount = isBasic ? 375 : (subject === 'Medicine' ? 3200 : 850);
          const totalCount = group ? group.total : defaultCount;
          const estMinutes = Math.round((totalCount * 72) / 60);

          return (
            <div
              key={subject}
              id={`card-subject-${subject.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => handleOpenSubjectExamPrompt(subject)}
              className="group relative cursor-pointer rounded-2xl bg-[#0b1326] hover:bg-[#0d1730] border border-slate-800 hover:border-cyan-500/80 transition-all duration-200 p-5 flex flex-col justify-between hover:shadow-xl hover:shadow-cyan-950/30"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border ${meta.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {subject}
                        </h3>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                          isBasic ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                        }`}>
                          {meta.category}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {topicCount} Clinical Topics
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-black text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                    {totalCount.toLocaleString()} Qs
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {meta.desc}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-800/80 mt-4">
                <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>
                    {totalCount} MCQs / ~{estMinutes} mins
                  </span>
                </div>

                {/* Instant "Choose Qs & Start" button */}
                <button
                  id={`btn-start-exam-${subject.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenSubjectExamPrompt(subject);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600 text-cyan-400 hover:text-white border border-cyan-500/40 hover:border-cyan-500 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Choose Qs & Start</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE "CHOOSE NUMBER OF MCQS & START EXAM" MODAL / DIALOG */}
      {/* ========================================================================= */}
      {examModalConfig.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#0e1935] to-[#091024] border border-cyan-500/50 shadow-2xl p-6 space-y-5 animate-scaleUp">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    {examModalConfig.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {examModalConfig.totalAvailable.toLocaleString()} Total MCQs in question bank
                  </p>
                </div>
              </div>

              <button
                id="btn-close-exam-modal"
                onClick={() => setExamModalConfig(prev => ({ ...prev, isOpen: false }))}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CHOOSE NUMBER OF MCQS */}
            <div className="space-y-3 bg-[#070d1e] p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-4 h-4" />
                  Select Number of MCQs to Practice:
                </label>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-white">
                    {examModalConfig.questionCount}
                  </span>
                  <span className="text-xs text-slate-400">Questions</span>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="grid grid-cols-6 gap-1.5">
                {[10, 20, 30, 50, 100, Math.min(150, examModalConfig.totalAvailable)].map((num) => (
                  <button
                    key={num}
                    id={`btn-preset-count-${num}`}
                    type="button"
                    onClick={() => setExamModalConfig(prev => ({ ...prev, questionCount: Math.min(num, prev.totalAvailable) }))}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      examModalConfig.questionCount === num
                        ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/40'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {num === Math.min(150, examModalConfig.totalAvailable) && num > 100 ? 'Max' : `${num}Q`}
                  </button>
                ))}
              </div>

              {/* Interactive Range Slider */}
              <div className="pt-2">
                <input
                  type="range"
                  min="5"
                  max={Math.min(150, Math.max(20, examModalConfig.totalAvailable))}
                  step="5"
                  value={examModalConfig.questionCount}
                  onChange={(e) => setExamModalConfig(prev => ({ ...prev, questionCount: Number(e.target.value) }))}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>5 Questions</span>
                  <span>
                    Est. Duration: {Math.round((examModalConfig.questionCount * examModalConfig.timePerQuestionSec) / 60)} Mins (@ {examModalConfig.timePerQuestionSec}s/Q)
                  </span>
                  <span>{Math.min(150, examModalConfig.totalAvailable)} Questions</span>
                </div>
              </div>
            </div>

            {/* EXAM MODE (Timed Exam vs Instant Tutor) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">Exam Testing Mode</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  id="btn-mode-timed"
                  onClick={() => setExamModalConfig(prev => ({ ...prev, mode: 'timed_exam' }))}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    examModalConfig.mode === 'timed_exam'
                      ? 'bg-cyan-950/60 border-cyan-500 text-white'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold flex items-center gap-1.5 text-cyan-400">
                    <Clock className="w-3.5 h-3.5" />
                    Timed Exam Mode
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Official AMC/USMLE countdown timer, rationales revealed upon completion.
                  </p>
                </button>

                <button
                  type="button"
                  id="btn-mode-tutor"
                  onClick={() => setExamModalConfig(prev => ({ ...prev, mode: 'tutor' }))}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    examModalConfig.mode === 'tutor'
                      ? 'bg-amber-950/60 border-amber-500 text-white'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold flex items-center gap-1.5 text-amber-400">
                    <BookOpen className="w-3.5 h-3.5" />
                    Instant Tutor Mode
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Immediate step-by-step rationales and distractor pearls after each answer.
                  </p>
                </button>
              </div>
            </div>

            {/* QUESTION POOL STATUS & DIFFICULTY */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 mb-1 block">Question Pool</label>
                <select
                  value={examModalConfig.statusFilter}
                  onChange={(e) => setExamModalConfig(prev => ({ ...prev, statusFilter: e.target.value as any }))}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="all">All Available MCQs</option>
                  <option value="unused">Unused / Fresh Only</option>
                  <option value="incorrect">Previous Mistakes (Incorrect)</option>
                  <option value="bookmarked">Bookmarked Only</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 mb-1 block">Difficulty Level</label>
                <select
                  value={examModalConfig.difficulty}
                  onChange={(e) => setExamModalConfig(prev => ({ ...prev, difficulty: e.target.value as any }))}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="all">All Difficulties (Adaptive)</option>
                  <option value="Easy">Easy (Foundational)</option>
                  <option value="Medium">Medium (Standard AMC)</option>
                  <option value="Hard">Hard (Complex Clinical)</option>
                  <option value="Expert">Expert (Challenging)</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setExamModalConfig(prev => ({ ...prev, isOpen: false }))}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Cancel
              </button>

              <button
                id="btn-confirm-start-exam"
                type="button"
                onClick={handleConfirmLaunchExam}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-cyan-950/50 transition-all hover:scale-105"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Exam ({examModalConfig.questionCount} Questions)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
