import { GitBranch, Gamepad2 } from 'lucide-react';

interface TabBarProps {
  activeTab: 'diagram' | 'simulator';
  onTabChange: (tab: 'diagram' | 'simulator') => void;
}

const tabs = [
  { id: 'diagram' as const, label: 'State Diagram', icon: GitBranch },
  { id: 'simulator' as const, label: 'Scenario Simulator', icon: Gamepad2 },
];

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <nav className="flex bg-slate-900/50 border-b border-slate-800 shrink-0">
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
                ? 'text-slate-100'
                : 'text-slate-500 hover:text-slate-300'
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
