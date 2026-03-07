import type { ModeId, ModeCategory } from '../data/types';

export const modeColors: Record<ModeId, { fill: string; stroke: string; glow: string; text: string }> = {
  // Operational (blues)
  FS: { fill: '#1e3a5f', stroke: '#3b82f6', glow: '#3b82f6', text: '#93c5fd' },
  LS: { fill: '#1e3a5f', stroke: '#60a5fa', glow: '#60a5fa', text: '#93c5fd' },
  OS: { fill: '#164e63', stroke: '#22d3ee', glow: '#22d3ee', text: '#a5f3fc' },
  SR: { fill: '#1e1b4b', stroke: '#818cf8', glow: '#818cf8', text: '#c7d2fe' },
  UN: { fill: '#1c3d5a', stroke: '#67e8f9', glow: '#67e8f9', text: '#a5f3fc' },
  SN: { fill: '#2e1065', stroke: '#a78bfa', glow: '#a78bfa', text: '#ddd6fe' },
  // Supervised / special (teals/greens)
  SH: { fill: '#064e3b', stroke: '#34d399', glow: '#34d399', text: '#a7f3d0' },
  NL: { fill: '#065f46', stroke: '#6ee7b7', glow: '#6ee7b7', text: '#a7f3d0' },
  RV: { fill: '#047857', stroke: '#a7f3d0', glow: '#a7f3d0', text: '#d1fae5' },
  // Standby (neutral)
  SB: { fill: '#1e293b', stroke: '#94a3b8', glow: '#94a3b8', text: '#cbd5e1' },
  // Degraded (ambers)
  TR: { fill: '#78350f', stroke: '#f59e0b', glow: '#f59e0b', text: '#fde68a' },
  PT: { fill: '#713f12', stroke: '#fbbf24', glow: '#fbbf24', text: '#fde68a' },
  // Failure (reds)
  SF: { fill: '#7f1d1d', stroke: '#ef4444', glow: '#ef4444', text: '#fca5a5' },
  NP: { fill: '#292524', stroke: '#78716c', glow: '#78716c', text: '#a8a29e' },
  // Inactive (grays)
  IS: { fill: '#1c1917', stroke: '#78716c', glow: '#78716c', text: '#a8a29e' },
  SL: { fill: '#292524', stroke: '#a8a29e', glow: '#a8a29e', text: '#d6d3d1' },
};

export const categoryColors: Record<ModeCategory, string> = {
  operational: '#3b82f6',
  supervised: '#34d399',
  standby: '#94a3b8',
  degraded: '#f59e0b',
  failure: '#ef4444',
  inactive: '#78716c',
};

export const categoryLabels: Record<ModeCategory, string> = {
  operational: 'Operational',
  supervised: 'Special Movement',
  standby: 'Stand By',
  degraded: 'Degraded',
  failure: 'Failure',
  inactive: 'Inactive',
};
