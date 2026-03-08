import { Plus, Minus, Maximize2 } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useUI } from '../../i18n/useUI';

interface DiagramControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
}

const DiagramControls = ({
  onZoomIn,
  onZoomOut,
  onResetView,
}: DiagramControlsProps) => {
  const { theme } = useTheme();
  const ui = useUI();

  return (
    <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
      {/* Zoom controls */}
      <div className={`flex flex-col gap-1 rounded-lg p-1.5 backdrop-blur-sm border ${
        theme === 'dark'
          ? 'bg-slate-900/80 border-slate-700/50'
          : 'bg-white/90 border-slate-300/60 shadow-sm'
      }`}>
        <button
          onClick={onZoomIn}
          className={`flex h-7 w-7 items-center justify-center rounded transition-colors ${
            theme === 'dark'
              ? 'text-slate-400 hover:bg-slate-700/60 hover:text-slate-200'
              : 'text-slate-500 hover:bg-slate-200/80 hover:text-slate-700'
          }`}
          title={ui.zoomIn}
        >
          <Plus size={14} />
        </button>
        <button
          onClick={onZoomOut}
          className={`flex h-7 w-7 items-center justify-center rounded transition-colors ${
            theme === 'dark'
              ? 'text-slate-400 hover:bg-slate-700/60 hover:text-slate-200'
              : 'text-slate-500 hover:bg-slate-200/80 hover:text-slate-700'
          }`}
          title={ui.zoomOut}
        >
          <Minus size={14} />
        </button>
        <div className="h-px bg-slate-700/50" />
        <button
          onClick={onResetView}
          className={`flex h-7 w-7 items-center justify-center rounded transition-colors ${
            theme === 'dark'
              ? 'text-slate-400 hover:bg-slate-700/60 hover:text-slate-200'
              : 'text-slate-500 hover:bg-slate-200/80 hover:text-slate-700'
          }`}
          title={ui.resetView}
        >
          <Maximize2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default DiagramControls;
