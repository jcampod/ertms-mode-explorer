import { AnimatePresence, motion } from 'motion/react';
import type { Transition } from '../../data/types';
import { useTranslatedModes } from '../../i18n/useTranslatedData';
import { useUI } from '../../i18n/useUI';

const triggerColors: Record<string, string> = {
  driver: '#34d399',
  trackside: '#60a5fa',
  system: '#f59e0b',
  failure: '#ef4444',
};

interface TransitionTooltipProps {
  transition: Transition | null;
  position: { x: number; y: number } | null;
}

const TransitionTooltip = ({ transition, position }: TransitionTooltipProps) => {
  const modes = useTranslatedModes();
  const ui = useUI();

  const triggerLabels: Record<string, string> = {
    driver: ui.triggerDriver,
    trackside: ui.triggerTrackside,
    system: ui.triggerSystem,
    failure: ui.triggerFailure,
  };

  const fromMode = transition ? modes.find((m) => m.id === transition.from) : null;
  const toMode = transition ? modes.find((m) => m.id === transition.to) : null;

  return (
    <AnimatePresence>
      {transition && position && fromMode && toMode && (
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
          <div className="rounded-lg bg-slate-950 p-3 shadow-xl max-w-xs border border-blue-500/40">
            {/* From -> To header */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-sm font-bold font-mono text-slate-200">
                {fromMode.abbreviation}
              </span>
              <span className="text-slate-500 text-xs">&rarr;</span>
              <span className="text-sm font-bold font-mono text-slate-200">
                {toMode.abbreviation}
              </span>
            </div>

            {/* Trigger type badge */}
            <div className="mb-2">
              <span
                className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
                style={{
                  backgroundColor: `${triggerColors[transition.triggerType]}20`,
                  color: triggerColors[transition.triggerType],
                }}
              >
                {triggerLabels[transition.triggerType]}
              </span>
              {transition.isAutomatic && (
                <span className="ml-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium bg-slate-800 text-slate-400">
                  {ui.badgeAutomatic}
                </span>
              )}
            </div>

            {/* Conditions */}
            {transition.conditions.length > 0 && (
              <div className="mb-2">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                  {ui.conditions}
                </span>
                <ul className="mt-1 space-y-0.5">
                  {transition.conditions.map((cond, i) => (
                    <li
                      key={i}
                      className="text-[11px] text-slate-400 flex items-start gap-1"
                    >
                      <span
                        className={`mt-1 h-1 w-1 rounded-full flex-shrink-0 ${
                          cond.isRequired ? 'bg-blue-400' : 'bg-slate-600'
                        }`}
                      />
                      {cond.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Description */}
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {transition.description}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransitionTooltip;
