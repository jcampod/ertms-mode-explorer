import type { LanguageTranslations } from '../types';
import { frUI } from './ui';
import { frModes } from './modes';
import { frTransitions } from './transitions';
import { frScenarios } from './scenarios';
import { frATOStates } from './ato-modes';
import { frATOTransitions } from './ato-transitions';
import { frGoALevels } from './ato-goa';

export const frTranslations: LanguageTranslations = {
  ui: frUI,
  modes: frModes,
  transitions: frTransitions,
  scenarios: frScenarios,
  atoStates: frATOStates,
  atoTransitions: frATOTransitions,
  goaLevels: frGoALevels,
};
