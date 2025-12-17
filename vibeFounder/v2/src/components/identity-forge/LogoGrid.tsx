import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { staggerContainer } from '@/lib/motion';
import type { Logo } from '@/types';

interface LogoGridProps {
  logos: Logo[];
  selectedIds: string[];
  onSelect: (logo: Logo) => void;
  maxSelections: number;
}

export function LogoGrid({
  logos,
  selectedIds,
  onSelect,
  maxSelections,
}: LogoGridProps) {
  const canSelect = (logoId: string) => {
    if (selectedIds.includes(logoId)) return true;
    return selectedIds.length < maxSelections;
  };

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 gap-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {logos.map((logo, index) => {
        const isSelected = selectedIds.includes(logo.id);
        const isDisabled = !canSelect(logo.id);

        return (
          <motion.div
            key={logo.id}
            variants={{
              initial: {
                opacity: 0,
                y: 30,
                scale: 0.8,
                rotate: ((index % 3) - 1) * 5,
              },
              animate: {
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
                transition: {
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: index * 0.08,
                },
              },
            }}
          >
            <motion.button
              onClick={() => !isDisabled && onSelect(logo)}
              disabled={isDisabled}
              className={`
                relative w-full aspect-square rounded-2xl overflow-hidden
                bg-surface border-2 transition-colors
                ${isSelected
                  ? 'border-accent shadow-lg shadow-accent/20'
                  : isDisabled
                  ? 'border-border opacity-50 cursor-not-allowed'
                  : 'border-border hover:border-border-hover cursor-pointer'}
              `}
              whileHover={!isDisabled ? { scale: 1.03, y: -4 } : {}}
              whileTap={!isDisabled ? { scale: 0.97 } : {}}
            >
              {/* Logo image */}
              <img
                src={logo.url}
                alt={`Logo option ${index + 1}`}
                className="w-full h-full object-contain p-6"
              />

              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-accent flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                >
                  <Check className="w-5 h-5 text-white" />
                </motion.div>
              )}

              {/* Glow effect on selection */}
              {isSelected && (
                <motion.div
                  className="absolute inset-0 bg-accent/10 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Traits badge */}
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 text-xs rounded bg-surface/90 text-text-secondary backdrop-blur-sm">
                    {logo.traits.style}
                  </span>
                  <span className="px-2 py-0.5 text-xs rounded bg-surface/90 text-text-secondary backdrop-blur-sm">
                    {logo.traits.symbolism}
                  </span>
                </div>
              </div>
            </motion.button>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
