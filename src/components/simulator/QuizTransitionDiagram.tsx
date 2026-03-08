import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import type { ModeId } from '../../data/types';
import { useTranslatedModes, useCategoryLabels } from '../../i18n/useTranslatedData';
import { modeColors, categoryColors } from '../../utils/colors';
import { useTheme } from '../../hooks/useTheme';

interface QuizTransitionDiagramProps {
  currentMode: ModeId;
  options: ModeId[];
  selectedAnswer: ModeId | null;
  feedback: { show: boolean; isCorrect: boolean; explanation: string } | null;
  correctAnswer: ModeId;
  onSelectAnswer: (id: ModeId) => void;
  disabled: boolean;
}

// Calculate a quadratic bezier from source to target, fanning slightly
function calcArrowPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  srcR: number,
  tgtR: number
): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist === 0) return '';
  const ux = dx / dist;
  const uy = dy / dist;

  // Start at edge of source circle
  const sx = from.x + ux * srcR;
  const sy = from.y + uy * srcR;
  // End at edge of target circle
  const ex = to.x - ux * (tgtR + 10); // extra gap for arrowhead
  const ey = to.y - uy * (tgtR + 10);

  // Control point perpendicular offset for slight curve
  const nx = -uy;
  const ny = ux;
  const curvature = dy * 0.15; // curve more for arrows that go up/down
  const mx = (sx + ex) / 2 + nx * curvature * 0.3;
  const my = (sy + ey) / 2 + ny * curvature * 0.3;

  return `M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`;
}

