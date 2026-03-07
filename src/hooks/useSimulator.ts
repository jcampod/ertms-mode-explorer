import { useState, useCallback, useMemo } from 'react';
import type { ModeId, Scenario, ScenarioStep } from '../data/types';
import { transitions } from '../data/transitions';
import { modes } from '../data/modes';

type SimulatorView = 'select' | 'quiz' | 'free';

interface Score {
  correct: number;
  total: number;
  streak: number;
}

interface Feedback {
  show: boolean;
  isCorrect: boolean;
  explanation: string;
}

interface SimulatorState {
  view: SimulatorView;
  activeScenario: Scenario | null;
  currentStepIndex: number;
  score: Score;
  feedback: Feedback | null;
  selectedAnswer: ModeId | null;
  currentMode: ModeId;
  history: ModeId[];
}

const initialState: SimulatorState = {
  view: 'select',
  activeScenario: null,
  currentStepIndex: 0,
  score: { correct: 0, total: 0, streak: 0 },
  feedback: null,
  selectedAnswer: null,
  currentMode: 'NP',
  history: [],
};

export function useSimulator() {
  const [state, setState] = useState<SimulatorState>(initialState);

  const currentStep: ScenarioStep | null = useMemo(() => {
    if (!state.activeScenario) return null;
    return state.activeScenario.steps[state.currentStepIndex] ?? null;
  }, [state.activeScenario, state.currentStepIndex]);

  const isScenarioComplete = useMemo(() => {
    if (!state.activeScenario) return false;
    return state.currentStepIndex >= state.activeScenario.steps.length;
  }, [state.activeScenario, state.currentStepIndex]);

  const availableTransitions = useMemo(() => {
    if (state.view !== 'free') return [];
    const current = state.currentMode;
    const directTransitions = transitions.filter(
      (t) => t.from === current || (t.isUniversal && t.to !== current)
    );

    const targetModeIds = new Set<ModeId>();
    const result: Array<{
      modeId: ModeId;
      description: string;
      conditions: string[];
    }> = [];

    for (const t of directTransitions) {
      const targetId = t.isUniversal ? t.to : t.to;
      if (targetId === current) continue;
      if (targetModeIds.has(targetId)) continue;
      targetModeIds.add(targetId);

      const mode = modes.find((m) => m.id === targetId);
      if (!mode) continue;

      result.push({
        modeId: targetId,
        description: t.description,
        conditions: t.conditions
          .filter((c) => c.isRequired)
          .map((c) => c.text),
      });
    }

    return result;
  }, [state.view, state.currentMode]);

  const startScenario = useCallback((scenario: Scenario) => {
    setState({
      view: 'quiz',
      activeScenario: scenario,
      currentStepIndex: 0,
      score: { correct: 0, total: 0, streak: 0 },
      feedback: null,
      selectedAnswer: null,
      currentMode: scenario.steps[0]?.currentMode ?? 'NP',
      history: [],
    });
  }, []);

  const selectAnswer = useCallback(
    (modeId: ModeId) => {
      setState((prev) => {
        if (!prev.activeScenario || prev.feedback?.show) return prev;
        const step = prev.activeScenario.steps[prev.currentStepIndex];
        if (!step) return prev;

        const isCorrect = modeId === step.correctAnswer;
        const newStreak = isCorrect ? prev.score.streak + 1 : 0;

        return {
          ...prev,
          selectedAnswer: modeId,
          score: {
            correct: prev.score.correct + (isCorrect ? 1 : 0),
            total: prev.score.total + 1,
            streak: newStreak,
          },
          feedback: {
            show: true,
            isCorrect,
            explanation: step.explanation,
          },
        };
      });
    },
    []
  );

  const nextStep = useCallback(() => {
    setState((prev) => {
      if (!prev.activeScenario) return prev;
      const nextIndex = prev.currentStepIndex + 1;
      const nextStepData = prev.activeScenario.steps[nextIndex];

      return {
        ...prev,
        currentStepIndex: nextIndex,
        feedback: null,
        selectedAnswer: null,
        currentMode: nextStepData?.currentMode ?? prev.currentMode,
      };
    });
  }, []);

  const startFreeExploration = useCallback(() => {
    setState({
      ...initialState,
      view: 'free',
      currentMode: 'NP',
      history: [],
    });
  }, []);

  const navigateToMode = useCallback((modeId: ModeId) => {
    setState((prev) => ({
      ...prev,
      currentMode: modeId,
      history: [...prev.history, prev.currentMode],
    }));
  }, []);

  const goBack = useCallback(() => {
    setState((prev) => {
      if (prev.history.length === 0) return prev;
      const newHistory = [...prev.history];
      const previousMode = newHistory.pop()!;
      return {
        ...prev,
        currentMode: previousMode,
        history: newHistory,
      };
    });
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const resetFreeExploration = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentMode: 'NP',
      history: [],
    }));
  }, []);

  return {
    view: state.view,
    activeScenario: state.activeScenario,
    currentStepIndex: state.currentStepIndex,
    score: state.score,
    feedback: state.feedback,
    selectedAnswer: state.selectedAnswer,
    currentMode: state.currentMode,
    history: state.history,
    currentStep,
    isScenarioComplete,
    availableTransitions,
    startScenario,
    selectAnswer,
    nextStep,
    startFreeExploration,
    navigateToMode,
    goBack,
    reset,
    resetFreeExploration,
  };
}
