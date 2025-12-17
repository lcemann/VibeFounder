import { motion } from 'framer-motion';
import { Crown, Download, Share2 } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/motion';
import type { Logo } from '@/types';

interface LogoHallOfFameProps {
  finalLogo: Logo;
  generations: Logo[][];
}

export function LogoHallOfFame({ finalLogo, generations }: LogoHallOfFameProps) {
  return (
    <motion.div
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={fadeUp.transition}
    >
      {/* Winner showcase */}
      <div className="text-center mb-12">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber/20 text-amber mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Crown className="w-4 h-4" />
          <span className="text-sm font-medium">Your Brand Identity</span>
        </motion.div>

        <motion.div
          className="relative w-64 h-64 mx-auto rounded-3xl bg-surface border-2 border-accent overflow-hidden shadow-2xl shadow-accent/20"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
        >
          <img
            src={finalLogo.url}
            alt="Your final logo"
            className="w-full h-full object-contain p-8"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent pointer-events-none"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-8">
          <AnimatedButton variant="secondary" size="sm">
            <Download className="w-4 h-4" />
            Download
          </AnimatedButton>
          <AnimatedButton variant="secondary" size="sm">
            <Share2 className="w-4 h-4" />
            Share
          </AnimatedButton>
        </div>
      </div>

      {/* Evolution timeline */}
      <div className="mt-16">
        <h3 className="text-lg font-semibold text-text-primary mb-6 text-center">
          Evolution Timeline
        </h3>

        <motion.div
          className="flex justify-center gap-8 overflow-x-auto pb-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {generations.map((gen, genIndex) => (
            <motion.div
              key={genIndex}
              className="flex-shrink-0"
              variants={staggerItem}
            >
              <div className="text-center mb-3">
                <span className="text-xs text-text-muted uppercase tracking-wider">
                  Gen {genIndex + 1}
                </span>
              </div>
              <div className="flex gap-2">
                {gen.slice(0, 3).map((logo, logoIndex) => (
                  <motion.div
                    key={logo.id}
                    className={`
                      w-16 h-16 rounded-xl bg-surface border overflow-hidden
                      ${logo.id === finalLogo.id ? 'border-accent ring-2 ring-accent' : 'border-border'}
                    `}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: genIndex * 0.1 + logoIndex * 0.05 }}
                  >
                    <img
                      src={logo.url}
                      alt=""
                      className="w-full h-full object-contain p-2"
                    />
                  </motion.div>
                ))}
                {gen.length > 3 && (
                  <div className="w-16 h-16 rounded-xl bg-surface-hover border border-border flex items-center justify-center text-text-muted text-sm">
                    +{gen.length - 3}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Connecting lines */}
        <div className="flex justify-center mt-4">
          {generations.slice(0, -1).map((_, i) => (
            <motion.div
              key={i}
              className="h-0.5 bg-gradient-to-r from-indigo to-pink mx-4"
              style={{ width: 80 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: i * 0.2 + 0.5 }}
            />
          ))}
        </div>
      </div>

      {/* Traits summary */}
      <motion.div
        className="mt-12 p-6 rounded-2xl bg-surface border border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h4 className="text-sm font-medium text-text-secondary mb-4">
          Logo Traits
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <span className="text-xs text-text-muted uppercase">Style</span>
            <p className="text-text-primary font-medium">{finalLogo.traits.style}</p>
          </div>
          <div>
            <span className="text-xs text-text-muted uppercase">Symbolism</span>
            <p className="text-text-primary font-medium">
              {finalLogo.traits.symbolism}
            </p>
          </div>
          <div>
            <span className="text-xs text-text-muted uppercase">Complexity</span>
            <p className="text-text-primary font-medium">
              {finalLogo.traits.complexity}/5
            </p>
          </div>
          <div>
            <span className="text-xs text-text-muted uppercase">Colors</span>
            <div className="flex gap-1 mt-1">
              {finalLogo.traits.colors.map((color, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border border-border"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
