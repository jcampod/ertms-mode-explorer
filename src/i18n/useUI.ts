import { useMemo } from 'react';
import { useLanguage } from './index';
import type { UITranslations } from './types';

const EN_DEFAULTS: UITranslations = {
  // TopNav
  appTitle: 'ERTMS Mode Explorer',
  appSubtitle: 'ETCS Operating Modes \u2014 Subset-026',
  switchToLight: 'Switch to light mode',
  switchToDark: 'Switch to dark mode',
  // TabBar
  tabStateDiagram: 'State Diagram',
  tabScenarioSimulator: 'Scenario Simulator',
  tabATOOverview: 'ATO Overview',
  // DiagramLegend
  modeCategories: 'Mode Categories',
  commonOnly: 'Common only',
  lineStyles: 'Line Styles',
  onHoverShow: 'On Hover \u2014 Show',
  outgoing: 'Outgoing',
  incoming: 'Incoming',
  both: 'Both',
  // DiagramControls
  zoomIn: 'Zoom in',
  zoomOut: 'Zoom out',
  resetView: 'Reset view',
  // Category labels (ETCS)
  catOperational: 'Operational',
  catSpecialMovement: 'Special Movement',
  catStandBy: 'Stand By',
  catDegraded: 'Degraded',
  catFailure: 'Failure',
  catInactive: 'Inactive',
  // Category labels (ATO)
  atoCatInactive: 'Inactive',
  atoCatStandby: 'Standby',
  atoCatOperational: 'Operational',
  atoCatTransition: 'Transition',
  // Trigger labels
  triggerDriver: 'Driver-initiated',
  triggerTrackside: 'Trackside command',
  triggerSystem: 'Automatic (system)',
  triggerFailure: 'Failure detection',
  // Badges
  badgeAutomatic: 'Automatic',
  badgeManual: 'Manual',
  badgeCommon: 'Common',
  badgeFromAnyMode: 'From any mode',
  badgeFromAnyState: 'From any state',
  // Detail panel - shared
  inSimpleTerms: 'In Simple Terms',
  technicalDetail: 'Technical Detail',
  conditions: 'Conditions',
  optional: '(optional)',
  specificationReference: 'Specification Reference',
  keyCharacteristics: 'Key Characteristics',
  // Detail panel - ETCS specific
  etcsLevels: 'ETCS Levels',
  speedLimit: 'Speed Limit',
  driverResponsibility: 'Driver Responsibility',
  realWorldContext: 'Real-World Context',
  transitionsFromThisMode: 'Transitions From This Mode',
  transitionsToThisMode: 'Transitions To This Mode',
  // Detail panel - ATO specific
  goaRelevance: 'GoA Relevance',
  etcsRequirement: 'ETCS Requirement',
  transitionsFromThisState: 'Transitions From This State',
  transitionsToThisState: 'Transitions To This State',
  // Simulator
  etcsModeSimulator: 'ETCS Mode Simulator',
  scenarioSubtitle: 'Test your knowledge with guided scenarios or explore mode transitions freely.',
  freeExploration: 'Free Exploration',
  freeExplorationDescription: 'Navigate freely between all ETCS modes. Explore transitions, read descriptions, and build your own understanding of the mode graph at your own pace.',
  sandbox: 'Sandbox',
  startFromNoPower: 'Start from No Power and explore',
  steps: 'steps',
  scenarioComplete: 'Scenario Complete!',
  percentCorrect: '% correct',
  bestStreak: 'Best streak',
  tryAgain: 'Try Again',
  backToScenarios: 'Back to Scenarios',
  exit: 'Exit',
  back: 'Back',
  reset: 'Reset',
  situation: 'Situation',
  showHint: 'Show hint',
  hideHint: 'Hide hint',
  correct: 'Correct!',
  notQuite: 'Not quite...',
  correctAnswerIs: 'The correct answer is',
  continueBtn: 'Continue',
  availableTransitions: 'Available Transitions',
  noOutgoingTransitions: 'No outgoing transitions from this mode. Use Back or Reset to navigate.',
  // Difficulty
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  // GoA section
  task: 'Task',
  description: 'Description',
  driverRole: 'Driver Role',
  atoRole: 'ATO Role',
  realWorldExamples: 'Real-World Examples',
  goaManual: 'Manual',
  goaSemiAuto: 'Semi-Auto',
  goaDriverless: 'Driverless',
  goaUnattended: 'Unattended',
  roleDriver: 'Driver',
  roleATO: 'ATO',
  roleAttendant: 'Attendant',
  roleSystem: 'System',
  // ATO Overview headers
  etcsIntegration: 'ETCS Integration',
  gradesOfAutomation: 'Grades of Automation (GoA 1\u20134)',
  atoStateCategories: 'ATO State Categories',
  // ETCSIntegration
  atoUnderEtcsSupervision: 'ATO Under ETCS Supervision',
  etcsSafetyEnvelope: 'ETCS Safety Envelope \u2014 Full Supervision (FS) / Automatic Driving (AD)',
  fsAdTransition: 'FS \u2192 AD when ATO engages \u00B7 Movement Authority + Speed Supervision + Emergency Brake Override',
  atoEngagedAutoDriving: 'ATO Engaged (EG) \u2014 Automatic Driving',
  atoJourneyProfile: 'Journey Profile + Timetable + Energy Optimisation',
  atoCommands: 'ATO Commands:',
  etcsOverride: 'ETCS Override: If ATO violates MA/speed \u2192 Service Brake \u2192 Emergency Brake',
  atoOperationalPhases: 'ATO Operational Phases \u2014 Station to Station Cycle',
  // Operational phases
  phaseStationStop: 'Station Stop',
  phaseStationStopDesc: 'Train at platform, precise stop \u00B10.5 m',
  phaseDoorControl: 'Door Control',
  phaseDoorControlDesc: 'Open/close doors, passenger exchange',
  phaseDeparture: 'Departure',
  phaseDepartureDesc: 'Doors locked, departure conditions met',
  phaseAccelerating: 'Accelerating',
  phaseAcceleratingDesc: 'Traction applied to reach target speed',
  phaseCruising: 'Cruising',
  phaseCruisingDesc: 'Maintaining speed at target',
  phaseCoasting: 'Coasting',
  phaseCoastingDesc: 'Traction off \u2014 rolling on momentum to save energy',
  phaseBraking: 'Braking',
  phaseBrakingDesc: 'Service braking for next station stop',
  // Commands
  cmdTraction: 'Traction',
  cmdBraking: 'Braking',
  cmdCoasting: 'Coasting',
  cmdDoors: 'Doors',
  // References
  referencesTitle: 'References \u2014 Key ATO Specifications (CCS TSI 2023)',
  // Tooltips
  tooltipSpeed: 'Speed',
  tooltipClickForDetails: 'Click for details',
};

/**
 * Returns the UITranslations object.
 * Contains English defaults inline, overlaid with translations when a
 * non-English language is active.
 */
export function useUI(): UITranslations {
  const { translations } = useLanguage();

  return useMemo(() => {
    if (!translations) return EN_DEFAULTS;
    return { ...EN_DEFAULTS, ...translations.ui };
  }, [translations]);
}
