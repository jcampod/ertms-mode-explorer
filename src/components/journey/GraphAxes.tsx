import { useUI } from '../../i18n/useUI';
import { graphChrome } from '../../utils/journey-colors';

interface GraphAxesProps {
  dk: boolean;
  graphLeft: number;
  graphTop: number;
  graphWidth: number;
  graphHeight: number;
  maxSpeed: number;
  maxDistance: number;
}

const GraphAxes = ({
  dk,
  graphLeft,
  graphTop,
  graphWidth,
  graphHeight,
  maxSpeed,
  maxDistance,
}: GraphAxesProps) => {
  const ui = useUI();
  const c = dk ? graphChrome.dark : graphChrome.light;

  // Y-axis ticks (speed)
  const yTicks = [0, 20, 40, 60, 80, 100].filter(v => v <= maxSpeed);
  // X-axis ticks (distance)
  const xTicks: number[] = [];
  for (let d = 0; d <= maxDistance; d += 1) xTicks.push(d);

  const speedToY = (kmh: number) =>
    graphTop + graphHeight - (kmh / maxSpeed) * graphHeight;
  const distToX = (km: number) =>
    graphLeft + (km / maxDistance) * graphWidth;

  return (
    <g>
      {/* Horizontal grid lines */}
      {yTicks.map(speed => (
        <line
          key={`grid-y-${speed}`}
          x1={graphLeft}
          y1={speedToY(speed)}
          x2={graphLeft + graphWidth}
          y2={speedToY(speed)}
          stroke={c.grid}
          strokeWidth={speed === 0 ? 1 : 0.5}
          strokeDasharray={speed === 0 ? undefined : '4 4'}
        />
      ))}

      {/* Vertical grid lines */}
      {xTicks.map(dist => (
        <line
          key={`grid-x-${dist}`}
          x1={distToX(dist)}
          y1={graphTop}
          x2={distToX(dist)}
          y2={graphTop + graphHeight}
          stroke={c.grid}
          strokeWidth={0.5}
          strokeDasharray="4 4"
        />
      ))}

      {/* Y-axis line */}
      <line
        x1={graphLeft}
        y1={graphTop}
        x2={graphLeft}
        y2={graphTop + graphHeight}
        stroke={c.axis}
        strokeWidth={1}
      />

      {/* X-axis line */}
      <line
        x1={graphLeft}
        y1={graphTop + graphHeight}
        x2={graphLeft + graphWidth}
        y2={graphTop + graphHeight}
        stroke={c.axis}
        strokeWidth={1}
      />

      {/* Y-axis tick labels */}
      {yTicks.map(speed => (
        <text
          key={`label-y-${speed}`}
          x={graphLeft - 8}
          y={speedToY(speed) + 4}
          textAnchor="end"
          fill={c.tick}
          fontSize={10}
        >
          {speed}
        </text>
      ))}

      {/* X-axis tick labels */}
      {xTicks.map(dist => (
        <text
          key={`label-x-${dist}`}
          x={distToX(dist)}
          y={graphTop + graphHeight + 45}
          textAnchor="middle"
          fill={c.tick}
          fontSize={10}
        >
          {dist}
        </text>
      ))}

      {/* Y-axis label */}
      <text
        x={14}
        y={graphTop + graphHeight / 2}
        textAnchor="middle"
        fill={c.label}
        fontSize={10}
        fontWeight={500}
        transform={`rotate(-90, 14, ${graphTop + graphHeight / 2})`}
      >
        {ui.jpSpeed}
      </text>

      {/* X-axis label */}
      <text
        x={graphLeft + graphWidth / 2}
        y={graphTop + graphHeight + 58}
        textAnchor="middle"
        fill={c.label}
        fontSize={10}
        fontWeight={500}
      >
        {ui.jpDistance}
      </text>
    </g>
  );
};

export default GraphAxes;
