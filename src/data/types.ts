export type ConceptId =
  | "creativity"
  | "change"
  | "ethics"
  | "sustainability";

export type UnitId =
  | "unit-1"
  | "unit-2"
  | "unit-3"
  | "unit-4"
  | "unit-5"
  | "bmt";

export interface ConceptDefinition {
  id: ConceptId;
  name: string;
  shortName: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  glowColor: string;
  description: string;
  coreMechanism: string;
  examTips: string;
}

export interface SubSection {
  id: string;
  title: string;
  marker: string;
  content: string;
  analyticalTakeaway: string;
  keyFormulaOrFramework?: string;
}

export interface CaseStudyItem {
  id: string;
  company: string;
  context: string;
  application: string;
  concepts: ConceptId[];
  syllabusLink: string;
  evaluationAO3AO4: string;
}

export interface ConceptTrackItem {
  conceptId: ConceptId;
  intensity: 1 | 2 | 3 | 4 | 5;
  manifestation: string;
}

export interface TopicAnalysis {
  coreThesis: string;
  theoreticalFoundations: string;
  strategicEvaluationAO3AO4: string;
  commonMisconceptions: string[];
  realWorldConnections: string;
  connectedBMTTools: string[];
}

export interface TopicData {
  id: string;
  unitId: UnitId;
  unitNumber: 1 | 2 | 3 | 4 | 5 | 7;
  topicCode: string; // e.g. "1.1", "2.4", "3.5", "BMT-2"
  displayCode: string; // e.g. "U1.1", "U2.4", "U3.5", "BMT-2"
  syllabusRef: string; // e.g. "IB Guide 1.1 / Slides 1.1.2–1.1.4"
  title: string;
  subtitle: string;
  level: "SL / HL" | "HL ONLY";
  strategicImportance:
    | "CORE FOUNDATION"
    | "HIGH-YIELD HL"
    | "QUANTITATIVE TOOLKIT"
    | "STRATEGIC EVALUATION"
    | "PAPER 1 / 2 ESSENTIAL";
  readingTimeMinutes: number;
  summary: string;
  speedReadBullets: string[];
  subSections: SubSection[];
  analysis: TopicAnalysis;
  cases: CaseStudyItem[];
  conceptTracking: ConceptTrackItem[];
  examPromptTakeaway: string;
}

export interface UnitPart {
  id: UnitId;
  unitNumber: 1 | 2 | 3 | 4 | 5 | 7;
  title: string;
  subtitle: string;
  badge: string;
  overview: string;
  strategicArc: string;
  dominantConcepts: ConceptId[];
  topics: TopicData[];
}

export interface BMTToolDossier {
  id: string;
  number: number;
  name: string;
  category: string;
  hlOnly: boolean;
  description: string;
  quadrantOrSteps: { label: string; detail: string }[];
  evaluationStrengths: string[];
  evaluationLimitations: string[];
  examTips: string;
  realWorldExample: string;
}

export interface TheoristProfile {
  id: string;
  name: string;
  schoolOrTheory: string;
  unit: string;
  coreModel: string;
  keyAssumptions: string[];
  evaluationAO3: string;
  realWorldExample: string;
}

export interface FormulaItem {
  id: string;
  code: string;
  name: string;
  unit: string;
  hlOnly: boolean;
  formula: string;
  variables: { name: string; definition: string }[];
  benchmarkGuidance: string;
  evaluationInterpretation: string;
  workedExample: string;
}

export interface GlossaryTerm {
  term: string;
  unit: string;
  hlOnly: boolean;
  definition: string;
  examTip: string;
}
