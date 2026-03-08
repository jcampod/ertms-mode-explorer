import { AnimatePresence, motion } from 'motion/react';
import type { JourneyProfile, SegmentProfile } from '../../data/journey-types';
import { useUI } from '../../i18n/useUI';
import { gradientColors, restrictionColors } from '../../utils/journey-colors';

interface SegmentDetailPanelProps {
  dk: boolean;
  profile: JourneyProfile;
  selectedSegmentId: string | null;
}

const SegmentDetailPanel = ({ dk, profile, selectedSegmentId }: SegmentDetailPanelProps) => {
  const ui = useUI();

  const segment: SegmentProfile | undefined = selectedSegmentId
    ? profile.segments.find(s => s.id === selectedSegmentId)
    : undefined;

  const fromStation = segment
    ? profile.stations.find(s => s.id === segment.fromStationId)
    : undefined;
  const toStation = segment
    ? profile.stations.find(s => s.id === segment.toStationId)
    : undefined;

  return (
    <AnimatePresence mode="wait">
      {segment && fromStation && toStation && (
        <motion.div
          key={segment.id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className={`rounded-xl border p-4 ${
            dk ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-slate-50/50'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-sm font-semibold ${dk ? 'text-slate-200' : 'text-slate-800'}`}>
                {fromStation.name} {'\u2192'} {toStation.name}
              </span>
              <span className={`text-xs ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
                {(toStation.distanceKm - fromStation.distanceKm).toFixed(1)} km
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Line Speed */}
              <div>
                <span className={`text-[10px] uppercase tracking-wider font-medium block mb-1.5 ${
                  dk ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  {ui.jpLineSpeed}
                </span>
                <span className={`text-lg font-bold ${dk ? 'text-blue-400' : 'text-blue-600'}`}>
                  {segment.lineSpeedKmh} km/h
                </span>
              </div>

              {/* Gradients */}
              <div>
                <span className={`text-[10px] uppercase tracking-wider font-medium block mb-1.5 ${
                  dk ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  {ui.jpGradient}
                </span>
                <div className="flex flex-col gap-1">
                  {segment.gradients.map((g, i) => {
                    const color = gradientColors[g.direction][dk ? 'dark' : 'light'];
                    return (
                      <div key={i} className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-sm"
                          style={{ backgroundColor: color }}
                        />
                        <span className={`text-xs ${dk ? 'text-slate-300' : 'text-slate-600'}`}>
                          {g.direction === 'flat'
                            ? ui.jpFlat
                            : `${g.permille > 0 ? '+' : ''}${g.permille}\u2030 ${g.direction === 'uphill' ? ui.jpUphill : ui.jpDownhill}`}
                        </span>
                        <span className={`text-[10px] ${dk ? 'text-slate-600' : 'text-slate-400'}`}>
                          ({g.startKm.toFixed(1)}{'\u2013'}{g.endKm.toFixed(1)} km)
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Restrictions */}
              <div>
                <span className={`text-[10px] uppercase tracking-wider font-medium block mb-1.5 ${
                  dk ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  {ui.jpRestriction}
                </span>
                {segment.speedRestrictions.length === 0 ? (
                  <span className={`text-xs ${dk ? 'text-slate-600' : 'text-slate-400'}`}>
                    {'\u2014'}
                  </span>
                ) : (
                  <div className="flex flex-col gap-1">
                    {segment.speedRestrictions.map(r => {
                      const color = restrictionColors[r.type][dk ? 'dark' : 'light'].stroke;
                      return (
                        <div key={r.id}>
                          <div className="flex items-center gap-1.5">
                            <span
                              className="w-2 h-2 rounded-sm"
                              style={{ backgroundColor: color }}
                            />
                            <span className={`text-xs font-semibold ${dk ? 'text-slate-300' : 'text-slate-600'}`}>
                              {r.type === 'temporary' ? ui.jpTemporary : ui.jpPermanent}
                              {' '}{r.speedLimitKmh} km/h
                            </span>
                          </div>
                          <span className={`text-[10px] ml-3.5 block ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
                            {r.reason}
                          </span>
                          <span className={`text-[10px] ml-3.5 block ${dk ? 'text-slate-600' : 'text-slate-400'}`}>
                            ({r.startKm.toFixed(1)}{'\u2013'}{r.endKm.toFixed(1)} km)
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SegmentDetailPanel;
