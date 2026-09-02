import React from 'react';
import { ExamProvider, useExam } from './context/ExamContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Dashboard } from './components/Dashboard';
import { PracticeMode } from './components/PracticeMode';
import { QuestionBankBrowser } from './components/QuestionBankBrowser';
import { MockExamsView } from './components/MockExamsView';
import { OscePracticeView } from './components/OscePracticeView';
import { ClinicalCasesView } from './components/ClinicalCasesView';
import { HighYieldView } from './components/HighYieldView';
import { MistakesRevisionView } from './components/MistakesRevisionView';
import { AnalyticsView } from './components/AnalyticsView';
import { CandidateProfileView } from './components/CandidateProfileView';
import { BookmarksAndNotes } from './components/BookmarksAndNotes';
import { TestHistoryView } from './components/TestHistoryView';
import { QuestionImportExport } from './components/QuestionImportExport';
import { LabValuesModal } from './components/LabValuesModal';
import { CalculatorModal } from './components/CalculatorModal';
import { AiClinicalTutorModal } from './components/AiClinicalTutorModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { MedicalDisclaimerModal } from './components/MedicalDisclaimerModal';
import { AndroidApkGuideModal } from './components/AndroidApkGuideModal';

const AppContent: React.FC = () => {
  const { currentTab } = useExam();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050914] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 pt-5 pb-20 xl:pb-8">
        {currentTab === 'dashboard' && <Dashboard />}
        {currentTab === 'practice' && <PracticeMode />}
        {currentTab === 'bank' && <QuestionBankBrowser />}
        {currentTab === 'mock' && <MockExamsView />}
        {currentTab === 'osce' && <OscePracticeView />}
        {currentTab === 'cases' && <ClinicalCasesView />}
        {currentTab === 'highyield' && <HighYieldView />}
        {currentTab === 'mistakes' && <MistakesRevisionView />}
        {currentTab === 'analytics' && <AnalyticsView />}
        {currentTab === 'profile' && <CandidateProfileView />}
        {currentTab === 'bookmarks' && <BookmarksAndNotes />}
        {currentTab === 'history' && <TestHistoryView />}
        {currentTab === 'import_export' && <QuestionImportExport />}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Global Clinical Modals & Tools */}
      <LabValuesModal />
      <CalculatorModal />
      <AiClinicalTutorModal />
      <GlobalSearchModal />
      <SubscriptionModal />
      <MedicalDisclaimerModal />
      <AndroidApkGuideModal />
    </div>
  );
};

export default function App() {
  return (
    <ExamProvider>
      <AppContent />
    </ExamProvider>
  );
}
