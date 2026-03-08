import type { JourneyProfile } from './journey-types';

/**
 * Sample journey profile — 4-station urban metro line (~8 km, ~13 min).
 *
 * Route: Westgate → Central Park → Riverside → East Terminal
 *
 * All speed-distance data is pre-computed static data following the
 * project's pattern of hand-crafted data arrays (like modes.ts).
 *
 * ETCS ceiling = stepped envelope (Movement Authority + line speed limits)
 * ATO target  = smooth optimised curve (accel → cruise → coast → brake)
 */
export const sampleJourneyProfile: JourneyProfile = {
  id: 'metro-line-1',
  name: 'Metro Line 1 — Westgate to East Terminal',
  description:
    'A typical urban metro journey demonstrating ATO operation under ETCS supervision. ' +
    'The ATO optimises speed for timetable adherence and energy efficiency while ETCS ' +
    'enforces the safety envelope from above.',
  totalDistanceKm: 8.0,
  totalTimeS: 780,
  energySavingPercent: 18,

  stations: [
    {
      id: 'westgate',
      name: 'Westgate',
      distanceKm: 0.0,
      platformLengthM: 160,
      dwellTimeS: 30,
    },
    {
      id: 'central-park',
      name: 'Central Park',
      distanceKm: 2.5,
      platformLengthM: 180,
      dwellTimeS: 35,
    },
    {
      id: 'riverside',
      name: 'Riverside',
      distanceKm: 5.0,
      platformLengthM: 160,
      dwellTimeS: 30,
    },
    {
      id: 'east-terminal',
      name: 'East Terminal',
      distanceKm: 8.0,
      platformLengthM: 200,
      dwellTimeS: 0,
    },
  ],

  segments: [
    {
      id: 'seg-1',
      fromStationId: 'westgate',
      toStationId: 'central-park',
      lineSpeedKmh: 80,
      gradients: [
        { startKm: 0.0, endKm: 0.8, permille: 0, direction: 'flat' },
        { startKm: 0.8, endKm: 1.6, permille: 10, direction: 'uphill' },
        { startKm: 1.6, endKm: 2.5, permille: -8, direction: 'downhill' },
      ],
      speedRestrictions: [],
    },
    {
      id: 'seg-2',
      fromStationId: 'central-park',
      toStationId: 'riverside',
      lineSpeedKmh: 80,
      gradients: [
        { startKm: 2.5, endKm: 3.3, permille: 0, direction: 'flat' },
        { startKm: 3.3, endKm: 4.2, permille: 15, direction: 'uphill' },
        { startKm: 4.2, endKm: 5.0, permille: -5, direction: 'downhill' },
      ],
      speedRestrictions: [
        {
          id: 'tsr-1',
          startKm: 3.5,
          endKm: 4.0,
          speedLimitKmh: 60,
          type: 'temporary',
          reason: 'Track maintenance — rail grinding in progress',
        },
      ],
    },
    {
      id: 'seg-3',
      fromStationId: 'riverside',
      toStationId: 'east-terminal',
      lineSpeedKmh: 80,
      gradients: [
        { startKm: 5.0, endKm: 5.8, permille: 0, direction: 'flat' },
        { startKm: 5.8, endKm: 6.8, permille: -8, direction: 'downhill' },
        { startKm: 6.8, endKm: 8.0, permille: 5, direction: 'uphill' },
      ],
      speedRestrictions: [],
    },
  ],

  /*
   * ETCS Ceiling Speed — stepped envelope (Movement Authority limits)
   *
   * The ceiling represents the maximum speed the ETCS system allows.
   * It's a stepped function: approach zones (40 km/h near platforms),
   * line speed (80 km/h), and the TSR zone (60 km/h).
   */
  etcsCeilingSpeed: [
    // === Segment 1: Westgate → Central Park ===
    // Station approach zone exit
    { distanceKm: 0.00, speedKmh: 0,  phase: 'stop',  timeS: 0 },
    { distanceKm: 0.00, speedKmh: 40, phase: 'depart', timeS: 0 },
    { distanceKm: 0.30, speedKmh: 40, phase: 'accel', timeS: 30 },
    // Line speed
    { distanceKm: 0.30, speedKmh: 80, phase: 'accel', timeS: 30 },
    { distanceKm: 2.00, speedKmh: 80, phase: 'cruise', timeS: 120 },
    // Approach zone Central Park
    { distanceKm: 2.00, speedKmh: 40, phase: 'brake', timeS: 120 },
    { distanceKm: 2.50, speedKmh: 40, phase: 'brake', timeS: 155 },
    { distanceKm: 2.50, speedKmh: 0,  phase: 'stop',  timeS: 155 },

    // === Segment 2: Central Park → Riverside ===
    { distanceKm: 2.50, speedKmh: 0,  phase: 'stop',  timeS: 190 },
    { distanceKm: 2.50, speedKmh: 40, phase: 'depart', timeS: 190 },
    { distanceKm: 2.80, speedKmh: 40, phase: 'accel', timeS: 210 },
    // Line speed
    { distanceKm: 2.80, speedKmh: 80, phase: 'accel', timeS: 210 },
    { distanceKm: 3.50, speedKmh: 80, phase: 'cruise', timeS: 250 },
    // TSR zone
    { distanceKm: 3.50, speedKmh: 60, phase: 'brake', timeS: 250 },
    { distanceKm: 4.00, speedKmh: 60, phase: 'cruise', timeS: 285 },
    // Back to line speed
    { distanceKm: 4.00, speedKmh: 80, phase: 'accel', timeS: 285 },
    { distanceKm: 4.50, speedKmh: 80, phase: 'cruise', timeS: 310 },
    // Approach zone Riverside
    { distanceKm: 4.50, speedKmh: 40, phase: 'brake', timeS: 310 },
    { distanceKm: 5.00, speedKmh: 40, phase: 'brake', timeS: 345 },
    { distanceKm: 5.00, speedKmh: 0,  phase: 'stop',  timeS: 345 },

    // === Segment 3: Riverside → East Terminal ===
    { distanceKm: 5.00, speedKmh: 0,  phase: 'stop',  timeS: 375 },
    { distanceKm: 5.00, speedKmh: 40, phase: 'depart', timeS: 375 },
    { distanceKm: 5.30, speedKmh: 40, phase: 'accel', timeS: 395 },
    // Line speed
    { distanceKm: 5.30, speedKmh: 80, phase: 'accel', timeS: 395 },
    { distanceKm: 7.50, speedKmh: 80, phase: 'cruise', timeS: 540 },
    // Approach zone East Terminal
    { distanceKm: 7.50, speedKmh: 40, phase: 'brake', timeS: 540 },
    { distanceKm: 8.00, speedKmh: 40, phase: 'brake', timeS: 575 },
    { distanceKm: 8.00, speedKmh: 0,  phase: 'stop',  timeS: 575 },
  ],

  /*
   * ATO Target Speed — smooth optimised curve
   *
   * The ATO calculates the best speed trajectory within the ETCS envelope:
   * gentle acceleration, cruising, energy-saving coasting, then braking.
   * Always stays below the ETCS ceiling.
   */
  atoTargetSpeed: [
    // ===== STATION A: Westgate — stop + doors =====
    { distanceKm: 0.000, speedKmh: 0, phase: 'stop', timeS: 0 },
    { distanceKm: 0.000, speedKmh: 0, phase: 'doors', timeS: 5 },
    { distanceKm: 0.000, speedKmh: 0, phase: 'doors', timeS: 25 },
    { distanceKm: 0.000, speedKmh: 0, phase: 'depart', timeS: 30 },

    // ===== SEGMENT 1: Westgate → Central Park =====
    // Acceleration phase (0 → 75 km/h over ~0.7 km)
    { distanceKm: 0.010, speedKmh: 5,  phase: 'accel', timeS: 32 },
    { distanceKm: 0.030, speedKmh: 12, phase: 'accel', timeS: 36 },
    { distanceKm: 0.060, speedKmh: 20, phase: 'accel', timeS: 41 },
    { distanceKm: 0.100, speedKmh: 28, phase: 'accel', timeS: 47 },
    { distanceKm: 0.160, speedKmh: 36, phase: 'accel', timeS: 54 },
    { distanceKm: 0.230, speedKmh: 44, phase: 'accel', timeS: 61 },
    { distanceKm: 0.320, speedKmh: 52, phase: 'accel', timeS: 69 },
    { distanceKm: 0.420, speedKmh: 60, phase: 'accel', timeS: 77 },
    { distanceKm: 0.530, speedKmh: 67, phase: 'accel', timeS: 85 },
    { distanceKm: 0.650, speedKmh: 73, phase: 'accel', timeS: 93 },
    { distanceKm: 0.750, speedKmh: 75, phase: 'accel', timeS: 98 },

    // Cruising (75 km/h for ~0.4 km)
    { distanceKm: 0.850, speedKmh: 75, phase: 'cruise', timeS: 103 },
    { distanceKm: 1.000, speedKmh: 75, phase: 'cruise', timeS: 110 },
    { distanceKm: 1.150, speedKmh: 75, phase: 'cruise', timeS: 117 },

    // Coasting (75 → 65 km/h, energy saving)
    { distanceKm: 1.250, speedKmh: 73, phase: 'coast', timeS: 122 },
    { distanceKm: 1.400, speedKmh: 70, phase: 'coast', timeS: 130 },
    { distanceKm: 1.550, speedKmh: 67, phase: 'coast', timeS: 138 },
    { distanceKm: 1.700, speedKmh: 65, phase: 'coast', timeS: 146 },

    // Braking (65 → 0 km/h over ~0.8 km)
    { distanceKm: 1.800, speedKmh: 60, phase: 'brake', timeS: 152 },
    { distanceKm: 1.900, speedKmh: 55, phase: 'brake', timeS: 158 },
    { distanceKm: 2.000, speedKmh: 48, phase: 'brake', timeS: 165 },
    { distanceKm: 2.100, speedKmh: 40, phase: 'brake', timeS: 172 },
    { distanceKm: 2.200, speedKmh: 30, phase: 'brake', timeS: 180 },
    { distanceKm: 2.300, speedKmh: 20, phase: 'brake', timeS: 188 },
    { distanceKm: 2.400, speedKmh: 10, phase: 'brake', timeS: 196 },
    { distanceKm: 2.470, speedKmh: 3,  phase: 'brake', timeS: 202 },
    { distanceKm: 2.500, speedKmh: 0,  phase: 'stop',  timeS: 205 },

    // ===== STATION B: Central Park — stop + doors =====
    { distanceKm: 2.500, speedKmh: 0, phase: 'stop', timeS: 206 },
    { distanceKm: 2.500, speedKmh: 0, phase: 'doors', timeS: 210 },
    { distanceKm: 2.500, speedKmh: 0, phase: 'doors', timeS: 238 },
    { distanceKm: 2.500, speedKmh: 0, phase: 'depart', timeS: 245 },

    // ===== SEGMENT 2: Central Park → Riverside =====
    // Acceleration (0 → 75 km/h)
    { distanceKm: 2.510, speedKmh: 5,  phase: 'accel', timeS: 247 },
    { distanceKm: 2.530, speedKmh: 12, phase: 'accel', timeS: 251 },
    { distanceKm: 2.560, speedKmh: 20, phase: 'accel', timeS: 256 },
    { distanceKm: 2.600, speedKmh: 28, phase: 'accel', timeS: 262 },
    { distanceKm: 2.660, speedKmh: 36, phase: 'accel', timeS: 269 },
    { distanceKm: 2.730, speedKmh: 44, phase: 'accel', timeS: 276 },
    { distanceKm: 2.820, speedKmh: 52, phase: 'accel', timeS: 284 },
    { distanceKm: 2.920, speedKmh: 60, phase: 'accel', timeS: 292 },
    { distanceKm: 3.030, speedKmh: 67, phase: 'accel', timeS: 300 },
    { distanceKm: 3.150, speedKmh: 73, phase: 'accel', timeS: 308 },
    { distanceKm: 3.250, speedKmh: 75, phase: 'accel', timeS: 313 },

    // Brief cruise before TSR
    { distanceKm: 3.350, speedKmh: 75, phase: 'cruise', timeS: 318 },

    // Braking for TSR (75 → 55 km/h)
    { distanceKm: 3.400, speedKmh: 68, phase: 'brake', timeS: 321 },
    { distanceKm: 3.450, speedKmh: 60, phase: 'brake', timeS: 325 },
    { distanceKm: 3.500, speedKmh: 55, phase: 'brake', timeS: 329 },

    // TSR zone cruise (55 km/h, below 60 limit)
    { distanceKm: 3.600, speedKmh: 55, phase: 'cruise', timeS: 336 },
    { distanceKm: 3.700, speedKmh: 55, phase: 'cruise', timeS: 342 },
    { distanceKm: 3.800, speedKmh: 55, phase: 'cruise', timeS: 349 },
    { distanceKm: 3.900, speedKmh: 55, phase: 'cruise', timeS: 355 },
    { distanceKm: 4.000, speedKmh: 55, phase: 'cruise', timeS: 362 },

    // Re-acceleration after TSR (55 → 75 km/h)
    { distanceKm: 4.050, speedKmh: 58, phase: 'accel', timeS: 365 },
    { distanceKm: 4.100, speedKmh: 62, phase: 'accel', timeS: 368 },
    { distanceKm: 4.150, speedKmh: 67, phase: 'accel', timeS: 372 },
    { distanceKm: 4.220, speedKmh: 72, phase: 'accel', timeS: 377 },
    { distanceKm: 4.300, speedKmh: 75, phase: 'accel', timeS: 382 },

    // Coasting (energy saving, 75 → 62 km/h)
    { distanceKm: 4.350, speedKmh: 73, phase: 'coast', timeS: 385 },
    { distanceKm: 4.400, speedKmh: 70, phase: 'coast', timeS: 388 },
    { distanceKm: 4.450, speedKmh: 67, phase: 'coast', timeS: 391 },
    { distanceKm: 4.500, speedKmh: 64, phase: 'coast', timeS: 395 },
    { distanceKm: 4.550, speedKmh: 62, phase: 'coast', timeS: 398 },

    // Braking for Riverside (62 → 0 km/h)
    { distanceKm: 4.600, speedKmh: 58, phase: 'brake', timeS: 402 },
    { distanceKm: 4.650, speedKmh: 52, phase: 'brake', timeS: 406 },
    { distanceKm: 4.700, speedKmh: 45, phase: 'brake', timeS: 411 },
    { distanceKm: 4.760, speedKmh: 38, phase: 'brake', timeS: 416 },
    { distanceKm: 4.820, speedKmh: 30, phase: 'brake', timeS: 422 },
    { distanceKm: 4.880, speedKmh: 22, phase: 'brake', timeS: 428 },
    { distanceKm: 4.930, speedKmh: 14, phase: 'brake', timeS: 434 },
    { distanceKm: 4.970, speedKmh: 5,  phase: 'brake', timeS: 440 },
    { distanceKm: 5.000, speedKmh: 0,  phase: 'stop',  timeS: 445 },

    // ===== STATION C: Riverside — stop + doors =====
    { distanceKm: 5.000, speedKmh: 0, phase: 'stop', timeS: 446 },
    { distanceKm: 5.000, speedKmh: 0, phase: 'doors', timeS: 450 },
    { distanceKm: 5.000, speedKmh: 0, phase: 'doors', timeS: 475 },
    { distanceKm: 5.000, speedKmh: 0, phase: 'depart', timeS: 480 },

    // ===== SEGMENT 3: Riverside → East Terminal =====
    // Acceleration (0 → 78 km/h — longest segment, higher cruise)
    { distanceKm: 5.010, speedKmh: 5,  phase: 'accel', timeS: 482 },
    { distanceKm: 5.030, speedKmh: 12, phase: 'accel', timeS: 486 },
    { distanceKm: 5.060, speedKmh: 20, phase: 'accel', timeS: 491 },
    { distanceKm: 5.100, speedKmh: 28, phase: 'accel', timeS: 497 },
    { distanceKm: 5.160, speedKmh: 36, phase: 'accel', timeS: 504 },
    { distanceKm: 5.230, speedKmh: 44, phase: 'accel', timeS: 511 },
    { distanceKm: 5.320, speedKmh: 52, phase: 'accel', timeS: 519 },
    { distanceKm: 5.420, speedKmh: 60, phase: 'accel', timeS: 527 },
    { distanceKm: 5.530, speedKmh: 67, phase: 'accel', timeS: 535 },
    { distanceKm: 5.650, speedKmh: 73, phase: 'accel', timeS: 543 },
    { distanceKm: 5.780, speedKmh: 77, phase: 'accel', timeS: 551 },
    { distanceKm: 5.850, speedKmh: 78, phase: 'accel', timeS: 555 },

    // Cruising (78 km/h for ~0.7 km)
    { distanceKm: 6.000, speedKmh: 78, phase: 'cruise', timeS: 562 },
    { distanceKm: 6.200, speedKmh: 78, phase: 'cruise', timeS: 571 },
    { distanceKm: 6.400, speedKmh: 78, phase: 'cruise', timeS: 580 },
    { distanceKm: 6.550, speedKmh: 78, phase: 'cruise', timeS: 587 },

    // Coasting (78 → 65 km/h over ~0.5 km)
    { distanceKm: 6.650, speedKmh: 76, phase: 'coast', timeS: 592 },
    { distanceKm: 6.750, speedKmh: 73, phase: 'coast', timeS: 597 },
    { distanceKm: 6.850, speedKmh: 70, phase: 'coast', timeS: 603 },
    { distanceKm: 6.950, speedKmh: 67, phase: 'coast', timeS: 609 },
    { distanceKm: 7.050, speedKmh: 65, phase: 'coast', timeS: 615 },

    // Braking for East Terminal (65 → 0 km/h over ~0.95 km)
    { distanceKm: 7.120, speedKmh: 60, phase: 'brake', timeS: 620 },
    { distanceKm: 7.200, speedKmh: 55, phase: 'brake', timeS: 626 },
    { distanceKm: 7.280, speedKmh: 50, phase: 'brake', timeS: 632 },
    { distanceKm: 7.360, speedKmh: 44, phase: 'brake', timeS: 639 },
    { distanceKm: 7.440, speedKmh: 38, phase: 'brake', timeS: 646 },
    { distanceKm: 7.520, speedKmh: 32, phase: 'brake', timeS: 653 },
    { distanceKm: 7.600, speedKmh: 26, phase: 'brake', timeS: 660 },
    { distanceKm: 7.700, speedKmh: 18, phase: 'brake', timeS: 670 },
    { distanceKm: 7.800, speedKmh: 11, phase: 'brake', timeS: 680 },
    { distanceKm: 7.900, speedKmh: 5,  phase: 'brake', timeS: 690 },
    { distanceKm: 7.970, speedKmh: 2,  phase: 'brake', timeS: 696 },
    { distanceKm: 8.000, speedKmh: 0,  phase: 'stop',  timeS: 700 },

    // ===== STATION D: East Terminal — final stop =====
    { distanceKm: 8.000, speedKmh: 0, phase: 'stop', timeS: 780 },
  ],
};
