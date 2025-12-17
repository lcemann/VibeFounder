import { motion } from 'framer-motion';
import { GlowCard } from '@/components/ui/GlowCard';
import { staggerContainer } from '@/lib/motion';
import type { Archetype } from '@/types';
import { ArchetypeCard } from './ArchetypeCard';

interface ArchetypeGridProps {
  archetypes: Archetype[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function ArchetypeGrid({
  archetypes,
  selectedId,
  onSelect,
}: ArchetypeGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {archetypes.map((archetype, index) => (
        <motion.div
          key={archetype.id}
          variants={{
            initial: {
              opacity: 0,
              y: 50,
              rotate: ((index % 3) - 1) * 3,
              scale: 0.8,
            },
            animate: {
              opacity: 1,
              y: 0,
              rotate: 0,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 200,
                damping: 20,
                delay: index * 0.08,
              },
            },
          }}
        >
          <GlowCard
            selected={selectedId === archetype.id}
            glowColor={archetype.glowColor}
            onClick={() => onSelect(archetype.id)}
          >
            <ArchetypeCard archetype={archetype} />
          </GlowCard>
        </motion.div>
      ))}
    </motion.div>
  );
}
