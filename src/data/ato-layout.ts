import type { ATONodePosition } from './ato-types';

export const atoNodePositions: ATONodePosition[] = [
  // Inactive zone (left)
  { stateId: 'NP', x: 140, y: 275, group: 'inactive' },
  { stateId: 'CO', x: 300, y: 275, group: 'inactive' },
  // Standby zone (center-left)
  { stateId: 'NA', x: 500, y: 275, group: 'standby' },
  { stateId: 'AV', x: 660, y: 275, group: 'standby' },
  // Operational zone (right)
  { stateId: 'RE', x: 820, y: 275, group: 'operational' },
  { stateId: 'EG', x: 960, y: 160, group: 'operational' },
  // Transition zone (bottom-right)
  { stateId: 'DE', x: 960, y: 400, group: 'transition' },
  // Failure zone (bottom-center)
  { stateId: 'FA', x: 500, y: 450, group: 'failure' },
];
