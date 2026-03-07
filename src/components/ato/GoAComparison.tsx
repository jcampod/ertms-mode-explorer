import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { goaLevels } from '../../data/ato-goa';
import type { GoALevel, ResponsibilityRole } from '../../data/ato-types';
import { useTheme } from '../../hooks/useTheme';

const roleColors: Record<ResponsibilityRole, { bg: string; text: string; bgLight: string; textLight: string; label: string }> = {
  driver:    { bg: 'bg-blue-500/15',   text: 'text-blue-300',   bgLight: 'bg-blue-50',   textLight: 'text-blue-700',   label: 'Driver' },
  ato:       { bg: 'bg-green-500/15',  text: 'text-green-300',  bgLight: 'bg-green-50',  textLight: 'text-green-700',  label: 'ATO' },
  attendant: { bg: 'bg-amber-500/15',  text: 'text-amber-300',  bgLight: 'bg-amber-50',  textLight: 'text-amber-700',  label: 'Attendant' },
  system:    { bg: 'bg-slate-500/15',  text: 'text-slate-300',  bgLight: 'bg-slate-100', textLight: 'text-slate-600',  label: 'System' },
};

const GoAComparison = () => {
  const { theme } = useTheme();
  const dk = theme === 'dark';
  const [expandedGoA, setExpandedGoA] = useState<GoALevel | null>(null);

  const toggleExpand = (level: GoALevel) => {
    setExpandedGoA((prev) => (prev === level ? null : level));
  };

  // Get all unique tasks from GoA 1 (they're the same across all levels)
  const tasks = goaLevels[0].responsibilities.map((r) => r.task);

  return (
    <div>
      {/* Responsibility Matrix */}
      <div className={`rounded-xl border overflow-hidden ${dk ? 'border-slate-800' : 'border-slate-200'}`}>
        {/* Header row */}
        <div className={`grid grid-cols-5 ${dk ? 'bg-slate-900/80' : 'bg-slate-50'}`}>
          <div className={`px-3 py-2.5 text-[10px] uppercase tracking-wider font-medium ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
            Task
          </div>
          {goaLevels.map((goa) => (
            <div
              key={goa.level}
              className={`px-3 py-2.5 text-center border-l ${dk ? 'border-slate-800' : 'border-slate-200'}`}
            >
              <div className={`text-xs font-bold ${dk ? 'text-slate-200' : 'text-slate-800'}`}>
                GoA {goa.level}
              </div>
              <div className={`text-[10px] mt-0.5 ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
                {goa.level === 1 ? 'Manual' : goa.level === 2 ? 'Semi-Auto' : goa.level === 3 ? 'Driverless' : 'Unattended'}
              </div>
            </div>
          ))}
        </div>

        {/* Task rows */}
        {tasks.map((task, i) => (
          <div
            key={task}
            className={`grid grid-cols-5 ${
              i % 2 === 0
                ? dk ? 'bg-slate-950/50' : 'bg-white'
                : dk ? 'bg-slate-900/30' : 'bg-slate-50/50'
            }`}
          >
            <div className={`px-3 py-2 text-xs ${dk ? 'text-slate-300' : 'text-slate-700'} flex items-center`}>
              {task}
            </div>
            {goaLevels.map((goa) => {
              const resp = goa.responsibilities[i];
              const role = roleColors[resp.performedBy];
              return (
                <div
                  key={goa.level}
                  className={`px-2 py-2 text-center border-l ${dk ? 'border-slate-800' : 'border-slate-200'} flex items-center justify-center`}
                >
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    dk ? `${role.bg} ${role.text}` : `${role.bgLight} ${role.textLight}`
                  }`}>
                    {role.label}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Expandable GoA Details */}
      <div className="mt-4 space-y-2">
        {goaLevels.map((goa) => (
          <div
            key={goa.level}
            className={`rounded-lg border overflow-hidden ${dk ? 'border-slate-800' : 'border-slate-200'}`}
          >
            <button
              onClick={() => toggleExpand(goa.level)}
              className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                dk
                  ? 'bg-slate-900/60 hover:bg-slate-800/60'
                  : 'bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <div>
                <span className={`text-sm font-semibold ${dk ? 'text-slate-200' : 'text-slate-800'}`}>
                  GoA {goa.level}
                </span>
                <span className={`text-sm ml-2 ${dk ? 'text-slate-400' : 'text-slate-500'}`}>
                  — {goa.name}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${dk ? 'text-slate-400' : 'text-slate-500'} ${
                  expandedGoA === goa.level ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {expandedGoA === goa.level && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className={`px-4 py-3 space-y-3 border-t ${dk ? 'border-slate-800' : 'border-slate-200'}`}>
                    <div>
                      <h4 className={`text-[10px] uppercase tracking-wider font-medium mb-1 ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
                        Description
                      </h4>
                      <p className={`text-sm leading-relaxed ${dk ? 'text-slate-300' : 'text-slate-600'}`}>
                        {goa.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <h4 className={`text-[10px] uppercase tracking-wider font-medium mb-1 ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
                          Driver Role
                        </h4>
                        <p className={`text-xs leading-relaxed ${dk ? 'text-slate-400' : 'text-slate-500'}`}>
                          {goa.driverRole}
                        </p>
                      </div>
                      <div>
                        <h4 className={`text-[10px] uppercase tracking-wider font-medium mb-1 ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
                          ATO Role
                        </h4>
                        <p className={`text-xs leading-relaxed ${dk ? 'text-slate-400' : 'text-slate-500'}`}>
                          {goa.atoRole}
                        </p>
                      </div>
                    </div>

                    {goa.realWorldExamples.length > 0 && (
                      <div>
                        <h4 className={`text-[10px] uppercase tracking-wider font-medium mb-1 ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
                          Real-World Examples
                        </h4>
                        <ul className="space-y-0.5">
                          {goa.realWorldExamples.map((ex, i) => (
                            <li key={i} className={`text-xs flex items-start gap-1.5 ${dk ? 'text-slate-400' : 'text-slate-500'}`}>
                              <span className={`mt-1.5 h-1 w-1 rounded-full flex-shrink-0 ${dk ? 'bg-slate-600' : 'bg-slate-300'}`} />
                              {ex}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        goa.specStatus.startsWith('Stable')
                          ? dk ? 'bg-green-500/15 text-green-300' : 'bg-green-50 text-green-700'
                          : dk ? 'bg-amber-500/15 text-amber-300' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {goa.specStatus}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoAComparison;
