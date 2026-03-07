import { motion } from 'motion/react';
import { Play, Compass, Zap, BookOpen, AlertTriangle } from 'lucide-react';
import type { Scenario } from '../../data/types';
import { scenarios } from '../../data/scenarios';
import { useTheme } from '../../hooks/useTheme';

interface ScenarioSelectorProps {
  onSelectScenario: (scenario: Scenario) => void;
  onStartFreeExploration: () => void;
}

const difficultyConfig = {
  beginner: {
    label: 'Beginner',
    color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    icon: BookOpen,
  },
  intermediate: {
    label: 'Intermediate',
    color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    icon: Zap,
  },
  advanced: {
    label: 'Advanced',
    color: 'bg-red-500/20 text-red-400 border-red-500/30',
    icon: AlertTriangle,
  },
} as const;

export default function ScenarioSelector({
  onSelectScenario,
  onStartFreeExploration,
}: ScenarioSelectorProps) {
  const { theme } = useTheme();
  const dk = theme === 'dark';

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className={`text-xl font-bold ${dk ? 'text-slate-100' : 'text-slate-900'} mb-1`}>ETCS Mode Simulator</h2>
          <p className={`text-sm ${dk ? 'text-slate-400' : 'text-slate-500'}`}>
            Test your knowledge with guided scenarios or explore mode transitions freely.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Scenario cards */}
          {scenarios.map((scenario, index) => {
            const diff = difficultyConfig[scenario.difficulty];
            const DiffIcon = diff.icon;
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
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border shrink-0 ${diff.color}`}
                  >
                    <DiffIcon className="w-3 h-3" />
                    {diff.label}
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
                    {scenario.steps.length} steps
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
                Free Exploration
              </h3>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30 shrink-0">
                <Compass className="w-3 h-3" />
                Sandbox
              </div>
            </div>

            <p className={`text-xs ${dk ? 'text-slate-400' : 'text-slate-500'} mb-3 leading-relaxed`}>
              Navigate freely between all ETCS modes. Explore transitions, read descriptions, and
              build your own understanding of the mode graph at your own pace.
            </p>

            <div className="flex items-center gap-1.5 text-xs text-blue-400/70">
              <Compass className="w-3 h-3" />
              Start from No Power and explore
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
