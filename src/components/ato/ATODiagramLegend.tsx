import type { ATOStateCategory } from '../../data/ato-types';
import { atoCategoryColors, atoCategoryLabels } from '../../utils/ato-colors';
import { useTheme } from '../../hooks/useTheme';

const allCategories: ATOStateCategory[] = [
  'inactive',
  'standby',
  'operational',
  'transition',
];

interface ATODiagramLegendProps {
  activeFilters: Set<ATOStateCategory>;
  onToggleFilter: (cat: ATOStateCategory) => void;
}

const ATODiagramLegend = ({
  activeFilters,
  onToggleFilter,
}: ATODiagramLegendProps) => {
  const { theme } = useTheme();
  const dk = theme === 'dark';

  const divider = `h-px ${dk ? 'bg-slate-700/50' : 'bg-slate-200'}`;
  const sectionLabel = `text-[10px] uppercase tracking-wider font-medium block ${dk ? 'text-slate-500' : 'text-slate-400'}`;
  const lineStroke = dk ? '#94a3b8' : '#64748b';

  return (
    <div className={`absolute bottom-3 left-3 z-20 rounded-lg p-2.5 backdrop-blur-sm border select-none ${
      dk
        ? 'bg-slate-900/90 border-slate-700/50'
        : 'bg-white/95 border-slate-300/60 shadow-sm'
    }`}>
      {/* Category filter/legend */}
      <span className={`${sectionLabel} mb-1.5`}>
        ATO State Categories
      </span>
      <div className="flex flex-col gap-0.5 mb-2">
        {allCategories.map((cat) => {
          const active = activeFilters.has(cat);
          return (
            <button
              key={cat}
              onClick={() => onToggleFilter(cat)}
              className={`flex items-center gap-2 rounded px-1.5 py-[3px] text-left transition-all ${
                active
                  ? dk ? 'bg-slate-800/60 hover:bg-slate-700/60' : 'bg-slate-100 hover:bg-slate-200/80'
                  : 'opacity-35 hover:opacity-70'
              }`}
            >
              <span
                className="h-2.5 w-2.5 rounded-full flex-shrink-0 transition-all"
                style={{
                  backgroundColor: active ? atoCategoryColors[cat] : 'transparent',
                  border: `2px solid ${atoCategoryColors[cat]}`,
                  boxShadow: active ? `0 0 6px ${atoCategoryColors[cat]}60` : 'none',
                }}
              />
              <span
                className={`text-[11px] transition-colors ${
                  active
                    ? dk ? 'text-slate-200 font-medium' : 'text-slate-700 font-medium'
                    : dk ? 'text-slate-500 line-through' : 'text-slate-400 line-through'
                }`}
              >
                {atoCategoryLabels[cat]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Line styles legend */}
      <div className={`${divider} my-1.5`} />
      <span className={`${sectionLabel} mb-1`}>
        Line Styles
      </span>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5 px-1.5">
          <svg width="24" height="6" className="flex-shrink-0">
            <line x1="0" y1="3" x2="24" y2="3" stroke={lineStroke} strokeWidth="1.5" />
          </svg>
          <span className={`text-[10px] ${dk ? 'text-slate-400' : 'text-slate-500'}`}>Automatic</span>
        </div>
        <div className="flex items-center gap-1.5 px-1.5">
          <svg width="24" height="6" className="flex-shrink-0">
            <line
              x1="0"
              y1="3"
              x2="24"
              y2="3"
              stroke={lineStroke}
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
          </svg>
          <span className={`text-[10px] ${dk ? 'text-slate-400' : 'text-slate-500'}`}>Driver-initiated</span>
        </div>
      </div>
    </div>
  );
};

export default ATODiagramLegend;
