import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  WizardStep,
  WizardState,
  Archetype,
  Industry,
  VisionStatement,
  SortedVision,
  Logo,
  BrandName,
  NameMatchup,
  BusinessPlan,
} from '@/types';

interface WizardActions {
  // Navigation
  setCurrentStep: (step: WizardStep) => void;
  completeStep: (step: WizardStep) => void;
  canNavigateToStep: (step: WizardStep) => boolean;

  // Step 1: Founder Vibe
  setSelectedArchetype: (archetype: Archetype | null) => void;
  setPersonalStatement: (statement: string) => void;

  // Step 2: Industry Vibe
  toggleIndustry: (industry: Industry) => void;
  setCustomIndustry: (industry: string) => void;

  // Step 3: Vision Lab
  setVisionStatements: (statements: VisionStatement[]) => void;
  addSortedVision: (sorted: SortedVision) => void;
  setFavoriteVision: (vision: VisionStatement | null) => void;
  resetVisionSort: () => void;

  // Step 4: Identity Forge
  setLogoSeeds: (seeds: string[]) => void;
  addLogoGeneration: (logos: Logo[]) => void;
  toggleLogoSelection: (logo: Logo) => void;
  setFinalLogo: (logo: Logo | null) => void;

  // Step 5: Name Arena
  setBrandNames: (names: BrandName[]) => void;
  setNameMatchups: (matchups: NameMatchup[]) => void;
  recordMatchupWinner: (matchupId: string, winnerId: string) => void;
  setChampionName: (name: BrandName | null) => void;

  // Step 6: Plan Studio
  setBusinessPlan: (plan: BusinessPlan | null) => void;
  approvePlanSection: (sectionId: string, approved: boolean, feedback?: string) => void;

  // Reset
  resetWizard: () => void;
}

const STEP_ORDER: WizardStep[] = [
  'founder-vibe',
  'industry-vibe',
  'vision-lab',
  'identity-forge',
  'name-arena',
  'plan-studio',
];

const initialState: WizardState = {
  currentStep: 'founder-vibe',
  completedSteps: [],
  selectedArchetype: null,
  personalStatement: '',
  selectedIndustries: [],
  customIndustry: '',
  visionStatements: [],
  sortedVisions: [],
  favoriteVision: null,
  logoSeeds: [],
  logoGenerations: [],
  selectedLogos: [],
  finalLogo: null,
  brandNames: [],
  nameMatchups: [],
  championName: null,
  businessPlan: null,
};

export const useWizardStore = create<WizardState & WizardActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Navigation
      setCurrentStep: (step) => set({ currentStep: step }),

      completeStep: (step) =>
        set((state) => ({
          completedSteps: state.completedSteps.includes(step)
            ? state.completedSteps
            : [...state.completedSteps, step],
        })),

      canNavigateToStep: (step) => {
        const state = get();
        const targetIndex = STEP_ORDER.indexOf(step);

        if (targetIndex === 0) return true;

        const previousStep = STEP_ORDER[targetIndex - 1];
        return state.completedSteps.includes(previousStep);
      },

      // Step 1: Founder Vibe
      setSelectedArchetype: (archetype) => set({ selectedArchetype: archetype }),
      setPersonalStatement: (statement) => set({ personalStatement: statement }),

      // Step 2: Industry Vibe
      toggleIndustry: (industry) =>
        set((state) => {
          const isSelected = state.selectedIndustries.some((i) => i.id === industry.id);
          return {
            selectedIndustries: isSelected
              ? state.selectedIndustries.filter((i) => i.id !== industry.id)
              : [...state.selectedIndustries, industry],
          };
        }),
      setCustomIndustry: (industry) => set({ customIndustry: industry }),

      // Step 3: Vision Lab
      setVisionStatements: (statements) => set({ visionStatements: statements }),
      addSortedVision: (sorted) =>
        set((state) => ({
          sortedVisions: [...state.sortedVisions, sorted],
        })),
      setFavoriteVision: (vision) => set({ favoriteVision: vision }),
      resetVisionSort: () => set({ sortedVisions: [], favoriteVision: null }),

      // Step 4: Identity Forge
      setLogoSeeds: (seeds) => set({ logoSeeds: seeds }),
      addLogoGeneration: (logos) =>
        set((state) => ({
          logoGenerations: [...state.logoGenerations, logos],
        })),
      toggleLogoSelection: (logo) =>
        set((state) => {
          const isSelected = state.selectedLogos.some((l) => l.id === logo.id);
          return {
            selectedLogos: isSelected
              ? state.selectedLogos.filter((l) => l.id !== logo.id)
              : [...state.selectedLogos, logo],
          };
        }),
      setFinalLogo: (logo) => set({ finalLogo: logo }),

      // Step 5: Name Arena
      setBrandNames: (names) => set({ brandNames: names }),
      setNameMatchups: (matchups) => set({ nameMatchups: matchups }),
      recordMatchupWinner: (matchupId, winnerId) =>
        set((state) => ({
          nameMatchups: state.nameMatchups.map((m) =>
            m.id === matchupId ? { ...m, winner: winnerId } : m
          ),
        })),
      setChampionName: (name) => set({ championName: name }),

      // Step 6: Plan Studio
      setBusinessPlan: (plan) => set({ businessPlan: plan }),
      approvePlanSection: (sectionId, approved, feedback) =>
        set((state) => {
          if (!state.businessPlan) return state;
          return {
            businessPlan: {
              ...state.businessPlan,
              sections: state.businessPlan.sections.map((s) =>
                s.id === sectionId ? { ...s, approved, feedback } : s
              ),
            },
          };
        }),

      // Reset
      resetWizard: () => set(initialState),
    }),
    {
      name: 'vibefounder-wizard',
    }
  )
);
