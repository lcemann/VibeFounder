import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Logo } from '@/types';

interface EvolutionTransitionProps {
  selectedLogos: Logo[];
  onComplete: () => void;
}

type Phase = 'gathering' | 'connecting' | 'exploding' | 'revealing';

export function EvolutionTransition({
  selectedLogos,
  onComplete,
}: EvolutionTransitionProps) {
  const [phase, setPhase] = useState<Phase>('gathering');

  useEffect(() => {
    const sequence = async () => {
      // Phase 1: Gather
      await new Promise((r) => setTimeout(r, 800));
      setPhase('connecting');

      // Phase 2: Connect
      await new Promise((r) => setTimeout(r, 1000));
      setPhase('exploding');

      // Phase 3: Explode
      await new Promise((r) => setTimeout(r, 600));
      setPhase('revealing');

      // Phase 4: Reveal
      await new Promise((r) => setTimeout(r, 400));
      onComplete();
    };

    sequence();
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-background/90 backdrop-blur-md z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-[400px] h-[400px]">
        <AnimatePresence mode="wait">
          {(phase === 'gathering' || phase === 'connecting') && (
            <motion.div
              key="gather"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Selected logos gathering */}
              {selectedLogos.map((logo, i) => {
                const angle = (i / selectedLogos.length) * Math.PI * 2 - Math.PI / 2;
                const gatherRadius = phase === 'gathering' ? 120 : 60;

                return (
                  <motion.div
                    key={logo.id}
                    className="absolute w-24 h-24 rounded-2xl bg-surface border border-border overflow-hidden"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    initial={{
                      x: Math.cos(angle) * 250 - 48,
                      y: Math.sin(angle) * 250 - 48,
                      opacity: 0,
                      scale: 0.5,
                    }}
                    animate={{
                      x: Math.cos(angle) * gatherRadius - 48,
                      y: Math.sin(angle) * gatherRadius - 48,
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 100,
                      damping: 15,
                      delay: i * 0.1,
                    }}
                  >
                    <img
                      src={logo.url}
                      alt=""
                      className="w-full h-full object-contain p-2"
                    />
                  </motion.div>
                );
              })}

              {/* DNA Connection lines */}
              {phase === 'connecting' && (
                <svg
                  className="absolute inset-0 w-full h-full"
                  style={{ overflow: 'visible' }}
                >
                  <defs>
                    <linearGradient id="dna-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                  {selectedLogos.map((_, i) => {
                    if (i === selectedLogos.length - 1) return null;
                    const angle1 = (i / selectedLogos.length) * Math.PI * 2 - Math.PI / 2;
                    const angle2 =
                      ((i + 1) / selectedLogos.length) * Math.PI * 2 - Math.PI / 2;
                    const radius = 60;

                    return (
                      <motion.line
                        key={i}
                        x1={200 + Math.cos(angle1) * radius}
                        y1={200 + Math.sin(angle1) * radius}
                        x2={200 + Math.cos(angle2) * radius}
                        y2={200 + Math.sin(angle2) * radius}
                        stroke="url(#dna-grad)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: i * 0.2 }}
                      />
                    );
                  })}
                  {/* Center connection */}
                  {selectedLogos.map((_, i) => {
                    const angle = (i / selectedLogos.length) * Math.PI * 2 - Math.PI / 2;
                    const radius = 60;

                    return (
                      <motion.line
                        key={`center-${i}`}
                        x1={200}
                        y1={200}
                        x2={200 + Math.cos(angle) * radius}
                        y2={200 + Math.sin(angle) * radius}
                        stroke="url(#dna-grad)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.5 }}
                        transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                      />
                    );
                  })}
                </svg>
              )}

              {/* Center glow */}
              {phase === 'connecting' && (
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(99, 102, 241, 0.6), transparent)',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
          )}

          {phase === 'exploding' && (
            <motion.div
              key="explode"
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Explosion particles */}
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i / 24) * Math.PI * 2;
                const distance = 100 + Math.random() * 100;
                const colors = ['#6366F1', '#EC4899', '#F59E0B', '#10B981'];

                return (
                  <motion.div
                    key={i}
                    className="absolute left-1/2 top-1/2 w-4 h-4 rounded-full"
                    style={{
                      background: colors[i % colors.length],
                      marginLeft: -8,
                      marginTop: -8,
                    }}
                    initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                    animate={{
                      x: Math.cos(angle) * distance,
                      y: Math.sin(angle) * distance,
                      scale: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: 'easeOut',
                      delay: i * 0.02,
                    }}
                  />
                );
              })}

              {/* Central flash */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent)',
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          )}

          {phase === 'revealing' && (
            <motion.div
              key="reveal"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div className="text-center">
                <motion.div
                  className="text-4xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  &#x2728;
                </motion.div>
                <h3 className="text-2xl font-display font-bold text-text-primary">
                  Evolving...
                </h3>
                <p className="text-text-secondary mt-2">
                  Creating next generation
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
