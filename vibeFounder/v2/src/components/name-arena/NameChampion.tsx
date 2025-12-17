import { motion } from 'framer-motion';
import { Trophy, Sparkles, Globe, Check } from 'lucide-react';
import { ParticleExplosion } from '@/components/effects/ParticleExplosion';
import { useState, useEffect } from 'react';
import type { BrandName } from '@/types';

interface NameChampionProps {
  name: BrandName;
}

export function NameChampion({ name }: NameChampionProps) {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowParticles(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="relative text-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ParticleExplosion
        trigger={showParticles}
        colors={['#6366F1', '#EC4899', '#F59E0B', '#10B981']}
        particleCount={30}
      />

      {/* Trophy icon */}
      <motion.div
        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber to-yellow-400 mb-6"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
      >
        <Trophy className="w-10 h-10 text-white" />
      </motion.div>

      {/* Champion badge */}
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber/20 text-amber mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-medium">Champion</span>
      </motion.div>

      {/* Name reveal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.5 }}
      >
        <h2 className="text-6xl md:text-7xl font-display font-bold text-text-primary mb-4">
          {name.name}
        </h2>
        <p className="text-xl text-accent italic mb-6">"{name.tagline}"</p>
      </motion.div>

      {/* Domain status */}
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {name.domainAvailable ? (
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald/20 text-emerald">
            <Globe className="w-5 h-5" />
            <span className="font-medium">{name.name.toLowerCase()}.com is available!</span>
            <Check className="w-5 h-5" />
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-hover text-text-secondary">
            <Globe className="w-5 h-5" />
            <span>Consider alternative domains like {name.name.toLowerCase()}.io</span>
          </div>
        )}
      </motion.div>

      {/* Meaning */}
      <motion.div
        className="max-w-md mx-auto p-6 rounded-2xl bg-surface border border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <h4 className="text-sm font-medium text-text-secondary mb-2">
          What it means
        </h4>
        <p className="text-text-primary">{name.meaning}</p>
      </motion.div>

      {/* Celebration text */}
      <motion.p
        className="mt-8 text-lg text-text-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        Your brand identity is coming together beautifully!
      </motion.p>
    </motion.div>
  );
}
