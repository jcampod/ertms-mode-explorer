import type { SpeedPoint } from '../../data/journey-types';
import { phaseColors } from '../../utils/journey-colors';

interface PhaseOverlayProps {
  points: SpeedPoint[];
  distToX: (km: number) => number;
  graphTop: number;
  graphHeight: number;
  visible: boolean;
}

const PhaseOverlay = ({ points, distToX, graphTop, graphHeight, visible }: PhaseOverlayProps) => {
  if (!visible || points.length === 0) return null;

  // Group consecutive points by phase into bands
  const bands: { phase: string; startKm: number; endKm: number }[] = [];
  let current = { phase: points[0].phase, startKm: points[0].distanceKm, endKm: points[0].distanceKm };

  for (let i = 1; i < points.length; i++) {
    if (points[i].phase === current.phase) {
      current.endKm = points[i].distanceKm;
    } else {
      bands.push({ ...current });
      current = { phase: points[i].phase, startKm: points[i].distanceKm, endKm: points[i].distanceKm };
    }
  }
  bands.push({ ...current });

  return (
    <g>
      {bands.map((band, i) => {
        const x1 = distToX(band.startKm);
        const x2 = distToX(band.endKm);
        const width = Math.max(x2 - x1, 1);
        const color = phaseColors[band.phase as keyof typeof phaseColors] || '#64748b';
        return (
          <rect
            key={i}
            x={x1}
            y={graphTop}
            width={width}
            height={graphHeight}
            fill={color}
            opacity={0.05}
          />
        );
      })}
    </g>
  );
};

export default PhaseOverlay;
