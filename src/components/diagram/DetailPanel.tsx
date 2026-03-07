import { AnimatePresence, motion } from 'motion/react';
import { X, ArrowRight, CheckCircle, Circle, Zap, User, Radio, AlertTriangle } from 'lucide-react';
import type { ETCSMode, ModeId, Transition } from '../../data/types';
import { transitions } from '../../data/transitions';
import { modes } from '../../data/modes';
import { modeColors, categoryColors, categoryLabels } from '../../utils/colors';
import { useTheme } from '../../hooks/useTheme';

interface DetailPanelProps {
  mode: ETCSMode | null;
  transition: Transition | null;
  onClose: () => void;
  onNavigate: (id: ModeId) => void;
}

const triggerIcons = {
  driver: User,
  trackside: Radio,
  system: Zap,
  failure: AlertTriangle,
};

const triggerLabels = {
  driver: 'Driver-initiated',
  trackside: 'Trackside command',
  system: 'Automatic (system)',
  failure: 'Failure detection',
};

const DetailPanel = ({ mode, transition, onClose, onNavigate }: DetailPanelProps) => {
  const isOpen = !!(mode || transition);
  const { theme } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 420 }}
          animate={{ x: 0 }}
          exit={{ x: 420 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`absolute top-0 right-0 z-30 h-full w-[420px] border-l overflow-y-auto ${
            theme === 'dark'
              ? 'bg-slate-900 border-slate-700/60'
              : 'bg-white border-slate-200 shadow-lg'
          }`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded transition-colors ${
              theme === 'dark'
                ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
            }`}
          >
            <X size={16} />
          </button>

          <div className="p-5 pt-4">
            {transition ? (
              <TransitionDetail transition={transition} onNavigate={onNavigate} theme={theme} />
            ) : mode ? (
              <ModeDetail mode={mode} onNavigate={onNavigate} theme={theme} />
            ) : null}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ============================================ */
/* Transition Detail                            */
/* ============================================ */
function TransitionDetail({
  transition: t,
  onNavigate,
  theme,
}: {
  transition: Transition;
  onNavigate: (id: ModeId) => void;
  theme: 'dark' | 'light';
}) {
  const fromMode = modes.find((m) => m.id === t.from);
  const toMode = modes.find((m) => m.id === t.to);
  const TriggerIcon = triggerIcons[t.triggerType];
  const dk = theme === 'dark';

  return (
    <>
      {/* Header: FROM → TO */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => onNavigate(t.from)}
          className={`inline-flex items-center justify-center h-10 min-w-[56px] px-2 rounded-lg text-base font-bold font-mono hover:ring-2 transition-all ${
            dk ? 'hover:ring-slate-600' : 'hover:ring-slate-300'
          }`}
          style={{
            backgroundColor: modeColors[t.from].fill,
            color: modeColors[t.from].text,
            border: `1px solid ${modeColors[t.from].stroke}`,
          }}
        >
          {t.from}
        </button>
        <ArrowRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
        <button
          onClick={() => onNavigate(t.to)}
          className={`inline-flex items-center justify-center h-10 min-w-[56px] px-2 rounded-lg text-base font-bold font-mono hover:ring-2 transition-all ${
            dk ? 'hover:ring-slate-600' : 'hover:ring-slate-300'
          }`}
          style={{
            backgroundColor: modeColors[t.to].fill,
            color: modeColors[t.to].text,
            border: `1px solid ${modeColors[t.to].stroke}`,
          }}
        >
          {t.to}
        </button>
      </div>

      {/* Mode names */}
      <p className={`text-xs mb-4 ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
        {fromMode?.name ?? t.from} → {toMode?.name ?? t.to}
      </p>

      {/* Badges row */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
          dk ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
        }`}>
          <TriggerIcon size={10} />
          {triggerLabels[t.triggerType]}
        </span>
        {t.isAutomatic && (
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
            dk ? 'bg-blue-500/15 text-blue-300' : 'bg-blue-50 text-blue-600'
          }`}>
            Automatic
          </span>
        )}
        {!t.isAutomatic && (
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
            dk ? 'bg-amber-500/15 text-amber-300' : 'bg-amber-50 text-amber-700'
          }`}>
            Manual
          </span>
        )}
        {t.isCommon && (
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
            dk ? 'bg-green-500/15 text-green-300' : 'bg-green-50 text-green-700'
          }`}>
            Common
          </span>
        )}
        {t.isUniversal && (
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
            dk ? 'bg-red-500/15 text-red-300' : 'bg-red-50 text-red-700'
          }`}>
            From any mode
          </span>
        )}
      </div>

      {/* Simple explanation */}
      <div className="mb-4">
        <h3 className={`text-[10px] uppercase tracking-wider font-medium mb-1 ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
          In Simple Terms
        </h3>
        <p className={`text-sm leading-relaxed ${dk ? 'text-slate-200' : 'text-slate-800'}`}>
          {t.description}
        </p>
      </div>

      {/* Technical description */}
      <div className="mb-4">
        <h3 className={`text-[10px] uppercase tracking-wider font-medium mb-1 ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
          Technical Detail
        </h3>
        <p className={`text-[13px] leading-relaxed ${dk ? 'text-slate-400' : 'text-slate-600'}`}>
          {t.detailedDescription}
        </p>
      </div>

      {/* Conditions */}
      <div className="mb-4">
        <h3 className={`text-[10px] uppercase tracking-wider font-medium mb-1.5 ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
          Conditions
        </h3>
        <ul className="space-y-1.5">
          {t.conditions.map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              {c.isRequired ? (
                <CheckCircle size={14} className={`mt-0.5 flex-shrink-0 ${dk ? 'text-green-400' : 'text-green-500'}`} />
              ) : (
                <Circle size={14} className="mt-0.5 text-slate-400 flex-shrink-0" />
              )}
              <span className={c.isRequired
                ? (dk ? 'text-slate-300' : 'text-slate-700')
                : (dk ? 'text-slate-500' : 'text-slate-400')
              }>
                {c.text}
                {!c.isRequired && <span className={dk ? 'text-slate-600 ml-1' : 'text-slate-400 ml-1'}>(optional)</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/* ============================================ */
/* Mode Detail (existing, refactored)           */
/* ============================================ */
function ModeDetail({
  mode,
  onNavigate,
  theme,
}: {
  mode: ETCSMode;
  onNavigate: (id: ModeId) => void;
  theme: 'dark' | 'light';
}) {
  const transitionsFrom = transitions.filter(
    (t) => t.from === mode.id && !t.isUniversal
  );
  const transitionsTo = transitions.filter(
    (t) => t.to === mode.id && !t.isUniversal
  );
  const dk = theme === 'dark';

  const resolveModeName = (id: ModeId) => {
    const m = modes.find((m) => m.id === id);
    return m ? `${m.abbreviation} - ${m.name}` : id;
  };

  const sectionLabel = `text-[10px] uppercase tracking-wider font-medium mb-1 ${dk ? 'text-slate-500' : 'text-slate-400'}`;
  const bodyText = `text-sm leading-relaxed ${dk ? 'text-slate-400' : 'text-slate-600'}`;

  return (
    <>
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
          <h2 className={`text-lg font-semibold ${dk ? 'text-slate-100' : 'text-slate-900'}`}>
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
        <h3 className={sectionLabel}>ETCS Levels</h3>
        <div className="flex gap-1.5">
          {mode.etcsLevel.map((level) => (
            <span
              key={level}
              className={`inline-flex items-center justify-center h-6 min-w-[28px] px-1.5 rounded text-xs font-mono ${
                dk ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {level}
            </span>
          ))}
        </div>
      </div>

      {/* Speed limit */}
      {mode.speedLimit && (
        <div className="mb-4">
          <h3 className={sectionLabel}>Speed Limit</h3>
          <p className={`text-sm ${dk ? 'text-slate-300' : 'text-slate-700'}`}>{mode.speedLimit}</p>
        </div>
      )}

      {/* Simple explanation */}
      <div className="mb-4">
        <h3 className={sectionLabel}>In Simple Terms</h3>
        <p className={`text-sm leading-relaxed ${dk ? 'text-slate-200' : 'text-slate-800'}`}>
          {mode.description}
        </p>
      </div>

      {/* Technical description */}
      <div className="mb-4">
        <h3 className={sectionLabel}>Technical Detail</h3>
        <p className={`text-[13px] leading-relaxed ${dk ? 'text-slate-400' : 'text-slate-600'}`}>
          {mode.detailedDescription}
        </p>
      </div>

      {/* Key characteristics */}
      <div className="mb-4">
        <h3 className={`${sectionLabel} mb-1.5`}>Key Characteristics</h3>
        <ul className="space-y-1">
          {mode.keyCharacteristics.map((char, i) => (
            <li key={i} className={`text-sm flex items-start gap-2 ${dk ? 'text-slate-400' : 'text-slate-600'}`}>
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
        <h3 className={sectionLabel}>Driver Responsibility</h3>
        <p className={bodyText}>{mode.driverResponsibility}</p>
      </div>

      {/* Real-world context */}
      <div className="mb-4">
        <h3 className={sectionLabel}>Real-World Context</h3>
        <p className={bodyText}>{mode.realWorldContext}</p>
      </div>

      {/* Transitions from this mode */}
      {transitionsFrom.length > 0 && (
        <div className="mb-4">
          <h3 className={`${sectionLabel} mb-1.5`}>Transitions From This Mode</h3>
          <div className="space-y-1">
            {transitionsFrom.map((t) => (
              <button
                key={t.id}
                onClick={() => onNavigate(t.to)}
                className={`w-full flex items-center gap-2 rounded px-2 py-1.5 text-left transition-colors group ${
                  dk ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
                }`}
              >
                <span className={`text-xs ${dk ? 'text-slate-500 group-hover:text-slate-400' : 'text-slate-400 group-hover:text-slate-600'}`}>
                  &rarr;
                </span>
                <span
                  className="text-xs font-mono font-bold"
                  style={{ color: modeColors[t.to].text }}
                >
                  {t.to}
                </span>
                <span className={`text-xs truncate ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
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
          <h3 className={`${sectionLabel} mb-1.5`}>Transitions To This Mode</h3>
          <div className="space-y-1">
            {transitionsTo.map((t) => (
              <button
                key={t.id}
                onClick={() => onNavigate(t.from)}
                className={`w-full flex items-center gap-2 rounded px-2 py-1.5 text-left transition-colors group ${
                  dk ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
                }`}
              >
                <span className={`text-xs ${dk ? 'text-slate-500 group-hover:text-slate-400' : 'text-slate-400 group-hover:text-slate-600'}`}>
                  &larr;
                </span>
                <span
                  className="text-xs font-mono font-bold"
                  style={{ color: modeColors[t.from].text }}
                >
                  {t.from}
                </span>
                <span className={`text-xs truncate ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
                  {resolveModeName(t.from)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Subset-026 reference */}
      <div className="mb-2">
        <h3 className={sectionLabel}>Specification Reference</h3>
        <p className={`text-sm font-mono ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
          {mode.subsetReference}
        </p>
      </div>
    </>
  );
}

export default DetailPanel;
