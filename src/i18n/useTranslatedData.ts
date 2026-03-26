import { useMemo } from 'react';
import { useLanguage } from './index';
import { modes } from '../data/modes';
import { transitions } from '../data/transitions';
import { scenarios } from '../data/scenarios';
import { atoStates } from '../data/ato-modes';
import { atoTransitions } from '../data/ato-transitions';
import { goaLevels } from '../data/ato-goa';
import type { ETCSMode, Transition, Scenario } from '../data/types';
import type { ATOState, ATOTransition, GoAInfo } from '../data/ato-types';
import { useUI } from './useUI';

/**
 * Returns the ETCS modes array, overlaid with translations when a
 * non-English language is active. When English (translations is null),
 * returns the original array unchanged — zero allocation.
 */
export function useTranslatedModes(): ETCSMode[] {
  const { translations } = useLanguage();

  return useMemo(() => {
    if (!translations) return modes;
    return modes.map((mode) => {
      const t = translations.modes[mode.id];
      if (!t) return mode;
      return {
        ...mode,
        // name is NOT translated — ETCS mode names are international standards
        description: t.description,
        detailedDescription: t.detailedDescription,
        speedLimit: t.speedLimit ?? mode.speedLimit,
        driverResponsibility: t.driverResponsibility,
        realWorldContext: t.realWorldContext,
        keyCharacteristics: t.keyCharacteristics,
      };
    });
  }, [translations]);
}

/**
 * Returns the ETCS transitions array, overlaid with translations.
 */
export function useTranslatedTransitions(): Transition[] {
  const { translations } = useLanguage();

  return useMemo(() => {
    if (!translations) return transitions;
    return transitions.map((transition) => {
      const t = translations.transitions[transition.id];
      if (!t) return transition;
      return {
        ...transition,
        description: t.description,
        detailedDescription: t.detailedDescription,
        conditions: transition.conditions.map((c, i) => ({
          ...c,
          text: t.conditions[i] ?? c.text,
        })),
      };
    });
  }, [translations]);
}

/**
 * Returns the scenarios array, overlaid with translations.
 */
export function useTranslatedScenarios(): Scenario[] {
  const { translations } = useLanguage();

  return useMemo(() => {
    if (!translations) return scenarios;
    return scenarios.map((scenario) => {
      const t = translations.scenarios[scenario.id];
      if (!t) return scenario;
      return {
        ...scenario,
        title: t.title,
        description: t.description,
        category: t.category,
        steps: scenario.steps.map((step, i) => {
          const stepT = t.steps[i];
          if (!stepT) return step;
          return {
            ...step,
            situation: stepT.situation,
            question: stepT.question,
            explanation: stepT.explanation,
            hint: stepT.hint ?? step.hint,
          };
        }),
      };
    });
  }, [translations]);
}

/**
 * Returns the ATO states array, overlaid with translations.
 */
export function useTranslatedATOStates(): ATOState[] {
  const { translations } = useLanguage();

  return useMemo(() => {
    if (!translations) return atoStates;
    return atoStates.map((state) => {
      const t = translations.atoStates[state.id];
      if (!t) return state;
      return {
        ...state,
        // name is NOT translated — ATO state names are international standards
        description: t.description,
        detailedDescription: t.detailedDescription,
        keyCharacteristics: t.keyCharacteristics,
        goaRelevance: t.goaRelevance,
        etcsRequirement: t.etcsRequirement,
      };
    });
  }, [translations]);
}

/**
 * Returns the ATO transitions array, overlaid with translations.
 */
export function useTranslatedATOTransitions(): ATOTransition[] {
  const { translations } = useLanguage();

  return useMemo(() => {
    if (!translations) return atoTransitions;
    return atoTransitions.map((transition) => {
      const t = translations.atoTransitions[transition.id];
      if (!t) return transition;
      return {
        ...transition,
        description: t.description,
        detailedDescription: t.detailedDescription,
        conditions: transition.conditions.map((c, i) => ({
          ...c,
          text: t.conditions[i] ?? c.text,
        })),
      };
    });
  }, [translations]);
}

/**
 * Returns the GoA levels array, overlaid with translations.
 */
export function useTranslatedGoALevels(): GoAInfo[] {
  const { translations } = useLanguage();

  return useMemo(() => {
    if (!translations) return goaLevels;
    return goaLevels.map((goa) => {
      const t = translations.goaLevels[goa.level];
      if (!t) return goa;
      return {
        ...goa,
        name: t.name,
        shortName: t.shortName,
        description: t.description,
        detailedDescription: t.detailedDescription,
        driverRole: t.driverRole,
        atoRole: t.atoRole,
        responsibilities: goa.responsibilities.map((r, i) => ({
          ...r,
          task: t.taskNames[i] ?? r.task,
        })),
        realWorldExamples: t.realWorldExamples,
        specStatus: t.specStatus,
      };
    });
  }, [translations]);
}

/**
 * Returns translated ETCS category labels, keyed by ModeCategory.
 * Uses the UI translation strings.
 */
export function useCategoryLabels(): Record<string, string> {
  const ui = useUI();

  return useMemo(
    () => ({
      operational: ui.catOperational,
      supervised: ui.catSpecialMovement,
      standby: ui.catStandBy,
      degraded: ui.catDegraded,
      failure: ui.catFailure,
      inactive: ui.catInactive,
    }),
    [ui.catOperational, ui.catSpecialMovement, ui.catStandBy, ui.catDegraded, ui.catFailure, ui.catInactive],
  );
}

/**
 * Returns translated ATO category labels, keyed by ATOStateCategory.
 * Uses the UI translation strings.
 */
export function useATOCategoryLabels(): Record<string, string> {
  const ui = useUI();

  return useMemo(
    () => ({
      inactive: ui.atoCatInactive,
      standby: ui.atoCatStandby,
      operational: ui.atoCatOperational,
      transition: ui.atoCatTransition,
    failure: ui.atoCatFailure,
    }),
    [ui.atoCatInactive, ui.atoCatStandby, ui.atoCatOperational, ui.atoCatTransition, ui.atoCatFailure],
  );
}
