import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { GlowCard } from '@/components/ui/GlowCard';
import { staggerContainer } from '@/lib/motion';
import type { Industry } from '@/types';

interface IndustryGridProps {
  industries: Industry[];
  selectedIds: string[];
  onSelect: (id: string) => void;
}

const glowColors: Record<string, string> = {
  tech: 'rgba(99, 102, 241, 0.4)',
  fintech: 'rgba(16, 185, 129, 0.4)',
  health: 'rgba(236, 72, 153, 0.4)',
  education: 'rgba(139, 92, 246, 0.4)',
  ecommerce: 'rgba(245, 158, 11, 0.4)',
  sustainability: 'rgba(34, 211, 153, 0.4)',
  media: 'rgba(239, 68, 68, 0.4)',
  realestate: 'rgba(6, 182, 212, 0.4)',
  food: 'rgba(251, 191, 36, 0.4)',
};

export function IndustryGrid({
  industries,
  selectedIds,
  onSelect,
}: IndustryGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {industries.map((industry, index) => {
        const IconComponent = Icons[industry.icon as keyof typeof Icons] as React.ComponentType<{
          className?: string;
        }>;

        return (
          <motion.div
            key={industry.id}
            variants={{
              initial: { opacity: 0, y: 30, scale: 0.95 },
              animate: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: index * 0.05,
                },
              },
            }}
          >
            <GlowCard
              selected={selectedIds.includes(industry.id)}
              glowColor={glowColors[industry.id] || 'rgba(99, 102, 241, 0.4)'}
              onClick={() => onSelect(industry.id)}
              className="h-full"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-hover flex items-center justify-center flex-shrink-0">
                  {IconComponent && (
                    <IconComponent className="w-5 h-5 text-text-secondary" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">
                    {industry.name}
                  </h3>
                  <p className="text-sm text-text-tertiary line-clamp-2">
                    {industry.description}
                  </p>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
