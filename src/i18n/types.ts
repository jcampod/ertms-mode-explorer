export type Language = 'en' | 'es' | 'de' | 'fr' | 'it';

export interface LanguageOption {
  code: Language;
  label: string;  // native name
  flag: string;   // 2-letter code for display
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'es', label: 'Español', flag: 'ES' },
  { code: 'de', label: 'Deutsch', flag: 'DE' },
  { code: 'fr', label: 'Français', flag: 'FR' },
  { code: 'it', label: 'Italiano', flag: 'IT' },
];

// UI Translation interface - all hardcoded UI strings
export interface UITranslations {
  // TopNav
  appTitle: string;
  appSubtitle: string;
  switchToLight: string;
  switchToDark: string;
  // TabBar
  tabStateDiagram: string;
  tabScenarioSimulator: string;
  tabATOOverview: string;
  tabLevelTransitions: string;
  // DiagramLegend
  modeCategories: string;
  commonOnly: string;
  lineStyles: string;
  onHoverShow: string;
  outgoing: string;
  incoming: string;
  both: string;
  // DiagramControls
  zoomIn: string;
  zoomOut: string;
  resetView: string;
  // Category labels (ETCS)
  catOperational: string;
  catSpecialMovement: string;
  catStandBy: string;
  catDegraded: string;
  catFailure: string;
  catInactive: string;
  // Category labels (ATO)
  atoCatInactive: string;
  atoCatStandby: string;
  atoCatOperational: string;
  atoCatTransition: string;
  atoCatFailure: string;
  // Trigger labels
  triggerDriver: string;
  triggerTrackside: string;
  triggerSystem: string;
  triggerFailure: string;
  triggerBoth: string;
  // Line style labels
  lineStyleBoth: string;
  // Badges
  badgeAutomatic: string;
  badgeManual: string;
  badgeCommon: string;
  badgeFromAnyMode: string;
  badgeFromAnyState: string;
  // Detail panel - shared
  inSimpleTerms: string;
  technicalDetail: string;
  conditions: string;
  optional: string;
  specificationReference: string;
  keyCharacteristics: string;
  // Detail panel - ETCS specific
  etcsLevels: string;
  speedLimit: string;
  driverResponsibility: string;
  realWorldContext: string;
  transitionsFromThisMode: string;
  transitionsToThisMode: string;
  // Detail panel - ATO specific
  goaRelevance: string;
  etcsRequirement: string;
  transitionsFromThisState: string;
  transitionsToThisState: string;
  // Simulator
  etcsModeSimulator: string;
  scenarioSubtitle: string;
  freeExploration: string;
  freeExplorationDescription: string;
  sandbox: string;
  startFromNoPower: string;
  steps: string;
  scenarioComplete: string;
  percentCorrect: string;
  bestStreak: string;
  tryAgain: string;
  backToScenarios: string;
  exit: string;
  back: string;
  reset: string;
  situation: string;
  showHint: string;
  hideHint: string;
  correct: string;
  notQuite: string;
  correctAnswerIs: string;
  continueBtn: string;
  availableTransitions: string;
  noOutgoingTransitions: string;
  // Difficulty
  beginner: string;
  intermediate: string;
  advanced: string;
  // GoA section
  task: string;
  description: string;
  driverRole: string;
  atoRole: string;
  realWorldExamples: string;
  goaManual: string;
  goaSemiAuto: string;
  goaDriverless: string;
  goaUnattended: string;
  roleDriver: string;
  roleATO: string;
  roleAttendant: string;
  roleSystem: string;
  // ATO Overview headers
  etcsIntegration: string;
  gradesOfAutomation: string;
  atoStateCategories: string;
  // ETCSIntegration
  atoUnderEtcsSupervision: string;
  etcsSafetyEnvelope: string;
  fsAdTransition: string;
  atoEngagedAutoDriving: string;
  atoJourneyProfile: string;
  atoCommands: string;
  etcsOverride: string;
  atoOperationalPhases: string;
  // Operational phases
  phaseStationStop: string;
  phaseStationStopDesc: string;
  phaseDoorControl: string;
  phaseDoorControlDesc: string;
  phaseDeparture: string;
  phaseDepartureDesc: string;
  phaseAccelerating: string;
  phaseAcceleratingDesc: string;
  phaseCruising: string;
  phaseCruisingDesc: string;
  phaseCoasting: string;
  phaseCoastingDesc: string;
  phaseBraking: string;
  phaseBrakingDesc: string;
  // Commands
  cmdTraction: string;
  cmdBraking: string;
  cmdCoasting: string;
  cmdDoors: string;
  // References
  referencesTitle: string;
  // Tooltips
  tooltipSpeed: string;
  tooltipClickForDetails: string;
  // Journey Profile tab
  tabJourneyProfile: string;
  jpTitle: string;
  jpSubtitle: string;
  jpDistance: string;
  jpSpeed: string;
  jpTime: string;
  jpLayerEtcsCeiling: string;
  jpLayerAtoTarget: string;
  jpLayerPhaseColors: string;
  jpLayerGradients: string;
  jpLayerRestrictions: string;
  jpPlay: string;
  jpPause: string;
  jpReset: string;
  jpSpeed1x: string;
  jpSpeed2x: string;
  jpSpeed4x: string;
  jpSegmentProfiles: string;
  jpSegmentDetails: string;
  jpLineSpeed: string;
  jpGradient: string;
  jpRestriction: string;
  jpTemporary: string;
  jpPermanent: string;
  jpStatistics: string;
  jpTotalDistance: string;
  jpJourneyTime: string;
  jpNumberOfStops: string;
  jpEnergySaving: string;
  jpUphill: string;
  jpDownhill: string;
  jpFlat: string;
  jpLayers: string;
  jpPhase: string;
  jpCurrentPhase: string;
  jpEtcsCeiling: string;
  jpAtoTarget: string;
  // ERTMS Level Selector
  levelSelectorTitle: string;
  level0Label: string;
  level0Desc: string;
  level1Label: string;
  level1Desc: string;
  level2Label: string;
  level2Desc: string;
  levelNotAvailable: string;
  atoNotAvailableAtLevel: string;
  atoLimitedAtLevel1: string;
  jpNoEtcsAtLevel: string;
  jpLimitedAtoAtLevel: string;
  // RAG Chat tab
  tabSpecChat: string;
  ragTitle: string;
  ragSubtitle: string;
  ragPlaceholder: string;
  ragSend: string;
  ragSources: string;
  ragPage: string;
  ragRelevance: string;
  ragNoAnswer: string;
  ragError: string;
  ragThinking: string;
  ragDisclaimer: string;
  ragSuggestion1: string;
  ragSuggestion2: string;
  ragSuggestion3: string;
  ragTrySuggestions: string;
}

