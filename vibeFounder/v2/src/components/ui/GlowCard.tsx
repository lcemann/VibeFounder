import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { springs } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  glowColor?: string;
  onClick?: () => void;
  className?: string;
}

export function GlowCard({
  children,
  selected,
  disabled,
  glowColor = 'rgba(99, 102, 241, 0.4)',
  onClick,
  className,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    mouseX.set(ref.current.offsetWidth / 2);
    mouseY.set(ref.current.offsetHeight / 2);
  };

  const spotlightBackground = useTransform(
    [springX, springY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}px ${y}px, ${glowColor}, transparent 40%)`
  );

  return (
    <motion.div
      ref={ref}
      onClick={disabled ? undefined : onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative overflow-hidden rounded-2xl group',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className
      )}
      whileHover={disabled ? {} : { scale: 1.02, y: -4 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={springs.snappy}
    >
      {/* Spotlight glow layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: spotlightBackground,
        }}
      />

      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0"
        style={{
          background: `linear-gradient(135deg, ${glowColor}, transparent)`,
          filter: 'blur(20px)',
        }}
        animate={selected ? { opacity: 0.5 } : {}}
        whileHover={{ opacity: 0.3 }}
        transition={{ duration: 0.3 }}
      />

      {/* Card content */}
      <div
        className={cn(
          'relative bg-surface border rounded-2xl p-6 transition-colors duration-300',
          selected
            ? 'border-accent bg-surface-elevated'
            : 'border-border hover:border-border-hover'
        )}
      >
        {children}
      </div>

      {/* Selected ring animation */}
      {selected && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            border: `2px solid ${glowColor}`,
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </motion.div>
  );
}
