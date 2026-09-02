export type ExamType = 'AMC CAT MCQ' | 'USMLE Step 1' | 'USMLE Step 2 CK' | 'All Exams';

export type SubjectCategory = 'Basic Science' | 'Clinical Science' | 'Population Health';

export type BasicSubjectType =
  | 'Anatomy'
  | 'Physiology'
  | 'Pathology'
  | 'Pharmacology'
  | 'Biochemistry'
  | 'Microbiology & Immunology'
  | 'Genetics & Embryology'
  | 'Behavioral Science & Biostatistics';

export type ClinicalSubjectType =
  | 'Medicine'
  | 'Surgery'
  | "Women's Health (O&G)"
  | 'Paediatrics'
  | 'Psychiatry'
  | 'Acute Care & Emergency'
  | 'General Practice'
  | 'Population Health & Ethics'
  | 'Radiology & Imaging'
  | 'Dermatology'
  | 'Ophthalmology & ENT';

export type SubjectType =
  | BasicSubjectType
  | ClinicalSubjectType
  | 'Cardiology'
  | 'Respiratory Medicine'
  | 'Gastroenterology'
  | 'Nephrology'
  | 'Endocrinology'
  | 'Neurology'
  | 'Rheumatology & Musculoskeletal'
  | 'Hematology & Oncology'
  | 'Infectious Diseases';

export type SystemType =
  | 'Cardiovascular System'
  | 'Respiratory System'
  | 'Gastrointestinal System'
  | 'Renal & Urinary System'
  | 'Endocrine & Metabolic System'
  | 'Nervous System & Special Senses'
  | 'Musculoskeletal & Orthopaedics'
  | 'Reproductive & Obstetrics'
  | 'Hematological & Immune System'
  | 'Integumentary & Dermatology'
  | 'Emergency & Resuscitation'
  | 'Ethics, Legal & Australian Healthcare';

export const BASIC_SUBJECTS: BasicSubjectType[] = [
  'Anatomy',
  'Physiology',
  'Pathology',
  'Pharmacology',
  'Biochemistry',
  'Microbiology & Immunology',
  'Genetics & Embryology',
  'Behavioral Science & Biostatistics'
];

export const CLINICAL_SUBJECTS: ClinicalSubjectType[] = [
  'Medicine',
  'Surgery',
  "Women's Health (O&G)",
  'Paediatrics',
  'Psychiatry',
  'Acute Care & Emergency',
  'General Practice',
  'Population Health & Ethics',
  'Radiology & Imaging',
  'Dermatology',
  'Ophthalmology & ENT'
];

export const MEDICINE_ORGAN_SYSTEMS: { id: SystemType; label: string; specialty: string; iconName: string; count: number }[] = [
  { id: 'Cardiovascular System', label: 'Cardiology & Hemodynamics', specialty: 'Cardiology', iconName: 'Heart', count: 1100 },
  { id: 'Respiratory System', label: 'Respiratory Medicine & Pulmonology', specialty: 'Pulmonology', iconName: 'Wind', count: 900 },
  { id: 'Gastrointestinal System', label: 'Gastroenterology & Hepatology', specialty: 'Gastroenterology', iconName: 'Layers', count: 1000 },
  { id: 'Renal & Urinary System', label: 'Nephrology & Fluid Electrolytes', specialty: 'Nephrology', iconName: 'Droplets', count: 750 },
  { id: 'Endocrine & Metabolic System', label: 'Endocrinology & Diabetes', specialty: 'Endocrinology', iconName: 'Activity', count: 850 },
  { id: 'Nervous System & Special Senses', label: 'Neurology & Stroke Medicine', specialty: 'Neurology', iconName: 'Brain', count: 950 },
  { id: 'Musculoskeletal & Orthopaedics', label: 'Rheumatology & Musculoskeletal', specialty: 'Rheumatology', iconName: 'Bone', count: 600 },
  { id: 'Hematological & Immune System', label: 'Hematology, Oncology & Transfusion', specialty: 'Hematology', iconName: 'Shield', count: 850 },
  { id: 'Integumentary & Dermatology', label: 'Dermatology & Cutaneous Manifestations', specialty: 'Dermatology', iconName: 'Sparkles', count: 600 },
  { id: 'Emergency & Resuscitation', label: 'Acute Care & Emergency Medicine', specialty: 'Emergency', iconName: 'Flame', count: 500 }
];

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard' | 'Expert';

