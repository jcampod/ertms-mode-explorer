export type ModeCategory =
  | 'operational'
  | 'supervised'
  | 'standby'
  | 'degraded'
  | 'failure'
  | 'inactive';

export type ModeId =
  | 'NP' | 'SB' | 'SH' | 'FS' | 'LS' | 'OS'
  | 'SR' | 'UN' | 'SL' | 'TR' | 'PT' | 'SF'
  | 'IS' | 'NL' | 'RV' | 'SN' | 'AD';

export type TriggerType = 'driver' | 'trackside' | 'system' | 'failure' | 'both';

export interface ETCSMode {
  id: ModeId;
  name: string;
  abbreviation: string;
  category: ModeCategory;
  description: string;
  detailedDescription: string;
  speedLimit: string | null;
  driverResponsibility: string;
  realWorldContext: string;
  etcsLevel: string[];
  subsetReference: string;
  keyCharacteristics: string[];
}

export interface TransitionCondition {
  text: string;
  isRequired: boolean;
}

export interface Transition {
  id: string;
  from: ModeId;
  to: ModeId;
  conditions: TransitionCondition[];
  description: string;
  detailedDescription: string;
  isAutomatic: boolean;
  isCommon: boolean;
  triggerType: TriggerType;
  isUniversal?: boolean;
}

export interface NodePosition {
  modeId: ModeId;
  x: number;
  y: number;
  group: ModeCategory;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  steps: ScenarioStep[];
  category: string;
  applicableLevels?: ('0' | '1' | '2')[];
}

export interface ScenarioStep {
  id: string;
  currentMode: ModeId;
  situation: string;
  question: string;
  correctAnswer: ModeId;
  incorrectOptions: ModeId[];
  explanation: string;
  hint?: string;
}
