import type { NodePosition } from './types';

export const nodePositions: NodePosition[] = [
  // Left column - Inactive / Failure zone
  { modeId: 'NP', x: 160, y: 140, group: 'failure' },
  { modeId: 'IS', x: 160, y: 380, group: 'inactive' },
  { modeId: 'SL', x: 160, y: 560, group: 'inactive' },

  // Left-center - Gateway
  { modeId: 'SB', x: 350, y: 300, group: 'standby' },
  { modeId: 'SF', x: 350, y: 540, group: 'failure' },

  // Center-top - Operational (main supervised modes)
  { modeId: 'FS', x: 560, y: 140, group: 'operational' },
  { modeId: 'LS', x: 740, y: 140, group: 'operational' },
  { modeId: 'OS', x: 900, y: 140, group: 'operational' },

  // Center-mid - Operational (secondary / fallback modes)
  { modeId: 'SR', x: 560, y: 300, group: 'operational' },
  { modeId: 'UN', x: 740, y: 300, group: 'operational' },
  { modeId: 'SN', x: 900, y: 300, group: 'operational' },

  // Center-bottom - Supervised / Special modes
  { modeId: 'SH', x: 560, y: 460, group: 'supervised' },
  { modeId: 'NL', x: 740, y: 460, group: 'supervised' },
  { modeId: 'RV', x: 900, y: 460, group: 'supervised' },

  // Bottom-center - Degraded modes
  { modeId: 'TR', x: 560, y: 630, group: 'degraded' },
  { modeId: 'PT', x: 740, y: 630, group: 'degraded' },
];
