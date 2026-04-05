import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useErtmsLevel, type ErtmsLevel } from '../../hooks/useErtmsLevel';
import { useTheme } from '../../hooks/useTheme';
import { useUI } from '../../i18n/useUI';

const LEVELS: { level: ErtmsLevel; labelKey: 'level0Label' | 'level1Label' | 'level2Label'; descKey: 'level0Desc' | 'level1Desc' | 'level2Desc' }[] = [
  { level: '0', labelKey: 'level0Label', descKey: 'level0Desc' },
  { level: '1', labelKey: 'level1Label', descKey: 'level1Desc' },
  { level: '2', labelKey: 'level2Label', descKey: 'level2Desc' },
];

export default function LevelSelector() {
  const { ertmsLevel, setErtmsLevel } = useErtmsLevel();
  const { theme } = useTheme();
  const dk = theme === 'dark';
  const ui = useUI();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex h-8 items-center gap-1 rounded-lg px-2 text-xs font-semibold transition-colors ${
          dk
            ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`}
        title={ui.levelSelectorTitle}
      >
        <span>L{ertmsLevel}</span>
        <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          className={`absolute right-0 top-full mt-1 z-50 min-w-[220px] rounded-lg border py-1 shadow-lg ${
            dk
              ? 'border-slate-700 bg-slate-900'
              : 'border-slate-200 bg-white'
          }`}
        >
          <div className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-medium ${
            dk ? 'text-slate-500' : 'text-slate-400'
          }`}>
            {ui.levelSelectorTitle}
          </div>
          {LEVELS.map(({ level, labelKey, descKey }) => (
            <button
              key={level}
              onClick={() => {
                setErtmsLevel(level);
                setOpen(false);
              }}
              className={`flex w-full items-start gap-2.5 px-3 py-2 text-left text-xs transition-colors ${
                ertmsLevel === level
                  ? dk
                    ? 'bg-slate-800 text-blue-400'
                    : 'bg-blue-50 text-blue-600'
                  : dk
                    ? 'text-slate-300 hover:bg-slate-800'
                    : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="font-bold w-5 shrink-0">L{level}</span>
              <div className="flex-1">
                <div className="font-semibold">{ui[labelKey]}</div>
                <div className={`text-[10px] mt-0.5 ${
                  ertmsLevel === level
                    ? dk ? 'text-blue-400/70' : 'text-blue-500'
                    : dk ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  {ui[descKey]}
                </div>
              </div>
              {ertmsLevel === level && (
                <span className="ml-auto text-[10px] mt-0.5">{'\u2713'}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
