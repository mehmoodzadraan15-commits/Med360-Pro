import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Question,
  TestSession,
  ExamType,
  ThemeMode,
  FontSize,
  PerformanceStats,
  TestMode,
  OsceStation,
  ClinicalCase,
  HighYieldTopic,
  UserProfile
} from '../types';
import { dbService, DEFAULT_USER_PROFILE } from '../services/db';
import { generateBulkQuestions } from '../services/questionGenerator';

export type Med360Tab =
  | 'dashboard'
  | 'bank'
  | 'mock'
  | 'osce'
  | 'cases'
  | 'highyield'
  | 'mistakes'
  | 'analytics'
  | 'bookmarks'
  | 'profile'
  | 'admin';

interface ExamContextType {
  questions: Question[];
  isLoading: boolean;
  totalQuestionCount: number;
  selectedExam: ExamType;
  setSelectedExam: (exam: ExamType) => void;
  
  // Navigation
  currentTab: Med360Tab;
  setCurrentTab: (tab: Med360Tab) => void;
  
  // Active Test Session
  activeTest: TestSession | null;
  startNewTest: (config: {
    examType: ExamType;
    mode: TestMode;
    title: string;
    subjects: string[];
    systems: string[];
    difficulties: string[];
    questionCount: number;
    timePerQuestionSec: number;
    statusFilter: 'all' | 'unused' | 'incorrect' | 'bookmarked';
    cohort?: 'all' | 'Adult' | 'Paediatric';
  }) => Promise<TestSession | null>;
  resumeTest: (test: TestSession) => void;
  submitTestAnswer: (questionId: string, optionId: string | string[]) => void;
  clearQuestionAnswer: (questionId: string) => void;
  toggleFlagQuestion: (questionId: string) => void;
  toggleCrossOption: (questionId: string, optionId: string) => void;
  navigateTestQuestion: (index: number) => void;
  finishTestSession: () => Promise<TestSession | null>;
  exitActiveTest: () => void;
  
  // Bookmarks & Notes
  toggleBookmark: (questionId: string) => Promise<void>;
  updateQuestionNote: (questionId: string, note: string) => Promise<void>;
  
  // OSCE & Cases & High Yield
  osceStations: OsceStation[];
  toggleOsceBookmark: (id: string) => Promise<void>;
  saveOsceScore: (id: string, score: number) => Promise<void>;
  
  clinicalCases: ClinicalCase[];
  completeCase: (id: string, score: number) => Promise<void>;
  
  highYieldTopics: HighYieldTopic[];
  toggleHighYieldBookmark: (id: string) => Promise<void>;
  
  // Test History
  testHistory: TestSession[];
  loadTestHistory: () => Promise<void>;
  deleteTestHistoryItem: (id: string) => Promise<void>;
  
  // Performance & Stats
  performanceStats: PerformanceStats;
  
