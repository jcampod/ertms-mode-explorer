import type { ETCSMode } from './types';

export const modes: ETCSMode[] = [
  {
    id: 'NP',
    name: 'No Power',
    abbreviation: 'NP',
    category: 'failure',
    description:
      'The train computer is switched off. Nothing works — no screen, no protection, no communication. Like a car with the ignition off.',
    detailedDescription:
      'All ETCS functions are inactive: no speed supervision, no communication with trackside, no DMI display, and no brake commands. The train may still move under national operating rules or physical signals, but ETCS provides no protection. This mode is entered when the cab is deactivated or the main power supply is switched off. The transition to Stand By (SB) occurs when the driver powers on the ETCS and the system completes its self-test.',
    speedLimit: null,
    driverResponsibility:
      'Full responsibility under national rules. ETCS provides no protection or information.',
    realWorldContext:
      'This is the state of the train when it is stabled in a depot overnight, or when a locomotive is parked with all systems shut down. Also occurs during the initial phase before a driver begins their shift and powers up the cab.',
    etcsLevel: ['0', '1', '2', '3', 'NTC'],
    subsetReference: 'Subset-026, Section 4.4.1',
    keyCharacteristics: [
      'No ETCS functions available',
      'No speed supervision or brake intervention',
      'DMI is inactive and blank',
      'No communication with RBC or balise readers',
      'Train movement governed entirely by national rules',
    ],
  },
  {
    id: 'SB',
    name: 'Stand By',
    abbreviation: 'SB',
    category: 'standby',
    description:
      'The system just booted up and passed its checks. Now it waits for the driver to enter their ID and train details before the journey can begin. This is the starting point for everything.',
    detailedDescription:
      'Stand By is the initial state after ETCS power-on and successful self-test. The DMI is active and shows data entry screens. The driver must enter or validate their driver ID, train running number, and train data (length, braking characteristics, max speed, axle load category, etc.). The system determines the ETCS level and, if Level 2/3, attempts to establish communication with the Radio Block Centre (RBC). No movement authority (MA) exists — the train should remain stationary. From SB, the train can transition to Full Supervision (MA obtained), Staff Responsible (no MA available), Shunting, Sleeping, Non Leading, or other modes depending on the situation.',
    speedLimit: '0 km/h (train should be stationary)',
    driverResponsibility:
      'Enter/validate driver ID, train data, and confirm ETCS level. Ensure train is stationary.',
    realWorldContext:
      'A driver arriving at a depot climbs into the cab, powers up the train, and goes through the data entry procedure on the DMI screen. This happens at the start of every mission and after certain recovery procedures.',
    etcsLevel: ['0', '1', '2', '3', 'NTC'],
    subsetReference: 'Subset-026, Section 4.4.2',
    keyCharacteristics: [
      'DMI active and displaying data entry fields',
      'Self-test completed successfully',
      'No movement authority granted',
      'Train data entry/validation required',
      'Gateway mode to all operational and special modes',
    ],
  },
  {
    id: 'SH',
    name: 'Shunting',
    abbreviation: 'SH',
    category: 'supervised',
    description:
      'The train is moving slowly in a yard — coupling wagons, repositioning, or assembling a train. Speed is capped at 30 km/h, but the driver has to watch the track themselves because ETCS does not check the route.',
    detailedDescription:
      'Shunting mode is used for low-speed yard movements: assembling/splitting trains, positioning wagons, and marshalling operations. ETCS provides ceiling speed supervision (typically 30 km/h, configurable per national value) but does not issue or supervise a movement authority (MA). There is no protection against conflicting routes or occupied track. The driver must visually check the path is clear and follow hand signals or local shunting instructions. In Level 2/3, the RBC communication session may be released. The key safety principle is that speed is limited but route safety is the driver\'s responsibility.',
    speedLimit: '30 km/h (national value may differ)',
    driverResponsibility:
      'Full responsibility for route safety, obstacle detection, and compliance with local shunting instructions.',
    realWorldContext:
      'Used in marshalling yards and depots when coupling/uncoupling wagons, repositioning trains on sidings, or moving a locomotive to the other end of a train. Common at the start and end of a train\'s journey in terminal stations.',
    etcsLevel: ['0', '1', '2', '3', 'NTC'],
    subsetReference: 'Subset-026, Section 4.4.3',
    keyCharacteristics: [
      'Maximum speed supervised at 30 km/h (default)',
      'No movement authority or route protection from ETCS',
      'Driver responsible for route and obstacle clearance',
      'Can be initiated by driver request or trackside order',
      'RBC session may be released in Level 2/3',
    ],
  },
  {
    id: 'FS',
    name: 'Full Supervision',
    abbreviation: 'FS',
    category: 'operational',
    description:
      'This is the main mode — the system is fully in charge of safety. It knows how fast the train can go, where it must stop, and will brake automatically if needed. The safest way to run.',
    detailedDescription:
      'Full Supervision is the standard operating mode and provides the highest level of safety. The on-board unit holds a valid movement authority (MA) defining the limit of safe travel (End of Authority, EOA). It also has the complete track description: static speed profile (line speed, temporary speed restrictions), gradient profile (for braking curve calculation), and mode profile information. The system continuously computes permitted speed, warning speed, and intervention curves. If the driver exceeds permitted speed, graduated interventions occur: indication → warning → service brake → emergency brake. In Level 2/3, the MA comes via radio from the RBC; in Level 1, via Eurobalise or Euroloop.',
    speedLimit: 'Per static speed profile and MA (up to line speed)',
    driverResponsibility:
      'Drive within permitted speed. Respond to DMI indications. ETCS provides full protection.',
    realWorldContext:
      'The normal operating condition for mainline running on ETCS-equipped high-speed and conventional lines. This is how trains operate on lines like the Madrid-Barcelona AVE, the Gotthard Base Tunnel, or Danish mainline routes under ETCS Level 2.',
    etcsLevel: ['1', '2', '3'],
    subsetReference: 'Subset-026, Section 4.4.4',
    keyCharacteristics: [
      'Continuous speed supervision against MA and speed profile',
      'Emergency brake intervention if EOA is at risk of being passed',
      'Complete track description (gradient, speed restrictions) available',
      'Braking curves calculated using train-specific data',
      'Highest level of ETCS safety protection',
    ],
  },
  {
    id: 'LS',
    name: 'Limited Supervision',
    abbreviation: 'LS',
    category: 'operational',
    description:
      'Like Full Supervision, but the system has less detailed information about the track ahead. It still protects the train, but uses safer default values where data is missing. A stepping stone for lines being upgraded to ETCS.',
    detailedDescription:
      'Limited Supervision provides a movement authority and speed supervision, but with less detailed track information than FS. The on-board has an MA with an EOA, so the train is protected against overrunning its authority. However, the track description may be incomplete: gradient profiles may be absent, and some speed restrictions may rely on national default values rather than precise infrastructure data. Braking curve calculations may use conservative default parameters, potentially resulting in more restrictive (but still safe) speed profiles. LS was introduced to allow phased migration from national systems to full ETCS, enabling early deployment with reduced trackside implementation effort.',
    speedLimit: 'Per MA and available speed profile (national values may apply)',
    driverResponsibility:
      'Drive within supervised speed. Be aware that supervision may be less precise than Full Supervision.',
    realWorldContext:
      'Used on lines that are being migrated to ETCS but where the trackside data (e.g., gradient profiles, detailed speed restrictions) is not yet fully engineered. Allows early deployment of ETCS with reduced implementation effort.',
    etcsLevel: ['1', '2', '3'],
    subsetReference: 'Subset-026, Section 4.4.5',
    keyCharacteristics: [
      'Valid MA with EOA supervision',
      'Reduced track description compared to Full Supervision',
      'Some parameters use national default values',
      'Designed for phased migration from national systems',
      'Braking curves may be more conservative due to incomplete data',
    ],
  },
  {
    id: 'OS',
    name: 'On Sight',
    abbreviation: 'OS',
    category: 'operational',
    description:
      'Proceed carefully — there might be something on the track ahead (another train, an obstacle). Speed is capped at 30 km/h and the driver must be ready to stop at any moment based on what they can see.',
    detailedDescription:
      'On Sight mode is used when the trackside cannot guarantee the section ahead is clear. This typically occurs when track circuits or axle counters have failed, when a section needs visual inspection, or when the interlocking has released a route with known occupation ahead. ETCS supervises a ceiling speed (typically 30 km/h) and the driver must be prepared to stop short of any visible obstacle. The mode is triggered by an OS mode profile from trackside, usually embedded within the MA. The on-board continues to supervise the MA/EOA in addition to the OS ceiling speed. Once the OS area is passed, the system transitions back to Full Supervision.',
    speedLimit: '30 km/h (national value may differ)',
    driverResponsibility:
      'Drive on sight. Be prepared to stop within visible distance. Full attention to track ahead.',
    realWorldContext:
      'Common when entering a station area where track detection has partially failed, or when a train must pass through a section after a preceding train\'s detection was lost. Also used for moves into occupied platforms or depot areas.',
    etcsLevel: ['1', '2', '3'],
    subsetReference: 'Subset-026, Section 4.4.6',
    keyCharacteristics: [
      'Maximum speed supervised at 30 km/h (default)',
      'Track ahead may be occupied or obstructed',
      'Driver must be prepared to stop at sight',
      'Triggered by OS mode profile from trackside',
      'MA/EOA still supervised in addition to ceiling speed',
    ],
  },
  {
    id: 'SR',
    name: 'Staff Responsible',
    abbreviation: 'SR',
    category: 'operational',
    description:
      'The system can\'t give the train a proper route, so the driver takes charge. The signaller calls by radio and says "OK, you can go." Speed is capped at 40 km/h. This is the fallback when things aren\'t working normally.',
    detailedDescription:
      'Staff Responsible is the fallback mode used when ETCS cannot provide a movement authority but the train needs to move. Typical scenarios: RBC communication failure, balise reader malfunction, missing trackside data, or starting from a non-equipped area. The signaller authorizes the driver via verbal order, written authority, or national procedure. ETCS supervises a ceiling speed (default 40 km/h) while the driver takes responsibility for signals, speed restrictions, and route conditions. The driver must acknowledge SR mode entry on the DMI. If a valid MA is subsequently received, the system transitions to Full Supervision. SR is critical for operational resilience — trains can keep moving safely even with degraded infrastructure.',
    speedLimit: '40 km/h (national value may differ)',
    driverResponsibility:
      'Full responsibility for safe movement under signaller authorization. Observe signals and speed restrictions.',
    realWorldContext:
      'Used when a driver receives a verbal order to pass a signal at danger, when starting a mission and no MA is available yet, or when communication with the RBC is lost but the signaller authorizes movement. Very common in degraded operations.',
    etcsLevel: ['1', '2', '3'],
    subsetReference: 'Subset-026, Section 4.4.7',
    keyCharacteristics: [
      'No movement authority from ETCS',
      'Ceiling speed supervised at 40 km/h (default)',
      'Driver authorized by signaller (verbal/written)',
      'Critical fallback mode for degraded operations',
      'Transitions to FS when valid MA is received',
    ],
  },
  {
    id: 'UN',
    name: 'Unfitted',
    abbreviation: 'UN',
    category: 'operational',
    description:
      'The train has entered a stretch of track that has no ETCS equipment at all. The system can only limit the maximum speed — everything else is up to the driver and the old signals along the track.',
    detailedDescription:
      'Unfitted mode is used on track with no ETCS trackside equipment (ETCS Level 0). The on-board provides only basic supervision: a ceiling speed based on the national value for unfitted areas, plus the train\'s own maximum speed. There is no MA, no speed profile from trackside, and no RBC communication. The driver operates according to national signalling rules (lineside signals, speed boards, operational procedures). If a national train protection system (e.g., PZB, ASFA, KVB, TPWS) is available via an STM, the train transitions to SN mode instead. UN mode is common during cross-border operations when transitioning from an equipped line to a non-equipped section.',
    speedLimit: 'Per national value for unfitted areas',
    driverResponsibility:
      'Full responsibility under national signalling rules. ETCS provides only ceiling speed supervision.',
    realWorldContext:
      'Occurs when an ETCS-equipped train runs onto a branch line or older route that has no ETCS trackside infrastructure. Also common during cross-border transitions between equipped and non-equipped networks.',
    etcsLevel: ['0'],
    subsetReference: 'Subset-026, Section 4.4.8',
    keyCharacteristics: [
      'No ETCS trackside equipment present (Level 0)',
      'Basic ceiling speed supervision only',
      'No MA, no track description from ETCS',
      'Driver follows national signalling and rules',
      'STM-equipped trains use SN mode instead if national system available',
    ],
  },
  {
    id: 'SN',
    name: 'STM National',
    abbreviation: 'SN',
    category: 'operational',
    description:
      'The train has crossed into an area with a different country\'s train protection system. ETCS hands over control to that national system through a special adapter (STM). The old local system now protects the train.',
    detailedDescription:
      'STM National mode allows an ETCS train to operate under a legacy national train protection system through a Specific Transmission Module (STM). The STM connects the national system\'s track equipment (national balises, track magnets, inductive loops) to the ETCS on-board architecture. The STM provides speed supervision, signal interpretation, and brake commands according to the national rules. The ETCS on-board coordinates the overall state but delegates protection to the STM. The DMI may show national system-specific displays. This is essential for cross-border interoperability: a train can transition from ETCS Full Supervision to a national system (PZB in Germany, KVB in France, ASFA in Spain, SCMT in Italy) when crossing from an ETCS line to a nationally-protected line.',
    speedLimit: 'Per national system supervision',
    driverResponsibility:
      'Follow national system indications and rules. ETCS coordinates but national system supervises.',
    realWorldContext:
      'Essential for cross-border trains in Europe. For example, a Thalys or ICE train running from an ETCS Level 2 section into an area protected by the national system (PZB, KVB, TVM, etc.) of the adjacent country.',
    etcsLevel: ['NTC'],
    subsetReference: 'Subset-026, Section 4.4.9',
    keyCharacteristics: [
      'National train protection system active via STM',
      'ETCS delegates supervision to national system',
      'Essential for cross-border interoperability',
      'DMI may show national-specific information',
      'Triggered by national system mode profile from trackside',
    ],
  },
  {
    id: 'SL',
    name: 'Sleeping',
    abbreviation: 'SL',
    category: 'inactive',
    description:
      'This ETCS unit is on but someone else is driving. Another cab or another on-board system is in charge. This one just stays quiet in the background.',
    detailedDescription:
      'Sleeping mode is entered when the ETCS on-board recognizes it is not the active leading unit. This occurs when a train has multiple ETCS units and only one is designated as leading, when the rear cab of a push-pull train is powered but not in use, or when a locomotive is coupled but another unit is driving. In Sleeping mode, the on-board maintains its internal state (train data, position) but does not perform active supervision — no brake commands, no RBC communication for MAs, and no operational supervision on the DMI. The transition from Sleeping to Stand By occurs when the driver activates this cab as the leading unit.',
    speedLimit: null,
    driverResponsibility:
      'No active driving from this cab. Another unit is in control.',
    realWorldContext:
      'The rear cab of a push-pull commuter train has its ETCS in Sleeping mode while the driver operates from the front cab. Also applies to a banked locomotive or a dead-in-train unit being hauled.',
    etcsLevel: ['0', '1', '2', '3', 'NTC'],
    subsetReference: 'Subset-026, Section 4.4.10',
    keyCharacteristics: [
      'ETCS powered but not actively supervising',
      'No brake commands issued by this unit',
      'Another ETCS unit or cab is leading',
      'Internal state (train data, position) maintained',
      'Transitions to SB when this cab becomes leading',
    ],
  },
  {
    id: 'TR',
    name: 'Trip',
    abbreviation: 'TR',
    category: 'degraded',
    description:
      'Emergency! The train went past a point where it should have stopped (or something dangerous was detected). The brakes slam on automatically and the train must stop completely. This is the "panic button" of ETCS.',
    detailedDescription:
      'Trip is the ETCS emergency response to a potentially dangerous situation. It is triggered when the train overruns the End of Authority (EOA), when a balise group commands a trip, or when other safety-critical conditions are detected (e.g., passing a stop signal in Level 1). ETCS immediately commands a full emergency brake application. The DMI displays the Trip indication. No further movement is permitted until the driver acknowledges the trip and specific recovery conditions are met. Trip represents the system\'s last line of defence against a collision or derailment. The severity is deliberate — emergency braking and the subsequent Post Trip recovery procedure ensure that safe conditions are re-established. Every Trip event is logged and may require investigation.',
    speedLimit: '0 km/h (emergency brake to standstill)',
    driverResponsibility:
      'Allow train to stop. Do not attempt to move. Acknowledge trip and contact signaller.',
    realWorldContext:
      'Occurs if a driver misjudges braking and passes the EOA, if a communication failure causes the MA to expire at an inopportune moment, or if trackside deliberately trips the train due to a detected conflict. A serious operational event that is always investigated.',
    etcsLevel: ['1', '2', '3'],
    subsetReference: 'Subset-026, Section 4.4.11',
    keyCharacteristics: [
      'Emergency brake applied immediately and automatically',
      'Triggered by passing EOA or safety-critical event',
      'Train must come to complete standstill',
      'No movement permitted until acknowledged and recovered',
      'Transitions to Post Trip after standstill and driver acknowledgement',
    ],
  },
  {
    id: 'PT',
    name: 'Post Trip',
    abbreviation: 'PT',
    category: 'degraded',
    description:
      'The emergency stop is over and the driver has pressed "acknowledge." Now the train sits still while the driver calls the signaller to figure out what to do next. Nobody moves until they agree on a plan.',
    detailedDescription:
      'Post Trip is entered after a Trip event once the train has stopped and the driver has acknowledged the trip on the DMI. ETCS prevents any forward movement beyond the point of standstill. The driver must contact the signaller to report the trip and receive instructions. The signaller may authorize the driver to proceed in Staff Responsible mode, request a shunting movement, or issue other instructions. In Level 2/3, the on-board may attempt to re-establish RBC communication and request a new MA. Post Trip provides a procedural pause — both the driver and signaller must assess the situation before the train moves again. A limited reverse movement may be possible if authorized.',
    speedLimit: '0 km/h (standstill, limited reverse may be possible)',
    driverResponsibility:
      'Contact signaller. Report trip event. Await authorization before any movement.',
    realWorldContext:
      'After a trip event at a station signal, the driver contacts the signaller by radio, explains the situation, and the signaller may issue a verbal authority to proceed in SR mode past the signal at danger, or may request the train to reverse to clear the overlap.',
    etcsLevel: ['1', '2', '3'],
    subsetReference: 'Subset-026, Section 4.4.12',
    keyCharacteristics: [
      'Entered after trip and train standstill',
      'Driver must acknowledge trip on DMI',
      'No forward movement permitted without authorization',
      'Driver must contact signaller for instructions',
      'Typically transitions to SR or SH under signaller authority',
    ],
  },
  {
    id: 'SF',
    name: 'System Failure',
    abbreviation: 'SF',
    category: 'failure',
    description:
      'The train computer has crashed or detected a serious internal error. It can no longer be trusted to keep the train safe, so it hits the emergency brake and shuts down. The driver must fall back to old-school rules.',
    detailedDescription:
      'System Failure is entered when the ETCS on-board detects a fault that compromises its ability to safely supervise the train — hardware failure (processor, memory, sensor), software error, or internal consistency check failure. The system commands an emergency brake application. The DMI indicates the failure. ETCS can no longer provide any supervision, so the driver must operate under national rules and procedures for movement without train protection. Recovery typically requires a power cycle (off and back on, cycling through NP to SB). If the fault persists, ETCS must be isolated (IS mode) and the train operated without protection or withdrawn from service. This is a rare but critical event.',
    speedLimit: '0 km/h (emergency brake applied)',
    driverResponsibility:
      'Follow national rules for movement without ETCS. Report failure. May need to isolate ETCS.',
    realWorldContext:
      'A rare event that could occur due to on-board computer hardware failure, corrupted software, or sensor malfunction (e.g., odometry failure, JRU fault). The train is typically held until maintenance can assess the fault.',
    etcsLevel: ['0', '1', '2', '3', 'NTC'],
    subsetReference: 'Subset-026, Section 4.4.13',
    keyCharacteristics: [
      'Safety-critical on-board failure detected',
      'Emergency brake applied automatically',
      'ETCS can no longer guarantee safe supervision',
      'Driver must revert to national operating rules',
      'Recovery requires power cycle or ETCS isolation',
    ],
  },
  {
    id: 'IS',
    name: 'Isolation',
    abbreviation: 'IS',
    category: 'inactive',
    description:
      'The driver has deliberately turned ETCS off using a physical switch. The system is completely disabled — like pulling the plug. Used when ETCS is broken and can\'t be fixed on the spot.',
    detailedDescription:
      'Isolation is entered when the driver operates the physical ETCS isolation switch to completely disable the on-board equipment. This is a deliberate action. Once isolated, ETCS provides no supervision, no DMI display (or shows an isolation indication), no brake commands, and no trackside communication. The train operates entirely under national rules and any independent national train protection system. Isolation is used when ETCS has a persistent fault that cannot be cleared, during maintenance, or in specific scenarios where ETCS must be disabled. The isolation switch is typically a physical key-switch to prevent accidental activation. To exit, the driver returns the switch to normal, triggering a power-on sequence and system restart.',
    speedLimit: null,
    driverResponsibility:
      'Full responsibility under national rules. No ETCS protection available. Must operate isolation switch.',
    realWorldContext:
      'Used when the on-board ETCS has a persistent fault and the train needs to continue to the nearest maintenance facility. Also used during on-board equipment testing and maintenance activities in workshops.',
    etcsLevel: ['0', '1', '2', '3', 'NTC'],
    subsetReference: 'Subset-026, Section 4.4.14',
    keyCharacteristics: [
      'ETCS deliberately disabled by driver via physical switch',
      'No ETCS functions available',
      'Used for persistent faults or maintenance',
      'Physical key-switch prevents accidental activation',
      'Exit requires switch reset and full system restart',
    ],
  },
  {
    id: 'NL',
    name: 'Non Leading',
    abbreviation: 'NL',
    category: 'supervised',
    description:
      'This locomotive is part of the train but it\'s not the one in charge. Another unit up front is doing the driving and the safety checks. This one just tags along quietly.',
    detailedDescription:
      'Non Leading mode is used when a powered unit with ETCS is part of a consist but is not controlling the movement. Common in multiple traction (two or more locos coupled together) or push-pull operations where the rear loco has ETCS active but the front cab is in control. The on-board is active and aware of its status but does not request or hold an MA, and does not issue brake commands based on ETCS supervision. The cab in NL typically has a reduced DMI display. NL ensures only one ETCS on-board in a consist is actively supervising at any time, preventing conflicting brake commands or authority management.',
    speedLimit: null,
    driverResponsibility:
      'Monitor only. No active driving responsibility from this unit. Leading unit controls the train.',
    realWorldContext:
      'A freight train hauled by two coupled locomotives: the front loco is in FS mode while the rear loco\'s ETCS is in NL mode. Also used for the rear power car of a high-speed push-pull trainset.',
    etcsLevel: ['0', '1', '2', '3', 'NTC'],
    subsetReference: 'Subset-026, Section 4.4.15',
    keyCharacteristics: [
      'Unit is not the leading traction in the consist',
      'No movement authority held or requested',
      'No ETCS brake commands issued by this unit',
      'Prevents conflicting supervision in multi-unit trains',
      'Transitions to SB when becoming the leading unit',
    ],
  },
  {
    id: 'RV',
    name: 'Reversing',
    abbreviation: 'RV',
    category: 'supervised',
    description:
      'The train needs to go backwards for a short distance — maybe it overshot a platform or needs to evacuate a tunnel. ETCS watches the speed and distance to make sure it doesn\'t go too far.',
    detailedDescription:
      'Reversing mode allows a controlled backward movement under ETCS supervision. The driver is authorized (via trackside information or specific ETCS procedure) to reverse for a limited distance at a limited speed. ETCS monitors that the train does not exceed the authorized reversing speed or travel beyond the authorized distance. The DMI shows the reversing state and remaining distance. Used for setting back to a platform after overrunning, retreating from a danger point, or emergency evacuation (e.g., reversing out of a tunnel). Reversing parameters are defined by trackside data or national values. Once complete, the train transitions to another mode (typically Post Trip or Full Supervision). This is not for regular bidirectional running.',
    speedLimit: '30 km/h (per reversing area parameters)',
    driverResponsibility:
      'Control reverse movement within authorized speed and distance. Monitor DMI for remaining distance.',
    realWorldContext:
      'A train overruns a platform at a terminus station and needs to set back. Or a train in a tunnel during an emergency must reverse to the tunnel entrance for passenger evacuation. Also used at specific crossovers.',
    etcsLevel: ['1', '2', '3'],
    subsetReference: 'Subset-026, Section 4.4.16',
    keyCharacteristics: [
      'Controlled reverse movement under ETCS supervision',
      'Speed and distance limits enforced',
      'Used for operational recovery and emergency scenarios',
      'Requires specific authorization from trackside',
      'Not for regular bidirectional running',
    ],
  },
  {
    id: 'AD',
    name: 'Automatic Driving',
    abbreviation: 'AD',
    category: 'operational',
    description:
      'ATO (Automatic Train Operation) is in control. The train drives itself — accelerating, braking, and stopping at stations automatically — while ETCS still watches over everything to ensure safety. Added in Baseline 4.',
    detailedDescription:
      'Automatic Driving is a new ETCS mode introduced in Baseline 4 (CCS TSI 2023) specifically for ATO over ETCS operation. It is entered from Full Supervision when the driver (GoA 2) or the system (GoA 3/4) engages ATO. In this mode, the ATO on-board system controls traction, braking, and coasting according to a Journey Profile received from the ATO trackside. ETCS continues to provide full safety supervision — the Movement Authority, speed profile, and braking curves remain enforced. If ATO commands would violate any ETCS constraint, the safety layer intervenes with service or emergency braking. The driver can disengage ATO at any time, returning to Full Supervision. If ETCS detects a safety-critical condition (e.g., approaching EOA), it overrides ATO automatically.',
    speedLimit: 'Per static speed profile and MA (ATO optimises within ETCS envelope)',
    driverResponsibility:
      'GoA 2: Monitor ATO operation, handle doors and departure, can override at any time. GoA 3/4: Reduced or no driver role.',
    realWorldContext:
      'Currently being piloted on lines like Thameslink (UK) and various European metro systems. This mode enables energy-efficient, timetable-optimised driving while maintaining full ETCS safety protection. Expected to become standard for high-frequency urban and suburban services.',
    etcsLevel: ['2', '3'],
    subsetReference: 'Subset-026, Section 4.4.18 (Baseline 4); Subset-125',
    keyCharacteristics: [
      'ATO controls traction, braking, and coasting automatically',
      'ETCS maintains full safety supervision (MA, speed, braking curves)',
      'Journey Profile from ATO trackside guides speed optimisation',
      'Driver can disengage ATO at any time (returns to FS)',
      'Introduced in ETCS Baseline 4 / CCS TSI 2023',
    ],
  },
];
