import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { fadeUp } from '@/lib/motion';

interface StepNavigationProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  backLabel?: string;
  isNextDisabled?: boolean;
  isLoading?: boolean;
  showBack?: boolean;
}

export function StepNavigation({
  onBack,
  onNext,
  nextLabel = 'Continue',
  backLabel = 'Back',
  isNextDisabled = false,
  isLoading = false,
  showBack = true,
}: StepNavigationProps) {
  return (
    <motion.div
      className="flex justify-between items-center mt-12 pt-8 border-t border-border"
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={{ ...fadeUp.transition, delay: 0.3 }}
    >
      {showBack && onBack ? (
        <AnimatedButton variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </AnimatedButton>
      ) : (
        <div />
      )}

      {onNext && (
        <AnimatedButton
          onClick={onNext}
          disabled={isNextDisabled}
          loading={isLoading}
        >
          {nextLabel}
          <ArrowRight className="w-4 h-4" />
        </AnimatedButton>
      )}
    </motion.div>
  );
}
