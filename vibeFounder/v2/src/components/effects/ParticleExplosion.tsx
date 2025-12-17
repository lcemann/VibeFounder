import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  distance: number;
}

interface ParticleExplosionProps {
  trigger: boolean;
  colors?: string[];
  particleCount?: number;
  onComplete?: () => void;
}

export function ParticleExplosion({
  trigger,
  colors = ['#6366F1', '#EC4899', '#F59E0B', '#10B981', '#06B6D4'],
  particleCount = 20,
  onComplete,
}: ParticleExplosionProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (trigger) {
      const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: 0,
        y: 0,
        color: colors[i % colors.length],
        size: 4 + Math.random() * 8,
        angle: (i / particleCount) * Math.PI * 2,
        distance: 100 + Math.random() * 150,
      }));
      setParticles(newParticles);

      const timeout = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [trigger, colors, particleCount, onComplete]);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              background: particle.color,
            }}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{
              x: Math.cos(particle.angle) * particle.distance,
              y: Math.sin(particle.angle) * particle.distance,
              scale: 0,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
