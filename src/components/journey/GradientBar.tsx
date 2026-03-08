import type { GradientSection } from '../../data/journey-types';
import { gradientColors } from '../../utils/journey-colors';
import { useUI } from '../../i18n/useUI';

interface GradientBarProps {
  gradients: GradientSection[];
  dk: boolean;
  distToX: (km: number) => number;
  barTop: number;
  barHeight: number;
  visible: boolean;
}

const GradientBar = ({ gradients, dk, distToX, barTop, barHeight, visible }: GradientBarProps) => {
  if (!visible || gradients.length === 0) return null;

  const ui = useUI();
  const theme = dk ? 'dark' : 'light';

  const dirLabel = (dir: string) => {
    if (dir === 'uphill') return ui.jpUphill;
    if (dir === 'downhill') return ui.jpDownhill;
    return ui.jpFlat;
  };

  return (
    <g>
      {gradients.map((section, i) => {
        const x1 = distToX(section.startKm);
        const x2 = distToX(section.endKm);
        const width = x2 - x1;
        const color = gradientColors[section.direction][theme];

        return (
          <g key={i}>
            <rect
              x={x1}
              y={barTop}
              width={width}
              height={barHeight}
              fill={color}
              opacity={section.direction === 'flat' ? 0.15 : 0.3}
              rx={2}
            />
            {width > 40 && (
              <text
                x={x1 + width / 2}
                y={barTop + barHeight / 2 + 3}
                textAnchor="middle"
                fill={color}
                fontSize={7}
                fontWeight={500}
                opacity={0.8}
              >
                {section.direction === 'flat'
                  ? dirLabel(section.direction)
                  : `${section.permille > 0 ? '+' : ''}${section.permille}\u2030`}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
};

export default GradientBar;
