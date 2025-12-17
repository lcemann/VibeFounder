import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

interface StepHeaderProps {
  step: number;
  title: string;
  subtitle: string;
}

export function StepHeader({ step, title, subtitle }: StepHeaderProps) {
  return (
    <motion.div
      className="text-center mb-12"
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={fadeUp.transition}
    >
      <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider uppercase text-accent bg-accent/10 rounded-full">
        Step {step}
      </span>
      <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-4">
        {title}
      </h1>
      <p className="text-lg text-text-secondary max-w-2xl mx-auto">
        {subtitle}
      </p>
    </motion.div>
  );
}
