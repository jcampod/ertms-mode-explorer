import type { LanguageTranslations } from '../types';
import { deUI } from './ui';
import { deModes } from './modes';
import { deTransitions } from './transitions';
import { deScenarios } from './scenarios';
import { deATOStates } from './ato-modes';
import { deATOTransitions } from './ato-transitions';
import { deGoALevels } from './ato-goa';

export const deTranslations: LanguageTranslations = {
  ui: deUI,
  modes: deModes,
  transitions: deTransitions,
  scenarios: deScenarios,
  atoStates: deATOStates,
  atoTransitions: deATOTransitions,
  goaLevels: deGoALevels,
};
