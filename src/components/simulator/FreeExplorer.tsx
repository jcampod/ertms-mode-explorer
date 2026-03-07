import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, RotateCcw, ChevronRight, X } from 'lucide-react';
import type { ModeId } from '../../data/types';
import { modes } from '../../data/modes';
import { transitions } from '../../data/transitions';
import { modeColors, categoryColors } from '../../utils/colors';
import CurrentStateDisplay from './CurrentStateDisplay';
import { useTheme } from '../../hooks/useTheme';

interface FreeExplorerProps {
  currentMode: ModeId;
  history: ModeId[];
  onNavigate: (id: ModeId) => void;
  onBack: () => void;
  onReset: () => void;
  onExit: () => void;
}

export default function FreeExplorer({
  currentMode,
  history,
  onNavigate,
  onBack,
  onReset,
  onExit,
}: FreeExplorerProps) {
  const { theme } = useTheme();
  const dk = theme === 'dark';

  const mode = modes.find((m) => m.id === currentMode);
  if (!mode) return null;

  // Compute available transitions from current mode
  const availableTransitions = (() => {
    const directTransitions = transitions.filter(
      (t) => t.from === currentMode || (t.isUniversal && t.to !== currentMode)
    );

    const targetModeIds = new Set<ModeId>();
    const result: Array<{
      modeId: ModeId;
      description: string;
      conditions: string[];
      transitionId: string;
    }> = [];

    for (const t of directTransitions) {
      const targetId = t.to;
      if (targetId === currentMode && !t.id.includes('MA-UPDATE')) continue;
      if (targetId === currentMode) continue;
      if (targetModeIds.has(targetId)) continue;
      targetModeIds.add(targetId);

      const targetMode = modes.find((m) => m.id === targetId);
      if (!targetMode) continue;

      result.push({
        modeId: targetId,
        description: t.description,
        conditions: t.conditions.filter((c) => c.isRequired).map((c) => c.text),
        transitionId: t.id,
      });
    }

    return result;
  })();

  const catColor = categoryColors[mode.category];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b ${dk ? 'border-slate-800' : 'border-slate-200'} shrink-0`}>
        <button
          onClick={onExit}
          className={`flex items-center gap-1.5 text-sm ${dk ? 'text-slate-400' : 'text-slate-500'} ${dk ? 'hover:text-slate-200' : 'hover:text-slate-800'} transition-colors`}
        >
          <X className="w-4 h-4" />
          Exit
        </button>
        <span className="text-xs text-blue-400/70 font-medium">Free Exploration</span>
        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <button
              onClick={onBack}
              className={`flex items-center gap-1 text-xs ${dk ? 'text-slate-400' : 'text-slate-500'} ${dk ? 'hover:text-slate-200' : 'hover:text-slate-800'} transition-colors px-2 py-1 rounded ${dk ? 'bg-slate-800' : 'bg-slate-100'}`}
            >
              <ArrowLeft className="w-3 h-3" />
              Back
            </button>
          )}
          <button
            onClick={onReset}
            className={`flex items-center gap-1 text-xs ${dk ? 'text-slate-400' : 'text-slate-500'} ${dk ? 'hover:text-slate-200' : 'hover:text-slate-800'} transition-colors px-2 py-1 rounded ${dk ? 'bg-slate-800' : 'bg-slate-100'}`}
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>
      </div>

      {/* Breadcrumb trail */}
      {history.length > 0 && (
        <div className={`px-4 py-2 border-b ${dk ? 'border-slate-800/50' : 'border-slate-200/50'} flex items-center gap-1 overflow-x-auto shrink-0`}>
          {history.map((modeId, i) => {
            const histMode = modes.find((m) => m.id === modeId);
            const histColors = modeColors[modeId];
            return (
              <span key={`${modeId}-${i}`} className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => {
                    // Navigate back to this point in history
                    const stepsBack = history.length - i;
                    for (let s = 0; s < stepsBack; s++) {
                      onBack();
                    }
                  }}
                  className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded ${dk ? 'hover:bg-slate-800' : 'hover:bg-slate-100'} transition-colors`}
                  style={{ color: histColors.text }}
                >
                  {histMode?.abbreviation ?? modeId}
                </button>
                <ChevronRight className={`w-3 h-3 ${dk ? 'text-slate-600' : 'text-slate-400'}`} />
              </span>
            );
          })}
          <span
            className="text-[10px] font-mono font-bold px-1.5 py-0.5"
            style={{ color: modeColors[currentMode].text }}
          >
            {mode.abbreviation}
          </span>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Current mode display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMode}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <CurrentStateDisplay modeId={currentMode} />
            </motion.div>
          </AnimatePresence>

          {/* Mode description card */}
          <motion.div
            key={`desc-${currentMode}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`rounded-xl ${dk ? 'bg-slate-900/80' : 'bg-white/80'} border ${dk ? 'border-slate-800' : 'border-slate-200'} p-4 space-y-3`}
          >
            <p className={`text-sm ${dk ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>{mode.description}</p>

            {/* Key characteristics */}
            <div>
              <p className={`text-[10px] ${dk ? 'text-slate-500' : 'text-slate-400'} uppercase tracking-wider font-medium mb-1.5`}>
                Key Characteristics
              </p>
              <ul className="space-y-1">
                {mode.keyCharacteristics.map((char, i) => (
                  <li
                    key={i}
                    className={`text-xs ${dk ? 'text-slate-400' : 'text-slate-500'} flex items-start gap-2`}
                  >
                    <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: catColor }} />
                    {char}
                  </li>
                ))}
              </ul>
            </div>

            {/* Driver responsibility */}
            <div className={`pt-2 border-t ${dk ? 'border-slate-800' : 'border-slate-200'}`}>
              <p className={`text-[10px] ${dk ? 'text-slate-500' : 'text-slate-400'} uppercase tracking-wider font-medium mb-1`}>
                Driver Responsibility
              </p>
              <p className={`text-xs ${dk ? 'text-slate-400' : 'text-slate-500'}`}>{mode.driverResponsibility}</p>
            </div>
          </motion.div>

          {/* Available transitions */}
          <div>
            <p className={`text-xs font-medium ${dk ? 'text-slate-500' : 'text-slate-400'} uppercase tracking-wider mb-2`}>
              Available Transitions ({availableTransitions.length})
            </p>

            {availableTransitions.length === 0 ? (
              <p className={`text-xs ${dk ? 'text-slate-500' : 'text-slate-400'} italic`}>
                No outgoing transitions from this mode. Use Back or Reset to navigate.
              </p>
            ) : (
              <div className="space-y-2">
                {availableTransitions.map((t) => {
                  const targetMode = modes.find((m) => m.id === t.modeId);
                  if (!targetMode) return null;
                  const targetColors = modeColors[t.modeId];

                  return (
                    <motion.button
                      key={t.transitionId}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => onNavigate(t.modeId)}
                      className={`w-full text-left p-3 rounded-lg border ${dk ? 'border-slate-800' : 'border-slate-200'} ${dk ? 'hover:border-slate-600' : 'hover:border-slate-400'} ${dk ? 'bg-slate-900/50' : 'bg-white/50'} ${dk ? 'hover:bg-slate-900' : 'hover:bg-white'} transition-all duration-200 group`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          {/* Target mode dot */}
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center border"
                            style={{
                              backgroundColor: targetColors.fill,
                              borderColor: targetColors.stroke,
                            }}
                          >
                            <span
                              className="text-[10px] font-bold font-mono"
                              style={{ color: targetColors.text }}
                            >
                              {targetMode.abbreviation}
                            </span>
                          </div>
                          <div>
                            <p className={`text-sm font-medium ${dk ? 'text-slate-200' : 'text-slate-800'}`}>
                              {targetMode.name}
                            </p>
                            <p className={`text-[10px] ${dk ? 'text-slate-500' : 'text-slate-400'}`}>{t.description}</p>
                          </div>
                        </div>
                        <ArrowRight className={`w-4 h-4 ${dk ? 'text-slate-600' : 'text-slate-400'} ${dk ? 'group-hover:text-slate-400' : 'group-hover:text-slate-600'} transition-colors shrink-0`} />
                      </div>

                      {/* Conditions */}
                      {t.conditions.length > 0 && (
                        <div className="ml-9 mt-1 space-y-0.5">
                          {t.conditions.map((cond, i) => (
                            <p key={i} className={`text-[10px] ${dk ? 'text-slate-500' : 'text-slate-400'} flex items-start gap-1.5`}>
                              <span className={`${dk ? 'text-slate-600' : 'text-slate-400'} mt-px`}>&#8226;</span>
                              {cond}
                            </p>
                          ))}
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
