import { Route, Clock, MapPin, Zap } from 'lucide-react';
import type { JourneyProfile } from '../../data/journey-types';
import { useUI } from '../../i18n/useUI';

interface JourneyStatisticsProps {
  dk: boolean;
  profile: JourneyProfile;
}

const formatDuration = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}m ${sec}s`;
};

const JourneyStatistics = ({ dk, profile }: JourneyStatisticsProps) => {
  const ui = useUI();

  const stats = [
    {
      icon: Route,
      label: ui.jpTotalDistance,
      value: `${profile.totalDistanceKm.toFixed(1)} km`,
      color: '#3b82f6',
    },
    {
      icon: Clock,
      label: ui.jpJourneyTime,
      value: formatDuration(profile.totalTimeS),
      color: '#8b5cf6',
    },
    {
      icon: MapPin,
      label: ui.jpNumberOfStops,
      value: `${profile.stations.length}`,
      color: '#22d3ee',
    },
    {
      icon: Zap,
      label: ui.jpEnergySaving,
      value: `${profile.energySavingPercent}%`,
      color: '#34d399',
    },
  ];

  return (
    <div>
      <span className={`text-[10px] uppercase tracking-wider font-medium mb-2 block ${
        dk ? 'text-slate-500' : 'text-slate-400'
      }`}>
        {ui.jpStatistics}
      </span>
      <div className="grid grid-cols-4 gap-2">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`rounded-lg border px-3 py-2.5 ${
                dk ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-slate-50/50'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className="w-3.5 h-3.5" style={{ color: stat.color }} />
                <span className={`text-[10px] font-medium ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
                  {stat.label}
                </span>
              </div>
              <div className={`text-lg font-bold ${dk ? 'text-slate-200' : 'text-slate-800'}`}>
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JourneyStatistics;
