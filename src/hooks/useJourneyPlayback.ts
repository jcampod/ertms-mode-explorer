import { useState, useCallback, useRef, useEffect } from 'react';
import type { JourneyProfile, VisualizerLayers } from '../data/journey-types';
import { interpolateAtDistance } from '../components/journey/TrainIndicator';

export type PlaybackSpeed = 10 | 25 | 50;

export function useJourneyPlayback(profile: JourneyProfile) {
  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed>(10);
  const [currentDistanceKm, setCurrentDistanceKm] = useState(0);

  // Layer visibility
  const [layers, setLayers] = useState<VisualizerLayers>({
    etcsCeiling: true,
    atoTarget: true,
    phaseColors: true,
    gradients: true,
    restrictions: true,
  });

  // Segment selection
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null);

  // Animation refs
  const animFrameRef = useRef<number>(0);
  const lastTimestampRef = useRef<number>(0);
  const playbackSpeedRef = useRef<PlaybackSpeed>(playbackSpeed);
  const currentDistRef = useRef(currentDistanceKm);
  // Track elapsed journey time to handle station stops
  const journeyTimeRef = useRef(0);

  // Keep refs in sync
  useEffect(() => {
    playbackSpeedRef.current = playbackSpeed;
  }, [playbackSpeed]);

  useEffect(() => {
    currentDistRef.current = currentDistanceKm;
  }, [currentDistanceKm]);

  // Animation loop — time-based approach
  // We track journey elapsed time (journeyTimeRef) and derive distance from it.
  const animate = useCallback(
    (timestamp: number) => {
      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp;
        // Initialise journey time from current position
        const state = interpolateAtDistance(profile.atoTargetSpeed, currentDistRef.current);
        journeyTimeRef.current = state.timeS;
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaMs = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;

      // Cap delta to avoid huge jumps when tab was hidden
      const cappedDeltaMs = Math.min(deltaMs, 100);
      const deltaS = (cappedDeltaMs / 1000) * playbackSpeedRef.current;

      // Advance journey time
      journeyTimeRef.current += deltaS;
      const jTime = journeyTimeRef.current;

      // Find the distance corresponding to this journey time
      // by searching through the atoTargetSpeed points
      const pts = profile.atoTargetSpeed;

      if (jTime >= pts[pts.length - 1].timeS) {
        // Journey complete
        setIsPlaying(false);
        setCurrentDistanceKm(profile.totalDistanceKm);
        return;
      }

      // Binary search for the time interval
      let lo = 0;
      let hi = pts.length - 1;
      while (lo < hi - 1) {
        const mid = (lo + hi) >> 1;
        if (pts[mid].timeS <= jTime) lo = mid;
        else hi = mid;
      }

      const a = pts[lo];
      const b = pts[hi];
      const timeSpan = b.timeS - a.timeS;
      let dist: number;
      if (timeSpan === 0) {
        dist = a.distanceKm;
      } else {
        const t = (jTime - a.timeS) / timeSpan;
        dist = a.distanceKm + (b.distanceKm - a.distanceKm) * t;
      }

      setCurrentDistanceKm(Math.min(dist, profile.totalDistanceKm));
      animFrameRef.current = requestAnimationFrame(animate);
    },
    [profile],
  );

  // Start/stop animation
  useEffect(() => {
    if (isPlaying) {
      lastTimestampRef.current = 0;
      animFrameRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animFrameRef.current);
    }
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPlaying, animate]);

  // Controls
  const togglePlay = useCallback(() => {
    if (currentDistRef.current >= profile.totalDistanceKm) {
      setCurrentDistanceKm(0);
      journeyTimeRef.current = 0;
    }
    setIsPlaying(prev => !prev);
  }, [profile.totalDistanceKm]);

  const cycleSpeed = useCallback(() => {
    setPlaybackSpeed(prev => (prev === 10 ? 25 : prev === 25 ? 50 : 10));
  }, []);

  const scrubTo = useCallback((distanceKm: number) => {
    const state = interpolateAtDistance(profile.atoTargetSpeed, distanceKm);
    journeyTimeRef.current = state.timeS;
    setCurrentDistanceKm(distanceKm);
  }, [profile.atoTargetSpeed]);

  const resetPlayback = useCallback(() => {
    setIsPlaying(false);
    setCurrentDistanceKm(0);
    journeyTimeRef.current = 0;
  }, []);

  const toggleLayer = useCallback((key: keyof VisualizerLayers) => {
    setLayers(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return {
    // Playback
    isPlaying,
    playbackSpeed,
    currentDistanceKm,
    togglePlay,
    cycleSpeed,
    scrubTo,
    resetPlayback,
    // Layers
    layers,
    toggleLayer,
    // Segment
    selectedSegmentId,
    setSelectedSegmentId,
  };
}
