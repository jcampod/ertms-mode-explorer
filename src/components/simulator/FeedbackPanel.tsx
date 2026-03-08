import { motion } from 'motion/react';
import { Check, X, ChevronRight } from 'lucide-react';
import type { ModeId } from '../../data/types';
import { modeColors } from '../../utils/colors';
import { useTheme } from '../../hooks/useTheme';
import { useUI } from '../../i18n/useUI';
import { useTranslatedModes } from '../../i18n/useTranslatedData';

interface FeedbackPanelProps {
  isCorrect: boolean;
  explanation: string;
  correctMode: ModeId;
  onContinue: () => void;
}

export default function FeedbackPanel({
  isCorrect,
  explanation,
  correctMode,
  onContinue,
}: FeedbackPanelProps) {
  const { theme } = useTheme();
  const dk = theme === 'dark';
  const ui = useUI();
  const allModes = useTranslatedModes();

  const mode = allModes.find((m) => m.id === correctMode);
  const colors = modeColors[correctMode];

  return (
    <motion.div
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`border-t ${dk ? 'border-slate-800' : 'border-slate-200'} ${dk ? 'bg-slate-950/95' : 'bg-white/95'} backdrop-blur-sm p-4 shrink-0`}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isCorrect
                ? 'bg-green-500/20 border border-green-500/50'
                : 'bg-red-500/20 border border-red-500/50'
            }`}
          >
            {isCorrect ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <X className="w-4 h-4 text-red-400" />
            )}
          </div>
          <div>
            <p
              className={`text-sm font-semibold ${
                isCorrect ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {isCorrect ? ui.correct : ui.notQuite}
            </p>
            {!isCorrect && mode && (
              <p className={`text-xs ${dk ? 'text-slate-400' : 'text-slate-500'}`}>
                {ui.correctAnswerIs}{' '}
                <span className="font-semibold" style={{ color: colors.text }}>
                  {mode.abbreviation} ({mode.name})
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Explanation */}
        <p className={`text-xs ${dk ? 'text-slate-400' : 'text-slate-500'} leading-relaxed mb-4`}>{explanation}</p>

        {/* Continue button */}
        <button
          onClick={onContinue}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
        >
          {ui.continueBtn}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
