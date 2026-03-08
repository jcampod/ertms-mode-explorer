import { Play, Pause, RotateCcw } from 'lucide-react';
import type { JourneyProfile } from '../../data/journey-types';
import type { PlaybackSpeed } from '../../hooks/useJourneyPlayback';
import { interpolateAtDistance } from './TrainIndicator';
import { phaseColors } from '../../utils/journey-colors';
import { useUI } from '../../i18n/useUI';

interface PlaybackControlsProps {
  dk: boolean;
  profile: JourneyProfile;
  isPlaying: boolean;
  playbackSpeed: PlaybackSpeed;
  currentDistanceKm: number;
  onTogglePlay: () => void;
  onCycleSpeed: () => void;
  onScrub: (distanceKm: number) => void;
  onReset: () => void;
}

const formatTime = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec.toString().padStart(2, '0')}`;
};

const PlaybackControls = ({
  dk,
  profile,
  isPlaying,
  playbackSpeed,
  currentDistanceKm,
  onTogglePlay,
  onCycleSpeed,
  onScrub,
  onReset,
}: PlaybackControlsProps) => {
  const ui = useUI();
  const state = interpolateAtDistance(profile.atoTargetSpeed, currentDistanceKm);
  const progress = (currentDistanceKm / profile.totalDistanceKm) * 100;

  const btnBase = `flex items-center justify-center rounded-lg border transition-colors duration-150 cursor-pointer ${
    dk
      ? 'border-slate-700 bg-slate-800/60 hover:bg-slate-700/80 text-slate-300'
      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600'
  }`;

  const speedLabels: Record<PlaybackSpeed, string> = {
    10: ui.jpSpeed1x,
    25: ui.jpSpeed2x,
    50: ui.jpSpeed4x,
  };

  const handleScrubClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    onScrub(Math.max(0, Math.min(ratio * profile.totalDistanceKm, profile.totalDistanceKm)));
  };

  return (
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border ${
      dk ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50/80'
    }`}>
      {/* Play/Pause */}
      <button onClick={onTogglePlay} className={`${btnBase} w-9 h-9`} title={isPlaying ? ui.jpPause : ui.jpPlay}>
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>

      {/* Reset */}
      <button onClick={onReset} className={`${btnBase} w-9 h-9`} title={ui.jpReset}>
        <RotateCcw className="w-3.5 h-3.5" />
      </button>

      {/* Speed */}
      <button onClick={onCycleSpeed} className={`${btnBase} px-2.5 h-9 text-xs font-semibold min-w-[40px]`}>
        {speedLabels[playbackSpeed]}
      </button>

      {/* Progress bar */}
      <div className="flex-1 flex flex-col gap-1">
        <div
          className={`h-2 rounded-full cursor-pointer relative ${
            dk ? 'bg-slate-800' : 'bg-slate-200'
          }`}
          onClick={handleScrubClick}
        >
          <div
            className="h-full rounded-full transition-all duration-75"
            style={{
              width: `${progress}%`,
              backgroundColor: phaseColors[state.phase],
            }}
          />
          {/* Scrub handle */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 ${
              dk ? 'bg-slate-200 border-slate-600' : 'bg-white border-slate-400'
            }`}
            style={{ left: `calc(${progress}% - 6px)` }}
          />
        </div>
      </div>

      {/* Time display */}
      <div className={`text-xs font-mono tabular-nums min-w-[70px] text-right ${
        dk ? 'text-slate-400' : 'text-slate-500'
      }`}>
        {formatTime(state.timeS)} / {formatTime(profile.totalTimeS)}
      </div>

      {/* Distance display */}
      <div className={`text-xs font-mono tabular-nums min-w-[55px] text-right ${
        dk ? 'text-slate-500' : 'text-slate-400'
      }`}>
        {currentDistanceKm.toFixed(1)} km
      </div>
    </div>
  );
};

export default PlaybackControls;
