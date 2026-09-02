import { Question, TestSession, PerformanceStats, OsceStation, ClinicalCase, HighYieldTopic, UserProfile } from '../types';
import { INITIAL_QUESTIONS } from '../data/initialQuestions';
import { INITIAL_OSCE_STATIONS } from '../data/osceStations';
import { INITIAL_CLINICAL_CASES } from '../data/clinicalCases';
import { HIGH_YIELD_TOPICS } from '../data/highYieldTopics';
import { generateBulkQuestions } from './questionGenerator';

const DB_NAME = 'Med360_Database_v5';
const DB_VERSION = 1;

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Dr. Jaanvi Candidate',
  title: 'AMC & Medical Exam Candidate',
  email: 'candidate@med360.edu.au',
  targetExam: 'AMC CAT MCQ',
  examDate: '2026-11-20',
  studyStreakDays: 14,
  dailyGoalQuestions: 50,
  subscriptionPlan: 'Med 360 Annual Master Pass',
  subscriptionExpiry: '2027-12-31',
  isCloudSynced: true,
  lastSyncTime: 'Just now'
};

class Med360Database {
  private db: IDBDatabase | null = null;
  private isInitialized = false;

  public async init(): Promise<void> {
    if (this.isInitialized && this.db) return;

    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        console.warn('IndexedDB not supported, using in-memory cache.');
        this.isInitialized = true;
        resolve();
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Questions Store
        if (!db.objectStoreNames.contains('questions')) {
          const qStore = db.createObjectStore('questions', { keyPath: 'id' });
          qStore.createIndex('exam', 'exam', { unique: false });
          qStore.createIndex('subject', 'subject', { unique: false });
          qStore.createIndex('system', 'system', { unique: false });
          qStore.createIndex('difficulty', 'difficulty', { unique: false });
          qStore.createIndex('isBookmarked', 'isBookmarked', { unique: false });
        }

        // Test Sessions Store
        if (!db.objectStoreNames.contains('tests')) {
          const tStore = db.createObjectStore('tests', { keyPath: 'id' });
          tStore.createIndex('createdAt', 'createdAt', { unique: false });
          tStore.createIndex('isCompleted', 'isCompleted', { unique: false });
        }

        // OSCE Stations Store
        if (!db.objectStoreNames.contains('osce')) {
          const oStore = db.createObjectStore('osce', { keyPath: 'id' });
          oStore.createIndex('category', 'category', { unique: false });
        }

        // Cases Store
        if (!db.objectStoreNames.contains('cases')) {
          const cStore = db.createObjectStore('cases', { keyPath: 'id' });
          cStore.createIndex('specialty', 'specialty', { unique: false });
        }

        // High Yield Topics Store
        if (!db.objectStoreNames.contains('highyield')) {
          const hStore = db.createObjectStore('highyield', { keyPath: 'id' });
          hStore.createIndex('subject', 'subject', { unique: false });
        }

        // Metadata Store
        if (!db.objectStoreNames.contains('metadata')) {
          db.createObjectStore('metadata', { keyPath: 'key' });
        }
      };

      request.onsuccess = async (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        this.isInitialized = true;

        // Auto-seed initial bank if empty or less than 10,000
        const count = await this.getQuestionCount();
        if (count < 10000) {
          await this.seedInitialData();
        }
        resolve();
      };

      request.onerror = (event) => {
        console.error('IndexedDB open failed:', (event.target as IDBOpenDBRequest).error);
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  private async seedInitialData(): Promise<void> {
    // Generate full repository of 10,000 questions (3,000 Basic Sciences + 7,000 Clinical Sciences)
    const generated = generateBulkQuestions(10000, 'AMC CAT MCQ');
    const allQuestions = [...INITIAL_QUESTIONS, ...generated];
    await this.saveQuestionsBulk(allQuestions);

    // Seed OSCE stations
    await this.saveOsceBulk(INITIAL_OSCE_STATIONS);

    // Seed Clinical Cases
    await this.saveCasesBulk(INITIAL_CLINICAL_CASES);

    // Seed High Yield Topics
    await this.saveHighYieldBulk(HIGH_YIELD_TOPICS);
  }

  // --- Questions CRUD ---

  public async getAllQuestions(): Promise<Question[]> {
    await this.init();
    if (!this.db) return INITIAL_QUESTIONS;

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('questions', 'readonly');
      const store = tx.objectStore('questions');
      const req = store.getAll();

      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  public async getQuestionCount(): Promise<number> {
    await this.init();
    if (!this.db) return INITIAL_QUESTIONS.length;

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('questions', 'readonly');
      const store = tx.objectStore('questions');
      const req = store.count();

      req.onsuccess = () => resolve(req.result || 0);
      req.onerror = () => reject(req.error);
    });
  }

  public async getQuestionById(id: string): Promise<Question | undefined> {
    await this.init();
    if (!this.db) return INITIAL_QUESTIONS.find(q => q.id === id);

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('questions', 'readonly');
      const store = tx.objectStore('questions');
      const req = store.get(id);

      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  public async saveQuestion(question: Question): Promise<void> {
    await this.init();
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('questions', 'readwrite');
      const store = tx.objectStore('questions');
      const req = store.put(question);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  public async saveQuestionsBulk(questions: Question[]): Promise<number> {
    await this.init();
    if (!this.db || questions.length === 0) return 0;

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('questions', 'readwrite');
      const store = tx.objectStore('questions');

      let added = 0;
      for (const q of questions) {
        store.put(q);
        added++;
      }

      tx.oncomplete = () => resolve(added);
      tx.onerror = () => reject(tx.error);
    });
  }