export interface QuestionOption {
  id: string; // 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'
  text: string;
}

export interface Question {
  id: string;
  exam: 'AMC CAT MCQ' | 'USMLE Step 1' | 'USMLE Step 2 CK';
  subject: SubjectType;
  system: SystemType;
  topic: string;
  subtopic?: string;
  difficulty: DifficultyLevel;
  vignette: string;
  question: string;
  options: QuestionOption[];
  correctOptionId: string; // For single select
  correctOptionIds?: string[]; // For multi-select (e.g. "Select 3 answers")
  isMultipleChoice?: boolean;
  requiredSelectionsCount?: number;
  educationalObjective: string;
  explanation: string;
  distractorExplanations?: Record<string, string>;
  highYieldTopic?: string;
  highYieldPearl?: string;
  keyLearningPoint?: string;
  amcRelevance?: string;
  references?: string;
  tags?: string[];
  imageUrl?: string;
  cohort?: 'Adult' | 'Paediatric' | 'General';
  
  // User metadata (cached/stored per user)
  isBookmarked?: boolean;
  userNote?: string;
  highlightedText?: string[];
  userLastAnswer?: string | string[];
  timesAnswered?: number;
  timesCorrect?: number;
  lastAttemptDate?: string;
}

export type TestMode = 'tutor' | 'timed_exam' | 'random_drill' | 'mistake_revision' | 'high_yield_drill' | 'custom_drill';

export interface TestSession {
  id: string;
  title: string;
  examType: ExamType;
  mode: TestMode;
  createdAt: string;
  completedAt?: string;
  timeLimitSeconds: number; // e.g. 200 * 72 = 14400s
  timeRemainingSeconds: number;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: Record<string, string | string[]>; // questionId -> optionId or optionId[]
  flaggedQuestionIds: string[]; // questionId[]
  crossedOptions: Record<string, string[]>; // questionId -> optionId[]
  isCompleted: boolean;
  isPaused: boolean;
  
  // Results
  score?: number;
  totalQuestions?: number;
  correctCount?: number;
  incorrectCount?: number;
  unansweredCount?: number;
  accuracyPercentage?: number;
  amcScaledScore?: number; // AMC scaled score, e.g. 200-350 (250 is pass mark)
  usmleScaledScore?: number; // 3-digit score, e.g. 196-300
  percentileRank?: number;
  averageTimePerQuestionSec?: number;
  subjectPerformance?: Record<string, { total: number; correct: number; percentage: number }>;
  systemPerformance?: Record<string, { total: number; correct: number; percentage: number }>;
  recommendedRevision?: string[];
}

export interface PerformanceStats {
  totalQuestionsAnswered: number;
  totalCorrect: number;
  totalIncorrect: number;
  overallAccuracy: number;
  averagePaceSeconds: number;
  amcScaledScore: number;
  amcPassProbability: number;
  usmlePredictedScore: number;
  streakDays: number;
  totalTestsCompleted: number;
  totalOsceCompleted: number;
  totalCasesCompleted: number;
  subjectPerformance: Record<string, { total: number; correct: number; percentage: number }>;
  systemPerformance: Record<string, { total: number; correct: number; percentage: number }>;
  weakTopics: Array<{ topic: string; subject: string; accuracy: number; totalAttempted: number }>;
  strongTopics: Array<{ topic: string; subject: string; accuracy: number; totalAttempted: number }>;
}

export type ThemeMode = 'dark' | 'light' | 'amoled' | 'amc_navy';
export type FontSize = 'sm' | 'base' | 'lg' | 'xl';

