import type { LanguageTranslations } from '../types';
import { esUI } from './ui';
import { esModes } from './modes';
import { esTransitions } from './transitions';
import { esScenarios } from './scenarios';
import { esATOStates } from './ato-modes';
import { esATOTransitions } from './ato-transitions';
import { esGoALevels } from './ato-goa';

export const esTranslations: LanguageTranslations = {
  ui: esUI,
  modes: esModes,
  transitions: esTransitions,
  scenarios: esScenarios,
  atoStates: esATOStates,
  atoTransitions: esATOTransitions,
  goaLevels: esGoALevels,
};