  public async updateQuestionBookmark(id: string, isBookmarked: boolean): Promise<void> {
    const q = await this.getQuestionById(id);
    if (q) {
      q.isBookmarked = isBookmarked;
      await this.saveQuestion(q);
    }
  }

  public async updateQuestionNote(id: string, note: string): Promise<void> {
    const q = await this.getQuestionById(id);
    if (q) {
      q.userNote = note;
      await this.saveQuestion(q);
    }
  }

  public async recordQuestionAttempt(id: string, selectedOption: string | string[], isCorrect: boolean): Promise<void> {
    const q = await this.getQuestionById(id);
    if (q) {
      q.timesAnswered = (q.timesAnswered || 0) + 1;
      if (isCorrect) {
        q.timesCorrect = (q.timesCorrect || 0) + 1;
      }
      q.userLastAnswer = selectedOption;
      q.lastAttemptDate = new Date().toISOString();
      await this.saveQuestion(q);
    }
  }

  // --- OSCE Stations ---

  public async getAllOsceStations(): Promise<OsceStation[]> {
    await this.init();
    if (!this.db) return INITIAL_OSCE_STATIONS;

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('osce', 'readonly');
      const store = tx.objectStore('osce');
      const req = store.getAll();

      req.onsuccess = () => resolve(req.result && req.result.length > 0 ? req.result : INITIAL_OSCE_STATIONS);
      req.onerror = () => reject(req.error);
    });
  }

  public async saveOsceBulk(stations: OsceStation[]): Promise<void> {
    await this.init();
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('osce', 'readwrite');
      const store = tx.objectStore('osce');
      for (const s of stations) {
        store.put(s);
      }
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  public async saveOsceStation(station: OsceStation): Promise<void> {
    await this.init();
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('osce', 'readwrite');
      const store = tx.objectStore('osce');
      const req = store.put(station);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  // --- Clinical Cases ---

  public async getAllCases(): Promise<ClinicalCase[]> {
    await this.init();
    if (!this.db) return INITIAL_CLINICAL_CASES;

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('cases', 'readonly');
      const store = tx.objectStore('cases');
      const req = store.getAll();

      req.onsuccess = async () => {
        const storedCases: ClinicalCase[] = req.result || [];
        if (storedCases.length < 500) {
          // Auto-upgrade database with full 500+ cases
          await this.saveCasesBulk(INITIAL_CLINICAL_CASES);
          resolve(INITIAL_CLINICAL_CASES);
        } else {
          resolve(storedCases);
        }
      };
      req.onerror = () => reject(req.error);
    });
  }

  public async saveCasesBulk(cases: ClinicalCase[]): Promise<void> {
    await this.init();
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('cases', 'readwrite');
      const store = tx.objectStore('cases');
      for (const c of cases) {
        store.put(c);
      }
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  public async saveCase(c: ClinicalCase): Promise<void> {
    await this.init();
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('cases', 'readwrite');
      const store = tx.objectStore('cases');
      const req = store.put(c);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  // --- High Yield Topics ---

  public async getAllHighYieldTopics(): Promise<HighYieldTopic[]> {
    await this.init();
    if (!this.db) return HIGH_YIELD_TOPICS;

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('highyield', 'readonly');
      const store = tx.objectStore('highyield');
      const req = store.getAll();

      req.onsuccess = () => resolve(req.result && req.result.length > 0 ? req.result : HIGH_YIELD_TOPICS);
      req.onerror = () => reject(req.error);
    });
  }

  public async saveHighYieldBulk(topics: HighYieldTopic[]): Promise<void> {
    await this.init();
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('highyield', 'readwrite');
      const store = tx.objectStore('highyield');
      for (const t of topics) {
        store.put(t);
      }
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  // --- Test Sessions CRUD ---

  public async getAllTestSessions(): Promise<TestSession[]> {
    await this.init();
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('tests', 'readonly');
      const store = tx.objectStore('tests');
      const req = store.getAll();

      req.onsuccess = () => {
        const sorted = (req.result || []).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        resolve(sorted);
      };
      req.onerror = () => reject(req.error);
    });
  }

  public async saveTestSession(session: TestSession): Promise<void> {
    await this.init();
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('tests', 'readwrite');
      const store = tx.objectStore('tests');
      const req = store.put(session);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  public async deleteTestSession(id: string): Promise<void> {
    await this.init();
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('tests', 'readwrite');
      const store = tx.objectStore('tests');
      const req = store.delete(id);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  // --- Clear & Reset ---

  public async resetAllData(): Promise<void> {
    await this.init();
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['questions', 'tests', 'osce', 'cases', 'highyield', 'metadata'], 'readwrite');
      tx.objectStore('questions').clear();
      tx.objectStore('tests').clear();
      tx.objectStore('osce').clear();
      tx.objectStore('cases').clear();
      tx.objectStore('highyield').clear();
      tx.objectStore('metadata').clear();

      tx.oncomplete = async () => {
        await this.seedInitialData();
        resolve();
      };
      tx.onerror = () => reject(tx.error);
    });
  }
}

export const dbService = new Med360Database();