export default function QuizTransitionDiagram({
  currentMode,
  options,
  selectedAnswer,
  feedback,
  correctAnswer,
  onSelectAnswer,
  disabled,
}: QuizTransitionDiagramProps) {
  const { theme } = useTheme();
  const dk = theme === 'dark';
  const modes = useTranslatedModes();
  const categoryLabels = useCategoryLabels();
  const [hoveredOption, setHoveredOption] = useState<ModeId | null>(null);

  const srcColors = modeColors[currentMode];
  const srcMode = useMemo(() => modes.find((m) => m.id === currentMode), [currentMode, modes]);

  // Layout constants
  const viewW = 720;
  const viewH = 300;
  const srcPos = { x: 140, y: viewH / 2 };
  const srcR = 48;
  const optR = 34;
  const optX = 480;

  // Compute option positions evenly spaced
  const optionPositions = useMemo(() => {
    const count = options.length;
    const totalH = viewH - 60; // padding top/bottom
    const spacing = totalH / (count + 1);
    return options.map((_, i) => ({
      x: optX,
      y: 30 + spacing * (i + 1),
    }));
  }, [options.length, viewH]);

  // Arrow and node colors
  const idleStroke = dk ? '#475569' : '#94a3b8';
  const hoverStroke = '#60a5fa';
  const correctStroke = '#22c55e';
  const wrongStroke = '#ef4444';

  const getArrowColor = (optId: ModeId) => {
    if (feedback?.show) {
      if (optId === correctAnswer) return correctStroke;
      if (optId === selectedAnswer && !feedback.isCorrect) return wrongStroke;
      return idleStroke;
    }
    if (hoveredOption === optId) return hoverStroke;
    return idleStroke;
  };

  const getArrowWidth = (optId: ModeId) => {
    if (feedback?.show && (optId === correctAnswer || optId === selectedAnswer)) return 2.5;
    if (hoveredOption === optId) return 2.5;
    return 1.5;
  };

  const getNodeOpacity = (optId: ModeId) => {
    if (!feedback?.show) return 1;
    if (optId === correctAnswer) return 1;
    if (optId === selectedAnswer) return 1;
    return 0.25;
  };

  const getArrowOpacity = (optId: ModeId) => {
    if (!feedback?.show) return 1;
    if (optId === correctAnswer) return 1;
    if (optId === selectedAnswer) return 0.7;
    return 0.1;
  };

  const getNodeStroke = (optId: ModeId) => {
    if (feedback?.show) {
      if (optId === correctAnswer) return correctStroke;
      if (optId === selectedAnswer && !feedback.isCorrect) return wrongStroke;
    }
    if (hoveredOption === optId) return hoverStroke;
    return modeColors[optId].stroke;
  };

  const getNodeStrokeWidth = (optId: ModeId) => {
    if (feedback?.show && (optId === correctAnswer || (optId === selectedAnswer && !feedback.isCorrect))) return 3;
    if (hoveredOption === optId) return 2.5;
    return 1.5;
  };

  const getMarkerColor = (optId: ModeId) => {
    if (feedback?.show) {
      if (optId === correctAnswer) return correctStroke;
      if (optId === selectedAnswer && !feedback.isCorrect) return wrongStroke;
    }
    if (hoveredOption === optId) return hoverStroke;
    return idleStroke;
  };

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
      style={{ maxHeight: '100%' }}
    >
      <defs>
        {/* Dynamic arrowheads — one per option for color control */}
        {options.map((optId) => (
          <marker
            key={`marker-${optId}`}
            id={`quiz-arrow-${optId}`}
            markerWidth="10"
            markerHeight="8"
            refX="9"
            refY="4"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M 0 0 L 10 4 L 0 8 L 2 4 Z" fill={getMarkerColor(optId)} />
          </marker>
        ))}

        {/* Glow filter */}
        <filter id="quiz-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connecting arrows */}
      {options.map((optId, i) => {
        const pos = optionPositions[i];
        const path = calcArrowPath(srcPos, pos, srcR, optR);
        if (!path) return null;

        return (
          <motion.g key={`arrow-${optId}`} animate={{ opacity: getArrowOpacity(optId) }}>
            {/* Invisible hit area */}
            <path
              d={path}
              fill="none"
              stroke="transparent"
              strokeWidth={20}
              style={{ cursor: disabled ? 'default' : 'pointer' }}
              onMouseEnter={() => !disabled && setHoveredOption(optId)}
              onMouseLeave={() => setHoveredOption(null)}
              onClick={() => !disabled && onSelectAnswer(optId)}
            />
            {/* Visible arrow */}
            <motion.path
              d={path}
              fill="none"
              animate={{
                stroke: getArrowColor(optId),
                strokeWidth: getArrowWidth(optId),
              }}
              transition={{ duration: 0.15 }}
              markerEnd={`url(#quiz-arrow-${optId})`}
              strokeLinecap="round"
              style={{ pointerEvents: 'none' }}
            />
          </motion.g>
        );
      })}

      {/* Source node — current mode */}
      <g>
        {/* Glow ring */}
        <circle
          cx={srcPos.x}
          cy={srcPos.y}
          r={srcR + 8}
          fill="none"
          stroke={srcColors.glow}
          strokeWidth={2}
          opacity={0.3}
          filter="url(#quiz-glow)"
        />
        {/* Main circle */}
        <circle
          cx={srcPos.x}
          cy={srcPos.y}
          r={srcR}
          fill={srcColors.fill}
          stroke={srcColors.stroke}
          strokeWidth={2}
        />
        {/* Abbreviation */}
        <text
          x={srcPos.x}
          y={srcPos.y + 1}
          textAnchor="middle"
          dominantBaseline="central"
          fill={srcColors.text}
          fontFamily="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace"
          fontWeight="bold"
          fontSize="20"
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          {srcMode?.abbreviation ?? currentMode}
        </text>
        {/* Mode name */}
        <text
          x={srcPos.x}
          y={srcPos.y + srcR + 18}
          textAnchor="middle"
          fill={dk ? '#cbd5e1' : '#334155'}
          fontSize="13"
          fontWeight="600"
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          {srcMode?.name ?? currentMode}
        </text>
        {/* Category badge */}
        {srcMode && (
          <text
            x={srcPos.x}
            y={srcPos.y + srcR + 34}
            textAnchor="middle"
            fill={categoryColors[srcMode.category]}
            fontSize="10"
            style={{ pointerEvents: 'none', userSelect: 'none' }}
          >
            {categoryLabels[srcMode.category]}
          </text>
        )}
      </g>

      {/* "?" label in between */}
      <text
        x={(srcPos.x + optX) / 2}
        y={viewH / 2 - 10}
        textAnchor="middle"
        fill={dk ? '#475569' : '#cbd5e1'}
        fontSize="28"
        fontWeight="bold"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        ?
      </text>

      {/* Option nodes */}
      {options.map((optId, i) => {
        const pos = optionPositions[i];
        const colors = modeColors[optId];
        const modeObj = modes.find((m) => m.id === optId);
        const isHovered = hoveredOption === optId;
        const nodeScale = isHovered && !disabled ? 1.08 : 1;

        return (
          <motion.g
            key={`opt-${optId}`}
            animate={{
              opacity: getNodeOpacity(optId),
              scale: nodeScale,
            }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{
              transformOrigin: `${pos.x}px ${pos.y}px`,
              cursor: disabled ? 'default' : 'pointer',
            }}
            onMouseEnter={() => !disabled && setHoveredOption(optId)}
            onMouseLeave={() => setHoveredOption(null)}
            onClick={() => !disabled && onSelectAnswer(optId)}
            role="button"
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onSelectAnswer(optId);
              }
            }}
            aria-label={`Select ${modeObj?.name ?? optId}`}
          >
            {/* Invisible hit area for easier clicking */}
            <circle cx={pos.x} cy={pos.y} r={optR + 14} fill="transparent" />

            {/* Hover glow ring */}
            {isHovered && !disabled && (
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={optR + 6}
                fill="none"
                stroke={hoverStroke}
                strokeWidth={1.5}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                filter="url(#quiz-glow)"
              />
            )}

            {/* Correct/wrong indicator ring */}
            {feedback?.show && optId === correctAnswer && (
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={optR + 5}
                fill="none"
                stroke={correctStroke}
                strokeWidth={2}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.5 }}
                filter="url(#quiz-glow)"
              />
            )}

            {/* Main circle */}
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r={optR}
              fill={colors.fill}
              animate={{
                stroke: getNodeStroke(optId),
                strokeWidth: getNodeStrokeWidth(optId),
              }}
              transition={{ duration: 0.15 }}
            />

            {/* Abbreviation */}
            <text
              x={pos.x}
              y={pos.y + 1}
              textAnchor="middle"
              dominantBaseline="central"
              fill={colors.text}
              fontFamily="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace"
              fontWeight="bold"
              fontSize="15"
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              {modeObj?.abbreviation ?? optId}
            </text>

            {/* Correct checkmark */}
            {feedback?.show && optId === correctAnswer && (
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
                style={{ transformOrigin: `${pos.x + optR + 8}px ${pos.y - optR + 4}px` }}
              >
                <circle cx={pos.x + optR + 8} cy={pos.y - optR + 4} r={8} fill={correctStroke} />
                <path
                  d={`M ${pos.x + optR + 4} ${pos.y - optR + 4} l 3 3 5 -5`}
                  fill="none"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.g>
            )}

            {/* Wrong X mark */}
            {feedback?.show && optId === selectedAnswer && !feedback.isCorrect && (
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
                style={{ transformOrigin: `${pos.x + optR + 8}px ${pos.y - optR + 4}px` }}
              >
                <circle cx={pos.x + optR + 8} cy={pos.y - optR + 4} r={8} fill={wrongStroke} />
                <path
                  d={`M ${pos.x + optR + 4} ${pos.y - optR} l 8 8 M ${pos.x + optR + 12} ${pos.y - optR} l -8 8`}
                  fill="none"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </motion.g>
            )}

            {/* Mode name beside circle */}
            <text
              x={pos.x + optR + 22}
              y={pos.y - 2}
              fill={dk ? '#e2e8f0' : '#1e293b'}
              fontSize="12"
              fontWeight="500"
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              {modeObj?.name ?? optId}
            </text>
            {/* Speed limit or category below name */}
            <text
              x={pos.x + optR + 22}
              y={pos.y + 12}
              fill={dk ? '#64748b' : '#94a3b8'}
              fontSize="10"
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              {modeObj?.speedLimit ? modeObj.speedLimit : modeObj ? categoryLabels[modeObj.category] : ''}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
