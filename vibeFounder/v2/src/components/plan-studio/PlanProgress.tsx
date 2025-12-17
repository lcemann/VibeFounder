import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

interface PlanProgressProps {
  approvedCount: number;
  totalCount: number;
}

export function PlanProgress({ approvedCount, totalCount }: PlanProgressProps) {
  const progress = totalCount > 0 ? (approvedCount / totalCount) * 100 : 0;

  return (
    <motion.div
      className="mb-8"
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={fadeUp.transition}
    >
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-text-secondary">Progress</span>
        <span className="text-text-primary font-medium">
          {approvedCount} of {totalCount} sections approved
        </span>
      </div>
      <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald to-cyan rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
      </div>
    </motion.div>
  );
}
