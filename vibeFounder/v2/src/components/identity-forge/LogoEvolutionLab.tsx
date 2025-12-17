import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWizardStore } from '@/stores/wizardStore';
import { StepHeader, StepNavigation } from '@/components/wizard';
import { LogoSeeding } from './LogoSeeding';
import { LogoGrid } from './LogoGrid';
import { EvolutionTransition } from './EvolutionTransition';
import { LogoHallOfFame } from './LogoHallOfFame';
import { fadeUp } from '@/lib/motion';
import type { Logo } from '@/types';

// Mock logo generation - in production this would be an API call
const generateMockLogos = (generation: number, parentIds?: string[]): Logo[] => {
  const styles = ['Geometric', 'Abstract', 'Minimal', 'Bold', 'Organic', 'Tech'];
  const colors = [
    ['#6366F1', '#8B5CF6'],
    ['#EC4899', '#F472B6'],
    ['#10B981', '#34D399'],
    ['#F59E0B', '#FBBF24'],
    ['#06B6D4', '#22D3EE'],
    ['#EF4444', '#F87171'],
  ];

  return Array.from({ length: 6 }, (_, i) => ({
    id: `gen${generation}-logo${i + 1}`,
    url: `https://api.dicebear.com/7.x/shapes/svg?seed=${generation}-${i}&backgroundColor=${colors[i % colors.length][0].slice(1)}`,
    generation,
    parentIds,
    traits: {
      style: styles[i % styles.length],
      colors: colors[i % colors.length],
      complexity: Math.floor(Math.random() * 5) + 1,
      symbolism: ['Growth', 'Innovation', 'Connection', 'Power', 'Clarity', 'Movement'][i % 6],
    },
  }));
};

export function LogoEvolutionLab() {
  const navigate = useNavigate();
  const {
    setLogoSeeds,
    logoGenerations,
    addLogoGeneration,
    selectedLogos,
    toggleLogoSelection,
    finalLogo,
    setFinalLogo,
  } = useWizardStore();

  // Determine initial phase based on existing state
  const getInitialPhase = () => {
    if (finalLogo) return 'selecting';
    if (logoGenerations.length > 0) return 'evolving';
    return 'seeding';
  };

  const [phase, setPhase] = useState<'seeding' | 'evolving' | 'transition' | 'selecting'>(getInitialPhase);
  const [currentGeneration, setCurrentGeneration] = useState(Math.max(0, logoGenerations.length - 1));

  const currentLogos = logoGenerations[currentGeneration] || [];
  const MAX_GENERATIONS = 3;

  // Handle seeding completion - generate first logos
  const handleSeedingComplete = (seeds: string[]) => {
    setLogoSeeds(seeds);
    // Generate first generation immediately
    const firstGen = generateMockLogos(1);
    addLogoGeneration(firstGen);
    setCurrentGeneration(0);
    setPhase('evolving');
  };

  const handleEvolve = () => {
    if (selectedLogos.length < 2) return;
    setPhase('transition');
  };

  const handleEvolutionComplete = () => {
    const parentIds = selectedLogos.map((l) => l.id);
    const newGen = generateMockLogos(currentGeneration + 2, parentIds);
    addLogoGeneration(newGen);
    setCurrentGeneration((prev) => prev + 1);
    toggleLogoSelection(selectedLogos[0]); // Clear selections
    toggleLogoSelection(selectedLogos[1]);
    setPhase('evolving');
  };

  const handleFinalize = () => {
    if (selectedLogos.length === 1) {
      setFinalLogo(selectedLogos[0]);
      setPhase('selecting');
    }
  };

  const handleNext = () => {
    navigate('/create/identity-forge');
  };

  const handleBack = () => {
    navigate('/create/identity-forge');
  };

  const isLastGeneration = currentGeneration >= MAX_GENERATIONS - 1;
  const canEvolve = selectedLogos.length >= 2 && !isLastGeneration;
  const canFinalize = selectedLogos.length === 1;

  return (
    <div className="max-w-5xl mx-auto">
      <StepHeader
        step={4}
        title="Logo Evolution Lab"
        subtitle={
          phase === 'seeding'
            ? "Describe the visual essence you want for your brand. What feelings should your logo evoke?"
            : phase === 'selecting'
            ? "Your logo has been selected! Review your choice or go back to evolve further."
            : `Generation ${currentGeneration + 1} of ${MAX_GENERATIONS}. Select ${isLastGeneration ? '1 logo to finalize' : '2 logos to evolve into the next generation'}.`
        }
      />

      <AnimatePresence mode="wait">
        {phase === 'seeding' && (
          <LogoSeeding key="seeding" onComplete={handleSeedingComplete} />
        )}

        {phase === 'evolving' && (
          <motion.div
            key="evolving"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Generation indicator */}
            <motion.div
              className="flex items-center justify-center gap-4 mb-8"
              initial={fadeUp.initial}
              animate={fadeUp.animate}
            >
              {Array.from({ length: MAX_GENERATIONS }, (_, i) => (
                <div
                  key={i}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                    ${i <= currentGeneration ? 'bg-accent text-white' : 'bg-surface-hover text-text-muted'}
                    ${i === currentGeneration ? 'ring-2 ring-accent ring-offset-2 ring-offset-background' : ''}
                  `}
                >
                  {i + 1}
                </div>
              ))}
            </motion.div>

            <LogoGrid
              logos={currentLogos}
              selectedIds={selectedLogos.map((l) => l.id)}
              onSelect={toggleLogoSelection}
              maxSelections={isLastGeneration ? 1 : 2}
            />

            {/* Action buttons */}
            <motion.div
              className="flex justify-center gap-4 mt-8"
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ delay: 0.3 }}
            >
              {!isLastGeneration && (
                <motion.button
                  onClick={handleEvolve}
                  disabled={!canEvolve}
                  className={`
                    px-8 py-3 rounded-xl font-medium
                    ${canEvolve
                      ? 'bg-gradient-to-r from-indigo to-pink text-white'
                      : 'bg-surface-hover text-text-muted cursor-not-allowed'}
                  `}
                  whileHover={canEvolve ? { scale: 1.02 } : {}}
                  whileTap={canEvolve ? { scale: 0.98 } : {}}
                >
                  Evolve Selected ({selectedLogos.length}/2)
                </motion.button>
              )}

              {isLastGeneration && (
                <motion.button
                  onClick={handleFinalize}
                  disabled={!canFinalize}
                  className={`
                    px-8 py-3 rounded-xl font-medium
                    ${canFinalize
                      ? 'bg-gradient-to-r from-emerald to-cyan text-white'
                      : 'bg-surface-hover text-text-muted cursor-not-allowed'}
                  `}
                  whileHover={canFinalize ? { scale: 1.02 } : {}}
                  whileTap={canFinalize ? { scale: 0.98 } : {}}
                >
                  Finalize Logo
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}

        {phase === 'transition' && (
          <EvolutionTransition
            key="transition"
            selectedLogos={selectedLogos}
            onComplete={handleEvolutionComplete}
          />
        )}

        {phase === 'selecting' && finalLogo && (
          <LogoHallOfFame
            key="selecting"
            finalLogo={finalLogo}
            generations={logoGenerations}
          />
        )}
      </AnimatePresence>

      <StepNavigation
        onBack={handleBack}
        onNext={handleNext}
        isNextDisabled={!finalLogo}
      />
    </div>
  );
}
