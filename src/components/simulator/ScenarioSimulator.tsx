import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useSimulator } from '../../hooks/useSimulator';
import ScenarioSelector from './ScenarioSelector';
import CurrentStateDisplay from './CurrentStateDisplay';
import SituationCard from './SituationCard';
import TransitionChoice from './TransitionChoice';
import FeedbackPanel from './FeedbackPanel';
import ProgressTracker from './ProgressTracker';
import FreeExplorer from './FreeExplorer';

export default function ScenarioSimulator() {
  const sim = useSimulator();

  // Select mode — show scenario picker
  if (sim.view === 'select') {
    return (
      <ScenarioSelector
        onSelectScenario={sim.startScenario}
        onStartFreeExploration={sim.startFreeExploration}
      />
    );
  }

  // Free exploration mode
  if (sim.view === 'free') {
    return (
      <FreeExplorer
        currentMode={sim.currentMode}
        history={sim.history}
        onNavigate={sim.navigateToMode}
        onBack={sim.goBack}
        onReset={sim.resetFreeExploration}
        onExit={sim.reset}
      />
    );
  }

  // Quiz mode
  const { activeScenario, currentStep, currentStepIndex, score, feedback, selectedAnswer } = sim;

  if (!activeScenario) return null;

  // Scenario complete screen
  if (sim.isScenarioComplete) {
    const percentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-6"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">
            {percentage === 100 ? '★' : percentage >= 60 ? '◆' : '●'}
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mb-2">Scenario Complete!</h2>
          <p className="text-slate-400 mb-1">{activeScenario.title}</p>
          <p className="text-3xl font-bold text-blue-400 mb-1">
            {score.correct}/{score.total}
          </p>
          <p className="text-sm text-slate-500">
            {percentage}% correct
            {score.streak > 1 && ` — Best streak: ${score.streak}`}
          </p>
        </motion.div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => sim.startScenario(activeScenario)}
            className="px-5 py-2.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors text-sm font-medium border border-slate-700"
          >
            Try Again
          </button>
          <button
            onClick={sim.reset}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors text-sm font-medium"
          >
            Back to Scenarios
          </button>
        </div>
      </motion.div>
    );
  }

  if (!currentStep) return null;

  // Shuffle options deterministically based on step id
  const allOptions = [currentStep.correctAnswer, ...currentStep.incorrectOptions];
  const shuffledOptions = [...allOptions].sort((a, b) => {
    const hashA = currentStep.id.length + a.charCodeAt(0);
    const hashB = currentStep.id.length + b.charCodeAt(0);
    return hashA - hashB;
  });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 shrink-0">
        <button
          onClick={sim.reset}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Exit
        </button>
        <ProgressTracker
          currentStep={currentStepIndex}
          totalSteps={activeScenario.steps.length}
          score={score}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Current state display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.currentMode}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <CurrentStateDisplay
                modeId={currentStep.currentMode}
                isTransitioning={!!feedback?.show}
              />
            </motion.div>
          </AnimatePresence>

          {/* Situation card */}
          <SituationCard step={currentStep} scenarioTitle={activeScenario.title} />

          {/* Transition choices */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Choose the next mode
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {shuffledOptions.map((modeId) => {
                const isCorrectAnswer = modeId === currentStep.correctAnswer;
                const isSelected = modeId === selectedAnswer;

                return (
                  <TransitionChoice
                    key={modeId}
                    modeId={modeId}
                    onClick={sim.selectAnswer}
                    disabled={!!feedback?.show}
                    isCorrect={feedback?.show ? isCorrectAnswer : undefined}
                    isSelected={isSelected}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Feedback panel */}
      <AnimatePresence>
        {feedback?.show && (
          <FeedbackPanel
            isCorrect={feedback.isCorrect}
            explanation={feedback.explanation}
            correctMode={currentStep.correctAnswer}
            onContinue={sim.nextStep}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
