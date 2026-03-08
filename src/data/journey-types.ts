export type OperationalPhase =
  | 'stop'
  | 'doors'
  | 'depart'
  | 'accel'
  | 'cruise'
  | 'coast'
  | 'brake';

export type GradientDirection = 'uphill' | 'downhill' | 'flat';

export interface Station {
  id: string;
  name: string;
  distanceKm: number;
  platformLengthM: number;
  dwellTimeS: number;
}

export interface SpeedRestriction {
  id: string;
  startKm: number;
  endKm: number;
  speedLimitKmh: number;
  type: 'permanent' | 'temporary';
  reason: string;
}

export interface GradientSection {
  startKm: number;
  endKm: number;
  permille: number;
  direction: GradientDirection;
}

export interface SpeedPoint {
  distanceKm: number;
  speedKmh: number;
  phase: OperationalPhase;
  timeS: number;
}

export interface SegmentProfile {
  id: string;
  fromStationId: string;
  toStationId: string;
  lineSpeedKmh: number;
  gradients: GradientSection[];
  speedRestrictions: SpeedRestriction[];
}

export interface JourneyProfile {
  id: string;
  name: string;
  description: string;
  totalDistanceKm: number;
  totalTimeS: number;
  stations: Station[];
  segments: SegmentProfile[];
  etcsCeilingSpeed: SpeedPoint[];
  atoTargetSpeed: SpeedPoint[];
  energySavingPercent: number;
}

export interface VisualizerLayers {
  etcsCeiling: boolean;
  atoTarget: boolean;
  phaseColors: boolean;
  gradients: boolean;
  restrictions: boolean;
}
