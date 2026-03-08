import { AnimatePresence, motion } from 'motion/react';
import type { ETCSMode } from '../../data/types';
import { modeColors, categoryColors } from '../../utils/colors';
import { useCategoryLabels } from '../../i18n/useTranslatedData';
import { useUI } from '../../i18n/useUI';

interface NodeTooltipProps {
  mode: ETCSMode | null;
  position: { x: number; y: number } | null;
}

const NodeTooltip = ({ mode, position }: NodeTooltipProps) => {
  const categoryLabels = useCategoryLabels();
  const ui = useUI();
  return (
    <AnimatePresence>
      {mode && position && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          className="fixed z-50 pointer-events-none"
          style={{
            left: position.x + 16,
            top: position.y - 8,
          }}
        >
          <div
            className="rounded-lg bg-slate-950 p-3 shadow-xl max-w-xs border"
            style={{ borderColor: modeColors[mode.id].stroke }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="inline-flex items-center justify-center h-6 w-8 rounded text-xs font-bold font-mono"
                style={{
                  backgroundColor: modeColors[mode.id].fill,
                  color: modeColors[mode.id].text,
                }}
              >
                {mode.abbreviation}
              </span>
              <span className="text-sm font-medium text-slate-200">
                {mode.name}
              </span>
            </div>

            {/* Category badge */}
            <div className="mb-2">
              <span
                className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
                style={{
                  backgroundColor: `${categoryColors[mode.category]}20`,
                  color: categoryColors[mode.category],
                }}
              >
                {categoryLabels[mode.category]}
              </span>
            </div>

            {/* Speed limit */}
            {mode.speedLimit && (
              <div className="text-[11px] text-slate-400 mb-1.5">
                <span className="text-slate-500">{ui.tooltipSpeed}: </span>
                {mode.speedLimit}
              </div>
            )}

            {/* Description (truncated) */}
            <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
              {mode.description}
            </p>

            {/* Hint */}
            <div className="mt-2 text-[10px] text-slate-600 italic">
              {ui.tooltipClickForDetails}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NodeTooltip;
