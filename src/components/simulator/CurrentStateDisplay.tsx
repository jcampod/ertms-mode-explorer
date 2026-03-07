import { motion } from 'motion/react';
import type { ModeId } from '../../data/types';
import { modes } from '../../data/modes';
import { modeColors, categoryColors, categoryLabels } from '../../utils/colors';
import { useTheme } from '../../hooks/useTheme';

interface CurrentStateDisplayProps {
  modeId: ModeId;
  isTransitioning?: boolean;
}

export default function CurrentStateDisplay({
  modeId,
  isTransitioning = false,
}: CurrentStateDisplayProps) {
  const { theme } = useTheme();
  const dk = theme === 'dark';

  const mode = modes.find((m) => m.id === modeId);
  if (!mode) return null;

  const colors = modeColors[modeId];
  const catColor = categoryColors[mode.category];
  const catLabel = categoryLabels[mode.category];

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      {/* Mode circle */}
      <motion.div
        key={modeId}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{
          scale: isTransitioning ? [1, 1.08, 1] : 1,
          opacity: 1,
        }}
        transition={{
          scale: isTransitioning
            ? { duration: 0.6, repeat: Infinity, ease: 'easeInOut' }
            : { type: 'spring', stiffness: 300, damping: 20 },
          opacity: { duration: 0.3 },
        }}
        className="relative flex items-center justify-center"
        style={{ width: 120, height: 120 }}
      >
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-30"
          style={{ backgroundColor: colors.glow }}
        />
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: colors.stroke,
            backgroundColor: colors.fill,
          }}
        />
        {/* Abbreviation */}
        <span
          className="relative text-3xl font-bold font-mono tracking-wider"
          style={{ color: colors.text }}
        >
          {mode.abbreviation}
        </span>
      </motion.div>

      {/* Mode name */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center"
      >
        <h3 className={`text-lg font-semibold ${dk ? 'text-slate-100' : 'text-slate-900'}`}>{mode.name}</h3>

        {/* Category badge */}
        <span
          className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium border"
          style={{
            color: catColor,
            borderColor: `${catColor}40`,
            backgroundColor: `${catColor}15`,
          }}
        >
          {catLabel}
        </span>

        {/* Speed limit */}
        {mode.speedLimit && (
          <p className={`mt-1.5 text-xs ${dk ? 'text-slate-500' : 'text-slate-400'}`}>{mode.speedLimit}</p>
        )}
      </motion.div>
    </div>
  );
}
