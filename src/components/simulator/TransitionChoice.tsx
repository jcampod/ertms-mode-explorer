import { motion } from 'motion/react';
import type { ModeId } from '../../data/types';
import { useTranslatedModes } from '../../i18n/useTranslatedData';
import { modeColors } from '../../utils/colors';
import { useTheme } from '../../hooks/useTheme';

interface TransitionChoiceProps {
  modeId: ModeId;
  onClick: (id: ModeId) => void;
  disabled: boolean;
  isCorrect?: boolean;
  isSelected?: boolean;
}

export default function TransitionChoice({
  modeId,
  onClick,
  disabled,
  isCorrect,
  isSelected,
}: TransitionChoiceProps) {
  const { theme } = useTheme();
  const dk = theme === 'dark';
  const modes = useTranslatedModes();

  const mode = modes.find((m) => m.id === modeId);
  if (!mode) return null;

  const colors = modeColors[modeId];

  // Determine border and background based on state
  let borderColor = colors.stroke + '40';
  let bgColor = 'transparent';

  if (isCorrect === true) {
    borderColor = '#22c55e';
    bgColor = '#22c55e10';
  } else if (isCorrect === false && isSelected) {
    borderColor = '#ef4444';
    bgColor = '#ef444410';
  } else if (isSelected) {
    borderColor = colors.stroke;
    bgColor = colors.fill + '40';
  }

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      onClick={() => !disabled && onClick(modeId)}
      disabled={disabled}
      className="relative flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 text-left"
      style={{
        borderColor,
        backgroundColor: bgColor,
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled && isCorrect === false && !isSelected ? 0.5 : 1,
      }}
    >
      {/* Mode color dot */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border"
        style={{
          backgroundColor: colors.fill,
          borderColor: colors.stroke,
        }}
      >
        <span
          className="text-sm font-bold font-mono"
          style={{ color: colors.text }}
        >
          {mode.abbreviation}
        </span>
      </div>

      {/* Mode name */}
      <div className="min-w-0">
        <p className={`text-sm font-medium ${dk ? 'text-slate-200' : 'text-slate-800'} truncate`}>{mode.name}</p>
        {mode.speedLimit && (
          <p className={`text-[10px] ${dk ? 'text-slate-500' : 'text-slate-400'} truncate`}>{mode.speedLimit}</p>
        )}
      </div>

      {/* Result indicator */}
      {isCorrect !== undefined && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {isCorrect ? (
            <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center">
              <span className="text-green-400 text-xs font-bold">&#10003;</span>
            </div>
          ) : isSelected ? (
            <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center">
              <span className="text-red-400 text-xs font-bold">&#10005;</span>
            </div>
          ) : null}
        </div>
      )}
    </motion.button>
  );
}
