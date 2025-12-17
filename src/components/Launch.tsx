import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Rocket,
  Sparkles,
  Download,
  Share2,
  Copy,
  Check,
  ArrowRight,
} from 'lucide-react';
import { useWizardStore } from '@/stores/wizardStore';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { ParticleExplosion } from '@/components/effects/ParticleExplosion';
import { springs, fadeUp, staggerContainer, staggerItem } from '@/lib/motion';

export function Launch() {
  const navigate = useNavigate();
  const {
    selectedArchetype,
    selectedIndustries,
    favoriteVision,
    finalLogo,
    championName,
    resetWizard,
  } = useWizardStore();

  const [showCelebration, setShowCelebration] = useState(false);
  const [copied, setCopied] = useState(false);
  const [phase, setPhase] = useState<'countdown' | 'celebration' | 'summary'>('countdown');

  useEffect(() => {
    // Countdown sequence
    const timers = [
      setTimeout(() => setPhase('celebration'), 2000),
      setTimeout(() => {
        setShowCelebration(true);
        setPhase('summary');
      }, 3500),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleCopyBrandKit = () => {
    const brandKit = `
Brand: ${championName?.name || 'Your Brand'}
Tagline: ${championName?.tagline || ''}
Vision: ${favoriteVision?.vision || ''}
Archetype: ${selectedArchetype?.name || ''}
Industries: ${selectedIndustries.map(i => i.name).join(', ') || ''}
    `.trim();

    navigator.clipboard.writeText(brandKit);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartOver = () => {
    resetWizard();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <ParticleExplosion
        trigger={showCelebration}
        colors={['#6366F1', '#EC4899', '#F59E0B', '#10B981', '#06B6D4']}
        particleCount={50}
      />

      <AnimatePresence mode="wait">
        {/* Countdown Phase */}
        {phase === 'countdown' && (
          <motion.div
            key="countdown"
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
          >
            <motion.div
              className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-indigo to-pink flex items-center justify-center"
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 0 rgba(99, 102, 241, 0.4)',
                  '0 0 60px rgba(99, 102, 241, 0.6)',
                  '0 0 0 rgba(99, 102, 241, 0.4)',
                ],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Rocket className="w-16 h-16 text-white" />
            </motion.div>
            <motion.h1
              className="text-4xl font-display font-bold text-text-primary"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Preparing Launch...
            </motion.h1>
          </motion.div>
        )}

        {/* Celebration Phase */}
        {phase === 'celebration' && (
          <motion.div
            key="celebration"
            className="text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <motion.div
              className="text-8xl mb-6"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              &#x1F389;
            </motion.div>
            <h1 className="text-5xl font-display font-bold text-text-primary mb-4">
              Congratulations!
            </h1>
            <p className="text-xl text-text-secondary">
              Your brand is ready to take flight
            </p>
          </motion.div>
        )}

        {/* Summary Phase */}
        {phase === 'summary' && (
          <motion.div
            key="summary"
            className="max-w-4xl mx-auto px-6 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Header */}
            <motion.div
              className="text-center mb-12"
              initial={fadeUp.initial}
              animate={fadeUp.animate}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo/20 to-pink/20 text-accent mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={springs.bouncy}
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Brand Launch Complete</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-display font-bold text-text-primary mb-4">
                {championName?.name || 'Your Brand'}
              </h1>
              <p className="text-xl text-accent italic">
                "{championName?.tagline || favoriteVision?.mission}"
              </p>
            </motion.div>

            {/* Brand Summary Grid */}
            <motion.div
              className="grid md:grid-cols-2 gap-6 mb-12"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {/* Logo */}
              <motion.div
                className="p-6 rounded-2xl bg-surface border border-border"
                variants={staggerItem}
              >
                <h3 className="text-sm font-medium text-text-secondary mb-4">
                  Your Logo
                </h3>
                {finalLogo ? (
                  <div className="w-32 h-32 mx-auto rounded-2xl bg-surface-elevated border border-border overflow-hidden">
                    <img
                      src={finalLogo.url}
                      alt="Your logo"
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 mx-auto rounded-2xl bg-surface-hover flex items-center justify-center">
                    <span className="text-text-muted">No logo</span>
                  </div>
                )}
              </motion.div>

              {/* Vision */}
              <motion.div
                className="p-6 rounded-2xl bg-surface border border-border"
                variants={staggerItem}
              >
                <h3 className="text-sm font-medium text-text-secondary mb-4">
                  Your Vision
                </h3>
                <blockquote className="text-lg text-text-primary italic">
                  "{favoriteVision?.vision || 'Your vision here'}"
                </blockquote>
                <p className="mt-4 text-sm text-text-tertiary">
                  {favoriteVision?.mission}
                </p>
              </motion.div>

              {/* Founder Profile */}
              <motion.div
                className="p-6 rounded-2xl bg-surface border border-border"
                variants={staggerItem}
              >
                <h3 className="text-sm font-medium text-text-secondary mb-4">
                  Founder Archetype
                </h3>
                <div className="flex items-center gap-4">
                  <div
                    className={`
                      w-12 h-12 rounded-xl flex items-center justify-center
                      bg-gradient-to-br ${selectedArchetype?.gradient || 'from-indigo to-purple'}
                    `}
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">
                      {selectedArchetype?.name || 'Your Archetype'}
                    </p>
                    <p className="text-sm text-text-tertiary">
                      {selectedArchetype?.tagline}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Industry */}
              <motion.div
                className="p-6 rounded-2xl bg-surface border border-border"
                variants={staggerItem}
              >
                <h3 className="text-sm font-medium text-text-secondary mb-4">
                  {selectedIndustries.length > 1 ? 'Industries' : 'Industry'}
                </h3>
                <p className="text-lg font-semibold text-text-primary">
                  {selectedIndustries.map(i => i.name).join(', ') || 'Your Industry'}
                </p>
                <p className="text-sm text-text-tertiary mt-1">
                  {selectedIndustries[0]?.description}
                </p>
              </motion.div>
            </motion.div>

            {/* Actions */}
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <AnimatedButton variant="primary" size="lg">
                <Download className="w-5 h-5" />
                Download Brand Kit
              </AnimatedButton>
              <AnimatedButton variant="secondary" size="lg">
                <Share2 className="w-5 h-5" />
                Share
              </AnimatedButton>
              <AnimatedButton
                variant="secondary"
                size="lg"
                onClick={handleCopyBrandKit}
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Summary
                  </>
                )}
              </AnimatedButton>
            </motion.div>

            {/* Start Over */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <button
                onClick={handleStartOver}
                className="text-text-secondary hover:text-text-primary transition-colors inline-flex items-center gap-2"
              >
                Create another brand
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
    </div>
  );
}
