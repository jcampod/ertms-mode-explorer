import type { SpeedPoint } from '../../data/journey-types';
import { lineColors, phaseColors } from '../../utils/journey-colors';

interface AtoTargetLineProps {
  points: SpeedPoint[];
  dk: boolean;
  distToX: (km: number) => number;
  speedToY: (kmh: number) => number;
  visible: boolean;
  showPhaseColors: boolean;
}

const AtoTargetLine = ({
  points,
  dk,
  distToX,
  speedToY,
  visible,
  showPhaseColors,
}: AtoTargetLineProps) => {
  if (!visible || points.length === 0) return null;

  const colors = dk ? lineColors.dark : lineColors.light;

  if (!showPhaseColors) {
    // Single green line
    const d = points
      .map((pt, i) => {
        const x = distToX(pt.distanceKm);
        const y = speedToY(pt.speedKmh);
        return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
      })
      .join(' ');

    return (
      <g>
        <path d={d} fill="none" stroke={colors.atoTarget} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        {/* Subtle glow */}
        <path d={d} fill="none" stroke={colors.atoTargetGlow} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    );
  }

  // Phase-colored segments
  const segments: { d: string; color: string }[] = [];
  let currentPhase = points[0].phase;
  let segmentPoints: { x: number; y: number }[] = [
    { x: distToX(points[0].distanceKm), y: speedToY(points[0].speedKmh) },
  ];

  for (let i = 1; i < points.length; i++) {
    const pt = points[i];
    const x = distToX(pt.distanceKm);
    const y = speedToY(pt.speedKmh);

    if (pt.phase !== currentPhase) {
      // Close current segment
      segmentPoints.push({ x, y });
      const d = segmentPoints
        .map((p, j) => (j === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
        .join(' ');
      segments.push({ d, color: phaseColors[currentPhase] });

      // Start new segment
      currentPhase = pt.phase;
      segmentPoints = [{ x, y }];
    } else {
      segmentPoints.push({ x, y });
    }
  }

  // Close last segment
  if (segmentPoints.length > 0) {
    const d = segmentPoints
      .map((p, j) => (j === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
      .join(' ');
    segments.push({ d, color: phaseColors[currentPhase] });
  }

  return (
    <g>
      {segments.map((seg, i) => (
        <path
          key={i}
          d={seg.d}
          fill="none"
          stroke={seg.color}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </g>
  );
};

export default AtoTargetLine;
