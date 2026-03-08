import type { SpeedPoint } from '../../data/journey-types';
import { lineColors } from '../../utils/journey-colors';

interface EtcsCeilingLineProps {
  points: SpeedPoint[];
  dk: boolean;
  distToX: (km: number) => number;
  speedToY: (kmh: number) => number;
  visible: boolean;
}

const EtcsCeilingLine = ({ points, dk, distToX, speedToY, visible }: EtcsCeilingLineProps) => {
  if (!visible || points.length === 0) return null;

  const colors = dk ? lineColors.dark : lineColors.light;

  // Build stepped path: horizontal then vertical at each point
  const pathParts: string[] = [];
  for (let i = 0; i < points.length; i++) {
    const x = distToX(points[i].distanceKm);
    const y = speedToY(points[i].speedKmh);
    if (i === 0) {
      pathParts.push(`M ${x} ${y}`);
    } else {
      // Step: horizontal to new x, then vertical to new y
      pathParts.push(`H ${x} V ${y}`);
    }
  }
  const d = pathParts.join(' ');

  // Fill area under the ceiling (very subtle)
  const firstX = distToX(points[0].distanceKm);
  const lastX = distToX(points[points.length - 1].distanceKm);
  const baseY = speedToY(0);
  const fillD = d + ` L ${lastX} ${baseY} L ${firstX} ${baseY} Z`;

  return (
    <g>
      <path d={fillD} fill={colors.etcsCeilingFill} />
      <path
        d={d}
        fill="none"
        stroke={colors.etcsCeiling}
        strokeWidth={1.5}
        strokeDasharray="6 3"
        opacity={0.7}
      />
    </g>
  );
};

export default EtcsCeilingLine;
