import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb } from 'lucide-react';
import type { ScenarioStep } from '../../data/types';

interface SituationCardProps {
  step: ScenarioStep;
  scenarioTitle: string;
}

export default function SituationCard({ step, scenarioTitle }: SituationCardProps) {
  const [showHint, setShowHint] = useState(false);

  // Reset hint visibility when step changes
  const [prevStepId, setPrevStepId] = useState(step.id);
  if (step.id !== prevStepId) {
    setPrevStepId(step.id);
    setShowHint(false);
  }

  return (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 space-y-3"
    >
      {/* Scenario title */}
      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">
        {scenarioTitle}
      </p>

      {/* Situation label */}
      <div>
        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium mb-1.5">
          Situation
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">{step.situation}</p>
      </div>

      {/* Question */}
      <div className="pt-2 border-t border-slate-800">
        <p className="text-sm font-semibold text-blue-300 leading-relaxed">{step.question}</p>
      </div>

      {/* Hint */}
      {step.hint && (
        <div>
          <button
            onClick={() => setShowHint((h) => !h)}
            className="flex items-center gap-1.5 text-xs text-amber-400/70 hover:text-amber-400 transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            {showHint ? 'Hide hint' : 'Show hint'}
          </button>
          <AnimatePresence>
            {showHint && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-amber-300/60 mt-1.5 pl-5 leading-relaxed overflow-hidden"
              >
                {step.hint}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
