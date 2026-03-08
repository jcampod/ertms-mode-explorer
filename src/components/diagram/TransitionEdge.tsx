import { motion } from 'motion/react';
import type { Transition } from '../../data/types';
import { calculateEdgePath } from '../../utils/edge-routing';
import { useTheme } from '../../hooks/useTheme';

type EdgeState = 'idle' | 'highlighted' | 'dimmed' | 'hovered';
type EdgeDirection = 'none' | 'outgoing' | 'incoming';

interface TransitionEdgeProps {
  transition: Transition;
  fromPos: { x: number; y: number };
  toPos: { x: number; y: number };
  state: EdgeState;
  direction: EdgeDirection;
  offset: number;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
  onClick: (id: string) => void;
}

const TransitionEdge = ({
  transition,
  fromPos,
  toPos,
  state,
  direction,
  offset,
  onHoverStart,
  onHoverEnd,
  onClick,
}: TransitionEdgeProps) => {
  const { theme } = useTheme();
  const path = calculateEdgePath(fromPos, toPos, 0.2, offset);
  if (!path) return null;

  const idleColor = theme === 'dark' ? '#475569' : '#94a3b8';

  const getStrokeColor = () => {
    if (state === 'dimmed') return idleColor;

    if (state === 'highlighted' || state === 'hovered') {
      if (direction === 'incoming') return '#34d399'; // emerald-400
      return '#60a5fa'; // blue-400 (outgoing or none)
    }

    return idleColor;
  };

  const getStrokeWidth = () => {
    switch (state) {
      case 'hovered':
        return 3;
      case 'highlighted':
        return 2.5;
      default:
        return 1.5;
    }
  };

  const getOpacity = () => {
    if (state === 'dimmed') return 0.08;
    return 1;
  };

  const getMarkerEnd = () => {
    if (state === 'highlighted' || state === 'hovered') {
      if (direction === 'incoming') return 'url(#arrowhead-incoming)';
      return 'url(#arrowhead-active)';
    }
    return theme === 'dark' ? 'url(#arrowhead)' : 'url(#arrowhead-light)';
  };

  const markerEnd = getMarkerEnd();

  const dashArray = transition.triggerType === 'both' ? '3 3' : (transition.isAutomatic ? undefined : '6 4');

  return (
    <motion.g
      animate={{ opacity: getOpacity() }}
      transition={{ duration: 0.2 }}
    >
      {/* Invisible wide hit area */}
      <path
        d={path}
        fill="none"
        stroke="transparent"
        strokeWidth={16}
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => onHoverStart(transition.id)}
        onMouseLeave={onHoverEnd}
        onClick={(e) => { e.stopPropagation(); onClick(transition.id); }}
      />

      {/* Visible path */}
      <motion.path
        d={path}
        fill="none"
        animate={{
          stroke: getStrokeColor(),
          strokeWidth: getStrokeWidth(),
        }}
        transition={{ duration: 0.15 }}
        strokeDasharray={dashArray}
        markerEnd={markerEnd}
        strokeLinecap="round"
        style={{ pointerEvents: 'none' }}
      />
    </motion.g>
  );
};

export default TransitionEdge;
