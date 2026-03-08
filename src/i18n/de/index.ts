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
  journeyProfile: {
    journeyName: 'Metrolinie 1 \u2014 Westgate nach East Terminal',
    journeyDescription: 'Interaktives Geschwindigkeits\u2013Weg-Diagramm mit automatischem ATO-Fahren unter ETCS-\u00DCberwachung',
    stations: {
      westgate: { name: 'Westgate' },
      'central-park': { name: 'Central Park' },
      riverside: { name: 'Riverside' },
      'east-terminal': { name: 'East Terminal' },
    },
    restrictions: {
      'tsr-1': { reason: 'Gleisunterhaltung \u2014 Schienenschleifen im Gange' },
    },
  },
};
