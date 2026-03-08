import type { Station } from '../../data/journey-types';
import { graphChrome } from '../../utils/journey-colors';

interface StationMarkersProps {
  stations: Station[];
  dk: boolean;
  distToX: (km: number) => number;
  graphTop: number;
  graphHeight: number;
}

const StationMarkers = ({ stations, dk, distToX, graphTop, graphHeight }: StationMarkersProps) => {
  const c = dk ? graphChrome.dark : graphChrome.light;

  return (
    <g>
      {stations.map(station => {
        const x = distToX(station.distanceKm);
        return (
          <g key={station.id}>
            {/* Vertical line */}
            <line
              x1={x}
              y1={graphTop}
              x2={x}
              y2={graphTop + graphHeight}
              stroke={c.stationLine}
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            {/* Platform indicator */}
            <rect
              x={x - 3}
              y={graphTop + graphHeight - 4}
              width={6}
              height={4}
              rx={1}
              fill={c.stationLabel}
              opacity={0.6}
            />
            {/* Station name */}
            <text
              x={x}
              y={graphTop - 6}
              textAnchor="middle"
              fill={c.stationLabel}
              fontSize={9}
              fontWeight={600}
            >
              {station.name}
            </text>
            {/* Distance label */}
            <text
              x={x}
              y={graphTop + graphHeight + 14}
              textAnchor="middle"
              fill={c.tick}
              fontSize={8}
            >
              {station.distanceKm.toFixed(1)} km
            </text>
          </g>
        );
      })}
    </g>
  );
};

export default StationMarkers;
