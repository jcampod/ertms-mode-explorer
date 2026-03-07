import type { ModeCategory } from '../../data/types';
import type { DirectionFilter } from '../../hooks/useDiagramState';
import { categoryColors, categoryLabels } from '../../utils/colors';

const allCategories: ModeCategory[] = [
  'operational',
  'supervised',
  'standby',
  'degraded',
  'failure',
  'inactive',
];

interface DiagramLegendProps {
  activeFilters: Set<ModeCategory>;
  onToggleFilter: (cat: ModeCategory) => void;
  showCommonOnly: boolean;
  onToggleCommonOnly: () => void;
  directionFilter: DirectionFilter;
  onSetDirection: (dir: DirectionFilter) => void;
}

const directionOptions: { value: DirectionFilter; label: string; color: string }[] = [
  { value: 'outgoing', label: 'Outgoing', color: '#60a5fa' },
  { value: 'incoming', label: 'Incoming', color: '#34d399' },
  { value: 'both', label: 'Both', color: '#a78bfa' },
];

const DiagramLegend = ({
  activeFilters,
  onToggleFilter,
  showCommonOnly,
  onToggleCommonOnly,
  directionFilter,
  onSetDirection,
}: DiagramLegendProps) => {
  return (
    <div className="absolute bottom-3 left-3 z-20 rounded-lg bg-slate-900/90 p-2.5 backdrop-blur-sm border border-slate-700/50 select-none">
      {/* Category filter/legend — clickable */}
      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium block mb-1.5">
        Mode Categories
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
                  ? 'bg-slate-800/60 hover:bg-slate-700/60'
                  : 'opacity-35 hover:opacity-70'
              }`}
            >
              <span
                className="h-2.5 w-2.5 rounded-full flex-shrink-0 transition-all"
                style={{
                  backgroundColor: active ? categoryColors[cat] : 'transparent',
                  border: `2px solid ${categoryColors[cat]}`,
                  boxShadow: active ? `0 0 6px ${categoryColors[cat]}60` : 'none',
                }}
              />
              <span
                className={`text-[11px] transition-colors ${
                  active ? 'text-slate-200 font-medium' : 'text-slate-500 line-through'
                }`}
              >
                {categoryLabels[cat]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Common-only toggle */}
      <div className="h-px bg-slate-700/50 mb-1.5" />
      <button
        onClick={onToggleCommonOnly}
        className={`flex items-center gap-2 rounded px-1.5 py-[3px] w-full text-left transition-all ${
          showCommonOnly ? 'bg-blue-500/15' : 'hover:bg-slate-800/40'
        }`}
      >
        <span
          className={`h-2.5 w-2.5 rounded-sm flex-shrink-0 border transition-all ${
            showCommonOnly
              ? 'bg-blue-500 border-blue-400 shadow-[0_0_6px_rgba(59,130,246,0.4)]'
              : 'bg-transparent border-slate-500'
          }`}
        />
        <span
          className={`text-[11px] ${
            showCommonOnly ? 'text-blue-300 font-medium' : 'text-slate-400'
          }`}
        >
          Common only
        </span>
      </button>

      {/* Line styles legend */}
      <div className="h-px bg-slate-700/50 my-1.5" />
      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium block mb-1">
        Line Styles
      </span>
      <div className="flex flex-col gap-1 mb-2">
        <div className="flex items-center gap-1.5 px-1.5">
          <svg width="24" height="6" className="flex-shrink-0">
            <line x1="0" y1="3" x2="24" y2="3" stroke="#94a3b8" strokeWidth="1.5" />
          </svg>
          <span className="text-[10px] text-slate-400">Automatic</span>
        </div>
        <div className="flex items-center gap-1.5 px-1.5">
          <svg width="24" height="6" className="flex-shrink-0">
            <line
              x1="0"
              y1="3"
              x2="24"
              y2="3"
              stroke="#94a3b8"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
          </svg>
          <span className="text-[10px] text-slate-400">Driver-initiated</span>
        </div>
      </div>

      {/* Direction filter — clickable toggle */}
      <div className="h-px bg-slate-700/50 mb-1.5" />
      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium block mb-1">
        On Hover — Show
      </span>
      <div className="flex gap-1">
        {directionOptions.map((opt) => {
          const active = directionFilter === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onSetDirection(opt.value)}
              className={`px-2 py-[3px] rounded text-[10px] font-medium transition-all border ${
                active
                  ? 'border-current'
                  : 'border-transparent opacity-40 hover:opacity-70'
              }`}
              style={{
                color: active ? opt.color : '#94a3b8',
                backgroundColor: active ? `${opt.color}15` : 'transparent',
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DiagramLegend;
