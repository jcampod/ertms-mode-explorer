import { useTheme } from '../../hooks/useTheme';
import { useUI } from '../../i18n/useUI';
import { sampleJourneyProfile } from '../../data/journey-profile';
import { useJourneyPlayback } from '../../hooks/useJourneyPlayback';
import SpeedDistanceGraph from './SpeedDistanceGraph';
import PlaybackControls from './PlaybackControls';
import LayerToggles from './LayerToggles';
import SegmentBar from './SegmentBar';
import JourneyStatistics from './JourneyStatistics';
import SegmentDetailPanel from './SegmentDetailPanel';

const JourneyProfileView = () => {
  const { theme } = useTheme();
  const dk = theme === 'dark';
  const ui = useUI();

  const profile = sampleJourneyProfile;
  const {
    isPlaying,
    playbackSpeed,
    currentDistanceKm,
    togglePlay,
    cycleSpeed,
    scrubTo,
    resetPlayback,
    layers,
    toggleLayer,
    selectedSegmentId,
    setSelectedSegmentId,
  } = useJourneyPlayback(profile);

  const sectionHeader = `text-[10px] uppercase tracking-wider font-semibold mb-3 ${
    dk ? 'text-slate-500' : 'text-slate-400'
  }`;

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden">
      {/* Graph + controls */}
      <div className="max-w-4xl mx-auto px-4 pt-3 pb-2">
        {/* Title */}
        <div className="mb-2">
          <h1 className={`text-sm font-semibold ${dk ? 'text-slate-200' : 'text-slate-800'}`}>
            {profile.name}
          </h1>
          <p className={`text-[11px] ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
            {ui.jpSubtitle}
          </p>
        </div>

        {/* SVG Graph */}
        <div className={`rounded-xl border overflow-hidden ${dk ? 'border-slate-800' : 'border-slate-200'}`}>
          <SpeedDistanceGraph
            profile={profile}
            dk={dk}
            layers={layers}
            currentDistanceKm={currentDistanceKm}
            onScrub={scrubTo}
            selectedSegmentId={selectedSegmentId}
          />
        </div>

        {/* Playback controls */}
        <div className="mt-2">
          <PlaybackControls
            dk={dk}
            profile={profile}
            isPlaying={isPlaying}
            playbackSpeed={playbackSpeed}
            currentDistanceKm={currentDistanceKm}
            onTogglePlay={togglePlay}
            onCycleSpeed={cycleSpeed}
            onScrub={scrubTo}
            onReset={resetPlayback}
          />
        </div>

        {/* Layer toggles */}
        <div className="mt-2">
          <LayerToggles dk={dk} layers={layers} onToggle={toggleLayer} />
        </div>
      </div>

      {/* Content sections */}
      <div className={`border-t ${dk ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {/* Segment bar */}
          <SegmentBar
            dk={dk}
            profile={profile}
            selectedSegmentId={selectedSegmentId}
            onSelect={setSelectedSegmentId}
            currentDistanceKm={currentDistanceKm}
          />

          {/* Segment detail panel */}
          <SegmentDetailPanel
            dk={dk}
            profile={profile}
            selectedSegmentId={selectedSegmentId}
          />

          {/* Journey statistics */}
          <JourneyStatistics dk={dk} profile={profile} />

          {/* Legend */}
          <div>
            <h2 className={sectionHeader}>{ui.jpPhase}</h2>
            <div className="flex flex-wrap gap-3">
              {([
                { phase: 'stop', label: ui.phaseStationStop },
                { phase: 'doors', label: ui.phaseDoorControl },
                { phase: 'depart', label: ui.phaseDeparture },
                { phase: 'accel', label: ui.phaseAccelerating },
                { phase: 'cruise', label: ui.phaseCruising },
                { phase: 'coast', label: ui.phaseCoasting },
                { phase: 'brake', label: ui.phaseBraking },
              ] as const).map(item => {
                const colors: Record<string, string> = {
                  stop: '#ef4444',
                  doors: '#34d399',
                  depart: '#22d3ee',
                  accel: '#3b82f6',
                  cruise: '#60a5fa',
                  coast: '#a78bfa',
                  brake: '#f59e0b',
                };
                return (
                  <div key={item.phase} className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-sm"
                      style={{ backgroundColor: colors[item.phase] }}
                    />
                    <span className={`text-xs ${dk ? 'text-slate-400' : 'text-slate-500'}`}>
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyProfileView;
