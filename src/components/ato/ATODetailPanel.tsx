import { AnimatePresence, motion } from 'motion/react';
import { X, ArrowRight, CheckCircle, Circle, Zap, User, Users, Radio } from 'lucide-react';
import type { ATOState, ATOStateId, ATOTransition } from '../../data/ato-types';
import { atoStateColors, atoCategoryColors } from '../../utils/ato-colors';
import { useTheme } from '../../hooks/useTheme';
import { useUI } from '../../i18n/useUI';
import { useTranslatedATOStates, useTranslatedATOTransitions, useATOCategoryLabels } from '../../i18n/useTranslatedData';

interface ATODetailPanelProps {
  state: ATOState | null;
  transition: ATOTransition | null;
  onClose: () => void;
  onNavigate: (id: ATOStateId) => void;
}

const triggerIcons = {
  driver: User,
  trackside: Radio,
  system: Zap,
  both: Users,
};

const ATODetailPanel = ({ state, transition, onClose, onNavigate }: ATODetailPanelProps) => {
  const isOpen = !!(state || transition);
  const { theme } = useTheme();
  const ui = useUI();
  const atoStates = useTranslatedATOStates();
  const atoTransitions = useTranslatedATOTransitions();
  const atoCategoryLabels = useATOCategoryLabels();

  const triggerLabels = {
    driver: ui.triggerDriver,
    trackside: ui.triggerTrackside,
    system: ui.triggerSystem,
    both: ui.triggerBoth,
  };

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
              <ATOTransitionDetail transition={transition} onNavigate={onNavigate} theme={theme} atoStates={atoStates} triggerLabels={triggerLabels} ui={ui} />
            ) : state ? (
              <ATOStateDetail state={state} onNavigate={onNavigate} theme={theme} atoStates={atoStates} atoTransitions={atoTransitions} atoCategoryLabels={atoCategoryLabels} ui={ui} />
            ) : null}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ============================================ */
