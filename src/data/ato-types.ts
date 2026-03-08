export type ATOStateCategory =
  | 'inactive'
  | 'standby'
  | 'operational'
  | 'transition';

export type ATOStateId = 'NP' | 'CO' | 'NA' | 'AV' | 'RE' | 'EG' | 'DE';

export type ATOTriggerType = 'driver' | 'system' | 'trackside' | 'both';

export interface ATOState {
  id: ATOStateId;
  name: string;
  abbreviation: string;
  category: ATOStateCategory;
  description: string;
  detailedDescription: string;
  keyCharacteristics: string[];
  goaRelevance: string;
  etcsRequirement: string;
  subsetReference: string;
}

export interface ATOTransitionCondition {
  text: string;
  isRequired: boolean;
}

export interface ATOTransition {
  id: string;
  from: ATOStateId;
  to: ATOStateId;
  conditions: ATOTransitionCondition[];
  description: string;
  detailedDescription: string;
  isAutomatic: boolean;
  isCommon: boolean;
  triggerType: ATOTriggerType;
  isUniversal?: boolean;
}

export interface ATONodePosition {
  stateId: ATOStateId;
  x: number;
  y: number;
  group: ATOStateCategory;
}

export type GoALevel = 1 | 2 | 3 | 4;

export type ResponsibilityRole = 'driver' | 'ato' | 'attendant' | 'system';

export interface GoAResponsibility {
  task: string;
  performedBy: ResponsibilityRole;
}

export interface GoAInfo {
  level: GoALevel;
  name: string;
  shortName: string;
  description: string;
  detailedDescription: string;
  driverRole: string;
  atoRole: string;
  responsibilities: GoAResponsibility[];
  realWorldExamples: string[];
  specStatus: string;
}
