import { motion } from 'framer-motion';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useWizardStore } from '@/stores/wizardStore';
import { WizardProgress } from './WizardProgress';
import { pageTransition } from '@/lib/motion';
import type { WizardStep } from '@/types';

const STEPS: { id: WizardStep; label: string; path: string }[] = [
  { id: 'founder-vibe', label: 'Founder Vibe', path: '/create/founder-vibe' },
  { id: 'industry-vibe', label: 'Industry', path: '/create/industry-vibe' },
  { id: 'vision-lab', label: 'Vision', path: '/create/vision-lab' },
  { id: 'identity-forge', label: 'Identity', path: '/create/identity-forge' },
  { id: 'name-arena', label: 'Name', path: '/create/name-arena' },
  { id: 'plan-studio', label: 'Plan', path: '/create/plan-studio' },
];

export function WizardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { completedSteps, canNavigateToStep, setCurrentStep } = useWizardStore();

  const currentStepIndex = STEPS.findIndex(
    (s) => location.pathname === s.path || (location.pathname === '/create' && s.id === 'founder-vibe')
  );

  const handleStepClick = (step: typeof STEPS[number]) => {
    if (canNavigateToStep(step.id)) {
      setCurrentStep(step.id);
      navigate(step.path);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.a
              href="/"
              className="font-display text-xl font-bold text-text-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              VibeFounder
            </motion.a>
            <WizardProgress
              steps={STEPS}
              currentIndex={currentStepIndex}
              completedSteps={completedSteps}
              onStepClick={handleStepClick}
              canNavigateToStep={canNavigateToStep}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 min-h-screen">
        <motion.div
          key={location.pathname}
          {...pageTransition}
          className="max-w-6xl mx-auto px-6"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}
