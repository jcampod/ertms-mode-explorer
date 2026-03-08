import type { ModeCategory } from '../../data/types';
import type { DirectionFilter } from '../../hooks/useDiagramState';
import { categoryColors } from '../../utils/colors';
import { useTheme } from '../../hooks/useTheme';
import { useUI } from '../../i18n/useUI';
import { useCategoryLabels } from '../../i18n/useTranslatedData';

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

type DirectionOption = { value: DirectionFilter; color: string };

const DiagramLegend = ({
  activeFilters,
  onToggleFilter,
  showCommonOnly,
  onToggleCommonOnly,
  directionFilter,
  onSetDirection,
}: DiagramLegendProps) => {
  const { theme } = useTheme();
  const dk = theme === 'dark';
  const ui = useUI();
  const categoryLabels = useCategoryLabels();

  const directionOptions: (DirectionOption & { label: string })[] = [
    { value: 'outgoing', label: ui.outgoing, color: '#60a5fa' },
    { value: 'incoming', label: ui.incoming, color: '#34d399' },
    { value: 'both', label: ui.both, color: '#a78bfa' },
  ];

  const divider = `h-px ${dk ? 'bg-slate-700/50' : 'bg-slate-200'}`;
  const sectionLabel = `text-[10px] uppercase tracking-wider font-medium block ${dk ? 'text-slate-500' : 'text-slate-400'}`;
  const lineStroke = dk ? '#94a3b8' : '#64748b';

  return (
    <div className={`absolute bottom-3 left-3 z-20 rounded-lg p-2.5 backdrop-blur-sm border select-none ${
      dk
        ? 'bg-slate-900/90 border-slate-700/50'
        : 'bg-white/95 border-slate-300/60 shadow-sm'
    }`}>
      {/* Category filter/legend — clickable */}
      <span className={`${sectionLabel} mb-1.5`}>
        {ui.modeCategories}
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
                  backgroundColor: active ? categoryColors[cat] : 'transparent',
                  border: `2px solid ${categoryColors[cat]}`,
                  boxShadow: active ? `0 0 6px ${categoryColors[cat]}60` : 'none',
                }}
              />
              <span
                className={`text-[11px] transition-colors ${
                  active
                    ? dk ? 'text-slate-200 font-medium' : 'text-slate-700 font-medium'
                    : dk ? 'text-slate-500 line-through' : 'text-slate-400 line-through'
                }`}
              >
                {categoryLabels[cat]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Common-only toggle */}
      <div className={`${divider} mb-1.5`} />
      <button
        onClick={onToggleCommonOnly}
        className={`flex items-center gap-2 rounded px-1.5 py-[3px] w-full text-left transition-all ${
          showCommonOnly
            ? 'bg-blue-500/15'
            : dk ? 'hover:bg-slate-800/40' : 'hover:bg-slate-100'
        }`}
      >
        <span
          className={`h-2.5 w-2.5 rounded-sm flex-shrink-0 border transition-all ${
            showCommonOnly
              ? 'bg-blue-500 border-blue-400 shadow-[0_0_6px_rgba(59,130,246,0.4)]'
              : dk ? 'bg-transparent border-slate-500' : 'bg-transparent border-slate-400'
          }`}
        />
        <span
          className={`text-[11px] ${
            showCommonOnly
              ? dk ? 'text-blue-300 font-medium' : 'text-blue-600 font-medium'
              : dk ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {ui.commonOnly}
        </span>
      </button>

      {/* Line styles legend */}
      <div className={`${divider} my-1.5`} />
      <span className={`${sectionLabel} mb-1`}>
        {ui.lineStyles}
      </span>
      <div className="flex flex-col gap-1 mb-2">
        <div className="flex items-center gap-1.5 px-1.5">
          <svg width="24" height="6" className="flex-shrink-0">
            <line x1="0" y1="3" x2="24" y2="3" stroke={lineStroke} strokeWidth="1.5" />
          </svg>
          <span className={`text-[10px] ${dk ? 'text-slate-400' : 'text-slate-500'}`}>{ui.badgeAutomatic}</span>
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
          <span className={`text-[10px] ${dk ? 'text-slate-400' : 'text-slate-500'}`}>{ui.triggerDriver}</span>
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
              strokeDasharray="3 3"
            />
          </svg>
          <span className={`text-[10px] ${dk ? 'text-slate-400' : 'text-slate-500'}`}>{ui.lineStyleBoth}</span>
        </div>
      </div>

      {/* Direction filter — clickable toggle */}
      <div className={`${divider} mb-1.5`} />
      <span className={`${sectionLabel} mb-1`}>
        {ui.onHoverShow}
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
                color: active ? opt.color : (dk ? '#94a3b8' : '#64748b'),
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
