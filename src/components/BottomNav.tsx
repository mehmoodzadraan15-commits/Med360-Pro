import React from 'react';
import { useExam, Med360Tab } from '../context/ExamContext';
import {
  LayoutDashboard,
  Layers,
  GraduationCap,
  Stethoscope,
  Sparkles,
  FileCheck2,
  Bookmark,
  User,
  ShieldCheck
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentTab, setCurrentTab, activeTest } = useExam();

  const tabs: Array<{ id: Med360Tab; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'bank', label: 'Q-Bank', icon: Layers },
    { id: 'mock', label: 'Mocks', icon: GraduationCap },
    { id: 'osce', label: 'OSCE', icon: Stethoscope },
    { id: 'cases', label: 'Cases', icon: FileCheck2 },
    { id: 'highyield', label: 'High Yield', icon: Sparkles },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080e1c]/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-1.5 safe-area-pb">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`mobile-tab-${tab.id}`}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive
                  ? 'text-cyan-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-cyan-950/60 border border-cyan-500/30' : ''}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight whitespace-nowrap">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
