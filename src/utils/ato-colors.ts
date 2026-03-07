import type { ATOStateId, ATOStateCategory } from '../data/ato-types';

export const atoStateColors: Record<ATOStateId, { fill: string; stroke: string; glow: string; text: string }> = {
  // Inactive (grays)
  NP: { fill: '#292524', stroke: '#78716c', glow: '#78716c', text: '#a8a29e' },
  CO: { fill: '#1c1917', stroke: '#a8a29e', glow: '#a8a29e', text: '#d6d3d1' },
  // Standby (amber / cyan)
  NA: { fill: '#78350f', stroke: '#f59e0b', glow: '#f59e0b', text: '#fde68a' },
  AV: { fill: '#164e63', stroke: '#22d3ee', glow: '#22d3ee', text: '#a5f3fc' },
  // Operational (emerald / blue)
  RE: { fill: '#065f46', stroke: '#34d399', glow: '#34d399', text: '#a7f3d0' },
  EG: { fill: '#1e3a5f', stroke: '#3b82f6', glow: '#3b82f6', text: '#93c5fd' },
  // Transition (purple)
  DE: { fill: '#2e1065', stroke: '#a78bfa', glow: '#a78bfa', text: '#ddd6fe' },
};

export const atoCategoryColors: Record<ATOStateCategory, string> = {
  inactive: '#78716c',
  standby: '#f59e0b',
  operational: '#3b82f6',
  transition: '#a78bfa',
};

export const atoCategoryLabels: Record<ATOStateCategory, string> = {
  inactive: 'Inactive',
  standby: 'Standby',
  operational: 'Operational',
  transition: 'Transition',
};
