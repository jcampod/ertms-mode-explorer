import { motion } from 'motion/react';
import { Play, Compass, Zap, BookOpen, AlertTriangle } from 'lucide-react';
import type { Scenario } from '../../data/types';
import { useTheme } from '../../hooks/useTheme';
import { useUI } from '../../i18n/useUI';
import { useTranslatedScenarios } from '../../i18n/useTranslatedData';
import { useErtmsLevel } from '../../hooks/useErtmsLevel';

interface ScenarioSelectorProps {
  onSelectScenario: (scenario: Scenario) => void;
  onStartFreeExploration: () => void;
}

const difficultyIcons = {
  beginner: BookOpen,
  intermediate: Zap,
  advanced: AlertTriangle,
} as const;

const difficultyColors = {
  beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
} as const;

export default function ScenarioSelector({
  onSelectScenario,
  onStartFreeExploration,
}: ScenarioSelectorProps) {
  const { theme } = useTheme();
  const dk = theme === 'dark';
  const ui = useUI();
  const { ertmsLevel } = useErtmsLevel();
  const allScenarios = useTranslatedScenarios();
  const scenarios = allScenarios.filter(s =>
    !s.applicableLevels || s.applicableLevels.includes(ertmsLevel)
  );

  const difficultyLabels = {
    beginner: ui.beginner,
    intermediate: ui.intermediate,
    advanced: ui.advanced,
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className={`text-xl font-bold ${dk ? 'text-slate-100' : 'text-slate-900'} mb-1`}>{ui.etcsModeSimulator}</h2>
          <p className={`text-sm ${dk ? 'text-slate-400' : 'text-slate-500'}`}>
            {ui.scenarioSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Scenario cards */}
          {scenarios.map((scenario, index) => {
            const DiffIcon = difficultyIcons[scenario.difficulty];
            return (
              <motion.button
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectScenario(scenario)}
                className={`group relative text-left p-4 rounded-xl ${dk ? 'bg-slate-900/80' : 'bg-white/80'} border ${dk ? 'border-slate-800' : 'border-slate-200'} ${dk ? 'hover:border-slate-600' : 'hover:border-slate-400'} hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`text-sm font-semibold ${dk ? 'text-slate-100' : 'text-slate-900'} group-hover:text-blue-300 transition-colors pr-2`}>
                    {scenario.title}
                  </h3>
                  <div
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border shrink-0 ${difficultyColors[scenario.difficulty]}`}
                  >
                    <DiffIcon className="w-3 h-3" />
                    {difficultyLabels[scenario.difficulty]}
                  </div>
                </div>

                <p className={`text-xs ${dk ? 'text-slate-400' : 'text-slate-500'} mb-3 line-clamp-2 leading-relaxed`}>
                  {scenario.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className={`text-[10px] ${dk ? 'text-slate-500' : 'text-slate-400'} uppercase tracking-wider font-medium`}>
                    {scenario.category}
                  </span>
                  <div className={`flex items-center gap-1.5 text-xs ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
                    <Play className="w-3 h-3" />
                    {scenario.steps.length} {ui.steps}
                  </div>
                </div>
              </motion.button>
            );
          })}

          {/* Free Exploration card */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: scenarios.length * 0.06 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStartFreeExploration}
            className={`group relative text-left p-4 rounded-xl ${dk ? 'bg-gradient-to-br from-slate-900/80 to-blue-950/40' : 'bg-gradient-to-br from-white/80 to-blue-50/40'} border border-blue-500/20 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-semibold text-blue-300 group-hover:text-blue-200 transition-colors">
                {ui.freeExploration}
              </h3>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30 shrink-0">
                <Compass className="w-3 h-3" />
                {ui.sandbox}
              </div>
            </div>

            <p className={`text-xs ${dk ? 'text-slate-400' : 'text-slate-500'} mb-3 leading-relaxed`}>
              {ui.freeExplorationDescription}
            </p>

            <div className="flex items-center gap-1.5 text-xs text-blue-400/70">
              <Compass className="w-3 h-3" />
              {ui.startFromNoPower}
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
