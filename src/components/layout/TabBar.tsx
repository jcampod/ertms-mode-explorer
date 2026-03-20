import { useMemo } from 'react';
import { GitBranch, Gamepad2, Bot, Route, ArrowLeftRight } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useUI } from '../../i18n/useUI';

interface TabBarProps {
  activeTab: 'diagram' | 'simulator' | 'ato' | 'journey' | 'levels';
  onTabChange: (tab: 'diagram' | 'simulator' | 'ato' | 'journey' | 'levels') => void;
}

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const { theme } = useTheme();
  const ui = useUI();

  const tabs = useMemo(() => [
    { id: 'diagram' as const, label: ui.tabStateDiagram, icon: GitBranch },
    { id: 'simulator' as const, label: ui.tabScenarioSimulator, icon: Gamepad2 },
    { id: 'levels' as const, label: ui.tabLevelTransitions, icon: ArrowLeftRight },
    { id: 'ato' as const, label: ui.tabATOOverview, icon: Bot },
    { id: 'journey' as const, label: ui.tabJourneyProfile, icon: Route },
  ], [ui]);

  return (
    <nav className={`flex border-b shrink-0 ${
      theme === 'dark'
        ? 'bg-slate-900/50 border-slate-800'
        : 'bg-slate-50/50 border-slate-200'
    }`}>
      {tabs.map(({ id, label, icon: Icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`
              relative flex items-center gap-2 px-5 py-2.5 text-sm font-medium
              transition-colors duration-150 cursor-pointer
              ${isActive
                ? theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
                : theme === 'dark' ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            {label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
