import type { ATOTransition } from './ato-types';

export const atoTransitions: ATOTransition[] = [
  // ── NP → CO ──────────────────────────────────────────────
  {
    id: 'NP-CO',
    from: 'NP',
    to: 'CO',
    conditions: [
      { text: 'ATO system receives power', isRequired: true },
    ],
    description: 'Power on initiates ATO configuration',
    detailedDescription:
      'When the ATO on-board equipment is energised, the system begins its configuration sequence. This includes loading vehicle parameters, initialising internal modules, and preparing the ETCS interface.',
    isAutomatic: true,
    isCommon: true,
    triggerType: 'system',
  },

  // ── CO → NP (power loss during configuration) ────────────
  {
    id: 'CO-NP',
    from: 'CO',
    to: 'NP',
    conditions: [
      { text: 'Power removed during configuration', isRequired: true },
    ],
    description: 'Power loss during configuration returns to No Power',
    detailedDescription:
      'If the ATO system loses power during initialisation, it returns to the No Power state. Note: configuration or self-test failures result in a transition to ATO Failure (FA), not No Power.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'system',
  },

  // ── CO → FA (self-test or configuration failure) ─────────
  {
    id: 'CO-FA',
    from: 'CO',
    to: 'FA',
    conditions: [
      { text: 'Self-test failure detected, or', isRequired: false },
      { text: 'Incompatible configuration data', isRequired: false },
    ],
    description: 'Configuration or self-test failure leads to ATO Failure',
    detailedDescription:
      'If the ATO system fails its self-test (§7.12) or encounters incompatible configuration data during initialisation, it transitions to the ATO Failure state. The driver is informed via the DMI. Recovery requires a system reset (power cycle) back to NP.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'system',
  },

  // ── CO → NA ──────────────────────────────────────────────
  {
    id: 'CO-NA',
    from: 'CO',
    to: 'NA',
    conditions: [
      { text: 'Configuration and self-test completed successfully', isRequired: true },
      { text: 'ETCS on-board interface established', isRequired: true },
    ],
    description: 'Successful configuration leads to Not Available',
    detailedDescription:
      'After completing self-tests and establishing the Subset-130 interface with the ETCS on-board, the ATO system enters the Not Available state. It now monitors whether ETCS is in Full Supervision mode and whether a Journey Profile is available.',
    isAutomatic: true,
    isCommon: true,
    triggerType: 'system',
  },

  // ── NA ↔ AV ──────────────────────────────────────────────
  {
    id: 'NA-AV',
    from: 'NA',
    to: 'AV',
    conditions: [
      { text: 'ETCS enters Full Supervision (FS) mode', isRequired: true },
      { text: 'Valid Journey Profile received from trackside', isRequired: true },
      { text: 'No safety inhibits active', isRequired: true },
    ],
    description: 'All conditions met — ATO becomes available',
    detailedDescription:
      'When the ETCS on-board confirms Full Supervision mode with a valid Movement Authority, and a Journey Profile has been received via the ATO trackside interface (Subset-126), the ATO transitions to Available. The driver is informed that ATO can be engaged.',
    isAutomatic: true,
    isCommon: true,
    triggerType: 'trackside',
  },
  {
    id: 'AV-NA',
    from: 'AV',
    to: 'NA',
    conditions: [
      { text: 'ETCS leaves Full Supervision mode, or', isRequired: false },
      { text: 'Journey Profile becomes invalid, or', isRequired: false },
      { text: 'Safety inhibit activated', isRequired: false },
    ],
    description: 'Conditions lost — ATO no longer available',
    detailedDescription:
      'If ETCS exits Full Supervision mode (e.g., due to a mode transition to On Sight or Trip), if the Journey Profile expires or becomes invalid, or if a safety inhibit is raised, the ATO reverts to Not Available until conditions are restored.',
    isAutomatic: true,
    isCommon: true,
    triggerType: 'system',
  },

  // ── AV ↔ RE ──────────────────────────────────────────────
  {
    id: 'AV-RE',
    from: 'AV',
    to: 'RE',
    conditions: [
      { text: 'Train at standstill or within engagement speed', isRequired: true },
      { text: 'Doors confirmed closed and locked', isRequired: true },
      { text: 'Brake system operational', isRequired: true },
    ],
    description: 'Engagement preconditions fulfilled',
    detailedDescription:
      'When the train is stationary (or within the permitted engagement speed window) and all physical conditions are met — doors locked, brakes verified — the ATO signals readiness on the DMI and transitions to Ready for Engagement.',
    isAutomatic: true,
    isCommon: true,
    triggerType: 'system',
  },
  {
    id: 'RE-AV',
    from: 'RE',
    to: 'AV',
    conditions: [
      { text: 'Engagement preconditions lost (e.g., doors opened)', isRequired: true },
    ],
    description: 'Preconditions lost — return to Available',
    detailedDescription:
      'If any engagement precondition is violated while in Ready for Engagement — for example, a door is opened or a brake fault is detected — the ATO reverts to the Available state and the driver is informed.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'system',
  },

  // ── RE → EG ──────────────────────────────────────────────
  {
    id: 'RE-EG',
    from: 'RE',
    to: 'EG',
    conditions: [
      { text: 'Driver confirms ATO engagement via DMI (GoA 2), or automatic engagement (GoA 3–4)', isRequired: true },
      { text: 'ETCS transitions to AD (Automatic Driving) mode', isRequired: true },
    ],
    description: 'ATO engaged — automatic driving begins',
    detailedDescription:
      'In GoA 2, the driver presses the ATO engagement button on the DMI. In GoA 3–4, engagement may occur automatically when all conditions are met. The ETCS on-board transitions to Automatic Driving (AD) mode under Full Supervision, and the ATO begins controlling traction and braking according to the Journey Profile.',
    isAutomatic: false,
    isCommon: true,
    triggerType: 'both',
  },

  // ── EG → AV (nominal station-stop cycle — §9.10.2) ──────
  {
    id: 'EG-AV',
    from: 'EG',
    to: 'AV',
    conditions: [
      { text: 'Train stops at a Stopping Point considered as reached', isRequired: true },
      { text: 'Holding brake applied', isRequired: true },
    ],
    description: 'Train stops at station — ATO disengages to Available (nominal cycle)',
    detailedDescription:
      'This is the nominal operational cycle described in Subset-125 §9.10.2. When the ATO-OB stops the train at a Stopping Point, it requests the Train Holding Brake, disengages automatic driving, and transitions to Available. The "ATO Selected" indication is displayed. Doors may open (if configured). After dwell time and door closure, the system cycles AV → RE → EG for the next segment. This is the most frequent transition during normal service.',
    isAutomatic: true,
    isCommon: true,
    triggerType: 'system',
  },

  // ── EG → DE (controlled disengagement) ───────────────────
  {
    id: 'EG-DE',
    from: 'EG',
    to: 'DE',
    conditions: [
      { text: 'Driver activates manual brake while ATO is driving (§9.10.5), or', isRequired: false },
      { text: 'Driver requests disengagement via DMI, or', isRequired: false },
      { text: 'End of Journey Profile reached, or', isRequired: false },
      { text: 'Planned handover point reached', isRequired: false },
    ],
    description: 'ATO begins controlled disengagement',
    detailedDescription:
      'Disengagement is initiated when the driver manually brakes (§9.10.5), presses the disengage button, when the Journey Profile terminates, or when a planned transition point is reached. The ATO brings the train to a safe state and prepares to hand control to the driver. This is distinct from the nominal station-stop cycle (EG → AV), which occurs automatically at stopping points.',
    isAutomatic: false,
    isCommon: true,
    triggerType: 'both',
  },

  // ── EG → NA (emergency disengage) ────────────────────────
  {
    id: 'EG-NA',
    from: 'EG',
    to: 'NA',
    conditions: [
      { text: 'ETCS exits Full Supervision / AD mode, or', isRequired: false },
      { text: 'Critical safety condition triggered, or', isRequired: false },
      { text: 'Communication loss with ATO trackside', isRequired: false },
    ],
    description: 'Emergency disengage — immediate return to Not Available',
    detailedDescription:
      'If a critical condition occurs during automatic driving — such as ETCS triggering a mode transition (e.g., Trip), a communication failure with the ATO trackside, or a safety-critical system fault — the ATO immediately disengages without the controlled handover sequence. ETCS safety supervision remains active.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'system',
  },

  // ── DE → NA ──────────────────────────────────────────────
  {
    id: 'DE-NA',
    from: 'DE',
    to: 'NA',
    conditions: [
      { text: 'Disengagement complete', isRequired: true },
      { text: 'ATO Operational Conditions no longer met', isRequired: true },
    ],
    description: 'Disengagement complete — conditions not met for re-engagement',
    detailedDescription:
      'After the controlled handover to the driver is finished and the Operational Conditions are no longer satisfied (e.g., ETCS left FS mode, journey ended), the ATO returns to Not Available.',
    isAutomatic: true,
    isCommon: true,
    triggerType: 'system',
  },

  // ── DE → AV ──────────────────────────────────────────────
  {
    id: 'DE-AV',
    from: 'DE',
    to: 'AV',
    conditions: [
      { text: 'Disengagement complete', isRequired: true },
      { text: 'ATO Operational Conditions still met', isRequired: true },
    ],
    description: 'Disengagement complete — ATO remains available for re-engagement',
    detailedDescription:
      'After the controlled handover completes, if all ATO Operational Conditions are still met (ETCS in FS, valid Journey Profile), the system returns to Available, allowing the driver to re-engage ATO if desired.',
    isAutomatic: true,
    isCommon: true,
    triggerType: 'system',
  },

  // ── DE → RE (direct re-engagement) ───────────────────────
  {
    id: 'DE-RE',
    from: 'DE',
    to: 'RE',
    conditions: [
      { text: 'Disengagement complete', isRequired: true },
      { text: 'ETCS still in FS mode with valid MA', isRequired: true },
      { text: 'Valid Journey Profile still active', isRequired: true },
      { text: 'Train at standstill or within engagement speed', isRequired: true },
      { text: 'Doors closed and locked, brakes verified', isRequired: true },
    ],
    description: 'Disengagement complete — all engagement prerequisites still met, ready for immediate re-engagement',
    detailedDescription:
      'If after a controlled disengagement all conditions remain satisfied — ETCS in Full Supervision, valid Journey Profile, train at standstill with doors locked and brakes verified — the ATO can skip the Available state and transition directly to Ready for Engagement. This enables rapid re-engagement, for example after a brief manual intervention at a station.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'system',
  },

  // ── FA → NP (recovery via reset) ─────────────────────────
  {
    id: 'FA-NP',
    from: 'FA',
    to: 'NP',
    conditions: [
      { text: 'ATO system reset (power cycle)', isRequired: true },
    ],
    description: 'ATO reset clears fault — returns to No Power for re-initialisation',
    detailedDescription:
      'Recovery from ATO Failure requires a system reset, which powers down and re-energises the ATO equipment. This returns the system to No Power (NP), from which the normal configuration sequence (NP → CO → NA) can restart. There is no direct path from FA to any operational state.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'system',
  },

  // ── Universal: ANY → NP (power loss) ─────────────────────
  {
    id: 'ANY-NP',
    from: 'NP',
    to: 'NP',
    conditions: [
      { text: 'ATO system power loss', isRequired: true },
    ],
    description: 'Power loss returns to No Power from any state',
    detailedDescription:
      'If the ATO on-board system loses power at any point during operation, it immediately enters the No Power state. This is a universal transition that can occur from any ATO state. ETCS continues to operate independently.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'system',
    isUniversal: true,
  },

  // ── Universal: ANY → FA (internal fault) ─────────────────
  {
    id: 'ANY-FA',
    from: 'FA',
    to: 'FA',
    conditions: [
      { text: 'Internal ATO fault detected', isRequired: true },
    ],
    description: 'Internal fault sends ATO to Failure from any operational state',
    detailedDescription:
      'If the ATO on-board detects an internal fault at any point — hardware malfunction, software error, or failed runtime check — it immediately transitions to the ATO Failure state. This is a universal transition (§9.10.4). The driver must take over manual control. ETCS exits AD mode if it was active. The ATO-OB continues to send Status Reports (STRs) to inform ATO-TS of the failure.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'system',
    isUniversal: true,
  },
];
