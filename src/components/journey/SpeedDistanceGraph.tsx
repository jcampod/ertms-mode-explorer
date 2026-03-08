import { useCallback, useMemo, useRef, useState } from 'react';
import type { JourneyProfile, VisualizerLayers, SpeedRestriction, GradientSection } from '../../data/journey-types';
import { graphChrome } from '../../utils/journey-colors';
import GraphAxes from './GraphAxes';
import EtcsCeilingLine from './EtcsCeilingLine';
import AtoTargetLine from './AtoTargetLine';
import StationMarkers from './StationMarkers';
import PhaseOverlay from './PhaseOverlay';
import RestrictionZones from './RestrictionZones';
import GradientBar from './GradientBar';
import TrainIndicator, { interpolateAtDistance } from './TrainIndicator';
import GraphTooltip from './GraphTooltip';

// Graph layout constants
const VIEW_W = 900;
const VIEW_H = 500;
const GRAPH_LEFT = 60;
const GRAPH_TOP = 30;
const GRAPH_WIDTH = 820;
const GRAPH_HEIGHT = 370;
const BAR_TOP = GRAPH_TOP + GRAPH_HEIGHT + 8;
const BAR_HEIGHT = 20;
const MAX_SPEED = 100;

interface SpeedDistanceGraphProps {
  profile: JourneyProfile;
  dk: boolean;
  layers: VisualizerLayers;
  currentDistanceKm: number;
  onScrub: (distanceKm: number) => void;
  selectedSegmentId: string | null;
}

