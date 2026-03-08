import type { LanguageTranslations } from '../types';
import { itUI } from './ui';
import { itModes } from './modes';
import { itTransitions } from './transitions';
import { itScenarios } from './scenarios';
import { itATOStates } from './ato-modes';
import { itATOTransitions } from './ato-transitions';
import { itGoALevels } from './ato-goa';

export const itTranslations: LanguageTranslations = {
  ui: itUI,
  modes: itModes,
  transitions: itTransitions,
  scenarios: itScenarios,
  atoStates: itATOStates,
  atoTransitions: itATOTransitions,
  goaLevels: itGoALevels,
};
