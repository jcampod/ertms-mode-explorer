import { motion } from 'motion/react';
import type { ATOState, ATOStateId, ATONodePosition } from '../../data/ato-types';
import { atoStateColors } from '../../utils/ato-colors';
import { modeColors } from '../../utils/colors';
import { useTheme } from '../../hooks/useTheme';

type NodeState = 'idle' | 'hovered' | 'dimmed' | 'selected' | 'connected';

/** ETCS mode context for each ATO state */
const etcsContext: Record<ATOStateId, { label: string; color: string; bgColor: string } | null> = {
  NP: null, // ATO off — ETCS independent
  CO: null, // Configuring — ETCS independent
  NA: { label: 'ETCS: ≠ FS', color: modeColors.TR.text, bgColor: modeColors.TR.fill },
  AV: { label: 'ETCS: FS', color: modeColors.FS.text, bgColor: modeColors.FS.fill },
  RE: { label: 'FS → AD', color: modeColors.AD.text, bgColor: modeColors.AD.fill },
  EG: { label: 'ETCS: AD', color: modeColors.AD.text, bgColor: modeColors.AD.fill },
  DE: { label: 'AD → FS', color: modeColors.FS.text, bgColor: modeColors.FS.fill },
  FA: { label: 'ETCS: ≠ AD', color: modeColors.TR.text, bgColor: modeColors.TR.fill },
};

interface ATOStateNodeProps {
  state: ATOState;
  position: ATONodePosition;
  nodeState: NodeState;
  onHoverStart: (id: ATOStateId) => void;
  onHoverEnd: () => void;
  onClick: (id: ATOStateId) => void;
}

const ATOStateNode = ({ state, position, nodeState, onHoverStart, onHoverEnd, onClick }: ATOStateNodeProps) => {
  const colors = atoStateColors[state.id];
  const { theme } = useTheme();
  const ctx = etcsContext[state.id];

  const getOpacity = () => {
    switch (nodeState) {
      case 'dimmed':
        return 0.2;
      case 'hovered':
      case 'selected':
        return 1;
      case 'connected':
        return 0.9;
      default:
        return 0.75;
    }
  };

  const getScale = () => {
    switch (nodeState) {
      case 'hovered':
        return 1.08;
      case 'selected':
        return 1.05;
      default:
        return 1;
    }
  };

  const showGlow = nodeState === 'hovered' || nodeState === 'selected';

  // Badge dimensions
  const badgeWidth = ctx ? (ctx.label.length * 6.5 + 14) : 0;
  const badgeHeight = 18;
  const badgeY = position.y + 68;

  return (
    <motion.g
      animate={{
        opacity: getOpacity(),
        scale: getScale(),
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{ transformOrigin: `${position.x}px ${position.y}px`, cursor: 'pointer' }}
      onMouseEnter={() => onHoverStart(state.id)}
      onMouseLeave={onHoverEnd}
      onClick={() => onClick(state.id)}
    >
      {/* Outer glow ring */}
      {showGlow && (
        <motion.circle
          cx={position.x}
          cy={position.y}
          r={48}
          fill="none"
          stroke={colors.glow}
          strokeWidth={2}
          initial={{ opacity: 0, r: 42 }}
          animate={{ opacity: [0.3, 0.6, 0.3], r: 48 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          filter="url(#glow)"
        />
      )}

      {/* Main circle */}
      <circle
        cx={position.x}
        cy={position.y}
        r={40}
        fill={colors.fill}
        stroke={colors.stroke}
        strokeWidth={nodeState === 'selected' ? 2.5 : 1.5}
      />

      {/* State abbreviation */}
      <text
        x={position.x}
        y={position.y + 1}
        textAnchor="middle"
        dominantBaseline="central"
        fill={colors.text}
        fontFamily="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace"
        fontWeight="bold"
        fontSize="16"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {state.abbreviation}
      </text>

      {/* State name below circle */}
      <text
        x={position.x}
        y={position.y + 56}
        textAnchor="middle"
        fill={theme === 'dark' ? '#ffffff' : '#000000'}
        fontSize="11"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {state.name}
      </text>

      {/* ETCS mode context badge */}
      {ctx && (
        <g style={{ pointerEvents: 'none' }}>
          <rect
            x={position.x - badgeWidth / 2}
            y={badgeY - badgeHeight / 2}
            width={badgeWidth}
            height={badgeHeight}
            rx={9}
            fill={ctx.bgColor}
            stroke={theme === 'dark' ? ctx.color : ctx.color}
            strokeWidth={0.8}
            opacity={0.9}
          />
          <text
            x={position.x}
            y={badgeY + 1}
            textAnchor="middle"
            dominantBaseline="central"
            fill={ctx.color}
            fontSize="9"
            fontWeight="600"
            fontFamily="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace"
            style={{ userSelect: 'none' }}
          >
            {ctx.label}
          </text>
        </g>
      )}
    </motion.g>
  );
};

export default ATOStateNode;