// Data translation interfaces - keyed by stable IDs
export interface ModeTranslation {
  name: string;
  description: string;
  detailedDescription: string;
  speedLimit: string | null;
  driverResponsibility: string;
  realWorldContext: string;
  keyCharacteristics: string[];
}

export interface TransitionTranslation {
  description: string;
  detailedDescription: string;
  conditions: string[];  // parallel array to source conditions[].text
}

export interface ScenarioTranslation {
  title: string;
  description: string;
  category: string;
  steps: {
    situation: string;
    question: string;
    explanation: string;
    hint?: string;
  }[];
}

export interface ATOStateTranslation {
  name: string;
  description: string;
  detailedDescription: string;
  keyCharacteristics: string[];
  goaRelevance: string;
  etcsRequirement: string;
}

export interface ATOTransitionTranslation {
  description: string;
  detailedDescription: string;
  conditions: string[];
}

export interface GoATranslation {
  name: string;
  shortName: string;
  description: string;
  detailedDescription: string;
  driverRole: string;
  atoRole: string;
  taskNames: string[];  // parallel to responsibilities[].task
  realWorldExamples: string[];
  specStatus: string;
}

export interface JourneyProfileTranslation {
  journeyName: string;
  journeyDescription: string;
  stations: Record<string, { name: string }>;
  restrictions: Record<string, { reason: string }>;
}

export interface LanguageTranslations {
  ui: Partial<UITranslations>;
  modes: Record<string, ModeTranslation>;
  transitions: Record<string, TransitionTranslation>;
  scenarios: Record<string, ScenarioTranslation>;
  atoStates: Record<string, ATOStateTranslation>;
  atoTransitions: Record<string, ATOTransitionTranslation>;
  goaLevels: Record<number, GoATranslation>;
  journeyProfile?: JourneyProfileTranslation;
}
