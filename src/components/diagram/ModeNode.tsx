import { motion } from 'motion/react';
import type { ETCSMode, ModeId, NodePosition } from '../../data/types';
import { modeColors } from '../../utils/colors';
import { useTheme } from '../../hooks/useTheme';

type NodeState = 'idle' | 'hovered' | 'dimmed' | 'selected' | 'connected';

interface ModeNodeProps {
  mode: ETCSMode;
  position: NodePosition;
  state: NodeState;
  onHoverStart: (id: ModeId) => void;
  onHoverEnd: () => void;
  onClick: (id: ModeId) => void;
}

const ModeNode = ({ mode, position, state, onHoverStart, onHoverEnd, onClick }: ModeNodeProps) => {
  const colors = modeColors[mode.id];
  const { theme } = useTheme();

  const getOpacity = () => {
    switch (state) {
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
    switch (state) {
      case 'hovered':
        return 1.08;
      case 'selected':
        return 1.05;
      default:
        return 1;
    }
  };

  const showGlow = state === 'hovered' || state === 'selected';

  return (
    <motion.g
      animate={{
        opacity: getOpacity(),
        scale: getScale(),
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{ transformOrigin: `${position.x}px ${position.y}px`, cursor: 'pointer' }}
      onMouseEnter={() => onHoverStart(mode.id)}
      onMouseLeave={onHoverEnd}
      onClick={() => onClick(mode.id)}
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
        strokeWidth={state === 'selected' ? 2.5 : 1.5}
      />

      {/* Mode abbreviation */}
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
        {mode.abbreviation}
      </text>

      {/* Mode name below circle */}
      <text
        x={position.x}
        y={position.y + 56}
        textAnchor="middle"
        fill={theme === 'dark' ? '#ffffff' : '#1e293b'}
        fontWeight="bold"
        fontSize="11"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {mode.name}
      </text>
    </motion.g>
  );
};

export default ModeNode;
