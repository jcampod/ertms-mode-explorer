import type { JourneyProfile } from '../../data/journey-types';
import { useUI } from '../../i18n/useUI';

interface SegmentBarProps {
  dk: boolean;
  profile: JourneyProfile;
  selectedSegmentId: string | null;
  onSelect: (id: string | null) => void;
  currentDistanceKm: number;
}

const segmentColors = ['#3b82f6', '#8b5cf6', '#06b6d4'];

const SegmentBar = ({ dk, profile, selectedSegmentId, onSelect, currentDistanceKm }: SegmentBarProps) => {
  const ui = useUI();

  return (
    <div>
      <span className={`text-[10px] uppercase tracking-wider font-medium mb-2 block ${
        dk ? 'text-slate-500' : 'text-slate-400'
      }`}>
        {ui.jpSegmentProfiles}
      </span>
      <div className="flex gap-1">
        {profile.segments.map((segment, i) => {
          const fromStation = profile.stations.find(s => s.id === segment.fromStationId);
          const toStation = profile.stations.find(s => s.id === segment.toStationId);
          if (!fromStation || !toStation) return null;

          const widthPercent =
            ((toStation.distanceKm - fromStation.distanceKm) / profile.totalDistanceKm) * 100;

          const isActive =
            currentDistanceKm >= fromStation.distanceKm &&
            currentDistanceKm <= toStation.distanceKm;

          const isSelected = selectedSegmentId === segment.id;
          const color = segmentColors[i % segmentColors.length];

          return (
            <button
              key={segment.id}
              onClick={() => onSelect(isSelected ? null : segment.id)}
              className={`
                relative rounded-lg border px-3 py-2 text-left transition-all duration-150 cursor-pointer
                ${isSelected
                  ? dk
                    ? 'border-slate-500 bg-slate-800'
                    : 'border-slate-400 bg-white shadow-sm'
                  : dk
                    ? 'border-slate-800 bg-slate-900/40 hover:bg-slate-800/60'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-white'
                }
              `}
              style={{ width: `${widthPercent}%` }}
            >
              {/* Active indicator */}
              {isActive && (
                <span
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-lg"
                  style={{ backgroundColor: color }}
                />
              )}
              <div className="flex items-center gap-1.5 mb-0.5">
                <span
                  className="w-2 h-2 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: color, opacity: isActive ? 1 : 0.5 }}
                />
                <span className={`text-[10px] font-semibold truncate ${
                  dk ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {fromStation.name} {'\u2192'} {toStation.name}
                </span>
              </div>
              <div className={`text-[9px] ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
                {(toStation.distanceKm - fromStation.distanceKm).toFixed(1)} km
                {' \u00b7 '}
                {segment.lineSpeedKmh} km/h
                {segment.speedRestrictions.length > 0 && (
                  <span className="text-amber-500"> {'\u00b7'} TSR</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SegmentBar;
