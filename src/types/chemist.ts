export type NavigationTab =
  | 'dashboard'
  | 'new-analysis'
  | 'live-sensors'
  | 'calibration'
  | 'ai-identification'
  | 'chemical-result'
  | 'chemical-database'
  | 'molecular-explorer'
  | 'chemical-properties'
  | 'chemical-comparison'
  | 'analysis-history'
  | 'reports'
  | 'report'
  | 'device-management'
  | 'ai-model'
  | 'analytics'
  | 'ai-assistant'
  | 'settings';

export interface Atom3D {
  id: number;
  element: string; // 'C', 'H', 'O', 'N', 'Na', 'Cl', etc.
  x: number;
  y: number;
  z: number;
  charge?: number;
}

export interface Bond3D {
  source: number; // Atom id
  target: number; // Atom id
  order: 1 | 2 | 3 | 1.5; // Single, double, triple, aromatic
}

export interface ChemicalBond {
  type: string; // e.g. "C-C Single Bond", "C=O Double Bond", "O-H Polar Single Bond"
  count: number;
  description: string;
}

export interface ElementComposition {
  element: string;
  symbol: string;
  count: number;
  atomicMass: number;
  weightPercentage: number;
  color: string;
}

export interface PhysicalProperties {
  state: string; // e.g., "Liquid", "Solid", "Gas"
  appearance: string;
  color: string;
  odor: string;
  density: string;
  meltingPoint: string;
  boilingPoint: string;
  flashPoint?: string;
  solubilityWater: string;
  vaporPressure?: string;
}

export interface ChemicalProperties {
  pKa?: string;
  acidityBasicity: string;
  reactivity: string;
  stability: string;
  oxidationBehavior?: string;
  reductionBehavior?: string;
  chemicalCompatibility: string;
  decomposition: string;
}

export interface GHSSafety {
  pictograms: string[]; // e.g. ['Flammable', 'Irritant', 'Toxic', 'Corrosive']
  signalWord: 'Danger' | 'Warning' | 'None';
  hazardStatements: string[];
  precautionaryStatements: string[];
  storageRequirements: string;
  handlingInfo: string;
  recommendedPPE: string[];
}

export interface SensorFingerprint {
  ph: number;           // Standard 0-14 pH
  ec: number;           // mS/cm
  tds: number;          // ppm
  temperature: number;  // °C
  colorRgb: { r: number; g: number; b: number };
  voc: number;          // MQ-135 analog response / ppm eq
}

export interface FeatureContribution {
  feature: 'pH' | 'EC/TDS' | 'Temperature' | 'Color Response' | 'VOC Response';
  contribution: number; // percentage e.g. 35%
  importanceLevel: 'High' | 'Medium' | 'Low';
  explanation: string;
}

export interface Chemical {
  id: string;
  name: string;
  iupacName: string;
  commonNames: string[];
  formula: string;
  casNumber: string;
  molecularWeight: number; // g/mol
  monoisotopicMass?: number;
  pubChemCid?: number;
  
  description: string;
  
  // Structure data
  atoms3D: Atom3D[];
  bonds3D: Bond3D[];
  svg2dStructure?: string; // or rendered via code
  
  // Categorization
  classCategory: string; // e.g. "Alcohols", "Carboxylic Acids", "Ketones", "Inorganic Salts", "Aromatics", "Solvents"
  
  // Detailed scientific attributes
  bonds: ChemicalBond[];
  functionalGroups: string[];
  elementComposition: ElementComposition[];
  physicalProperties: PhysicalProperties;
  chemicalProperties: ChemicalProperties;
  safety: GHSSafety;
  
  // Reference E-Tongue Fingerprint
  referenceFingerprint: SensorFingerprint;
  aiTrainedStatus: boolean;
}

export interface AlternativeMatch {
  chemicalId: string;
  chemicalName: string;
  formula: string;
  confidence: number; // percentage (e.g. 94.6)
}

export interface SampleInfo {
  sampleId: string;
  sampleName: string;
  batchNumber: string;
  source: string;
  operator: string;
  notes: string;
  timestamp: string;
  isDemoMode: boolean;
}

export interface AnalysisResult {
  id: string;
  sampleInfo: SampleInfo;
  sensorReading: SensorFingerprint;
  primaryMatch: {
    chemical: Chemical | null; // null if Unknown
    confidence: number;
    isUnknown: boolean;
  };
  alternativeMatches: AlternativeMatch[];
  featureContributions: FeatureContribution[];
  modelVersion: string;
  timestamp: string;
  status: 'Identified' | 'Low Confidence' | 'Unknown';
}

export interface DeviceStatus {
  id: string;
  deviceName: string;
  connected: boolean;
  connectionType: 'Bluetooth BLE' | 'Wi-Fi' | 'Simulated Demo';
  bleSignalDbm: number;
  batteryPercentage: number;
  firmwareVersion: string;
  lastSync: string;
  sensorHealth: {
    ph: 'Ready' | 'Calibrating' | 'Error';
    ecTds: 'Ready' | 'Calibrating' | 'Error';
    temperature: 'Ready' | 'Calibrating' | 'Error';
    color: 'Ready' | 'Calibrating' | 'Error';
    voc: 'Ready' | 'Calibrating' | 'Error';
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  category?: 'sensor-data' | 'ai-prediction' | 'chemical-db' | 'general';
}

export interface DatasetItem {
  id: string;
  sampleId: string;
  chemicalName: string;
  ph: number;
  ec: number;
  tds: number;
  temperature: number;
  rgb: string;
  voc: number;
  recordedAt: string;
  isValidated: boolean;
}
