import type { SpeedRestriction } from '../../data/journey-types';
import { restrictionColors } from '../../utils/journey-colors';

interface RestrictionZonesProps {
  restrictions: SpeedRestriction[];
  dk: boolean;
  distToX: (km: number) => number;
  speedToY: (kmh: number) => number;
  graphTop: number;
  graphHeight: number;
  visible: boolean;
}

const RestrictionZones = ({
  restrictions,
  dk,
  distToX,
  speedToY,
  graphTop,
  graphHeight,
  visible,
}: RestrictionZonesProps) => {
  if (!visible || restrictions.length === 0) return null;

  return (
    <g>
      {restrictions.map(restriction => {
        const x1 = distToX(restriction.startKm);
        const x2 = distToX(restriction.endKm);
        const width = x2 - x1;
        const theme = dk ? 'dark' : 'light';
        const colors = restrictionColors[restriction.type][theme];
        const speedY = speedToY(restriction.speedLimitKmh);

        return (
          <g key={restriction.id}>
            {/* Background zone */}
            <rect
              x={x1}
              y={graphTop}
              width={width}
              height={graphHeight}
              fill={colors.fill}
            />
            {/* Speed limit line */}
            <line
              x1={x1}
              y1={speedY}
              x2={x2}
              y2={speedY}
              stroke={colors.stroke}
              strokeWidth={1}
              strokeDasharray="4 2"
              opacity={0.5}
            />
            {/* Left border */}
            <line
              x1={x1}
              y1={graphTop}
              x2={x1}
              y2={graphTop + graphHeight}
              stroke={colors.stroke}
              strokeWidth={0.5}
              opacity={0.3}
            />
            {/* Right border */}
            <line
              x1={x2}
              y1={graphTop}
              x2={x2}
              y2={graphTop + graphHeight}
              stroke={colors.stroke}
              strokeWidth={0.5}
              opacity={0.3}
            />
            {/* Label */}
            <text
              x={x1 + width / 2}
              y={speedY - 5}
              textAnchor="middle"
              fill={colors.stroke}
              fontSize={8}
              fontWeight={500}
              opacity={0.7}
            >
              {restriction.type === 'temporary' ? 'TSR' : 'PSR'} {restriction.speedLimitKmh}
            </text>
          </g>
        );
      })}
    </g>
  );
};

export default RestrictionZones;
