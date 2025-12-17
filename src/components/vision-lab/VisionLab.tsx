import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWizardStore } from '@/stores/wizardStore';
import { StepHeader, StepNavigation } from '@/components/wizard';
import { VisionCard } from './VisionCard';
import { VisionBuckets } from './VisionBuckets';
import { VisionResults } from './VisionResults';
import { fadeUp } from '@/lib/motion';
import type { VisionStatement, VisionBucket, SortedVision } from '@/types';

// Mock vision statements - in production these would come from AI
const mockVisionStatements: VisionStatement[] = [
  {
    id: '1',
    vision: 'A world where every entrepreneur has access to enterprise-grade tools',
    mission: 'Democratizing business technology for the next generation of builders',
    values: ['Accessibility', 'Empowerment', 'Innovation'],
  },
  {
    id: '2',
    vision: 'Revolutionizing how people build and scale their ideas',
    mission: 'Making the journey from idea to impact as seamless as possible',
    values: ['Simplicity', 'Speed', 'Scale'],
  },
  {
    id: '3',
    vision: 'Creating the future of work, one founder at a time',
    mission: 'Empowering individuals to build businesses that change the world',
    values: ['Independence', 'Impact', 'Innovation'],
  },
  {
    id: '4',
    vision: 'Where ambition meets execution without compromise',
    mission: 'Bridging the gap between vision and reality for modern founders',
    values: ['Excellence', 'Determination', 'Results'],
  },
  {
    id: '5',
    vision: 'Unlocking human potential through intelligent automation',
    mission: 'Helping founders focus on what matters by handling everything else',
    values: ['Efficiency', 'Intelligence', 'Freedom'],
  },
];

export function VisionLab() {
  const navigate = useNavigate();
  const {
    visionStatements,
    setVisionStatements,
    sortedVisions,
    addSortedVision,
    favoriteVision,
    setFavoriteVision,
    resetVisionSort,
    completeStep,
  } = useWizardStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<'sorting' | 'selecting'>('sorting');

  // Initialize vision statements
  useEffect(() => {
    if (visionStatements.length === 0) {
      setVisionStatements(mockVisionStatements);
    }
  }, [visionStatements.length, setVisionStatements]);

  const currentStatement = visionStatements[currentIndex];
  const isComplete = currentIndex >= visionStatements.length;
  const lovedVisions = sortedVisions.filter((s) => s.bucket === 'love');

  const handleSort = useCallback(
    (bucket: VisionBucket) => {
      if (!currentStatement) return;

      const sorted: SortedVision = {
        statement: currentStatement,
        bucket,
      };
      addSortedVision(sorted);
      setCurrentIndex((prev) => prev + 1);
    },
    [currentStatement, addSortedVision]
  );

  const handleSelectFavorite = (statement: VisionStatement) => {
    setFavoriteVision(statement);
  };

  const handleNext = () => {
    completeStep('vision-lab');
    navigate('/create/identity-forge');
  };

  const handleBack = () => {
    navigate('/create/industry-vibe');
  };

  const handleReset = () => {
    resetVisionSort();
    setCurrentIndex(0);
    setPhase('sorting');
  };

  // Move to selection phase when sorting is complete
  useEffect(() => {
    if (isComplete && lovedVisions.length > 0 && phase === 'sorting') {
      setPhase('selecting');
    }
  }, [isComplete, lovedVisions.length, phase]);

  const canProceed = favoriteVision !== null;

  return (
    <div className="max-w-4xl mx-auto">
      <StepHeader
        step={3}
        title="Vision Lab"
        subtitle={
          phase === 'sorting'
            ? "Swipe through AI-generated vision statements. Love the ones that resonate, like the maybes, and pass on the rest."
            : "Select your favorite vision from the ones you loved. This will shape your brand identity."
        }
      />

      {phase === 'sorting' && !isComplete && (
        <>
          {/* Progress indicator */}
          <motion.div
            className="mb-8"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
          >
            <div className="flex items-center justify-between text-sm text-text-secondary mb-2">
              <span>
                {currentIndex + 1} of {visionStatements.length}
              </span>
              <span className="text-text-muted">
                {lovedVisions.length} loved
              </span>
            </div>
            <div className="h-1 bg-surface-elevated rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo to-pink"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentIndex) / visionStatements.length) * 100}%`,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 30 }}
              />
            </div>
          </motion.div>

          {/* Current vision card */}
          <div className="relative h-[400px] mb-8">
            <AnimatePresence mode="wait">
              {currentStatement && (
                <VisionCard
                  key={currentStatement.id}
                  statement={currentStatement}
                  onSort={handleSort}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Bucket indicators */}
          <VisionBuckets />
        </>
      )}

      {phase === 'sorting' && isComplete && lovedVisions.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xl text-text-secondary mb-6">
            You didn't love any visions. Want to try again?
          </p>
          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-xl bg-accent text-white font-medium"
          >
            Start Over
          </button>
        </motion.div>
      )}

      {phase === 'selecting' && (
        <VisionResults
          lovedVisions={lovedVisions}
          selectedId={favoriteVision?.id}
          onSelect={handleSelectFavorite}
          onReset={handleReset}
        />
      )}

      <StepNavigation
        onBack={handleBack}
        onNext={handleNext}
        isNextDisabled={!canProceed}
      />
    </div>
  );
}
