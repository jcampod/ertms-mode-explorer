import { useTheme } from '../../hooks/useTheme';

const operationalPhases = [
  { id: 'stop', label: 'Station Stop', color: '#ef4444', icon: '■', desc: 'Train at platform, precise stop ±0.5 m' },
  { id: 'doors', label: 'Door Control', color: '#34d399', icon: '◊', desc: 'Open/close doors, passenger exchange' },
  { id: 'depart', label: 'Departure', color: '#22d3ee', icon: '▶', desc: 'Doors locked, departure conditions met' },
  { id: 'acc', label: 'Accelerating', color: '#3b82f6', icon: '>', desc: 'Traction applied to reach target speed' },
  { id: 'cruise', label: 'Cruising', color: '#60a5fa', icon: '=', desc: 'Maintaining speed at target' },
  { id: 'coast', label: 'Coasting', color: '#a78bfa', icon: '~', desc: 'Traction off — rolling on momentum to save energy' },
  { id: 'brake', label: 'Braking', color: '#f59e0b', icon: '<', desc: 'Service braking for next station stop' },
];

const ETCSIntegration = () => {
  const { theme } = useTheme();
  const dk = theme === 'dark';

  const sectionLabel = `text-[10px] uppercase tracking-wider font-medium mb-2 block ${dk ? 'text-slate-500' : 'text-slate-400'}`;

  return (
    <div className="space-y-6">
      {/* ATO ↔ ETCS Relationship Diagram */}
      <div>
        <span className={sectionLabel}>ATO Under ETCS Supervision</span>
        <div className={`rounded-xl border p-4 ${dk ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-slate-50/50'}`}>
          <svg viewBox="0 0 600 260" className="w-full" style={{ maxHeight: '260px' }}>
            {/* ETCS outer box */}
            <rect
              x="40"
              y="20"
              width="520"
              height="220"
              rx="16"
              fill={dk ? 'rgba(30, 58, 95, 0.3)' : 'rgba(59, 130, 246, 0.06)'}
              stroke={dk ? '#3b82f6' : '#93c5fd'}
              strokeWidth="1.5"
              strokeDasharray="6 3"
            />
            <text
              x="60"
              y="46"
              fill={dk ? '#93c5fd' : '#3b82f6'}
              fontSize="12"
              fontWeight="600"
            >
              ETCS Safety Envelope — Full Supervision (FS) / Automatic Driving (AD)
            </text>
            <text
              x="60"
              y="62"
              fill={dk ? '#64748b' : '#94a3b8'}
              fontSize="10"
            >
              FS → AD when ATO engages · Movement Authority + Speed Supervision + Emergency Brake Override
            </text>

            {/* ATO inner box */}
            <rect
              x="80"
              y="80"
              width="440"
              height="140"
              rx="12"
              fill={dk ? 'rgba(6, 95, 70, 0.25)' : 'rgba(52, 211, 153, 0.08)'}
              stroke={dk ? '#34d399' : '#6ee7b7'}
              strokeWidth="1.5"
            />
            <text
              x="100"
              y="106"
              fill={dk ? '#a7f3d0' : '#059669'}
              fontSize="12"
              fontWeight="600"
            >
              ATO Engaged (EG) — Automatic Driving
            </text>
            <text
              x="100"
              y="122"
              fill={dk ? '#64748b' : '#94a3b8'}
              fontSize="10"
            >
              Journey Profile + Timetable + Energy Optimisation
            </text>

            {/* ATO control arrows */}
            <g>
              <text
                x="110"
                y="152"
                fill={dk ? '#94a3b8' : '#64748b'}
                fontSize="10"
                fontWeight="500"
              >
                ATO Commands:
              </text>
              {['Traction', 'Braking', 'Coasting', 'Doors'].map((cmd, i) => (
                <g key={cmd}>
                  <rect
                    x={110 + i * 100}
                    y="160"
                    width={80}
                    height="22"
                    rx="4"
                    fill={dk ? 'rgba(52, 211, 153, 0.1)' : 'rgba(52, 211, 153, 0.12)'}
                    stroke={dk ? '#34d399' : '#6ee7b7'}
                    strokeWidth="0.8"
                  />
                  <text
                    x={150 + i * 100}
                    y="175"
                    textAnchor="middle"
                    fill={dk ? '#a7f3d0' : '#059669'}
                    fontSize="10"
                  >
                    {cmd}
                  </text>
                </g>
              ))}
            </g>

            {/* Safety override indicator */}
            <g>
              <rect
                x="80"
                y="200"
                width="440"
                height="24"
                rx="4"
                fill={dk ? 'rgba(239, 68, 68, 0.08)' : 'rgba(239, 68, 68, 0.05)'}
              />
              <text
                x="300"
                y="216"
                textAnchor="middle"
                fill={dk ? '#fca5a5' : '#ef4444'}
                fontSize="10"
                fontWeight="500"
              >
                ETCS Override: If ATO violates MA/speed → Service Brake → Emergency Brake
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Operational Phases */}
      <div>
        <span className={sectionLabel}>ATO Operational Phases — Station to Station Cycle</span>
        <div className={`flex gap-1.5 overflow-x-auto pb-2 items-start`}>
          {operationalPhases.map((phase, i) => (
            <div key={phase.id} className="flex items-center gap-1.5 flex-shrink-0">
              <div
                className={`flex flex-col items-center gap-1 px-3 py-2.5 rounded-lg border min-w-[90px] ${
                  dk ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white'
                }`}
              >
                <span
                  className="text-lg leading-none"
                  style={{ color: phase.color }}
                >
                  {phase.icon}
                </span>
                <span className={`text-[10px] font-semibold whitespace-nowrap ${dk ? 'text-slate-200' : 'text-slate-800'}`}>
                  {phase.label}
                </span>
                <span className={`text-[9px] leading-tight text-center max-w-[80px] ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
                  {phase.desc}
                </span>
              </div>
              {i < operationalPhases.length - 1 ? (
                <span className={`text-xs ${dk ? 'text-slate-600' : 'text-slate-300'}`}>→</span>
              ) : (
                <span className={`text-xs ${dk ? 'text-slate-600' : 'text-slate-300'}`}>↩</span>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ETCSIntegration;