const SpeedDistanceGraph = ({
  profile,
  dk,
  layers,
  currentDistanceKm,
  onScrub,
  selectedSegmentId,
}: SpeedDistanceGraphProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    distanceKm: number;
  }>({ visible: false, x: 0, y: 0, distanceKm: 0 });

  const distToX = useCallback(
    (km: number) => GRAPH_LEFT + (km / profile.totalDistanceKm) * GRAPH_WIDTH,
    [profile.totalDistanceKm],
  );

  const speedToY = useCallback(
    (kmh: number) => GRAPH_TOP + GRAPH_HEIGHT - (kmh / MAX_SPEED) * GRAPH_HEIGHT,
    [],
  );

  // Collect all speed restrictions and gradients from all segments
  const allRestrictions: SpeedRestriction[] = useMemo(
    () => profile.segments.flatMap(s => s.speedRestrictions),
    [profile.segments],
  );

  const allGradients: GradientSection[] = useMemo(
    () => profile.segments.flatMap(s => s.gradients),
    [profile.segments],
  );

  // Mouse interaction for tooltip and scrub
  const xToDistance = useCallback(
    (clientX: number) => {
      if (!svgRef.current) return 0;
      const rect = svgRef.current.getBoundingClientRect();
      const svgX = ((clientX - rect.left) / rect.width) * VIEW_W;
      const dist = ((svgX - GRAPH_LEFT) / GRAPH_WIDTH) * profile.totalDistanceKm;
      return Math.max(0, Math.min(dist, profile.totalDistanceKm));
    },
    [profile.totalDistanceKm],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;
      const svgX = ((e.clientX - rect.left) / rect.width) * VIEW_W;
      const svgY = ((e.clientY - rect.top) / rect.height) * VIEW_H;

      // Only show tooltip when inside graph area
      if (
        svgX >= GRAPH_LEFT &&
        svgX <= GRAPH_LEFT + GRAPH_WIDTH &&
        svgY >= GRAPH_TOP &&
        svgY <= GRAPH_TOP + GRAPH_HEIGHT
      ) {
        const distKm = xToDistance(e.clientX);
        // Convert SVG position to DOM position for the tooltip
        const domX = (svgX / VIEW_W) * rect.width;
        const domY = (svgY / VIEW_H) * rect.height;
        setTooltip({ visible: true, x: domX, y: domY, distanceKm: distKm });
      } else {
        setTooltip(prev => (prev.visible ? { ...prev, visible: false } : prev));
      }
    },
    [xToDistance],
  );

  const handleMouseLeave = useCallback(() => {
    setTooltip(prev => (prev.visible ? { ...prev, visible: false } : prev));
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const svgX = ((e.clientX - rect.left) / rect.width) * VIEW_W;
      const svgY = ((e.clientY - rect.top) / rect.height) * VIEW_H;
      if (
        svgX >= GRAPH_LEFT &&
        svgX <= GRAPH_LEFT + GRAPH_WIDTH &&
        svgY >= GRAPH_TOP &&
        svgY <= GRAPH_TOP + GRAPH_HEIGHT
      ) {
        onScrub(xToDistance(e.clientX));
      }
    },
    [onScrub, xToDistance],
  );

  // Crosshair line
  const crosshairX = tooltip.visible ? distToX(tooltip.distanceKm) : 0;

  // Tooltip data
  const tooltipState = useMemo(
    () => interpolateAtDistance(profile.atoTargetSpeed, tooltip.distanceKm),
    [profile.atoTargetSpeed, tooltip.distanceKm],
  );

  const c = dk ? graphChrome.dark : graphChrome.light;

  // Selected segment highlight bounds
  const selectedSegBounds = useMemo(() => {
    if (!selectedSegmentId) return null;
    const seg = profile.segments.find(s => s.id === selectedSegmentId);
    if (!seg) return null;
    const from = profile.stations.find(s => s.id === seg.fromStationId);
    const to = profile.stations.find(s => s.id === seg.toStationId);
    if (!from || !to) return null;
    return { x1: distToX(from.distanceKm), x2: distToX(to.distanceKm) };
  }, [selectedSegmentId, profile.segments, profile.stations, distToX]);

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full cursor-crosshair"
        style={{ maxHeight: '460px' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {/* Background */}
        <rect x={GRAPH_LEFT} y={GRAPH_TOP} width={GRAPH_WIDTH} height={GRAPH_HEIGHT} fill={c.background} rx={4} />

        {/* Selected segment highlight */}
        {selectedSegBounds && (
          <>
            {/* Dim the non-selected areas */}
            <rect
              x={GRAPH_LEFT}
              y={GRAPH_TOP}
              width={selectedSegBounds.x1 - GRAPH_LEFT}
              height={GRAPH_HEIGHT}
              fill={dk ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.08)'}
              pointerEvents="none"
            />
            <rect
              x={selectedSegBounds.x2}
              y={GRAPH_TOP}
              width={GRAPH_LEFT + GRAPH_WIDTH - selectedSegBounds.x2}
              height={GRAPH_HEIGHT}
              fill={dk ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.08)'}
              pointerEvents="none"
            />
            {/* Bright borders for selected range */}
            <line
              x1={selectedSegBounds.x1} y1={GRAPH_TOP}
              x2={selectedSegBounds.x1} y2={GRAPH_TOP + GRAPH_HEIGHT}
              stroke={dk ? '#94a3b8' : '#64748b'}
              strokeWidth={1}
              strokeDasharray="4 3"
              pointerEvents="none"
            />
            <line
              x1={selectedSegBounds.x2} y1={GRAPH_TOP}
              x2={selectedSegBounds.x2} y2={GRAPH_TOP + GRAPH_HEIGHT}
              stroke={dk ? '#94a3b8' : '#64748b'}
              strokeWidth={1}
              strokeDasharray="4 3"
              pointerEvents="none"
            />
          </>
        )}

        {/* Phase overlay (back) */}
        <PhaseOverlay
          points={profile.atoTargetSpeed}
          distToX={distToX}
          graphTop={GRAPH_TOP}
          graphHeight={GRAPH_HEIGHT}
          visible={layers.phaseColors}
        />

        {/* Restriction zones */}
        <RestrictionZones
          restrictions={allRestrictions}
          dk={dk}
          distToX={distToX}
          speedToY={speedToY}
          graphTop={GRAPH_TOP}
          graphHeight={GRAPH_HEIGHT}
          visible={layers.restrictions}
        />

        {/* Station markers */}
        <StationMarkers
          stations={profile.stations}
          dk={dk}
          distToX={distToX}
          graphTop={GRAPH_TOP}
          graphHeight={GRAPH_HEIGHT}
        />

        {/* ETCS ceiling */}
        <EtcsCeilingLine
          points={profile.etcsCeilingSpeed}
          dk={dk}
          distToX={distToX}
          speedToY={speedToY}
          visible={layers.etcsCeiling}
        />

        {/* ATO target */}
        <AtoTargetLine
          points={profile.atoTargetSpeed}
          dk={dk}
          distToX={distToX}
          speedToY={speedToY}
          visible={layers.atoTarget}
          showPhaseColors={layers.phaseColors}
        />

        {/* Train indicator */}
        <TrainIndicator
          currentDistanceKm={currentDistanceKm}
          atoTargetSpeed={profile.atoTargetSpeed}
          dk={dk}
          distToX={distToX}
          speedToY={speedToY}
        />

        {/* Crosshair */}
        {tooltip.visible && (
          <line
            x1={crosshairX}
            y1={GRAPH_TOP}
            x2={crosshairX}
            y2={GRAPH_TOP + GRAPH_HEIGHT}
            stroke={dk ? '#94a3b8' : '#64748b'}
            strokeWidth={0.5}
            strokeDasharray="3 3"
            pointerEvents="none"
          />
        )}

        {/* Gradient bar */}
        <GradientBar
          gradients={allGradients}
          dk={dk}
          distToX={distToX}
          barTop={BAR_TOP}
          barHeight={BAR_HEIGHT}
          visible={layers.gradients}
        />

        {/* Axes on top */}
        <GraphAxes
          dk={dk}
          graphLeft={GRAPH_LEFT}
          graphTop={GRAPH_TOP}
          graphWidth={GRAPH_WIDTH}
          graphHeight={GRAPH_HEIGHT}
          maxSpeed={MAX_SPEED}
          maxDistance={profile.totalDistanceKm}
        />
      </svg>

      {/* HTML tooltip overlay */}
      <GraphTooltip
        dk={dk}
        x={tooltip.x}
        y={tooltip.y}
        distanceKm={tooltip.distanceKm}
        speedKmh={tooltipState.speedKmh}
        phase={tooltipState.phase}
        timeS={tooltipState.timeS}
        visible={tooltip.visible}
      />
    </div>
  );
};

export default SpeedDistanceGraph;
