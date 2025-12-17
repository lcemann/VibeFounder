import { motion } from 'framer-motion';
import { Swords, Globe, X } from 'lucide-react';
import { GlowCard } from '@/components/ui/GlowCard';
import { fadeUp } from '@/lib/motion';
import type { NameMatchup as NameMatchupType } from '@/types';

interface NameMatchupProps {
  matchup: NameMatchupType;
  onSelectWinner: (winnerId: string) => void;
}

export function NameMatchup({ matchup, onSelectWinner }: NameMatchupProps) {
  return (
    <motion.div
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={fadeUp.transition}
    >
      <div className="grid md:grid-cols-2 gap-8 relative">
        {/* VS indicator - centered in grid */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.3 }}
        >
          <div className="w-14 h-14 rounded-full bg-surface-elevated border border-border flex items-center justify-center shadow-lg">
            <Swords className="w-6 h-6 text-amber" />
          </div>
        </motion.div>

        {/* Name 1 */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
        >
          <GlowCard
            glowColor="rgba(99, 102, 241, 0.4)"
            onClick={() => onSelectWinner(matchup.name1.id)}
            className="h-full cursor-pointer"
          >
            <NameCard name={matchup.name1} side="left" />
          </GlowCard>
        </motion.div>

        {/* Name 2 */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
        >
          <GlowCard
            glowColor="rgba(236, 72, 153, 0.4)"
            onClick={() => onSelectWinner(matchup.name2.id)}
            className="h-full cursor-pointer"
          >
            <NameCard name={matchup.name2} side="right" />
          </GlowCard>
        </motion.div>
      </div>

      <motion.p
        className="text-center text-sm text-text-muted mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Click on the name you prefer to advance it to the next round
      </motion.p>
    </motion.div>
  );
}

interface NameCardProps {
  name: {
    name: string;
    tagline: string;
    meaning: string;
    domainAvailable?: boolean;
  };
  side: 'left' | 'right';
}

function NameCard({ name, side }: NameCardProps) {
  return (
    <div className="text-center py-4">
      {/* Domain availability */}
      <div className="flex justify-center mb-4">
        <motion.div
          className={`
            inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs
            ${name.domainAvailable
              ? 'bg-emerald/20 text-emerald'
              : 'bg-surface-hover text-text-muted'}
          `}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: side === 'left' ? 0.3 : 0.4 }}
        >
          {name.domainAvailable ? (
            <>
              <Globe className="w-3 h-3" />
              Domain Available
            </>
          ) : (
            <>
              <X className="w-3 h-3" />
              Domain Taken
            </>
          )}
        </motion.div>
      </div>

      {/* Name */}
      <motion.h3
        className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-3"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: side === 'left' ? 0.2 : 0.3 }}
      >
        {name.name}
      </motion.h3>

      {/* Tagline */}
      <motion.p
        className="text-lg text-accent mb-4 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: side === 'left' ? 0.4 : 0.5 }}
      >
        "{name.tagline}"
      </motion.p>

      {/* Meaning */}
      <motion.p
        className="text-sm text-text-secondary max-w-xs mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: side === 'left' ? 0.5 : 0.6 }}
      >
        {name.meaning}
      </motion.p>
    </div>
  );
}
