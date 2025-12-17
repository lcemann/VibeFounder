import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import type { Archetype } from '@/types';
import { cn } from '@/lib/utils';

interface ArchetypeCardProps {
  archetype: Archetype;
}

export function ArchetypeCard({ archetype }: ArchetypeCardProps) {
  // Dynamically get the icon component
  const IconComponent = Icons[archetype.icon as keyof typeof Icons] as React.ComponentType<{
    className?: string;
  }>;

  return (
    <div className="space-y-4">
      {/* Icon */}
      <motion.div
        className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br',
          archetype.gradient
        )}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
      </motion.div>

      {/* Name and tagline */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-1">
          {archetype.name}
        </h3>
        <p className="text-sm text-text-secondary italic">"{archetype.tagline}"</p>
      </div>

      {/* Description */}
      <p className="text-sm text-text-secondary leading-relaxed">
        {archetype.description}
      </p>

      {/* Traits */}
      <div className="flex flex-wrap gap-2">
        {archetype.traits.map((trait) => (
          <span
            key={trait}
            className="px-2 py-0.5 text-xs rounded-full bg-surface-hover text-text-tertiary"
          >
            {trait}
          </span>
        ))}
      </div>
    </div>
  );
}
