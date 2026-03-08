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
  journeyProfile: {
    journeyName: 'L\u00ednea Metro 1 \u2014 Westgate a East Terminal',
    journeyDescription: 'Gr\u00e1fico interactivo velocidad\u2013distancia que muestra la conducci\u00f3n autom\u00e1tica ATO bajo supervisi\u00f3n ETCS',
    stations: {
      westgate: { name: 'Westgate' },
      'central-park': { name: 'Central Park' },
      riverside: { name: 'Riverside' },
      'east-terminal': { name: 'East Terminal' },
    },
    restrictions: {
      'tsr-1': { reason: 'Mantenimiento de v\u00eda \u2014 amolado de rieles en curso' },
    },
  },
};
