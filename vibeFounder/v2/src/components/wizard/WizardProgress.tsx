import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { springs } from '@/lib/motion';
import type { WizardStep } from '@/types';

interface Step {
  id: WizardStep;
  label: string;
  path: string;
}

interface WizardProgressProps {
  steps: Step[];
  currentIndex: number;
  completedSteps: WizardStep[];
  onStepClick: (step: Step) => void;
  canNavigateToStep: (step: WizardStep) => boolean;
}

export function WizardProgress({
  steps,
  currentIndex,
  completedSteps,
  onStepClick,
  canNavigateToStep,
}: WizardProgressProps) {
  return (
    <nav className="flex items-center gap-2">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.id);
        const isCurrent = index === currentIndex;
        const isClickable = canNavigateToStep(step.id);

        return (
          <motion.button
            key={step.id}
            onClick={() => onStepClick(step)}
            disabled={!isClickable}
            className={cn(
              'relative flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
              isClickable ? 'cursor-pointer' : 'cursor-not-allowed',
              isCurrent
                ? 'bg-accent/20 text-accent'
                : isCompleted
                ? 'text-text-secondary hover:text-text-primary'
                : 'text-text-muted'
            )}
            whileHover={isClickable ? { scale: 1.02 } : {}}
            whileTap={isClickable ? { scale: 0.98 } : {}}
            transition={springs.snappy}
          >
            {/* Step number or check */}
            <span
              className={cn(
                'flex items-center justify-center w-5 h-5 rounded-full text-xs',
                isCurrent
                  ? 'bg-accent text-white'
                  : isCompleted
                  ? 'bg-emerald text-white'
                  : 'bg-surface-hover text-text-muted'
              )}
            >
              {isCompleted ? (
                <Check className="w-3 h-3" />
              ) : (
                index + 1
              )}
            </span>

            {/* Label - only show on larger screens */}
            <span className="hidden md:inline">{step.label}</span>

            {/* Active indicator */}
            {isCurrent && (
              <motion.div
                layoutId="activeStep"
                className="absolute inset-0 bg-accent/10 rounded-full -z-10"
                transition={springs.snappy}
              />
            )}
          </motion.button>
        );
      })}
    </nav>
  );
}