/* ATO Transition Detail                        */
/* ============================================ */
function ATOTransitionDetail({
  transition: t,
  onNavigate,
  theme,
  atoStates,
  triggerLabels,
  ui,
}: {
  transition: ATOTransition;
  onNavigate: (id: ATOStateId) => void;
  theme: 'dark' | 'light';
  atoStates: ATOState[];
  triggerLabels: Record<string, string>;
  ui: ReturnType<typeof useUI>;
}) {
  const fromState = atoStates.find((s) => s.id === t.from);
  const toState = atoStates.find((s) => s.id === t.to);
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
            backgroundColor: atoStateColors[t.from].fill,
            color: atoStateColors[t.from].text,
            border: `1px solid ${atoStateColors[t.from].stroke}`,
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
            backgroundColor: atoStateColors[t.to].fill,
            color: atoStateColors[t.to].text,
            border: `1px solid ${atoStateColors[t.to].stroke}`,
          }}
        >
          {t.to}
        </button>
      </div>

      {/* State names */}
      <p className={`text-xs mb-4 ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
        {fromState?.name ?? t.from} → {toState?.name ?? t.to}
      </p>

      {/* Badges row */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
          t.triggerType === 'both'
            ? (dk ? 'bg-teal-500/15 text-teal-300' : 'bg-teal-50 text-teal-700')
            : (dk ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600')
        }`}>
          <TriggerIcon size={10} />
          {triggerLabels[t.triggerType]}
        </span>
        {t.triggerType !== 'both' && t.triggerType !== 'driver' && (
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
            dk ? 'bg-blue-500/15 text-blue-300' : 'bg-blue-50 text-blue-600'
          }`}>
            {ui.badgeAutomatic}
          </span>
        )}
        {t.triggerType === 'driver' && (
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
            dk ? 'bg-amber-500/15 text-amber-300' : 'bg-amber-50 text-amber-700'
          }`}>
            {ui.badgeManual}
          </span>
        )}
        {t.isCommon && (
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
            dk ? 'bg-green-500/15 text-green-300' : 'bg-green-50 text-green-700'
          }`}>
            {ui.badgeCommon}
          </span>
        )}
        {t.isUniversal && (
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
            dk ? 'bg-red-500/15 text-red-300' : 'bg-red-50 text-red-700'
          }`}>
            {ui.badgeFromAnyState}
          </span>
        )}
      </div>

      {/* Simple explanation */}
      <div className="mb-4">
        <h3 className={`text-[10px] uppercase tracking-wider font-medium mb-1 ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
          {ui.inSimpleTerms}
        </h3>
        <p className={`text-sm leading-relaxed ${dk ? 'text-slate-200' : 'text-slate-800'}`}>
          {t.description}
        </p>
      </div>

      {/* Technical description */}
      <div className="mb-4">
        <h3 className={`text-[10px] uppercase tracking-wider font-medium mb-1 ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
          {ui.technicalDetail}
        </h3>
        <p className={`text-[13px] leading-relaxed ${dk ? 'text-slate-400' : 'text-slate-600'}`}>
          {t.detailedDescription}
        </p>
      </div>

      {/* Conditions */}
      <div className="mb-4">
        <h3 className={`text-[10px] uppercase tracking-wider font-medium mb-1.5 ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
          {ui.conditions}
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
                {!c.isRequired && <span className={dk ? 'text-slate-600 ml-1' : 'text-slate-400 ml-1'}>{ui.optional}</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/* ============================================ */
/* ATO State Detail                             */
/* ============================================ */
function ATOStateDetail({
  state: s,
  onNavigate,
  theme,
  atoStates,
  atoTransitions,
  atoCategoryLabels,
  ui,
}: {
  state: ATOState;
  onNavigate: (id: ATOStateId) => void;
  theme: 'dark' | 'light';
  atoStates: ATOState[];
  atoTransitions: ATOTransition[];
  atoCategoryLabels: Record<string, string>;
  ui: ReturnType<typeof useUI>;
}) {
  const transitionsFrom = atoTransitions.filter(
    (t) => t.from === s.id && !t.isUniversal
  );
  const transitionsTo = atoTransitions.filter(
    (t) => t.to === s.id && !t.isUniversal
  );
  const dk = theme === 'dark';

  const resolveStateName = (id: ATOStateId) => {
    const st = atoStates.find((st) => st.id === id);
    return st ? `${st.abbreviation} - ${st.name}` : id;
  };

  const sectionLabel = `text-[10px] uppercase tracking-wider font-medium mb-1 ${dk ? 'text-slate-500' : 'text-slate-400'}`;

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className="inline-flex items-center justify-center h-10 w-14 rounded-lg text-lg font-bold font-mono"
          style={{
            backgroundColor: atoStateColors[s.id].fill,
            color: atoStateColors[s.id].text,
            border: `1px solid ${atoStateColors[s.id].stroke}`,
          }}
        >
          {s.abbreviation}
        </span>
        <div>
          <h2 className={`text-lg font-semibold ${dk ? 'text-slate-100' : 'text-slate-900'}`}>
            {s.name}
          </h2>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{
                backgroundColor: `${atoCategoryColors[s.category]}20`,
                color: atoCategoryColors[s.category],
              }}
            >
              {atoCategoryLabels[s.category]}
            </span>
          </div>
        </div>
      </div>

      {/* GoA Relevance */}
      <div className="mb-4">
        <h3 className={sectionLabel}>{ui.goaRelevance}</h3>
        <p className={`text-sm ${dk ? 'text-slate-300' : 'text-slate-700'}`}>{s.goaRelevance}</p>
      </div>

      {/* ETCS Requirement */}
      <div className="mb-4">
        <h3 className={sectionLabel}>{ui.etcsRequirement}</h3>
        <p className={`text-sm ${dk ? 'text-slate-300' : 'text-slate-700'}`}>{s.etcsRequirement}</p>
      </div>

      {/* Simple explanation */}
      <div className="mb-4">
        <h3 className={sectionLabel}>{ui.inSimpleTerms}</h3>
        <p className={`text-sm leading-relaxed ${dk ? 'text-slate-200' : 'text-slate-800'}`}>
          {s.description}
        </p>
      </div>

      {/* Technical description */}
      <div className="mb-4">
        <h3 className={sectionLabel}>{ui.technicalDetail}</h3>
        <p className={`text-[13px] leading-relaxed ${dk ? 'text-slate-400' : 'text-slate-600'}`}>
          {s.detailedDescription}
        </p>
      </div>

      {/* Key characteristics */}
      <div className="mb-4">
        <h3 className={`${sectionLabel} mb-1.5`}>{ui.keyCharacteristics}</h3>
        <ul className="space-y-1">
          {s.keyCharacteristics.map((char, i) => (
            <li key={i} className={`text-sm flex items-start gap-2 ${dk ? 'text-slate-400' : 'text-slate-600'}`}>
              <span
                className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: atoStateColors[s.id].stroke }}
              />
              {char}
            </li>
          ))}
        </ul>
      </div>

      {/* Transitions from this state */}
      {transitionsFrom.length > 0 && (
        <div className="mb-4">
          <h3 className={`${sectionLabel} mb-1.5`}>{ui.transitionsFromThisState}</h3>
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
                  style={{ color: atoStateColors[t.to].text }}
                >
                  {t.to}
                </span>
                <span className={`text-xs truncate ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
                  {resolveStateName(t.to)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Transitions to this state */}
      {transitionsTo.length > 0 && (
        <div className="mb-4">
          <h3 className={`${sectionLabel} mb-1.5`}>{ui.transitionsToThisState}</h3>
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
                  style={{ color: atoStateColors[t.from].text }}
                >
                  {t.from}
                </span>
                <span className={`text-xs truncate ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
                  {resolveStateName(t.from)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Specification reference */}
      <div className="mb-2">
        <h3 className={sectionLabel}>{ui.specificationReference}</h3>
        <p className={`text-sm font-mono ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
          {s.subsetReference}
        </p>
      </div>
    </>
  );
}

export default ATODetailPanel;
