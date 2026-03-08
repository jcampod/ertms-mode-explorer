import type { Scenario } from './types';

export const scenarios: Scenario[] = [
  // =============================================
  // Scenario 1: Normal Start of Mission (Beginner)
  // =============================================
  {
    id: 'normal-start',
    title: 'Normal Start of Mission',
    description:
      'Follow a driver through the standard ETCS start-up sequence: powering on, entering data, receiving a movement authority, and handling an On Sight area during the journey.',
    difficulty: 'beginner',
    category: 'Normal Operations',
    steps: [
      {
        id: 'ns-1',
        currentMode: 'NP',
        situation:
          'You are a train driver arriving at the depot early in the morning. You climb into the cab and turn the master key to power on the ETCS on-board equipment. The system runs its self-test — checking processors, memory, odometry sensors, and the juridical recording unit. All checks pass and the DMI screen illuminates, showing the data entry fields.',
        question:
          'The ETCS has powered on and completed its self-test successfully. What mode does the system enter?',
        correctAnswer: 'SB',
        incorrectOptions: ['FS', 'SR', 'IS'],
        explanation:
          'After power-on and a successful self-test, ETCS always enters Stand By (SB) mode. This is the gateway mode where the driver must enter their ID, train data, and confirm the ETCS level before any mission can begin. The system cannot go directly to Full Supervision because no movement authority exists yet.',
        hint: 'Think about what needs to happen before the train can move. The system needs driver and train data first.',
      },
      {
        id: 'ns-2',
        currentMode: 'SB',
        situation:
          'You enter your driver ID, train running number, and validate the train data (length: 200m, max speed: 160 km/h, braking characteristics). The ETCS level is confirmed as Level 2 and the on-board establishes a communication session with the Radio Block Centre (RBC). The RBC sends a valid movement authority with a complete track description including speed profile and gradient data.',
        question:
          'You have completed data entry and received a full movement authority with complete track description. What mode should the system transition to?',
        correctAnswer: 'FS',
        incorrectOptions: ['SR', 'OS', 'LS'],
        explanation:
          'When a valid MA with complete track description (speed profile, gradients) is received, the system transitions to Full Supervision (FS). This is the ideal start of mission — the train has everything it needs for maximum ETCS protection. Staff Responsible would only be used if no MA were available.',
        hint: 'You have the best possible conditions: full MA and complete track data. Which mode provides the highest level of supervision?',
      },
      {
        id: 'ns-3',
        currentMode: 'FS',
        situation:
          'You are running at 120 km/h in Full Supervision along the mainline. Everything is normal — the DMI shows permitted speed, target distance, and your current speed. Ahead, the signaller has set a route through a station where the track detection equipment has partially failed. The RBC sends an updated MA containing an On Sight mode profile for the upcoming 800m section.',
        question:
          'The RBC has sent an On Sight mode profile because the track ahead may be occupied due to failed detection equipment. As you enter this area, what mode does the system transition to?',
        correctAnswer: 'OS',
        incorrectOptions: ['SR', 'SH', 'LS'],
        explanation:
          'When the trackside sends an On Sight (OS) mode profile, the system transitions to OS mode upon entering that area. In OS mode, the speed is restricted to a speed determined by National Values and you must drive on sight — prepared to stop within visible distance. The MA remains valid; only the supervision mode changes to reflect the uncertain track occupation.',
        hint: 'The track ahead might be occupied. Which mode requires the driver to be prepared to stop at sight?',
      },
      {
        id: 'ns-4',
        currentMode: 'OS',
        situation:
          'You proceed cautiously at 25 km/h through the On Sight area, watching carefully for any obstruction. The section is clear, and after 800 metres you pass the end of the OS mode profile area. The track detection is functioning normally again beyond this point, and the full track description data is available.',
        question:
          'You have passed through the On Sight area safely. The track ahead has working detection equipment and full track data is available. What mode does the system resume?',
        correctAnswer: 'FS',
        incorrectOptions: ['SR', 'SB', 'LS'],
        explanation:
          'Once the train leaves the On Sight area and the full track description with normal conditions resumes, the system automatically transitions back to Full Supervision (FS). This is the standard recovery: OS is a temporary restriction applied to a specific section, and FS resumes when that section ends.',
        hint: 'The conditions that caused On Sight mode no longer apply. What was the mode before entering the OS area?',
      },
    ],
  },

  // =============================================
  // Scenario 2: Trip and Recovery (Intermediate)
  // =============================================
  {
    id: 'trip-recovery',
    title: 'Trip and Recovery',
    description:
      'Experience the emergency trip procedure: what happens when a train passes its End of Authority, and the step-by-step recovery process involving the driver, signaller, and ETCS system.',
    difficulty: 'intermediate',
    category: 'Degraded Operations',
    steps: [
      {
        id: 'tr-1',
        currentMode: 'FS',
        situation:
          'You are driving at 80 km/h in Full Supervision, approaching a station where the next signal is at danger. The DMI shows the braking curve and the target speed of 0 km/h at the End of Authority (EOA). You misjudge the braking distance — perhaps the rail is wet and adhesion is poor. Despite the service brake intervention, the train slides past the EOA by 15 metres.',
        question:
          'The train has overrun the End of Authority. The ETCS detects that the train has passed the EOA. What happens immediately?',
        correctAnswer: 'TR',
        incorrectOptions: ['PT', 'SF', 'SR'],
        explanation:
          'Passing the End of Authority (EOA) is the most critical safety violation in ETCS. The system immediately enters Trip (TR) mode and commands a full emergency brake application. This is the fundamental safety function of ETCS — preventing trains from entering unprotected track where a collision could occur.',
        hint: 'This is a safety-critical event. The train has gone beyond its safe limit. What is the emergency response mode?',
      },
      {
        id: 'tr-2',
        currentMode: 'TR',
        situation:
          'The emergency brake has been applied and the train is decelerating rapidly. After a tense few seconds, the train comes to a complete standstill about 40 metres beyond the EOA. The DMI displays the Trip indication prominently. Your heart is racing, but you need to follow the recovery procedure. You press the acknowledgement button on the DMI.',
        question:
          'The train has stopped and you have acknowledged the trip on the DMI. What mode does the system enter for the recovery phase?',
        correctAnswer: 'PT',
        incorrectOptions: ['SR', 'SB', 'FS'],
        explanation:
          'After a trip, once the train reaches standstill and the driver acknowledges the trip on the DMI, the system enters Post Trip (PT) mode. This is a controlled recovery state — the train cannot move forward, and the driver must contact the signaller before any further action. PT ensures a procedural pause for safety assessment.',
        hint: 'After the emergency stop, the system needs a recovery state. It is not yet safe to move — what mode handles the period between trip and resuming movement?',
      },
      {
        id: 'tr-3',
        currentMode: 'PT',
        situation:
          'You are in Post Trip mode. The train is stationary 40 metres beyond the signal at danger. You contact the signaller by GSM-R radio and report the trip event, giving your position and train number. The signaller checks the interlocking and confirms that the overlap beyond the signal is clear and there is no conflicting route set. The signaller gives you a verbal authority to proceed past the signal.',
        question:
          'The signaller has confirmed the route is safe and authorized you to proceed. You request to move forward on the DMI. What mode will the system enter?',
        correctAnswer: 'SR',
        incorrectOptions: ['FS', 'OS', 'SH'],
        explanation:
          'After a trip, the standard recovery is to proceed in Staff Responsible (SR) mode. The driver has received verbal authorization from the signaller and requests SR mode on the DMI. In SR mode, ETCS supervises a ceiling speed determined by National Values but the driver takes responsibility for safe movement. Full Supervision cannot be entered yet because no MA is available at this point. Note that SR is not the only post-trip option — at Level 2, the RBC could also propose FS, OS, LS, or SH mode.',
        hint: 'You have a verbal authorization from the signaller but no electronic movement authority from the RBC. Which mode allows movement under driver responsibility?',
      },
      {
        id: 'tr-4',
        currentMode: 'SR',
        situation:
          'You are proceeding cautiously at 35 km/h in Staff Responsible mode. As you pass the next signal (which is showing a proceed aspect), the train runs over a balise group that transmits a new movement authority from the RBC. The MA includes a complete track description with speed profile and gradient data for the route ahead.',
        question:
          'You have received a valid movement authority with complete track description while in SR mode. What mode does the system transition to?',
        correctAnswer: 'FS',
        incorrectOptions: ['OS', 'LS', 'SB'],
        explanation:
          'When a valid MA with complete track description is received while in Staff Responsible mode, the system automatically transitions to Full Supervision (FS). This is the normal recovery path: SR is a temporary degraded mode, and receiving a proper MA restores full ETCS protection.',
        hint: 'You now have everything needed for the highest level of supervision. What is the primary operational mode of ETCS?',
      },
      {
        id: 'tr-5',
        currentMode: 'FS',
        situation:
          'You have completed your journey successfully and arrived at the terminal station. The train is at standstill at the platform. It is the end of your mission — you need to shut down the ETCS and hand over the train to the next driver. You close the desk and power off the ETCS on-board equipment.',
        question:
          'You are powering off the ETCS at the end of your mission. The system first returns to Stand By when you close the mission. Then what happens when you cut the power?',
        correctAnswer: 'NP',
        incorrectOptions: ['IS', 'SL', 'SF'],
        explanation:
          'When the ETCS on-board equipment is powered off, the system enters No Power (NP) mode. All ETCS functions cease — no DMI, no supervision, no communication. This is the natural end-of-mission state. Isolation (IS) is different: that is a deliberate disabling of a powered system via the isolation switch.',
        hint: 'The equipment has no electrical supply. What is the most basic non-operational state?',
      },
    ],
  },

  // =============================================
  // Scenario 3: Shunting Operations (Beginner)
  // =============================================
  {
    id: 'shunting-ops',
    title: 'Shunting Operations',
    description:
      'Learn how trains transition in and out of Shunting mode for yard operations such as coupling wagons and assembling trains before departing on a mainline journey.',
    difficulty: 'beginner',
    category: 'Yard Operations',
    steps: [
      {
        id: 'sh-1',
        currentMode: 'SB',
        situation:
          'You are in a marshalling yard. The ETCS is in Stand By after power-on and data entry. The yard controller instructs you to shunt your locomotive to platform 3 to couple with a rake of passenger coaches. You press the shunting request button on the DMI.',
        question:
          'You have requested shunting from Stand By. The system accepts the request. What mode does the ETCS enter?',
        correctAnswer: 'SH',
        incorrectOptions: ['SR', 'OS', 'FS'],
        explanation:
          'When a shunting request is made from Stand By, the system enters Shunting (SH) mode. In SH mode, ETCS supervises a ceiling speed determined by National Values but provides no movement authority or route protection. The driver is responsible for observing the track ahead and following yard controller instructions.',
        hint: 'You need to make low-speed yard movements. Which mode is specifically designed for marshalling operations?',
      },
      {
        id: 'sh-2',
        currentMode: 'SH',
        situation:
          'You have successfully coupled with the passenger coaches and completed all shunting movements. The train is now assembled and ready for its mainline departure. You deselect shunting mode on the DMI to prepare for the start of the mainline mission.',
        question:
          'Shunting is complete and you have deselected shunting mode. What mode does the system return to?',
        correctAnswer: 'SB',
        incorrectOptions: ['FS', 'SR', 'NP'],
        explanation:
          'When shunting is deselected, the system returns to Stand By (SB) mode. This is the central gateway mode — from here, you can validate train data (which may have changed after coupling) and prepare for the mainline mission. SB is always the intermediate step between shunting and operational modes.',
        hint: 'After shunting, the driver needs to validate data and prepare for the next mission. Which mode serves as the gateway to all operational modes?',
      },
      {
        id: 'sh-3',
        currentMode: 'SB',
        situation:
          'Back in Stand By, you validate the updated train data (the train is now longer with the coaches). The ETCS level is confirmed as Level 2, and the RBC establishes communication. A valid movement authority with full track description is received for your departure route from the station.',
        question:
          'Train data is validated and a full movement authority has been received. What mode does the system transition to for mainline departure?',
        correctAnswer: 'FS',
        incorrectOptions: ['SR', 'SH', 'OS'],
        explanation:
          'With completed data entry, a valid MA, and complete track description, the system transitions to Full Supervision (FS). This is the ideal departure scenario — the train has everything needed for maximum ETCS protection on the mainline.',
        hint: 'You have all the conditions for the safest operating mode: full MA and complete track data.',
      },
    ],
  },

  // =============================================
  // Scenario 4: Crossing Non-Equipped Areas (Intermediate)
  // =============================================
  {
    id: 'non-equipped-crossing',
    title: 'Crossing Non-Equipped Areas',
    description:
      'Navigate a cross-border journey that crosses from ETCS territory into unfitted track, back to ETCS, and then into a national train protection system area.',
    difficulty: 'intermediate',
    category: 'Cross-Border Operations',
    steps: [
      {
        id: 'ne-1',
        currentMode: 'FS',
        situation:
          'You are driving a cross-border freight train at 100 km/h in Full Supervision on an ETCS Level 2 mainline. The route ahead crosses into a branch line section that has not been fitted with ETCS trackside equipment. The balise group announces a level transition from Level 2 to Level 0. There are no ETCS balises, no RBC communication, and no national train protection system on this section.',
        question:
          'The train is entering a section with no ETCS trackside equipment (Level 0) and no national system. What mode does the ETCS transition to?',
        correctAnswer: 'UN',
        incorrectOptions: ['SN', 'SR', 'NP'],
        explanation:
          'When the train enters an area with no ETCS trackside equipment (Level 0) and no national system is available via STM, the system enters Unfitted (UN) mode. ETCS provides only basic ceiling speed supervision based on national values. The driver must follow lineside signals and national operating rules. STM National (SN) would only apply if a national system were present.',
        hint: 'There is no ETCS trackside and no national system. The track is completely "unfitted." Which mode handles Level 0?',
      },
      {
        id: 'ne-2',
        currentMode: 'UN',
        situation:
          'You have been running through the unfitted section for 20 kilometres, following lineside signals and speed boards. Ahead, you see the ETCS transition board indicating you are re-entering an ETCS-equipped area. The train passes a balise group that announces a level transition from Level 0 to Level 2. However, the RBC is experiencing congestion and cannot immediately provide a movement authority.',
        question:
          'You are re-entering an ETCS-equipped area (Level 2) but no movement authority is available yet from the RBC. What mode does the system transition to?',
        correctAnswer: 'SR',
        incorrectOptions: ['FS', 'OS', 'SB'],
        explanation:
          'When transitioning from an unfitted area to an ETCS-equipped area but without a valid MA, the system enters Staff Responsible (SR) mode. This is the safe fallback: the driver acknowledges SR mode and proceeds under their own responsibility at the restricted ceiling speed (40 km/h) until an MA can be obtained from the RBC.',
        hint: 'You are in ETCS territory but have no movement authority. Which mode allows movement under driver responsibility without an MA?',
      },
      {
        id: 'ne-3',
        currentMode: 'SR',
        situation:
          'After a few minutes in Staff Responsible, the RBC resolves its congestion and sends a valid movement authority with complete track description via the radio link. The on-board receives the MA and verifies its integrity.',
        question:
          'A valid MA with complete track description has been received from the RBC. What mode does the system transition to?',
        correctAnswer: 'FS',
        incorrectOptions: ['OS', 'LS', 'UN'],
        explanation:
          'Receiving a valid MA with complete track description in SR mode triggers an automatic transition to Full Supervision (FS). This is the normal upgrade path — SR is a temporary fallback, and FS provides the full protection that ETCS is designed for.',
        hint: 'The conditions are now ideal: full MA, complete track data. What is the highest supervision mode?',
      },
      {
        id: 'ne-4',
        currentMode: 'FS',
        situation:
          'Further along the route, you approach the border with the neighbouring country. Their railway is protected by a national train protection system (PZB). The ETCS trackside sends a national system mode profile, and your train is equipped with the appropriate STM. A level transition from ETCS Level 2 to NTC is commanded.',
        question:
          'The train is crossing into an area protected by a national system (PZB) via STM. What mode does the ETCS transition to?',
        correctAnswer: 'SN',
        incorrectOptions: ['UN', 'SR', 'IS'],
        explanation:
          'When the train enters an area protected by a national train protection system and has a compatible STM, ETCS transitions to STM National (SN) mode. The STM takes over supervision using the national system rules and equipment. This is distinct from Unfitted (UN) mode, which applies when there is no protection system at all.',
        hint: 'A national train protection system is present and the train has the STM to interface with it. Which mode delegates to the national system?',
      },
    ],
  },

  // =============================================
  // Scenario 5: System Failure Handling (Advanced)
  // =============================================
  {
    id: 'system-failure',
    title: 'System Failure Handling',
    description:
      'Handle a safety-critical on-board failure: from the initial emergency response through isolation, operating under national rules, and the eventual system recovery.',
    difficulty: 'advanced',
    category: 'Failure & Recovery',
    steps: [
      {
        id: 'sf-1',
        currentMode: 'FS',
        situation:
          'You are running at 140 km/h in Full Supervision on a high-speed line. Suddenly, the ETCS on-board equipment detects an internal safety-critical failure — the odometry processor has produced inconsistent readings and the system cannot guarantee accurate speed measurement. The on-board determines it can no longer safely supervise train movement.',
        question:
          'The ETCS has detected a safety-critical internal failure and cannot guarantee safe supervision. What mode does the system enter?',
        correctAnswer: 'SF',
        incorrectOptions: ['TR', 'IS', 'SR'],
        explanation:
          'When the ETCS on-board detects a safety-critical failure that prevents it from guaranteeing safe supervision, it enters System Failure (SF) mode and immediately applies the emergency brake. This is different from a Trip (TR), which is caused by an external safety violation (passing EOA). SF means the system itself is faulty and cannot be trusted.',
        hint: 'The fault is internal to the ETCS equipment itself. The system has lost its ability to supervise safely. Which mode indicates an on-board equipment failure?',
      },
      {
        id: 'sf-2',
        currentMode: 'SF',
        situation:
          'The emergency brake has brought the train to a standstill on the open line. The DMI shows the System Failure indication. You attempt a power cycle — you power off the ETCS and power it back on. However, the self-test fails again: the odometry processor fault is persistent. The ETCS cannot start up normally. You need to get the train to the next station for maintenance. You decide to use the physical ETCS isolation switch.',
        question:
          'The fault is persistent and the ETCS cannot restart. You operate the physical isolation switch to disable the ETCS entirely. What mode does this put the system in?',
        correctAnswer: 'IS',
        incorrectOptions: ['NP', 'SF', 'SB'],
        explanation:
          'Operating the physical ETCS isolation switch puts the system into Isolation (IS) mode. This deliberately disables all ETCS functions. Unlike No Power (NP), where the system simply has no electricity, Isolation is an active decision by the driver to take ETCS out of service. The train will now operate entirely under national rules with no ETCS protection.',
        hint: 'The driver is deliberately disabling ETCS using a physical switch. This is not a power-off but an active isolation. Which mode represents this?',
      },
      {
        id: 'sf-3',
        currentMode: 'IS',
        situation:
          'With ETCS isolated, you are operating the train under national rules only. You contact the signaller, who authorizes you to proceed at a very low speed to the next station 8 km ahead. You drive carefully, observing lineside signals and speed boards. You arrive safely at the station platform and the train is taken out of service for maintenance.',
        question:
          'Maintenance has repaired the odometry processor and needs to restore ETCS. The first step is to return the isolation switch to the normal position. What mode does the ETCS enter when the isolation switch is reset?',
        correctAnswer: 'NP',
        incorrectOptions: ['SB', 'SF', 'SR'],
        explanation:
          'When the isolation switch is returned to normal, the ETCS transitions to No Power (NP) mode first. The system must then go through the full power-on sequence (NP to SB) including self-test. It does not jump directly to Stand By — the isolation switch reset triggers a clean restart sequence through the powerless state.',
        hint: 'Resetting the isolation switch is like a fresh start. The system needs to go through its complete power-on sequence. What is the starting state before power-on?',
      },
      {
        id: 'sf-4',
        currentMode: 'NP',
        situation:
          'The maintenance team powers on the ETCS on-board equipment. This time, the self-test runs successfully — the repaired odometry processor passes all checks, memory integrity is verified, and all subsystems report normal status. The DMI illuminates and shows the data entry screen.',
        question:
          'The ETCS has been powered on and the self-test has passed after the repair. What mode does the system enter?',
        correctAnswer: 'SB',
        incorrectOptions: ['FS', 'SR', 'IS'],
        explanation:
          'After a successful power-on and self-test, the ETCS always enters Stand By (SB) mode, regardless of what happened before. This is the standard startup sequence: NP to SB. From Stand By, a new mission can be started with fresh data entry. The system has been fully restored to normal operation.',
        hint: 'This is the standard power-on sequence. After self-test, the system waits for driver data entry in which mode?',
      },
    ],
  },

  // =============================================
  // Scenario 6: Multiple Traction (Intermediate)
  // =============================================
  {
    id: 'multiple-traction',
    title: 'Multiple Traction Operations',
    description:
      'Understand how ETCS handles trains with multiple powered units: configuring a locomotive as non-leading, operating in a consist, then reconfiguring for solo operation.',
    difficulty: 'intermediate',
    category: 'Special Operations',
    steps: [
      {
        id: 'mt-1',
        currentMode: 'SB',
        situation:
          'You are in the cab of a second locomotive that will be coupled to the rear of a heavy freight train. The lead locomotive already has its ETCS in Full Supervision and will control the train. Your locomotive will provide additional traction but must not issue conflicting brake commands or hold a separate movement authority. You select "Non Leading" on the DMI.',
        question:
          'You have configured this ETCS as Non Leading because another locomotive is in control. What mode does the system enter?',
        correctAnswer: 'NL',
        incorrectOptions: ['SL', 'SH', 'SR'],
        explanation:
          'When the driver selects Non Leading, the system enters Non Leading (NL) mode. In this mode, the ETCS is active and aware of its status but does not hold an MA, does not issue brake commands, and does not supervise speed. This prevents conflicting control between multiple ETCS units in the same train. Sleeping (SL) is different — that is for an inactive cab, not an actively crewed non-leading unit.',
        hint: 'This unit has a driver but is not the controlling unit. It needs to be active but passive. Which mode is for a crewed non-leading traction unit?',
      },
      {
        id: 'mt-2',
        currentMode: 'NL',
        situation:
          'The freight train completes its journey. At the destination yard, the locomotives are uncoupled. Your locomotive is now standalone and needs to operate independently for its next mission — a light engine movement to the depot. You reconfigure the cab as the leading unit by selecting the appropriate option on the DMI.',
        question:
          'You are reconfiguring this locomotive as the leading unit for independent operation. What mode does the ETCS transition to?',
        correctAnswer: 'SB',
        incorrectOptions: ['FS', 'SR', 'NP'],
        explanation:
          'When a Non Leading unit becomes the leading unit, the ETCS transitions to Stand By (SB) mode. This allows the driver to enter or validate train data for the new mission (the train data will be different now — single locomotive instead of full consist). Stand By is always the gateway to starting a new mission.',
        hint: 'The locomotive is now independent and needs to start a new mission. What is the gateway mode where data entry happens?',
      },
      {
        id: 'mt-3',
        currentMode: 'SB',
        situation:
          'You update the train data for the light engine movement (much shorter length, different braking characteristics). The ETCS establishes a new RBC session and receives a movement authority with track description for the route to the depot.',
        question:
          'Train data is validated and a movement authority with full track description has been received for the depot run. What mode does the system enter?',
        correctAnswer: 'FS',
        incorrectOptions: ['SR', 'OS', 'SH'],
        explanation:
          'With validated train data, a valid MA, and complete track description, the system transitions to Full Supervision (FS). This is the standard start of mission with full ETCS protection — the same transition regardless of whether the train was previously in NL mode or any other mode. Stand By always provides a clean start.',
        hint: 'You have all the data needed for maximum protection: MA, speed profile, gradient. What is the safest operational mode?',
      },
    ],
  },
];
