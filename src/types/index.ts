// Founder Archetype types
export interface Archetype {
  id: string;
  name: string;
  tagline: string;
  description: string;
  traits: string[];
  icon: string;
  glowColor: string;
  gradient: string;
}

// Industry types
export interface Industry {
  id: string;
  name: string;
  description: string;
  icon: string;
  subIndustries: string[];
}

// Vision Statement types
export interface VisionStatement {
  id: string;
  vision: string;
  mission: string;
  values: string[];
}

export type VisionBucket = 'love' | 'like' | 'pass';

export interface SortedVision {
  statement: VisionStatement;
  bucket: VisionBucket;
}

// Logo types
export interface Logo {
  id: string;
  url: string;
  generation: number;
  parentIds?: string[];
  traits: LogoTraits;
}

export interface LogoTraits {
  style: string;
  colors: string[];
  complexity: number;
  symbolism: string;
}

// Name types
export interface BrandName {
  id: string;
  name: string;
  tagline: string;
  meaning: string;
  domainAvailable?: boolean;
}

export interface NameMatchup {
  id: string;
  name1: BrandName;
  name2: BrandName;
  winner?: string;
  round: number;
}

// Business Plan types
export interface PlanSection {
  id: string;
  title: string;
  content: string;
  approved: boolean;
  feedback?: string;
}

export interface BusinessPlan {
  id: string;
  sections: PlanSection[];
  overallApproved: boolean;
}

// Wizard state
export type WizardStep =
  | 'founder-vibe'
  | 'industry-vibe'
  | 'vision-lab'
  | 'identity-forge'
  | 'name-arena'
  | 'plan-studio';

export interface WizardState {
  currentStep: WizardStep;
  completedSteps: WizardStep[];

  // Step 1: Founder Vibe
  selectedArchetype: Archetype | null;
  personalStatement: string;

  // Step 2: Industry Vibe
  selectedIndustries: Industry[];
  customIndustry: string;

  // Step 3: Vision Lab
  visionStatements: VisionStatement[];
  sortedVisions: SortedVision[];
  favoriteVision: VisionStatement | null;

  // Step 4: Identity Forge
  logoSeeds: string[];
  logoGenerations: Logo[][];
  selectedLogos: Logo[];
  finalLogo: Logo | null;

  // Step 5: Name Arena
  brandNames: BrandName[];
  nameMatchups: NameMatchup[];
  championName: BrandName | null;

  // Step 6: Plan Studio
  businessPlan: BusinessPlan | null;
}
