import { useState } from 'react';
import TopNav from './components/layout/TopNav';
import TabBar from './components/layout/TabBar';
import StateDiagram from './components/diagram/StateDiagram';
import ScenarioSimulator from './components/simulator/ScenarioSimulator';
import ATOOverview from './components/ato/ATOOverview';
import JourneyProfileView from './components/journey/JourneyProfileView';
import { ThemeContext, useThemeProvider } from './hooks/useTheme';
import { LanguageContext, useLanguageProvider } from './i18n/index';

type TabId = 'diagram' | 'simulator' | 'ato' | 'journey';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('diagram');
  const themeValue = useThemeProvider();
  const langValue = useLanguageProvider();

  return (
    <ThemeContext.Provider value={themeValue}>
      <LanguageContext.Provider value={langValue}>
        <div className={`h-screen flex flex-col overflow-hidden ${
          themeValue.theme === 'dark' ? 'bg-slate-950 text-slate-200' : 'bg-white text-slate-800'
        }`}>
          <TopNav />
          <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1 overflow-hidden">
            {activeTab === 'diagram' && <StateDiagram />}
            {activeTab === 'simulator' && <ScenarioSimulator />}
            {activeTab === 'ato' && <ATOOverview />}
            {activeTab === 'journey' && <JourneyProfileView />}
          </main>
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}
