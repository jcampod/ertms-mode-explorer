import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import type { ETCSMode, ModeId } from '../../data/types';
import { transitions } from '../../data/transitions';
import { modes } from '../../data/modes';
import { modeColors, categoryColors, categoryLabels } from '../../utils/colors';

interface DetailPanelProps {
  mode: ETCSMode | null;
  onClose: () => void;
  onNavigate: (id: ModeId) => void;
}

const DetailPanel = ({ mode, onClose, onNavigate }: DetailPanelProps) => {
  const transitionsFrom = mode
    ? transitions.filter((t) => t.from === mode.id && !t.isUniversal)
    : [];
  const transitionsTo = mode
    ? transitions.filter((t) => t.to === mode.id && !t.isUniversal)
    : [];

  const resolveModeName = (id: ModeId) => {
    const m = modes.find((m) => m.id === id);
    return m ? `${m.abbreviation} - ${m.name}` : id;
  };

  return (
    <AnimatePresence>
      {mode && (
        <motion.div
          initial={{ x: 420 }}
          animate={{ x: 0 }}
          exit={{ x: 420 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="absolute top-0 right-0 z-30 h-full w-[420px] bg-slate-900 border-l border-slate-700/60 overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
          >
            <X size={16} />
          </button>

          <div className="p-5 pt-4">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className="inline-flex items-center justify-center h-10 w-14 rounded-lg text-lg font-bold font-mono"
                style={{
                  backgroundColor: modeColors[mode.id].fill,
                  color: modeColors[mode.id].text,
                  border: `1px solid ${modeColors[mode.id].stroke}`,
                }}
              >
                {mode.abbreviation}
              </span>
              <div>
                <h2 className="text-lg font-semibold text-slate-100">
                  {mode.name}
                </h2>
                <div className="flex items-center gap-2 mt-0.5">
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
              </div>
            </div>

            {/* ETCS Levels */}
            <div className="mb-4">
              <h3 className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1">
                ETCS Levels
              </h3>
              <div className="flex gap-1.5">
                {mode.etcsLevel.map((level) => (
                  <span
                    key={level}
                    className="inline-flex items-center justify-center h-6 min-w-[28px] px-1.5 rounded bg-slate-800 text-xs text-slate-300 font-mono"
                  >
                    {level}
                  </span>
                ))}
              </div>
            </div>

            {/* Speed limit */}
            {mode.speedLimit && (
              <div className="mb-4">
                <h3 className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1">
                  Speed Limit
                </h3>
                <p className="text-sm text-slate-300">{mode.speedLimit}</p>
              </div>
            )}

            {/* Simple explanation */}
            <div className="mb-4">
              <h3 className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1">
                In Simple Terms
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                {mode.description}
              </p>
            </div>

            {/* Technical description */}
            <div className="mb-4">
              <h3 className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1">
                Technical Detail
              </h3>
              <p className="text-[13px] text-slate-400 leading-relaxed">
                {mode.detailedDescription}
              </p>
            </div>

            {/* Key characteristics */}
            <div className="mb-4">
              <h3 className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5">
                Key Characteristics
              </h3>
              <ul className="space-y-1">
                {mode.keyCharacteristics.map((char, i) => (
                  <li
                    key={i}
                    className="text-sm text-slate-400 flex items-start gap-2"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: modeColors[mode.id].stroke }}
                    />
                    {char}
                  </li>
                ))}
              </ul>
            </div>

            {/* Driver responsibility */}
            <div className="mb-4">
              <h3 className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1">
                Driver Responsibility
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {mode.driverResponsibility}
              </p>
            </div>

            {/* Real-world context */}
            <div className="mb-4">
              <h3 className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1">
                Real-World Context
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {mode.realWorldContext}
              </p>
            </div>

            {/* Transitions from this mode */}
            {transitionsFrom.length > 0 && (
              <div className="mb-4">
                <h3 className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5">
                  Transitions From This Mode
                </h3>
                <div className="space-y-1">
                  {transitionsFrom.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => onNavigate(t.to)}
                      className="w-full flex items-center gap-2 rounded px-2 py-1.5 text-left hover:bg-slate-800/60 transition-colors group"
                    >
                      <span className="text-xs text-slate-500 group-hover:text-slate-400">
                        &rarr;
                      </span>
                      <span
                        className="text-xs font-mono font-bold"
                        style={{ color: modeColors[t.to].text }}
                      >
                        {t.to}
                      </span>
                      <span className="text-xs text-slate-500 truncate">
                        {resolveModeName(t.to)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Transitions to this mode */}
            {transitionsTo.length > 0 && (
              <div className="mb-4">
                <h3 className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5">
                  Transitions To This Mode
                </h3>
                <div className="space-y-1">
                  {transitionsTo.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => onNavigate(t.from)}
                      className="w-full flex items-center gap-2 rounded px-2 py-1.5 text-left hover:bg-slate-800/60 transition-colors group"
                    >
                      <span className="text-xs text-slate-500 group-hover:text-slate-400">
                        &larr;
                      </span>
                      <span
                        className="text-xs font-mono font-bold"
                        style={{ color: modeColors[t.from].text }}
                      >
                        {t.from}
                      </span>
                      <span className="text-xs text-slate-500 truncate">
                        {resolveModeName(t.from)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Subset-026 reference */}
            <div className="mb-2">
              <h3 className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1">
                Specification Reference
              </h3>
              <p className="text-sm text-slate-500 font-mono">
                {mode.subsetReference}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DetailPanel;
