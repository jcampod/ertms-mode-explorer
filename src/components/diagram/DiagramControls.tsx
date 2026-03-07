import { Plus, Minus, Maximize2 } from 'lucide-react';

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
  return (
    <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
      {/* Zoom controls */}
      <div className="flex flex-col gap-1 rounded-lg bg-slate-900/80 p-1.5 backdrop-blur-sm border border-slate-700/50">
        <button
          onClick={onZoomIn}
          className="flex h-7 w-7 items-center justify-center rounded text-slate-400 hover:bg-slate-700/60 hover:text-slate-200 transition-colors"
          title="Zoom in"
        >
          <Plus size={14} />
        </button>
        <button
          onClick={onZoomOut}
          className="flex h-7 w-7 items-center justify-center rounded text-slate-400 hover:bg-slate-700/60 hover:text-slate-200 transition-colors"
          title="Zoom out"
        >
          <Minus size={14} />
        </button>
        <div className="h-px bg-slate-700/50" />
        <button
          onClick={onResetView}
          className="flex h-7 w-7 items-center justify-center rounded text-slate-400 hover:bg-slate-700/60 hover:text-slate-200 transition-colors"
          title="Reset view"
        >
          <Maximize2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default DiagramControls;
