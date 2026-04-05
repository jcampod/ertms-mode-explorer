import { useState } from 'react';
import TopNav from './components/layout/TopNav';
import TabBar from './components/layout/TabBar';
import StateDiagram from './components/diagram/StateDiagram';
import ScenarioSimulator from './components/simulator/ScenarioSimulator';
import LevelTransitions from './components/levels/LevelTransitions';
import ATOOverview from './components/ato/ATOOverview';
import JourneyProfileView from './components/journey/JourneyProfileView';
import RAGChat from './components/rag/RAGChat';
import { ThemeContext, useThemeProvider } from './hooks/useTheme';
import { LanguageContext, useLanguageProvider } from './i18n/index';
import { ErtmsLevelContext, useErtmsLevelProvider } from './hooks/useErtmsLevel';

type TabId = 'diagram' | 'simulator' | 'ato' | 'journey' | 'levels' | 'chat';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('chat');
  const themeValue = useThemeProvider();
  const langValue = useLanguageProvider();
  const levelValue = useErtmsLevelProvider();

  return (
    <ThemeContext.Provider value={themeValue}>
      <LanguageContext.Provider value={langValue}>
      <ErtmsLevelContext.Provider value={levelValue}>
        <div className={`h-screen flex flex-col overflow-hidden ${
          themeValue.theme === 'dark' ? 'bg-slate-950 text-slate-200' : 'bg-white text-slate-800'
        }`}>
          <TopNav />
          <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1 overflow-hidden">
            {activeTab === 'diagram' && <StateDiagram />}
            {activeTab === 'simulator' && <ScenarioSimulator />}
            {activeTab === 'levels' && <LevelTransitions />}
            {activeTab === 'ato' && <ATOOverview />}
            {activeTab === 'journey' && <JourneyProfileView />}
            {activeTab === 'chat' && <RAGChat />}
          </main>
        </div>
      </ErtmsLevelContext.Provider>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}
