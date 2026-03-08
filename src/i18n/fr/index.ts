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
  journeyProfile: {
    journeyName: 'Ligne de m\u00e9tro 1 \u2014 Westgate \u00e0 East Terminal',
    journeyDescription: 'Graphique interactif vitesse\u2013distance montrant la conduite automatique ATO sous supervision ETCS',
    stations: {
      westgate: { name: 'Westgate' },
      'central-park': { name: 'Central Park' },
      riverside: { name: 'Riverside' },
      'east-terminal': { name: 'East Terminal' },
    },
    restrictions: {
      'tsr-1': { reason: 'Entretien des voies \u2014 meulage des rails en cours' },
    },
  },
};
