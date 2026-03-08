import type { OperationalPhase } from '../../data/journey-types';
import { phaseColors } from '../../utils/journey-colors';
import { useUI } from '../../i18n/useUI';

interface GraphTooltipProps {
  dk: boolean;
  x: number;
  y: number;
  distanceKm: number;
  speedKmh: number;
  phase: OperationalPhase;
  timeS: number;
  visible: boolean;
}

const phaseLabel = (phase: OperationalPhase, ui: ReturnType<typeof useUI>) => {
  const map: Record<OperationalPhase, string> = {
    stop: ui.phaseStationStop,
    doors: ui.phaseDoorControl,
    depart: ui.phaseDeparture,
    accel: ui.phaseAccelerating,
    cruise: ui.phaseCruising,
    coast: ui.phaseCoasting,
    brake: ui.phaseBraking,
  };
  return map[phase];
};

const formatTime = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec.toString().padStart(2, '0')}`;
};

const GraphTooltip = ({
  dk,
  x,
  y,
  distanceKm,
  speedKmh,
  phase,
  timeS,
  visible,
}: GraphTooltipProps) => {
  const ui = useUI();

  if (!visible) return null;

  const bg = dk ? 'bg-slate-800/95' : 'bg-white/95';
  const border = dk ? 'border-slate-700' : 'border-slate-200';
  const text = dk ? 'text-slate-200' : 'text-slate-800';
  const sub = dk ? 'text-slate-400' : 'text-slate-500';

  return (
    <div
      className={`absolute pointer-events-none z-50 rounded-lg border px-3 py-2 shadow-lg ${bg} ${border}`}
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -120%)',
      }}
    >
      <div className="flex flex-col gap-0.5 min-w-[120px]">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: phaseColors[phase] }}
          />
          <span className={`text-xs font-semibold ${text}`}>
            {phaseLabel(phase, ui)}
          </span>
        </div>
        <div className={`text-[10px] ${sub} flex justify-between`}>
          <span>{ui.jpSpeed}:</span>
          <span className={text}>{speedKmh.toFixed(1)} km/h</span>
        </div>
        <div className={`text-[10px] ${sub} flex justify-between`}>
          <span>{ui.jpDistance}:</span>
          <span className={text}>{distanceKm.toFixed(2)} km</span>
        </div>
        <div className={`text-[10px] ${sub} flex justify-between`}>
          <span>{ui.jpTime}:</span>
          <span className={text}>{formatTime(timeS)}</span>
        </div>
      </div>
    </div>
  );
};

export default GraphTooltip;
