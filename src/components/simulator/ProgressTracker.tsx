import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

interface ProgressTrackerProps {
  currentStep: number;
  totalSteps: number;
  score: { correct: number; total: number; streak: number };
}

export default function ProgressTracker({
  currentStep,
  totalSteps,
  score,
}: ProgressTrackerProps) {
  return (
    <div className="flex items-center gap-4">
      {/* Step dots */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalSteps }, (_, i) => {
          const isCompleted = i < currentStep;
          const isActive = i === currentStep;

          return (
            <motion.div
              key={i}
              initial={false}
              animate={{
                scale: isActive ? 1.3 : 1,
                backgroundColor: isCompleted
                  ? '#3b82f6'
                  : isActive
                    ? '#60a5fa'
                    : '#334155',
              }}
              className="w-2 h-2 rounded-full"
              style={{
                boxShadow: isActive ? '0 0 6px #3b82f6' : 'none',
              }}
            />
          );
        })}
      </div>

      {/* Score */}
      {score.total > 0 && (
        <span className="text-xs text-slate-400">
          <span className="text-blue-400 font-medium">{score.correct}</span>/{score.total}
        </span>
      )}

      {/* Streak */}
      {score.streak > 1 && (
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-0.5 text-xs text-amber-400 font-medium"
        >
          <Zap className="w-3 h-3" />
          {score.streak}
        </motion.span>
      )}
    </div>
  );
}
