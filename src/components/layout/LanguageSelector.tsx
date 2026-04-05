import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../i18n/index';
import { useTheme } from '../../hooks/useTheme';
import { LANGUAGES } from '../../i18n/types';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const { theme } = useTheme();
  const dk = theme === 'dark';
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
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

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex h-8 items-center gap-1 rounded-lg px-2 text-xs font-semibold transition-colors ${
          dk
            ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`}
        title="Language"
      >
        {current.flag}
        <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          className={`absolute right-0 top-full mt-1 z-50 min-w-[140px] rounded-lg border py-1 shadow-lg ${
            dk
              ? 'border-slate-700 bg-slate-900'
              : 'border-slate-200 bg-white'
          }`}
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-xs transition-colors ${
                language === lang.code
                  ? dk
                    ? 'bg-slate-800 text-blue-400'
                    : 'bg-blue-50 text-blue-600'
                  : dk
                    ? 'text-slate-300 hover:bg-slate-800'
                    : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="font-semibold w-5">{lang.flag}</span>
              <span>{lang.label}</span>
              {language === lang.code && (
                <span className="ml-auto text-[10px]">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
