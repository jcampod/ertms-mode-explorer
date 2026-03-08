import { createContext, useContext, useState, useCallback } from 'react';

export type ErtmsLevel = '0' | '1' | '2';

interface ErtmsLevelContextValue {
  ertmsLevel: ErtmsLevel;
  setErtmsLevel: (level: ErtmsLevel) => void;
}

export const ErtmsLevelContext = createContext<ErtmsLevelContextValue>({
  ertmsLevel: '2',
  setErtmsLevel: () => {},
});

export function useErtmsLevel() {
  return useContext(ErtmsLevelContext);
}

export function useErtmsLevelProvider() {
  const [ertmsLevel, setErtmsLevelState] = useState<ErtmsLevel>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ertms-level');
      if (stored && ['0', '1', '2'].includes(stored)) {
        return stored as ErtmsLevel;
      }
    }
    return '2';
  });

  const setErtmsLevel = useCallback((level: ErtmsLevel) => {
    setErtmsLevelState(level);
    localStorage.setItem('ertms-level', level);
  }, []);

  return { ertmsLevel, setErtmsLevel };
}
