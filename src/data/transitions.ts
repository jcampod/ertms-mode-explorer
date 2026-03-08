import type { Transition } from './types';

export const transitions: Transition[] = [
  // ==========================================
  // NP <-> SB (Power on/off)
  // ==========================================
  {
    id: 'NP-SB',
    from: 'NP',
    to: 'SB',
    conditions: [
      { text: 'ETCS on-board equipment powered on', isRequired: true },
      { text: 'Self-test completed successfully', isRequired: true },
    ],
    description: 'Power on and system start-up',
    detailedDescription:
      'The driver powers on the ETCS on-board equipment. The system performs its start-up self-test (checking hardware, software integrity, stored data). Upon successful completion, the system enters Stand By mode and the DMI becomes active for data entry.',
    isAutomatic: true,
    isCommon: true,
    triggerType: 'system',
  },
  {
    id: 'SB-NP',
    from: 'SB',
    to: 'NP',
    conditions: [
      { text: 'ETCS on-board equipment powered off by driver', isRequired: true },
    ],
    description: 'Power off',
    detailedDescription:
      'The driver powers off the ETCS on-board equipment, typically at the end of a mission when the train is stabled or the cab is being deactivated. All ETCS functions cease.',
    isAutomatic: false,
    isCommon: true,
    triggerType: 'driver',
  },

  // ==========================================
  // SB -> Operational modes (Start of Mission)
  // ==========================================
  {
    id: 'SB-FS',
    from: 'SB',
    to: 'FS',
    conditions: [
      { text: 'Driver data entry completed (driver ID, train data)', isRequired: true },
      { text: 'Valid movement authority (MA) received', isRequired: true },
      { text: 'Complete track description available', isRequired: true },
      { text: 'ETCS level determined (Level 1, 2, or 3)', isRequired: true },
    ],
    description: 'Start of mission with full MA',
    detailedDescription:
      'After the driver completes data entry in Stand By, the system receives a valid movement authority with complete track description (speed profile, gradient). This is the ideal start of mission: the train transitions directly to Full Supervision with all safety data available.',
    isAutomatic: true,
    isCommon: true,
    triggerType: 'trackside',
  },
  {
    id: 'SB-SR',
    from: 'SB',
    to: 'SR',
    conditions: [
      { text: 'Driver data entry completed', isRequired: true },
      { text: 'No valid MA available', isRequired: true },
      { text: 'Driver acknowledges SR mode on DMI', isRequired: true },
    ],
    description: 'Start of mission without MA',
    detailedDescription:
      'When the driver has completed data entry but no movement authority can be obtained (e.g., no RBC contact, no balise data), the driver may request to start the mission in Staff Responsible mode. The driver must acknowledge the mode on the DMI and takes responsibility for safe movement under signaller authority.',
    isAutomatic: false,
    isCommon: true,
    triggerType: 'driver',
  },
  {
    id: 'SB-SH',
    from: 'SB',
    to: 'SH',
    conditions: [
      { text: 'Shunting request from driver or trackside order', isRequired: true },
      { text: 'Driver acknowledges shunting mode', isRequired: false },
    ],
    description: 'Shunting request from Stand By',
    detailedDescription:
      'The driver requests to enter Shunting mode for yard movements, or a shunting order is received from the trackside (e.g., via balise). The system transitions to SH mode for low-speed marshalling operations. Full train data entry may not be required for shunting.',
    isAutomatic: false,
    isCommon: true,
    triggerType: 'both',
  },
  {
    id: 'SB-SL',
    from: 'SB',
    to: 'SL',
    conditions: [
      { text: 'This cab/unit is not the leading unit', isRequired: true },
      { text: 'Another ETCS on-board is active as leading', isRequired: true },
    ],
    description: 'Enter sleeping as non-leading unit',
    detailedDescription:
      'When the system determines that this on-board unit is not the leading unit (e.g., rear cab of a push-pull train, or a unit being hauled dead-in-train), it transitions to Sleeping mode. The ETCS remains powered but does not actively supervise.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'system',
  },
  {
    id: 'SB-NL',
    from: 'SB',
    to: 'NL',
    conditions: [
      { text: 'Driver selects Non Leading', isRequired: true },
      { text: 'Unit is not the leading traction unit in consist', isRequired: true },
    ],
    description: 'Enter non-leading mode',
    detailedDescription:
      'The driver indicates that this locomotive is not the leading traction unit in the consist (e.g., rear locomotive in a double-headed configuration). The ETCS enters Non Leading mode, remaining active but not issuing brake commands or holding an MA.',
    isAutomatic: false,
    isCommon: false,
    triggerType: 'driver',
  },

  // ==========================================
  // SR -> Other modes
  // ==========================================
  {
    id: 'SR-FS',
    from: 'SR',
    to: 'FS',
    conditions: [
      { text: 'Valid movement authority (MA) received', isRequired: true },
      { text: 'Complete track description available', isRequired: true },
    ],
    description: 'MA received while in Staff Responsible',
    detailedDescription:
      'While proceeding in Staff Responsible mode, the train passes a balise group or receives an RBC message containing a valid movement authority with complete track description. The system automatically transitions to Full Supervision, providing full ETCS protection.',
    isAutomatic: true,
    isCommon: true,
    triggerType: 'trackside',
  },
  {
    id: 'SR-OS',
    from: 'SR',
    to: 'OS',
    conditions: [
      { text: 'On Sight mode profile received from trackside', isRequired: true },
      { text: 'Valid MA with OS area defined', isRequired: true },
    ],
    description: 'OS mode profile received',
    detailedDescription:
      'While in Staff Responsible mode, the train receives an On Sight mode profile from trackside (via balise or RBC). This indicates the upcoming section may be occupied and the driver must proceed at sight. The system transitions to OS mode with its restricted speed.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'trackside',
  },
  {
    id: 'SR-TR',
    from: 'SR',
    to: 'TR',
    conditions: [
      { text: 'Train passes a balise group commanding a trip', isRequired: true },
    ],
    description: 'Trip triggered in Staff Responsible',
    detailedDescription:
      'While proceeding in SR mode, the train passes a balise group that commands a trip (e.g., protecting a danger point). The ETCS immediately applies the emergency brake. This can occur if the signaller\'s verbal authority did not account for all trackside protection or if conditions changed.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'trackside',
  },
  {
    id: 'SR-SH',
    from: 'SR',
    to: 'SH',
    conditions: [
      { text: 'Shunting request from driver or trackside order', isRequired: true },
    ],
    description: 'Shunting from Staff Responsible',
    detailedDescription:
      'While in Staff Responsible mode, the driver requests shunting or a shunting order is received from trackside. The train transitions to Shunting mode for low-speed yard movements.',
    isAutomatic: false,
    isCommon: false,
    triggerType: 'driver',
  },

  // ==========================================
  // FS -> Other modes
  // ==========================================
  {
    id: 'FS-OS',
    from: 'FS',
    to: 'OS',
    conditions: [
      { text: 'On Sight mode profile received from trackside', isRequired: true },
      { text: 'Train enters the OS mode profile area', isRequired: true },
    ],
    description: 'Entering On Sight area',
    detailedDescription:
      'While in Full Supervision, the trackside sends an On Sight mode profile for an upcoming section (e.g., an area where track detection has failed). When the train enters this area, the mode transitions to OS and the speed is restricted. The MA remains valid.',
    isAutomatic: true,
    isCommon: true,
    triggerType: 'trackside',
  },
  {
    id: 'FS-LS',
    from: 'FS',
    to: 'LS',
    conditions: [
      { text: 'Limited Supervision mode profile received from trackside', isRequired: true },
      { text: 'Train enters the LS mode profile area', isRequired: true },
    ],
    description: 'Entering Limited Supervision area',
    detailedDescription:
      'The trackside indicates that the upcoming section can only provide Limited Supervision (incomplete track description). When the train enters this area, it transitions from FS to LS mode. The MA remains valid but some supervision parameters use national default values.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'trackside',
  },
  {
    id: 'FS-SR',
    from: 'FS',
    to: 'SR',
    conditions: [
      { text: 'Driver selects Override function on DMI', isRequired: true },
      { text: 'Safe conditions exist for SR (not a trip situation)', isRequired: true },
      { text: 'Driver acknowledges SR mode', isRequired: true },
    ],
    description: 'Driver Override function from Full Supervision to SR',
    detailedDescription:
      'The driver uses the Override function on the DMI to transition from Full Supervision to Staff Responsible mode. This is a driver-initiated action used when the driver needs to pass a signal or proceed without a valid MA under signaller authority. The driver must acknowledge the mode change and takes responsibility for safe movement.',
    isAutomatic: false,
    isCommon: false,
    triggerType: 'driver',
  },
  {
    id: 'FS-TR',
    from: 'FS',
    to: 'TR',
    conditions: [
      { text: 'Train passes the End of Authority (EOA)', isRequired: true },
    ],
    description: 'Passing EOA triggers emergency trip',
    detailedDescription:
      'The most critical safety transition. If the train overruns the End of Authority (EOA) — meaning it has passed the point beyond which safe movement is not guaranteed — the ETCS commands immediate emergency braking. This is the fundamental safety function of ETCS: preventing trains from entering unprotected track.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'system',
  },
  {
    id: 'FS-SH',
    from: 'FS',
    to: 'SH',
    conditions: [
      { text: 'Shunting order received from trackside', isRequired: true },
      { text: 'Driver acknowledges shunting', isRequired: false },
    ],
    description: 'Shunting order during Full Supervision',
    detailedDescription:
      'A shunting order is received from the trackside (typically at a yard entry or station throat). The train transitions to Shunting mode, releasing the MA and switching to low-speed yard movement rules.',
    isAutomatic: false,
    isCommon: false,
    triggerType: 'both',
  },
  {
    id: 'FS-UN',
    from: 'FS',
    to: 'UN',
    conditions: [
      { text: 'Train enters an area with no ETCS trackside equipment (Level 0)', isRequired: true },
      { text: 'Level transition to Level 0 executed', isRequired: true },
    ],
    description: 'Entering unfitted area',
    detailedDescription:
      'The train transitions from an ETCS-equipped area to a section with no ETCS trackside equipment (Level 0). The MA is released and the system provides only basic ceiling speed supervision. The driver must follow national signalling rules.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'both',
  },
  {
    id: 'FS-SN',
    from: 'FS',
    to: 'SN',
    conditions: [
      { text: 'National system mode profile received from trackside', isRequired: true },
      { text: 'STM available and compatible with national system', isRequired: true },
      { text: 'Level transition to NTC executed', isRequired: true },
    ],
    description: 'Entering national system area',
    detailedDescription:
      'The train transitions from ETCS Full Supervision to an area protected by a national train protection system. The ETCS hands over supervision to the STM (Specific Transmission Module) for the relevant national system (e.g., PZB, KVB, ASFA). This is a planned transition at the boundary of ETCS and national system coverage.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'both',
  },
  {
    id: 'FS-RV',
    from: 'FS',
    to: 'RV',
    conditions: [
      { text: 'Reversing area information received from trackside', isRequired: true },
      { text: 'Driver selects reverse direction', isRequired: true },
      { text: 'Train at standstill', isRequired: true },
    ],
    description: 'Authorized reverse movement',
    detailedDescription:
      'The driver is authorized to make a reverse movement (e.g., setting back to a platform). The trackside has provided reversing area information defining the permitted speed and distance. The driver brings the train to a stop, selects reverse, and the system enters RV mode with supervised reversing.',
    isAutomatic: false,
    isCommon: false,
    triggerType: 'driver',
  },

  // ==========================================
  // OS -> Other modes
  // ==========================================
  {
    id: 'OS-FS',
    from: 'OS',
    to: 'FS',
    conditions: [
      { text: 'End of On Sight mode profile area reached', isRequired: true },
      { text: 'Full Supervision conditions met (MA and track description)', isRequired: true },
    ],
    description: 'Leaving On Sight area, resuming Full Supervision',
    detailedDescription:
      'The train has passed through the On Sight area (e.g., the section with failed track detection) and the FS mode profile resumes. The system transitions back to Full Supervision with full speed supervision and protection.',
    isAutomatic: true,
    isCommon: true,
    triggerType: 'trackside',
  },
  {
    id: 'OS-SR',
    from: 'OS',
    to: 'SR',
    conditions: [
      { text: 'Driver selects Override function on DMI', isRequired: true },
      { text: 'Driver acknowledges SR mode', isRequired: true },
    ],
    description: 'Driver Override function from On Sight to SR',
    detailedDescription:
      'The driver uses the Override function on the DMI to transition from On Sight mode to Staff Responsible mode. This is a driver-initiated action allowing the driver to proceed under signaller authority when needed. The driver must acknowledge and take responsibility for safe movement.',
    isAutomatic: false,
    isCommon: false,
    triggerType: 'driver',
  },
  {
    id: 'OS-TR',
    from: 'OS',
    to: 'TR',
    conditions: [
      { text: 'Train passes the End of Authority (EOA)', isRequired: true },
    ],
    description: 'Passing EOA in On Sight mode',
    detailedDescription:
      'Even in On Sight mode, the ETCS supervises the movement authority. If the train overruns the EOA, the emergency brake is applied and the system enters Trip mode.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'system',
  },

  // ==========================================
  // LS -> Other modes
  // ==========================================
  {
    id: 'LS-FS',
    from: 'LS',
    to: 'FS',
    conditions: [
      { text: 'Full Supervision mode profile received from trackside', isRequired: true },
      { text: 'Complete track description now available', isRequired: true },
    ],
    description: 'Full track data available, upgrading to FS',
    detailedDescription:
      'The train enters an area where the trackside provides full track description data. The system transitions from Limited Supervision to Full Supervision, now using precise gradient and speed restriction data instead of national default values.',
    isAutomatic: true,
    isCommon: true,
    triggerType: 'trackside',
  },
  {
    id: 'LS-TR',
    from: 'LS',
    to: 'TR',
    conditions: [
      { text: 'Train passes the End of Authority (EOA)', isRequired: true },
    ],
    description: 'Passing EOA in Limited Supervision',
    detailedDescription:
      'Even in Limited Supervision, the EOA is supervised. If the train overruns its authority, the emergency brake is applied and the system enters Trip mode.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'system',
  },

  // ==========================================
  // UN -> Other modes
  // ==========================================
  {
    id: 'UN-FS',
    from: 'UN',
    to: 'FS',
    conditions: [
      { text: 'Train enters an ETCS-equipped area', isRequired: true },
      { text: 'Level transition from Level 0 to Level 1/2/3', isRequired: true },
      { text: 'Valid MA and track description received', isRequired: true },
    ],
    description: 'Entering equipped area from unfitted',
    detailedDescription:
      'The train transitions from an unfitted area (Level 0) to an ETCS-equipped area. A level transition is executed and the system receives a valid MA with track description, enabling Full Supervision.',
    isAutomatic: true,
    isCommon: true,
    triggerType: 'trackside',
  },
  {
    id: 'UN-SR',
    from: 'UN',
    to: 'SR',
    conditions: [
      { text: 'Driver selects Override function on DMI', isRequired: true },
      { text: 'Driver acknowledges SR mode', isRequired: true },
    ],
    description: 'Driver Override function from Unfitted to SR',
    detailedDescription:
      'The driver uses the Override function on the DMI to transition from Unfitted mode to Staff Responsible mode. This is a driver-initiated action allowing the driver to proceed under signaller authority when entering an ETCS area without an MA. The driver must acknowledge and take responsibility for safe movement.',
    isAutomatic: false,
    isCommon: false,
    triggerType: 'driver',
  },

  // ==========================================
  // SN -> Other modes
  // ==========================================
  {
    id: 'SN-FS',
    from: 'SN',
    to: 'FS',
    conditions: [
      { text: 'Train enters an ETCS-equipped area', isRequired: true },
      { text: 'Level transition from NTC to Level 1/2/3', isRequired: true },
      { text: 'Valid MA and track description received', isRequired: true },
      { text: 'STM hands over to ETCS', isRequired: true },
    ],
    description: 'Transition from national system to ETCS',
    detailedDescription:
      'The train transitions from a national system area to an ETCS-equipped area. The STM hands over supervision to the ETCS on-board, a level transition is executed, and the system receives an MA to enter Full Supervision. This is the standard cross-border transition.',
    isAutomatic: true,
    isCommon: true,
    triggerType: 'trackside',
  },
  {
    id: 'SN-SR',
    from: 'SN',
    to: 'SR',
    conditions: [
      { text: 'Driver selects Override function on DMI', isRequired: true },
      { text: 'Driver acknowledges SR mode', isRequired: true },
    ],
    description: 'Driver Override function from National System to SR',
    detailedDescription:
      'The driver uses the Override function on the DMI to transition from National System mode to Staff Responsible mode. This is a driver-initiated action used when entering an ETCS area from a national system without an available MA. The driver must follow signaller instructions and take responsibility for safe movement.',
    isAutomatic: false,
    isCommon: false,
    triggerType: 'driver',
  },

  // ==========================================
  // TR -> PT (Trip recovery)
  // ==========================================
  {
    id: 'TR-PT',
    from: 'TR',
    to: 'PT',
    conditions: [
      { text: 'Train has come to a complete standstill', isRequired: true },
      { text: 'Driver acknowledges the trip on the DMI', isRequired: true },
    ],
    description: 'Train stopped after trip, driver acknowledges',
    detailedDescription:
      'After the emergency brake application in Trip mode, the train decelerates to a complete stop. The driver must then acknowledge the trip event on the DMI. Once acknowledged at standstill, the system transitions to Post Trip mode, where recovery procedures can begin.',
    isAutomatic: false,
    isCommon: true,
    triggerType: 'driver',
  },

  // ==========================================
  // PT -> Other modes (Post Trip recovery)
  // ==========================================
  {
    id: 'PT-SR',
    from: 'PT',
    to: 'SR',
    conditions: [
      { text: 'Driver contacts signaller and receives authorization', isRequired: true },
      { text: 'Driver requests SR mode on DMI', isRequired: true },
      { text: 'Driver acknowledges SR mode', isRequired: true },
    ],
    description: 'Resume movement in Staff Responsible after trip',
    detailedDescription:
      'After a trip, the most common recovery is for the driver to contact the signaller, explain the situation, and receive verbal authorization to proceed. The driver then requests SR mode on the DMI and acknowledges it, allowing the train to move under signaller authority at restricted speed.',
    isAutomatic: false,
    isCommon: true,
    triggerType: 'driver',
  },
  {
    id: 'PT-SH',
    from: 'PT',
    to: 'SH',
    conditions: [
      { text: 'Shunting request or order after trip', isRequired: true },
      { text: 'Driver contacts signaller and receives shunting authorization', isRequired: true },
    ],
    description: 'Shunting after trip',
    detailedDescription:
      'After a trip event, the signaller may instruct the driver to perform a shunting movement rather than resume the main journey (e.g., to clear a conflicting route or move to a siding). The train transitions to Shunting mode for low-speed yard movements.',
    isAutomatic: false,
    isCommon: false,
    triggerType: 'driver',
  },

  // ==========================================
  // SH -> Other modes
  // ==========================================
  {
    id: 'SH-SB',
    from: 'SH',
    to: 'SB',
    conditions: [
      { text: 'End of shunting (driver exits shunting or train stops)', isRequired: true },
      { text: 'Driver deselects shunting mode', isRequired: true },
    ],
    description: 'End of shunting, return to Stand By',
    detailedDescription:
      'When shunting operations are complete, the driver deselects shunting mode. The system returns to Stand By, where the driver can enter/validate train data and prepare for the next mission or movement.',
    isAutomatic: false,
    isCommon: true,
    triggerType: 'driver',
  },

  // ==========================================
  // NL -> SB
  // ==========================================
  {
    id: 'NL-SB',
    from: 'NL',
    to: 'SB',
    conditions: [
      { text: 'This unit becomes the leading unit', isRequired: true },
      { text: 'Driver activates this cab for leading', isRequired: true },
    ],
    description: 'Non-leading unit becomes leading',
    detailedDescription:
      'The non-leading locomotive or cab becomes the leading unit (e.g., after a driver change at a terminus, or when decoupling from the consist). The driver activates this cab and the ETCS transitions to Stand By for a new start of mission.',
    isAutomatic: false,
    isCommon: false,
    triggerType: 'driver',
  },

  // ==========================================
  // SL -> SB
  // ==========================================
  {
    id: 'SL-SB',
    from: 'SL',
    to: 'SB',
    conditions: [
      { text: 'This cab/unit becomes the active leading unit', isRequired: true },
      { text: 'Driver desk activated', isRequired: true },
    ],
    description: 'Sleeping unit wakes up as leading',
    detailedDescription:
      'The sleeping ETCS on-board becomes active when this cab is designated as the leading cab (e.g., direction reversal at a terminus in push-pull operation). The driver activates the desk and the system enters Stand By for data validation and mission start.',
    isAutomatic: false,
    isCommon: false,
    triggerType: 'driver',
  },

  // ==========================================
  // RV -> Other modes
  // ==========================================
  {
    id: 'RV-FS',
    from: 'RV',
    to: 'FS',
    conditions: [
      { text: 'Reversing movement completed', isRequired: true },
      { text: 'Driver selects forward direction', isRequired: true },
      { text: 'Valid MA for forward movement available', isRequired: true },
    ],
    description: 'End of reversing, resume forward in FS',
    detailedDescription:
      'After the reversing movement is completed (e.g., the train has set back to the platform), the driver selects the forward direction. If a valid MA is available for forward movement, the system transitions to Full Supervision.',
    isAutomatic: false,
    isCommon: false,
    triggerType: 'driver',
  },

  // ==========================================
  // Additional common operational transitions
  // ==========================================
  {
    id: 'FS-FS-MA-UPDATE',
    from: 'FS',
    to: 'FS',
    conditions: [
      { text: 'New or extended MA received from trackside', isRequired: true },
      { text: 'Updated track description received', isRequired: false },
    ],
    description: 'MA extension/update in Full Supervision',
    detailedDescription:
      'While in Full Supervision, the trackside extends or updates the movement authority (e.g., next signal clears, RBC sends MA extension). This is the normal continuous operation in FS mode, keeping the train running with an updated authority.',
    isAutomatic: true,
    isCommon: true,
    triggerType: 'trackside',
  },
  {
    id: 'SB-UN',
    from: 'SB',
    to: 'UN',
    conditions: [
      { text: 'ETCS level determined as Level 0', isRequired: true },
      { text: 'No ETCS trackside equipment in area', isRequired: true },
      { text: 'Driver data entry completed', isRequired: true },
    ],
    description: 'Start of mission in unfitted area',
    detailedDescription:
      'When starting a mission in an area with no ETCS trackside equipment (Level 0), the system transitions to Unfitted mode after data entry. Only basic ceiling speed supervision is provided.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'system',
  },
  {
    id: 'SB-SN',
    from: 'SB',
    to: 'SN',
    conditions: [
      { text: 'ETCS level determined as NTC', isRequired: true },
      { text: 'STM available and connected', isRequired: true },
      { text: 'National system trackside detected', isRequired: true },
    ],
    description: 'Start of mission in national system area',
    detailedDescription:
      'When starting a mission in an area protected by a national train protection system, the ETCS determines the level as NTC and activates the appropriate STM. Supervision is handed to the national system.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'system',
  },
  {
    id: 'OS-SH',
    from: 'OS',
    to: 'SH',
    conditions: [
      { text: 'Shunting order received from trackside', isRequired: true },
      { text: 'Driver acknowledges shunting', isRequired: false },
    ],
    description: 'Shunting order in On Sight mode',
    detailedDescription:
      'While proceeding in On Sight mode, a shunting order is received (e.g., arriving at a yard entry). The system transitions to Shunting mode for low-speed yard movements.',
    isAutomatic: false,
    isCommon: false,
    triggerType: 'trackside',
  },
  {
    id: 'LS-SR',
    from: 'LS',
    to: 'SR',
    conditions: [
      { text: 'Driver selects Override function on DMI', isRequired: true },
      { text: 'Driver acknowledges SR mode', isRequired: true },
    ],
    description: 'Driver Override function from Limited Supervision to SR',
    detailedDescription:
      'The driver uses the Override function on the DMI to transition from Limited Supervision to Staff Responsible mode. This is a driver-initiated action used when the driver needs to proceed under signaller authority. The driver must acknowledge and take responsibility for safe movement.',
    isAutomatic: false,
    isCommon: false,
    triggerType: 'driver',
  },
  {
    id: 'LS-OS',
    from: 'LS',
    to: 'OS',
    conditions: [
      { text: 'On Sight mode profile received from trackside', isRequired: true },
      { text: 'Train enters the OS mode profile area', isRequired: true },
    ],
    description: 'Entering On Sight area from Limited Supervision',
    detailedDescription:
      'While in Limited Supervision, the train enters an area with an On Sight mode profile. The system transitions to OS mode for the restricted-speed section.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'trackside',
  },
  {
    id: 'UN-SN',
    from: 'UN',
    to: 'SN',
    conditions: [
      { text: 'National system trackside equipment detected', isRequired: true },
      { text: 'STM available and compatible', isRequired: true },
      { text: 'Level transition to NTC', isRequired: true },
    ],
    description: 'National system detected from unfitted',
    detailedDescription:
      'While in Unfitted mode (Level 0), the train enters an area with a national train protection system. The STM is activated and supervision is handed over to the national system.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'trackside',
  },
  {
    id: 'SN-UN',
    from: 'SN',
    to: 'UN',
    conditions: [
      { text: 'National system trackside ends', isRequired: true },
      { text: 'No ETCS trackside equipment present', isRequired: true },
      { text: 'Level transition from NTC to Level 0', isRequired: true },
    ],
    description: 'Leaving national system area to unfitted',
    detailedDescription:
      'The train leaves the area protected by the national system and enters an unfitted section (Level 0). The STM is deactivated and the system provides only basic ceiling speed supervision.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'trackside',
  },

  // ==========================================
  // End of Mission -> SB
  // ==========================================
  {
    id: 'FS-SB',
    from: 'FS',
    to: 'SB',
    conditions: [
      { text: 'Train at standstill', isRequired: true },
      { text: 'End of mission procedure performed by driver', isRequired: true },
    ],
    description: 'End of mission from Full Supervision',
    detailedDescription:
      'When the train reaches its destination and comes to a standstill, the driver performs the End of Mission procedure (e.g., closing the desk or confirming end of mission on the DMI). The movement authority is released and the system returns to Stand By, ready for a new mission or power-off.',
    isAutomatic: false,
    isCommon: true,
    triggerType: 'driver',
  },
  {
    id: 'SR-SB',
    from: 'SR',
    to: 'SB',
    conditions: [
      { text: 'Train at standstill', isRequired: true },
      { text: 'End of mission procedure performed by driver', isRequired: true },
    ],
    description: 'End of mission from Staff Responsible',
    detailedDescription:
      'While in Staff Responsible mode, the driver can end the mission when the train is at standstill (e.g., arrived at destination without ever receiving an MA). The system returns to Stand By.',
    isAutomatic: false,
    isCommon: true,
    triggerType: 'driver',
  },
  {
    id: 'OS-SB',
    from: 'OS',
    to: 'SB',
    conditions: [
      { text: 'Train at standstill', isRequired: true },
      { text: 'End of mission procedure performed by driver', isRequired: true },
    ],
    description: 'End of mission from On Sight',
    detailedDescription:
      'The driver ends the mission while in On Sight mode with the train at standstill. The system returns to Stand By.',
    isAutomatic: false,
    isCommon: false,
    triggerType: 'driver',
  },
  {
    id: 'LS-SB',
    from: 'LS',
    to: 'SB',
    conditions: [
      { text: 'Train at standstill', isRequired: true },
      { text: 'End of mission procedure performed by driver', isRequired: true },
    ],
    description: 'End of mission from Limited Supervision',
    detailedDescription:
      'The driver ends the mission while in Limited Supervision mode with the train at standstill. The system returns to Stand By.',
    isAutomatic: false,
    isCommon: false,
    triggerType: 'driver',
  },
  {
    id: 'UN-SB',
    from: 'UN',
    to: 'SB',
    conditions: [
      { text: 'Train at standstill', isRequired: true },
      { text: 'End of mission procedure performed by driver', isRequired: true },
    ],
    description: 'End of mission from Unfitted',
    detailedDescription:
      'The driver ends the mission while in Unfitted mode (Level 0 area) with the train at standstill. The system returns to Stand By.',
    isAutomatic: false,
    isCommon: false,
    triggerType: 'driver',
  },
  {
    id: 'SN-SB',
    from: 'SN',
    to: 'SB',
    conditions: [
      { text: 'Train at standstill', isRequired: true },
      { text: 'End of mission procedure performed by driver', isRequired: true },
      { text: 'STM session closed', isRequired: true },
    ],
    description: 'End of mission from STM National',
    detailedDescription:
      'The driver ends the mission while in STM National mode with the train at standstill. The STM session is closed and the system returns to Stand By.',
    isAutomatic: false,
    isCommon: false,
    triggerType: 'driver',
  },
  {
    id: 'PT-SB',
    from: 'PT',
    to: 'SB',
    conditions: [
      { text: 'Train at standstill', isRequired: true },
      { text: 'End of mission procedure performed by driver', isRequired: true },
    ],
    description: 'End of mission from Post Trip',
    detailedDescription:
      'After a trip event and acknowledgement, the driver may choose to end the mission instead of recovering. The system returns to Stand By for a fresh start of mission.',
    isAutomatic: false,
    isCommon: false,
    triggerType: 'driver',
  },

  // ==========================================
  // Universal transitions (Any -> X)
  // ==========================================
  {
    id: 'ANY-SF',
    from: 'FS',
    to: 'SF',
    conditions: [
      { text: 'Safety-critical on-board failure detected', isRequired: true },
    ],
    description: 'System failure from any mode',
    detailedDescription:
      'From any active ETCS mode, if the on-board equipment detects a safety-critical internal failure (hardware, software, or data integrity), it immediately transitions to System Failure mode. The emergency brake is applied and the driver must follow national rules. This transition can occur from any mode.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'failure',
    isUniversal: true,
  },
  {
    id: 'ANY-IS',
    from: 'FS',
    to: 'IS',
    conditions: [
      { text: 'Driver operates the physical ETCS isolation switch', isRequired: true },
    ],
    description: 'ETCS isolated by driver from any mode',
    detailedDescription:
      'From any mode, the driver can operate the physical ETCS isolation switch to completely disable the ETCS on-board equipment. This is a deliberate action used when ETCS is defective and must be taken out of service. All ETCS functions cease immediately.',
    isAutomatic: false,
    isCommon: false,
    triggerType: 'driver',
    isUniversal: true,
  },
  {
    id: 'ANY-NP',
    from: 'FS',
    to: 'NP',
    conditions: [
      { text: 'ETCS on-board equipment loses power', isRequired: true },
    ],
    description: 'Power loss from any mode',
    detailedDescription:
      'From any mode, if the ETCS on-board equipment loses its power supply (cab deactivation, power failure, main switch off), the system transitions to No Power. All ETCS functions cease. This can be a deliberate action (end of mission) or an unplanned event (power failure).',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'system',
    isUniversal: true,
  },

  // ==========================================
  // SF recovery
  // ==========================================
  {
    id: 'SF-NP',
    from: 'SF',
    to: 'NP',
    conditions: [
      { text: 'Driver powers off ETCS to attempt recovery', isRequired: true },
    ],
    description: 'Power cycle after system failure',
    detailedDescription:
      'After a system failure, the standard recovery procedure is to power off the ETCS on-board equipment (transition to NP) and then power it back on (NP to SB). If the fault was transient, the system may start up normally. If the fault persists, isolation may be required.',
    isAutomatic: false,
    isCommon: false,
    triggerType: 'driver',
  },

  // ==========================================
  // IS recovery
  // ==========================================
  {
    id: 'IS-NP',
    from: 'IS',
    to: 'NP',
    conditions: [
      { text: 'Isolation switch returned to normal position', isRequired: true },
    ],
    description: 'End of isolation, system restart',
    detailedDescription:
      'The driver returns the isolation switch to the normal position. The ETCS transitions through NP (power-on sequence) and then to SB after self-test. This restores ETCS functionality if the underlying fault has been resolved.',
    isAutomatic: false,
    isCommon: false,
    triggerType: 'driver',
  },

  // ==========================================
  // AD (Automatic Driving) — Baseline 4 / ATO
  // ==========================================
  {
    id: 'FS-AD',
    from: 'FS',
    to: 'AD',
    conditions: [
      { text: 'ATO on-board is in Ready for Engagement (RE) state', isRequired: true },
      { text: 'Driver confirms ATO engagement via DMI (GoA 2)', isRequired: true },
      { text: 'Valid Journey Profile received from ATO trackside', isRequired: true },
      { text: 'Train at standstill or within engagement speed window', isRequired: true },
    ],
    description: 'ATO engagement — automatic driving begins',
    detailedDescription:
      'When all ATO engagement conditions are met and the driver confirms engagement on the ATO DMI, ETCS transitions from Full Supervision to Automatic Driving. The ATO on-board takes control of traction and braking while ETCS continues full safety supervision. The Movement Authority, speed profile, and braking curves remain enforced. This transition is defined in Subset-125 (ATO SRS) and the Subset-130 ATO-OB/ETCS-OB interface.',
    isAutomatic: false,
    isCommon: true,
    triggerType: 'driver',
  },
  {
    id: 'AD-FS',
    from: 'AD',
    to: 'FS',
    conditions: [
      { text: 'Driver disengages ATO via DMI or traction/brake override, or', isRequired: false },
      { text: 'End of Journey Profile reached, or', isRequired: false },
      { text: 'ATO completes controlled disengagement', isRequired: false },
    ],
    description: 'ATO disengagement — return to manual driving under FS',
    detailedDescription:
      'When the driver takes manual control (by pressing the disengage button or overriding traction/brake controls) or when the ATO completes its journey, the system transitions from Automatic Driving back to Full Supervision. The driver resumes manual control with continuous ETCS speed supervision. This is the normal, controlled end of ATO operation.',
    isAutomatic: true,
    isCommon: true,
    triggerType: 'both',
  },
  {
    id: 'AD-TR',
    from: 'AD',
    to: 'TR',
    conditions: [{ text: 'Trip condition detected during automatic driving', isRequired: true }],
    description: 'Trip during automatic driving',
    detailedDescription:
      'If the ATO system violates the ETCS safety envelope or an End of Authority is overrun during Automatic Driving, the system immediately transitions to Trip mode with emergency braking. ETCS safety supervision always overrides ATO commands.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'system',
  },
  {
    id: 'AD-SH',
    from: 'AD',
    to: 'SH',
    conditions: [
      { text: 'Shunting request acknowledged during ATO operation', isRequired: true },
    ],
    description: 'Transition to shunting from automatic driving',
    detailedDescription:
      'In certain operational scenarios, a transition from Automatic Driving to Shunting may be required (e.g., approaching a yard). ATO is disengaged and ETCS transitions to Shunting mode with its reduced supervision.',
    isAutomatic: false,
    isCommon: false,
    triggerType: 'driver',
  },

  // ==========================================
  // Additional Trip and mode transitions
  // ==========================================
  {
    id: 'SB-TR',
    from: 'SB',
    to: 'TR',
    conditions: [{ text: 'Trip condition received from trackside during Start of Mission', isRequired: true }],
    description: 'Trip during start of mission',
    detailedDescription:
      'If a trip condition is detected during the Start of Mission procedure while in Stand By, the system transitions directly to Trip mode and commands the emergency brake.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'system',
  },
  {
    id: 'SH-TR',
    from: 'SH',
    to: 'TR',
    conditions: [{ text: 'Trip condition detected during shunting', isRequired: true }],
    description: 'Trip condition during shunting',
    detailedDescription:
      'A trip condition detected during shunting movements causes an immediate transition to Trip mode with emergency braking.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'system',
  },
  {
    id: 'FS-NL',
    from: 'FS',
    to: 'NL',
    conditions: [
      { text: 'Non-Leading input signal received (e.g. multiple traction configuration)', isRequired: true },
      { text: 'Train controlled by leading unit', isRequired: true },
    ],
    description: 'Enter Non-Leading in multiple traction',
    detailedDescription:
      'When a non-leading input signal is received during Full Supervision — typically in multiple traction configurations — the unit transitions to Non Leading mode where it is supervised by the leading unit.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'system',
  },
  {
    id: 'UN-TR',
    from: 'UN',
    to: 'TR',
    conditions: [{ text: 'Trip condition detected in unfitted area', isRequired: true }],
    description: 'Trip condition in unfitted area',
    detailedDescription:
      'A trip condition detected while operating in Unfitted mode causes an immediate transition to Trip mode with emergency braking.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'system',
  },
  {
    id: 'SN-TR',
    from: 'SN',
    to: 'TR',
    conditions: [{ text: 'Trip condition detected in national system area', isRequired: true }],
    description: 'Trip condition in national system area',
    detailedDescription:
      'A trip condition detected while operating in National System mode causes an immediate transition to Trip mode with emergency braking.',
    isAutomatic: true,
    isCommon: false,
    triggerType: 'system',
  },
  {
    id: 'RV-SB',
    from: 'RV',
    to: 'SB',
    conditions: [
      { text: 'Driver closes the desk or performs End of Mission', isRequired: true },
    ],
    description: 'Exit reversing to Stand By',
    detailedDescription:
      'The driver exits Reversing mode by closing the desk or performing an End of Mission, returning the system to Stand By.',
    isAutomatic: false,
    isCommon: false,
    triggerType: 'driver',
  },
];
