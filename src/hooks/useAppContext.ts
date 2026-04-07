import { createContext, useContext, useState, useCallback } from 'react';
import type { ModeId } from '../data/types';

export type TabId = 'diagram' | 'simulator' | 'ato' | 'journey' | 'levels' | 'chat';

interface AppContextValue {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  selectedMode: ModeId | null;
  selectedModeName: string | null;
  setSelectedModeInfo: (id: ModeId | null, name: string | null) => void;
  selectedTransitionId: string | null;
  selectedTransitionFrom: ModeId | null;
  selectedTransitionTo: ModeId | null;
  setSelectedTransitionInfo: (id: string | null, from: ModeId | null, to: ModeId | null) => void;
}

export const AppContext = createContext<AppContextValue>({
  activeTab: 'chat',
  setActiveTab: () => {},
  selectedMode: null,
  selectedModeName: null,
  setSelectedModeInfo: () => {},
  selectedTransitionId: null,
  selectedTransitionFrom: null,
  selectedTransitionTo: null,
  setSelectedTransitionInfo: () => {},
});

export function useAppContext() {
  return useContext(AppContext);
}

export function useAppContextProvider() {
  const [activeTab, setActiveTab] = useState<TabId>('chat');
  const [selectedMode, setSelectedMode] = useState<ModeId | null>(null);
  const [selectedModeName, setSelectedModeName] = useState<string | null>(null);
  const [selectedTransitionId, setSelectedTransitionId] = useState<string | null>(null);
  const [selectedTransitionFrom, setSelectedTransitionFrom] = useState<ModeId | null>(null);
  const [selectedTransitionTo, setSelectedTransitionTo] = useState<ModeId | null>(null);

  const setSelectedModeInfo = useCallback((id: ModeId | null, name: string | null) => {
    setSelectedMode(id);
    setSelectedModeName(name);
    if (id) {
      setSelectedTransitionId(null);
      setSelectedTransitionFrom(null);
      setSelectedTransitionTo(null);
    }
  }, []);

  const setSelectedTransitionInfo = useCallback((id: string | null, from: ModeId | null, to: ModeId | null) => {
    setSelectedTransitionId(id);
    setSelectedTransitionFrom(from);
    setSelectedTransitionTo(to);
    if (id) {
      setSelectedMode(null);
      setSelectedModeName(null);
    }
  }, []);

  return {
    activeTab,
    setActiveTab,
    selectedMode,
    selectedModeName,
    setSelectedModeInfo,
    selectedTransitionId,
    selectedTransitionFrom,
    selectedTransitionTo,
    setSelectedTransitionInfo,
  };
}
