import { useState } from 'react';
import TopNav from './components/layout/TopNav';
import TabBar from './components/layout/TabBar';
import StateDiagram from './components/diagram/StateDiagram';
import ScenarioSimulator from './components/simulator/ScenarioSimulator';
import { ThemeContext, useThemeProvider } from './hooks/useTheme';

type TabId = 'diagram' | 'simulator';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('diagram');
  const themeValue = useThemeProvider();

  return (
    <ThemeContext.Provider value={themeValue}>
      <div className={`h-screen flex flex-col overflow-hidden ${
        themeValue.theme === 'dark' ? 'bg-slate-950 text-slate-200' : 'bg-white text-slate-800'
      }`}>
        <TopNav />
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-hidden">
          {activeTab === 'diagram' ? <StateDiagram /> : <ScenarioSimulator />}
        </main>
      </div>
    </ThemeContext.Provider>
  );
}
