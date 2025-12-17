import { motion } from 'framer-motion';
import { Heart, RotateCcw, Check } from 'lucide-react';
import { GlowCard } from '@/components/ui/GlowCard';
import { staggerContainer, staggerItem, fadeUp } from '@/lib/motion';
import type { VisionStatement, SortedVision } from '@/types';

interface VisionResultsProps {
  lovedVisions: SortedVision[];
  selectedId?: string;
  onSelect: (statement: VisionStatement) => void;
  onReset: () => void;
}

export function VisionResults({
  lovedVisions,
  selectedId,
  onSelect,
  onReset,
}: VisionResultsProps) {
  return (
    <motion.div
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={fadeUp.transition}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink" />
          <h3 className="text-lg font-semibold text-text-primary">
            Your Loved Visions ({lovedVisions.length})
          </h3>
        </div>
        <motion.button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RotateCcw className="w-4 h-4" />
          Start Over
        </motion.button>
      </div>

      <p className="text-text-secondary mb-8">
        Select the vision that best represents your brand. This will guide your
        identity creation.
      </p>

      <motion.div
        className="grid gap-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {lovedVisions.map(({ statement }) => (
          <motion.div key={statement.id} variants={staggerItem}>
            <GlowCard
              selected={selectedId === statement.id}
              glowColor="rgba(236, 72, 153, 0.4)"
              onClick={() => onSelect(statement)}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                    ${selectedId === statement.id ? 'bg-pink text-white' : 'bg-surface-hover text-text-muted'}
                  `}
                >
                  {selectedId === statement.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Heart className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1">
                  <blockquote className="text-lg font-medium text-text-primary mb-2">
                    "{statement.vision}"
                  </blockquote>
                  <p className="text-sm text-text-secondary mb-3">
                    {statement.mission}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {statement.values.map((value) => (
                      <span
                        key={value}
                        className="px-2 py-0.5 text-xs rounded-full bg-surface-hover text-text-tertiary"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
