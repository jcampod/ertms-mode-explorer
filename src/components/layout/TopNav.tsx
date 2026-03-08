import { Train, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useUI } from '../../i18n/useUI';
import LanguageSelector from './LanguageSelector';
import LevelSelector from './LevelSelector';

export default function TopNav() {
  const { theme, toggleTheme } = useTheme();
  const ui = useUI();

  return (
    <header className={`h-12 flex items-center justify-between px-4 border-b shrink-0 ${
      theme === 'dark'
        ? 'bg-slate-900 border-slate-800'
        : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="flex items-center gap-2.5">
        <Train className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
        <h1 className={`text-sm font-semibold tracking-wide ${
          theme === 'dark' ? 'text-slate-100' : 'text-slate-800'
        }`}>
          {ui.appTitle}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-xs hidden lg:block ${
          theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
        }`}>
          {ui.appSubtitle}
        </span>
        <LevelSelector />
        <LanguageSelector />
        <button
          onClick={toggleTheme}
          className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
            theme === 'dark'
              ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              : 'text-slate-500 hover:bg-slate-200 hover:text-slate-700'
          }`}
          title={theme === 'dark' ? ui.switchToLight : ui.switchToDark}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}
