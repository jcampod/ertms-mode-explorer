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
  journeyProfile: {
    journeyName: 'Linea Metro 1 \u2014 Westgate a East Terminal',
    journeyDescription: 'Grafico interattivo velocit\u00e0\u2013distanza che mostra la guida automatica ATO sotto supervisione ETCS',
    stations: {
      westgate: { name: 'Westgate' },
      'central-park': { name: 'Central Park' },
      riverside: { name: 'Riverside' },
      'east-terminal': { name: 'East Terminal' },
    },
    restrictions: {
      'tsr-1': { reason: 'Manutenzione binari \u2014 rettifica rotaie in corso' },
    },
  },
};