export interface LabValueItem {
  name: string;
  category: 'Serum / Electrolytes' | 'Hematology / Coagulation' | 'Cerebrospinal Fluid (CSF)' | 'Urinalysis' | 'Hemodynamics' | 'Arterial Blood Gas' | 'Endocrine & Liver';
  referenceRangeUS: string;
  referenceRangeSI: string;
  clinicalSignificance?: string;
}

export interface QuestionBankFilter {
  searchQuery: string;
  exam: ExamType;
  subject: string;
  system: string;
  cohort: 'all' | 'Adult' | 'Paediatric';
  difficulty: string;
  status: 'all' | 'unused' | 'incorrect' | 'correct' | 'bookmarked' | 'notes';
  tag?: string;
}

export interface OsceStation {
  id: string;
  title: string;
  category:
    | 'History Taking'
    | 'Physical Examination'
    | 'Communication Skills'
    | 'Emergency Management'
    | 'Mental Health'
    | 'Paediatric Assessment'
    | "Women's Health"
    | 'Surgical & Procedural'
    | 'Ethics & Consent';
  difficulty: DifficultyLevel;
  durationMinutes: number;
  setting: string;
  scenario: string;
  candidateInstructions: string[];
  patientProfile: {
    name: string;
    age: number;
    gender: string;
    vitals: {
      bp: string;
      hr: string;
      rr: string;
      temp: string;
      spo2: string;
    };
    presentingComplaint: string;
    backgroundInfo: string;
  };
  tasks: string[];
  expectedApproach: string[];
  checklist: Array<{
    id: string;
    task: string;
    points: number;
    isMandatory?: boolean;
    clinicalPearl?: string;
  }>;
  commonMistakes: string[];
  modelAnswer: string;
  examinerMarkingCriteria: string[];
  highYieldPoints: string[];
  isCompleted?: boolean;
  userScore?: number;
  userCompletedDate?: string;
  isBookmarked?: boolean;
}

export interface ClinicalCase {
  id: string;
  title: string;
  specialty: string;
  system: string;
  difficulty: DifficultyLevel;
  patientAge: number;
  patientGender: string;
  chiefComplaint: string;
  hpi: string;
  pmh: string[];
  medications: string[];
  allergies: string[];
  socialHistory: string;
  physicalExam: Record<string, string>;
  initialVitals: {
    bp: string;
    hr: string;
    rr: string;
    temp: string;
    spo2: string;
  };
  steps: Array<{
    stepNumber: number;
    title: string;
    prompt: string;
    options: Array<{
      id: string;
      text: string;
      isCorrect: boolean;
      rationale: string;
      finding?: string;
    }>;
    correctOptionId: string;
    learningPoint: string;
  }>;
  finalDiagnosis: string;
  managementSummary: string;
  keyLearningPoints: string[];
  isCompleted?: boolean;
  score?: number;
}

export interface HighYieldTopic {
  id: string;
  title: string;
  subject: SubjectType;
  system: SystemType;
  amcRelevance: 'High' | 'Very High' | 'Essential';
  difficulty: DifficultyLevel;
  summary: string;
  keyFacts: string[];
  clinicalPearls: string[];
  diagnosticCriteria: string[];
  importantInvestigations: string[];
  managementPrinciples: string[];
  drugFacts: string[];
  redFlags: string[];
  commonExamTraps: string[];
  quickRevisionPoints: string[];
  relatedQuestionIds?: string[];
  isBookmarked?: boolean;
}

export interface UserProfile {
  name: string;
  title: string;
  email: string;
  avatarUrl?: string;
  targetExam: ExamType;
  examDate: string;
  studyStreakDays: number;
  dailyGoalQuestions: number;
  subscriptionPlan: 'Free Trial' | 'Med 360 Pro Monthly' | 'Med 360 Pro 6-Month' | 'Med 360 Annual Master Pass';
  subscriptionExpiry: string;
  isCloudSynced: boolean;
  lastSyncTime: string;
}
