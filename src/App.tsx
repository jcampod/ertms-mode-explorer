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
import { AppContext, useAppContextProvider } from './hooks/useAppContext';
import { ChatTriggerContext, useChatTriggerProvider } from './hooks/useChatTrigger';

export default function App() {
  const themeValue = useThemeProvider();
  const langValue = useLanguageProvider();
  const levelValue = useErtmsLevelProvider();
  const appCtx = useAppContextProvider();
  const chatTrigger = useChatTriggerProvider();

  return (
    <ThemeContext.Provider value={themeValue}>
      <LanguageContext.Provider value={langValue}>
      <ErtmsLevelContext.Provider value={levelValue}>
      <AppContext.Provider value={appCtx}>
      <ChatTriggerContext.Provider value={chatTrigger}>
        <div className={`h-screen flex flex-col overflow-hidden ${
          themeValue.theme === 'dark' ? 'bg-slate-950 text-slate-200' : 'bg-white text-slate-800'
        }`}>
          <TopNav />
          <TabBar activeTab={appCtx.activeTab} onTabChange={appCtx.setActiveTab} />
          <main className="flex-1 overflow-hidden">
            {appCtx.activeTab === 'diagram' && <StateDiagram />}
            {appCtx.activeTab === 'simulator' && <ScenarioSimulator />}
            {appCtx.activeTab === 'levels' && <LevelTransitions />}
            {appCtx.activeTab === 'ato' && <ATOOverview />}
            {appCtx.activeTab === 'journey' && <JourneyProfileView />}
            {appCtx.activeTab === 'chat' && <RAGChat />}
          </main>
        </div>
      </ChatTriggerContext.Provider>
      </AppContext.Provider>
      </ErtmsLevelContext.Provider>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}