  // User Profile
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  
  // Theme & Reading settings
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  
  // Modals & Tools
  isLabModalOpen: boolean;
  setIsLabModalOpen: (open: boolean) => void;
  isCalcModalOpen: boolean;
  setIsCalcModalOpen: (open: boolean) => void;
  isAiTutorOpen: boolean;
  setIsAiTutorOpen: (open: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  isSubscriptionModalOpen: boolean;
  setIsSubscriptionModalOpen: (open: boolean) => void;
  isDisclaimerModalOpen: boolean;
  setIsDisclaimerModalOpen: (open: boolean) => void;
  
  activeTutorQuestion: Question | null;
  openAiTutorForQuestion: (q: Question) => void;
  
  // Database Operations
  importQuestions: (newQuestions: Question[]) => Promise<number>;
  expandDatabase10000: (count?: number) => Promise<number>;
  resetDatabase: () => Promise<void>;
  refreshQuestions: () => Promise<void>;
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export const ExamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [osceStations, setOsceStations] = useState<OsceStation[]>([]);
  const [clinicalCases, setClinicalCases] = useState<ClinicalCase[]>([]);
  const [highYieldTopics, setHighYieldTopics] = useState<HighYieldTopic[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('med360_user_profile');
    return saved ? JSON.parse(saved) : DEFAULT_USER_PROFILE;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalQuestionCount, setTotalQuestionCount] = useState<number>(0);
  const [selectedExam, setSelectedExam] = useState<ExamType>('AMC CAT MCQ');
  const [activeTest, setActiveTest] = useState<TestSession | null>(null);
  const [testHistory, setTestHistory] = useState<TestSession[]>([]);
  const [currentTab, setCurrentTab] = useState<Med360Tab>('dashboard');

  // Themes & UI
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    return (localStorage.getItem('med360_theme') as ThemeMode) || 'dark';
  });
  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    return (localStorage.getItem('med360_font_size') as FontSize) || 'base';
  });

  // Global Tool Modals
  const [isLabModalOpen, setIsLabModalOpen] = useState(false);
  const [isCalcModalOpen, setIsCalcModalOpen] = useState(false);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isDisclaimerModalOpen, setIsDisclaimerModalOpen] = useState(false);
  const [activeTutorQuestion, setActiveTutorQuestion] = useState<Question | null>(null);

  const setTheme = (t: ThemeMode) => {
    setThemeState(t);
    localStorage.setItem('med360_theme', t);
    document.documentElement.className = t;
  };

  const setFontSize = (s: FontSize) => {
    setFontSizeState(s);
    localStorage.setItem('med360_font_size', s);
  };

  const updateUserProfile = (newProfile: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const updated = { ...prev, ...newProfile };
      localStorage.setItem('med360_user_profile', JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Load all initial data from IndexedDB
  const refreshQuestions = useCallback(async () => {
    setIsLoading(true);
    try {
      await dbService.init();
      const [allQ, count, osce, cases, hy] = await Promise.all([
        dbService.getAllQuestions(),
        dbService.getQuestionCount(),
        dbService.getAllOsceStations(),
        dbService.getAllCases(),
        dbService.getAllHighYieldTopics()
      ]);
      setQuestions(allQ);
      setTotalQuestionCount(count);
      setOsceStations(osce);
      setClinicalCases(cases);
      setHighYieldTopics(hy);
    } catch (e) {
      console.error('Failed to load database:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadTestHistory = useCallback(async () => {
    try {
      const tests = await dbService.getAllTestSessions();
      setTestHistory(tests);
    } catch (e) {
      console.error('Failed to load test history:', e);
    }
  }, []);

  useEffect(() => {
    refreshQuestions();
    loadTestHistory();
  }, [refreshQuestions, loadTestHistory]);

  // Compute Performance Analytics
  const performanceStats: PerformanceStats = React.useMemo(() => {
    let totalQuestionsAnswered = 0;
    let totalCorrect = 0;
    let totalIncorrect = 0;
    const subjectMap: Record<string, { total: number; correct: number }> = {};
    const systemMap: Record<string, { total: number; correct: number }> = {};
    const topicMap: Record<string, { total: number; correct: number; subject: string }> = {};

    questions.forEach((q) => {
      const answered = q.timesAnswered || 0;
      const correct = q.timesCorrect || 0;

      if (answered > 0) {
        totalQuestionsAnswered += answered;
        totalCorrect += correct;
        totalIncorrect += (answered - correct);

        // Subject stats
        if (!subjectMap[q.subject]) subjectMap[q.subject] = { total: 0, correct: 0 };
        subjectMap[q.subject].total += answered;
        subjectMap[q.subject].correct += correct;

        // System stats
        if (!systemMap[q.system]) systemMap[q.system] = { total: 0, correct: 0 };
        systemMap[q.system].total += answered;
        systemMap[q.system].correct += correct;

        // Topic stats
        if (!topicMap[q.topic]) topicMap[q.topic] = { total: 0, correct: 0, subject: q.subject };
        topicMap[q.topic].total += answered;
        topicMap[q.topic].correct += correct;
      }
    });

    const overallAccuracy = totalQuestionsAnswered > 0
      ? Math.round((totalCorrect / totalQuestionsAnswered) * 100)
      : 0;

    // AMC scaled score estimation (Passing threshold is 250 out of 350)
    const amcScaledScore = Math.min(350, Math.max(150, Math.round(180 + (overallAccuracy * 1.7))));
    const amcPassProbability = Math.min(99, Math.max(5, Math.round((overallAccuracy - 35) * 1.6)));

    // USMLE 3-digit score
    const usmlePredictedScore = Math.min(280, Math.max(160, Math.round(170 + (overallAccuracy * 1.05))));

    const subjectPerformance: Record<string, { total: number; correct: number; percentage: number }> = {};
    Object.keys(subjectMap).forEach((sub) => {
      const { total, correct } = subjectMap[sub];
      subjectPerformance[sub] = {
        total,
        correct,
        percentage: total > 0 ? Math.round((correct / total) * 100) : 0
      };
    });

    const systemPerformance: Record<string, { total: number; correct: number; percentage: number }> = {};
    Object.keys(systemMap).forEach((sys) => {
      const { total, correct } = systemMap[sys];
      systemPerformance[sys] = {
        total,
        correct,
        percentage: total > 0 ? Math.round((correct / total) * 100) : 0
      };
    });

    const topicList = Object.keys(topicMap).map((topic) => {
      const data = topicMap[topic];
      return {
        topic,
        subject: data.subject,
        accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
        totalAttempted: data.total
      };
    });

    const weakTopics = topicList
      .filter((t) => t.totalAttempted >= 1 && t.accuracy < 70)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 6);

    const strongTopics = topicList
      .filter((t) => t.totalAttempted >= 1 && t.accuracy >= 70)
      .sort((a, b) => b.accuracy - a.accuracy)
      .slice(0, 6);

    return {
      totalQuestionsAnswered,
      totalCorrect,
      totalIncorrect,
      overallAccuracy,
      averagePaceSeconds: 68,
      amcScaledScore,
      amcPassProbability,
      usmlePredictedScore,
      streakDays: userProfile.studyStreakDays,
      totalTestsCompleted: testHistory.length,
      totalOsceCompleted: osceStations.filter((s) => s.isCompleted).length,
      totalCasesCompleted: clinicalCases.filter((c) => c.isCompleted).length,
      subjectPerformance,
      systemPerformance,
      weakTopics,
      strongTopics
    };
  }, [questions, testHistory, osceStations, clinicalCases, userProfile.studyStreakDays]);

  // Start new test session
  const startNewTest = async (config: {
    examType: ExamType;
    mode: TestMode;
    title: string;
    subjects: string[];
    systems: string[];
    difficulties: string[];
    questionCount: number;
    timePerQuestionSec: number;
    statusFilter: 'all' | 'unused' | 'incorrect' | 'bookmarked';
    cohort?: 'all' | 'Adult' | 'Paediatric';
  }): Promise<TestSession | null> => {
    let pool = [...questions];

    if (config.examType !== 'All Exams') {
      pool = pool.filter((q) => q.exam === config.examType);
    }

    if (config.subjects.length > 0) {
      pool = pool.filter((q) => config.subjects.includes(q.subject));
    }

    if (config.systems.length > 0) {
      pool = pool.filter((q) => config.systems.includes(q.system));
    }

    if (config.difficulties.length > 0) {
      pool = pool.filter((q) => config.difficulties.includes(q.difficulty));
    }

    if (config.cohort && config.cohort !== 'all') {
      pool = pool.filter((q) => !q.cohort || q.cohort === config.cohort);
    }

    if (config.statusFilter === 'unused') {
      pool = pool.filter((q) => !q.timesAnswered || q.timesAnswered === 0);
    } else if (config.statusFilter === 'incorrect') {
      pool = pool.filter((q) => (q.timesAnswered || 0) > (q.timesCorrect || 0));
    } else if (config.statusFilter === 'bookmarked') {
      pool = pool.filter((q) => q.isBookmarked);
    }

    // Shuffle pool
    const shuffled = pool.sort(() => 0.5 - Math.random());
    let selectedQuestions = shuffled.slice(0, Math.min(config.questionCount, shuffled.length));

    if (selectedQuestions.length === 0) {
      // Fallback: relax filters to ensure an exam can always be created from available questions
      let fallbackPool = questions.filter(
        (q) => config.examType === 'All Exams' || q.exam === config.examType
      );
      if (config.subjects.length > 0) {
        const subFiltered = fallbackPool.filter((q) => config.subjects.includes(q.subject));
        if (subFiltered.length > 0) fallbackPool = subFiltered;
      }
      if (fallbackPool.length === 0) {
        fallbackPool = [...questions];
      }
      const fallbackShuffled = fallbackPool.sort(() => 0.5 - Math.random());
      selectedQuestions = fallbackShuffled.slice(0, Math.min(config.questionCount, fallbackShuffled.length));
    }

    if (selectedQuestions.length === 0) {
      return null;
    }

    const totalSeconds = selectedQuestions.length * config.timePerQuestionSec;

    const newSession: TestSession = {
      id: `test-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      title: config.title || `${config.examType} Practice (${selectedQuestions.length}Q)`,
      examType: config.examType,
      mode: config.mode,
      createdAt: new Date().toISOString(),
      timeLimitSeconds: totalSeconds,
      timeRemainingSeconds: totalSeconds,
      questions: selectedQuestions,
      currentQuestionIndex: 0,
      userAnswers: {},
      flaggedQuestionIds: [],
      crossedOptions: {},
      isCompleted: false,
      isPaused: false
    };

    await dbService.saveTestSession(newSession);
    setActiveTest(newSession);
    setCurrentTab('practice');
    return newSession;
  };

  const resumeTest = (test: TestSession) => {
    setActiveTest(test);
    setCurrentTab('practice');
  };

  const submitTestAnswer = async (questionId: string, optionId: string | string[]) => {
    if (!activeTest) return;

    const updatedUserAnswers = {
      ...activeTest.userAnswers,
      [questionId]: optionId
    };

    const updatedSession: TestSession = {
      ...activeTest,
      userAnswers: updatedUserAnswers
    };

    setActiveTest(updatedSession);
    await dbService.saveTestSession(updatedSession);
  };

  const clearQuestionAnswer = async (questionId: string) => {
    if (!activeTest) return;

    const updatedUserAnswers = { ...activeTest.userAnswers };
    delete updatedUserAnswers[questionId];

    const updatedSession: TestSession = {
      ...activeTest,
      userAnswers: updatedUserAnswers
    };

    setActiveTest(updatedSession);
    await dbService.saveTestSession(updatedSession);
  };

  const toggleFlagQuestion = async (questionId: string) => {
    if (!activeTest) return;

    const flagged = activeTest.flaggedQuestionIds.includes(questionId)
      ? activeTest.flaggedQuestionIds.filter((id) => id !== questionId)
      : [...activeTest.flaggedQuestionIds, questionId];

    const updatedSession: TestSession = {
      ...activeTest,
      flaggedQuestionIds: flagged
    };

    setActiveTest(updatedSession);
    await dbService.saveTestSession(updatedSession);
  };

  const toggleCrossOption = (questionId: string, optionId: string) => {
    if (!activeTest) return;

    const currentCrossed = activeTest.crossedOptions[questionId] || [];
    const updated = currentCrossed.includes(optionId)
      ? currentCrossed.filter((id) => id !== optionId)
      : [...currentCrossed, optionId];

    const updatedSession: TestSession = {
      ...activeTest,
      crossedOptions: {
        ...activeTest.crossedOptions,
        [questionId]: updated
      }
    };

    setActiveTest(updatedSession);
  };

  const navigateTestQuestion = (index: number) => {
    if (!activeTest) return;
    if (index < 0 || index >= activeTest.questions.length) return;

    setActiveTest((prev) => (prev ? { ...prev, currentQuestionIndex: index } : null));
  };

  const finishTestSession = async (): Promise<TestSession | null> => {
    if (!activeTest) return null;

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    const subjectMap: Record<string, { total: number; correct: number }> = {};
    const systemMap: Record<string, { total: number; correct: number }> = {};

    for (const q of activeTest.questions) {
      const userAns = activeTest.userAnswers[q.id];
      let isCorrect = false;

      if (!userAns || (Array.isArray(userAns) && userAns.length === 0)) {
        unansweredCount++;
      } else if (q.isMultipleChoice && q.correctOptionIds) {
        const userArr = Array.isArray(userAns) ? userAns : [userAns];
        const correctSet = new Set(q.correctOptionIds);
        const userSet = new Set(userArr);
        isCorrect = correctSet.size === userSet.size && [...correctSet].every((x) => userSet.has(x));
        if (isCorrect) correctCount++;
        else incorrectCount++;
      } else {
        isCorrect = userAns === q.correctOptionId;
        if (isCorrect) correctCount++;
        else incorrectCount++;
      }

      if (userAns) {
        await dbService.recordQuestionAttempt(q.id, userAns, isCorrect);
      }

      // Subject stats
      if (!subjectMap[q.subject]) subjectMap[q.subject] = { total: 0, correct: 0 };
      subjectMap[q.subject].total++;
      if (isCorrect) subjectMap[q.subject].correct++;

      // System stats
      if (!systemMap[q.system]) systemMap[q.system] = { total: 0, correct: 0 };
      systemMap[q.system].total++;
      if (isCorrect) systemMap[q.system].correct++;
    }

    const total = activeTest.questions.length;
    const accuracyPercentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const amcScaledScore = Math.min(350, Math.max(150, Math.round(190 + (accuracyPercentage * 1.6))));

    const subjectPerformance: Record<string, { total: number; correct: number; percentage: number }> = {};
    Object.keys(subjectMap).forEach((s) => {
      const d = subjectMap[s];
      subjectPerformance[s] = {
        total: d.total,
        correct: d.correct,
        percentage: Math.round((d.correct / d.total) * 100)
      };
    });

    const systemPerformance: Record<string, { total: number; correct: number; percentage: number }> = {};
    Object.keys(systemMap).forEach((s) => {
      const d = systemMap[s];
      systemPerformance[s] = {
        total: d.total,
        correct: d.correct,
        percentage: Math.round((d.correct / d.total) * 100)
      };
    });

    const completedSession: TestSession = {
      ...activeTest,
      isCompleted: true,
      completedAt: new Date().toISOString(),
      score: correctCount,
      totalQuestions: total,
      correctCount,
      incorrectCount,
      unansweredCount,
      accuracyPercentage,
      amcScaledScore,
      subjectPerformance,
      systemPerformance
    };

    await dbService.saveTestSession(completedSession);
    await refreshQuestions();
    await loadTestHistory();

    setActiveTest(completedSession);
    return completedSession;
  };

  const exitActiveTest = () => {
    setActiveTest(null);
    setCurrentTab('dashboard');
  };

  const toggleBookmark = async (questionId: string) => {
    const q = questions.find((x) => x.id === questionId);
    if (!q) return;
    const newState = !q.isBookmarked;
    await dbService.updateQuestionBookmark(questionId, newState);
    setQuestions((prev) =>
      prev.map((item) => (item.id === questionId ? { ...item, isBookmarked: newState } : item))
    );
  };

  const updateQuestionNote = async (questionId: string, note: string) => {
    await dbService.updateQuestionNote(questionId, note);
    setQuestions((prev) =>
      prev.map((item) => (item.id === questionId ? { ...item, userNote: note } : item))
    );
  };

  const toggleOsceBookmark = async (id: string) => {
    const s = osceStations.find((x) => x.id === id);
    if (!s) return;
    const updated = { ...s, isBookmarked: !s.isBookmarked };
    await dbService.saveOsceStation(updated);
    setOsceStations((prev) => prev.map((x) => (x.id === id ? updated : x)));
  };

  const saveOsceScore = async (id: string, score: number) => {
    const s = osceStations.find((x) => x.id === id);
    if (!s) return;
    const updated = {
      ...s,
      isCompleted: true,
      userScore: score,
      userCompletedDate: new Date().toISOString()
    };
    await dbService.saveOsceStation(updated);
    setOsceStations((prev) => prev.map((x) => (x.id === id ? updated : x)));
  };

  const completeCase = async (id: string, score: number) => {
    const c = clinicalCases.find((x) => x.id === id);
    if (!c) return;
    const updated = { ...c, isCompleted: true, score };
    await dbService.saveCase(updated);
    setClinicalCases((prev) => prev.map((x) => (x.id === id ? updated : x)));
  };

  const toggleHighYieldBookmark = async (id: string) => {
    setHighYieldTopics((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isBookmarked: !t.isBookmarked } : t))
    );
  };

  const deleteTestHistoryItem = async (id: string) => {
    await dbService.deleteTestSession(id);
    await loadTestHistory();
  };

  const openAiTutorForQuestion = (q: Question) => {
    setActiveTutorQuestion(q);
    setIsAiTutorOpen(true);
  };

  const importQuestions = async (newQuestions: Question[]): Promise<number> => {
    const count = await dbService.saveQuestionsBulk(newQuestions);
    await refreshQuestions();
    return count;
  };

  const expandDatabase10000 = async (count = 1000): Promise<number> => {
    setIsLoading(true);
    try {
      const generated = generateBulkQuestions(count, 'AMC CAT MCQ');
      const added = await dbService.saveQuestionsBulk(generated);
      await refreshQuestions();
      return added;
    } finally {
      setIsLoading(false);
    }
  };

  const resetDatabase = async () => {
    setIsLoading(true);
    try {
      await dbService.resetAllData();
      await refreshQuestions();
      await loadTestHistory();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ExamContext.Provider
      value={{
        questions,
        isLoading,
        totalQuestionCount,
        selectedExam,
        setSelectedExam,
        currentTab,
        setCurrentTab,
        activeTest,
        startNewTest,
        resumeTest,
        submitTestAnswer,
        clearQuestionAnswer,
        toggleFlagQuestion,
        toggleCrossOption,
        navigateTestQuestion,
        finishTestSession,
        exitActiveTest,
        toggleBookmark,
        updateQuestionNote,
        osceStations,
        toggleOsceBookmark,
        saveOsceScore,
        clinicalCases,
        completeCase,
        highYieldTopics,
        toggleHighYieldBookmark,
        testHistory,
        loadTestHistory,
        deleteTestHistoryItem,
        performanceStats,
        userProfile,
        updateUserProfile,
        theme,
        setTheme,
        fontSize,
        setFontSize,
        isLabModalOpen,
        setIsLabModalOpen,
        isCalcModalOpen,
        setIsCalcModalOpen,
        isAiTutorOpen,
        setIsAiTutorOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        isSubscriptionModalOpen,
        setIsSubscriptionModalOpen,
        isDisclaimerModalOpen,
        setIsDisclaimerModalOpen,
        activeTutorQuestion,
        openAiTutorForQuestion,
        importQuestions,
        expandDatabase10000,
        resetDatabase,
        refreshQuestions
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = () => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
};
