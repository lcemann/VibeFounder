import { motion, useAnimation, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { useState, useCallback } from 'react';
import { Heart, ThumbsUp, X } from 'lucide-react';
import type { VisionStatement, VisionBucket } from '@/types';

// Fast spring for card animations
const fastSpring = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 35,
};

interface VisionCardProps {
  statement: VisionStatement;
  onSort: (bucket: VisionBucket) => void;
}

export function VisionCard({ statement, onSort }: VisionCardProps) {
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform x position to rotation and opacity
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  const loveOpacity = useTransform(x, [0, 100, 200], [0, 0.5, 1]);
  const passOpacity = useTransform(x, [-200, -100, 0], [1, 0.5, 0]);
  const likeOpacity = useTransform(y, [-200, -100, 0], [1, 0.5, 0]);

  const handleDragEnd = useCallback(
    async (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false);

      const threshold = 100;
      const { offset, velocity } = info;

      // Determine bucket based on drag direction
      let bucket: VisionBucket | null = null;

      if (offset.x > threshold || velocity.x > 500) {
        bucket = 'love';
      } else if (offset.x < -threshold || velocity.x < -500) {
        bucket = 'pass';
      } else if (offset.y < -threshold || velocity.y < -500) {
        bucket = 'like';
      }

      if (bucket) {
        // Animate card flying away
        const flyDistance = 500;
        const targetX =
          bucket === 'love' ? flyDistance : bucket === 'pass' ? -flyDistance : 0;
        const targetY = bucket === 'like' ? -flyDistance : 0;

        await controls.start({
          x: targetX,
          y: targetY,
          rotate: bucket === 'love' ? 20 : bucket === 'pass' ? -20 : 0,
          opacity: 0,
          scale: 0.8,
          transition: {
            type: 'spring',
            stiffness: 600,
            damping: 30,
          },
        });

        onSort(bucket);
      } else {
        // Spring back to center
        await controls.start({
          x: 0,
          y: 0,
          rotate: 0,
          transition: fastSpring,
        });
      }
    },
    [controls, onSort]
  );

  const handleQuickAction = async (bucket: VisionBucket) => {
    const flyDistance = 500;
    const targetX =
      bucket === 'love' ? flyDistance : bucket === 'pass' ? -flyDistance : 0;
    const targetY = bucket === 'like' ? -flyDistance : 0;

    await controls.start({
      x: targetX,
      y: targetY,
      rotate: bucket === 'love' ? 20 : bucket === 'pass' ? -20 : 0,
      opacity: 0,
      scale: 0.8,
      transition: {
        type: 'spring',
        stiffness: 600,
        damping: 30,
      },
    });

    onSort(bucket);
  };

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      {/* Card */}
      <motion.div
        drag
        dragElastic={0.1}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x, y, rotate }}
        className={`
          w-full max-w-md p-8 bg-surface rounded-3xl border
          cursor-grab active:cursor-grabbing
          ${isDragging ? 'border-accent shadow-xl z-50' : 'border-border shadow-lg'}
        `}
      >
        {/* Action indicators */}
        <motion.div
          className="absolute top-4 right-4 px-4 py-2 rounded-full bg-pink/20 text-pink font-bold"
          style={{ opacity: loveOpacity }}
        >
          LOVE
        </motion.div>
        <motion.div
          className="absolute top-4 left-4 px-4 py-2 rounded-full bg-red/20 text-red font-bold"
          style={{ opacity: passOpacity }}
        >
          PASS
        </motion.div>
        <motion.div
          className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-amber/20 text-amber font-bold"
          style={{ opacity: likeOpacity }}
        >
          LIKE
        </motion.div>

        {/* Content */}
        <div className="space-y-6">
          <blockquote className="text-2xl font-display font-semibold text-text-primary leading-tight">
            "{statement.vision}"
          </blockquote>

          <div className="space-y-2">
            <p className="text-sm text-text-tertiary uppercase tracking-wider">
              Mission
            </p>
            <p className="text-text-secondary">{statement.mission}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {statement.values.map((value) => (
              <span
                key={value}
                className="px-3 py-1 text-sm rounded-full bg-surface-hover text-text-secondary"
              >
                {value}
              </span>
            ))}
          </div>
        </div>

        {/* Drag hint */}
        <p className="mt-8 text-center text-sm text-text-muted">
          Drag to sort or use buttons below
        </p>
      </motion.div>

      {/* Quick action buttons */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <motion.button
          onClick={() => handleQuickAction('pass')}
          className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center text-red hover:bg-red/10 hover:border-red/30 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-6 h-6" />
        </motion.button>
        <motion.button
          onClick={() => handleQuickAction('like')}
          className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center text-amber hover:bg-amber/10 hover:border-amber/30 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ThumbsUp className="w-6 h-6" />
        </motion.button>
        <motion.button
          onClick={() => handleQuickAction('love')}
          className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center text-pink hover:bg-pink/10 hover:border-pink/30 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className="w-6 h-6" />
        </motion.button>
      </div>
    </motion.div>
  );
}
