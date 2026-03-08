import type { OperationalPhase, GradientDirection } from '../data/journey-types';

/* Phase colors — reused from ETCSIntegration.tsx */
export const phaseColors: Record<OperationalPhase, string> = {
  stop: '#ef4444',
  doors: '#34d399',
  depart: '#22d3ee',
  accel: '#3b82f6',
  cruise: '#60a5fa',
  coast: '#a78bfa',
  brake: '#f59e0b',
};

export const phaseIcons: Record<OperationalPhase, string> = {
  stop: '\u25A0',
  doors: '\u25CA',
  depart: '\u25B6',
  accel: '>',
  cruise: '=',
  coast: '~',
  brake: '<',
};

/* Line colors for the two main curves */
export const lineColors = {
  dark: {
    etcsCeiling: '#3b82f6',
    etcsCeilingFill: 'rgba(59, 130, 246, 0.06)',
    atoTarget: '#34d399',
    atoTargetGlow: 'rgba(52, 211, 153, 0.3)',
  },
  light: {
    etcsCeiling: '#2563eb',
    etcsCeilingFill: 'rgba(37, 99, 235, 0.04)',
    atoTarget: '#059669',
    atoTargetGlow: 'rgba(5, 150, 105, 0.2)',
  },
};

/* Gradient direction colors */
export const gradientColors: Record<GradientDirection, { dark: string; light: string }> = {
  uphill: { dark: '#f59e0b', light: '#d97706' },
  downhill: { dark: '#3b82f6', light: '#2563eb' },
  flat: { dark: '#64748b', light: '#94a3b8' },
};

/* Speed restriction overlay */
export const restrictionColors = {
  temporary: {
    dark: { fill: 'rgba(239, 68, 68, 0.08)', stroke: '#ef4444' },
    light: { fill: 'rgba(239, 68, 68, 0.06)', stroke: '#dc2626' },
  },
  permanent: {
    dark: { fill: 'rgba(251, 191, 36, 0.06)', stroke: '#fbbf24' },
    light: { fill: 'rgba(245, 158, 11, 0.05)', stroke: '#f59e0b' },
  },
};

/* Grid and axis colors */
export const graphChrome = {
  dark: {
    axis: '#475569',
    grid: '#1e293b',
    tick: '#64748b',
    label: '#94a3b8',
    stationLine: '#334155',
    stationLabel: '#cbd5e1',
    background: 'rgba(15, 23, 42, 0.4)',
  },
  light: {
    axis: '#cbd5e1',
    grid: '#f1f5f9',
    tick: '#94a3b8',
    label: '#64748b',
    stationLine: '#e2e8f0',
    stationLabel: '#334155',
    background: 'rgba(248, 250, 252, 0.5)',
  },
};

/* Train indicator */
export const trainIndicatorColors = {
  dark: { ring: '#ffffff', glow: 'rgba(255, 255, 255, 0.15)' },
  light: { ring: '#0f172a', glow: 'rgba(15, 23, 42, 0.1)' },
};
