import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useSimulator } from '../../hooks/useSimulator';
import { useTheme } from '../../hooks/useTheme';
import { useUI } from '../../i18n/useUI';
import ScenarioSelector from './ScenarioSelector';
import SituationCard from './SituationCard';
import QuizTransitionDiagram from './QuizTransitionDiagram';
import FeedbackPanel from './FeedbackPanel';
import ProgressTracker from './ProgressTracker';
import FreeExplorer from './FreeExplorer';

export default function ScenarioSimulator() {
  const sim = useSimulator();
  const { theme } = useTheme();
  const dk = theme === 'dark';
  const ui = useUI();

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
          <h2 className={`text-2xl font-bold ${dk ? 'text-slate-100' : 'text-slate-900'} mb-2`}>{ui.scenarioComplete}</h2>
          <p className={`${dk ? 'text-slate-400' : 'text-slate-500'} mb-1`}>{activeScenario.title}</p>
          <p className="text-3xl font-bold text-blue-400 mb-1">
            {score.correct}/{score.total}
          </p>
          <p className={`text-sm ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
            {percentage}{ui.percentCorrect}
            {score.streak > 1 && ` — ${ui.bestStreak}: ${score.streak}`}
          </p>
        </motion.div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => sim.startScenario(activeScenario)}
            className={`px-5 py-2.5 rounded-lg ${dk ? 'bg-slate-800' : 'bg-slate-100'} ${dk ? 'text-slate-300' : 'text-slate-600'} ${dk ? 'hover:bg-slate-700' : 'hover:bg-slate-200'} transition-colors text-sm font-medium border ${dk ? 'border-slate-700' : 'border-slate-200'}`}
          >
            {ui.tryAgain}
          </button>
          <button
            onClick={sim.reset}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors text-sm font-medium"
          >
            {ui.backToScenarios}
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
      <div className={`flex items-center justify-between px-4 py-3 border-b ${dk ? 'border-slate-800' : 'border-slate-200'} shrink-0`}>
        <button
          onClick={sim.reset}
          className={`flex items-center gap-1.5 text-sm ${dk ? 'text-slate-400' : 'text-slate-500'} ${dk ? 'hover:text-slate-200' : 'hover:text-slate-800'} transition-colors`}
        >
          <ArrowLeft className="w-4 h-4" />
          {ui.exit}
        </button>
        <ProgressTracker
          currentStep={currentStepIndex}
          totalSteps={activeScenario.steps.length}
          score={score}
        />
      </div>

      {/* Graphical transition diagram */}
      <div className="flex-1 min-h-0 px-4 pt-4 pb-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full"
          >
            <QuizTransitionDiagram
              currentMode={currentStep.currentMode}
              options={shuffledOptions}
              selectedAnswer={selectedAnswer}
              feedback={feedback}
              correctAnswer={currentStep.correctAnswer}
              onSelectAnswer={sim.selectAnswer}
              disabled={!!feedback?.show}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Situation/Question panel (compact) */}
      <div className="shrink-0 px-4 pb-2">
        <SituationCard
          step={currentStep}
          scenarioTitle={activeScenario.title}
          compact
        />
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
