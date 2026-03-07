import { useState } from 'react';
import TopNav from './components/layout/TopNav';
import TabBar from './components/layout/TabBar';
import StateDiagram from './components/diagram/StateDiagram';
import ScenarioSimulator from './components/simulator/ScenarioSimulator';

type TabId = 'diagram' | 'simulator';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('diagram');

  return (
    <div className="h-screen flex flex-col bg-slate-950 overflow-hidden">
      <TopNav />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-hidden">
        {activeTab === 'diagram' ? <StateDiagram /> : <ScenarioSimulator />}
      </main>
    </div>
  );
}
