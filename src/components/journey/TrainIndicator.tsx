import type { SpeedPoint, OperationalPhase } from '../../data/journey-types';
import { phaseColors, trainIndicatorColors } from '../../utils/journey-colors';

interface TrainIndicatorProps {
  currentDistanceKm: number;
  atoTargetSpeed: SpeedPoint[];
  dk: boolean;
  distToX: (km: number) => number;
  speedToY: (kmh: number) => number;
}

/** Binary search + linear interpolation at a given distance. */
export function interpolateAtDistance(
  points: SpeedPoint[],
  distanceKm: number,
): { speedKmh: number; phase: OperationalPhase; timeS: number } {
  if (points.length === 0) return { speedKmh: 0, phase: 'stop', timeS: 0 };
  if (distanceKm <= points[0].distanceKm) return points[0];
  if (distanceKm >= points[points.length - 1].distanceKm)
    return points[points.length - 1];

  // Binary search for the interval
  let lo = 0;
  let hi = points.length - 1;
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1;
    if (points[mid].distanceKm <= distanceKm) lo = mid;
    else hi = mid;
  }

  const a = points[lo];
  const b = points[hi];
  const span = b.distanceKm - a.distanceKm;
  if (span === 0) return a;

  const t = (distanceKm - a.distanceKm) / span;
  return {
    speedKmh: a.speedKmh + (b.speedKmh - a.speedKmh) * t,
    phase: a.phase,
    timeS: a.timeS + (b.timeS - a.timeS) * t,
  };
}

const TrainIndicator = ({
  currentDistanceKm,
  atoTargetSpeed,
  dk,
  distToX,
  speedToY,
}: TrainIndicatorProps) => {
  const state = interpolateAtDistance(atoTargetSpeed, currentDistanceKm);
  const cx = distToX(currentDistanceKm);
  const cy = speedToY(state.speedKmh);
  const color = phaseColors[state.phase];
  const ring = dk ? trainIndicatorColors.dark.ring : trainIndicatorColors.light.ring;
  const glow = dk ? trainIndicatorColors.dark.glow : trainIndicatorColors.light.glow;

  return (
    <g>
      {/* Outer glow */}
      <circle cx={cx} cy={cy} r={12} fill={glow} />
      {/* Phase-colored fill */}
      <circle cx={cx} cy={cy} r={6} fill={color} />
      {/* Ring */}
      <circle cx={cx} cy={cy} r={6} fill="none" stroke={ring} strokeWidth={2} />
    </g>
  );
};

export default TrainIndicator;
