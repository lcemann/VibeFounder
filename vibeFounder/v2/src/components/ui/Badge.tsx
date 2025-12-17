import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { springs } from '@/lib/motion';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  animated?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  animated = false,
  className,
}: BadgeProps) {
  const variants = {
    default: 'bg-surface-hover text-text-secondary border-border',
    success: 'bg-emerald/10 text-emerald border-emerald/30',
    warning: 'bg-amber/10 text-amber border-amber/30',
    error: 'bg-red/10 text-red border-red/30',
    info: 'bg-cyan/10 text-cyan border-cyan/30',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  const Component = animated ? motion.span : 'span';

  return (
    <Component
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        variants[variant],
        sizes[size],
        className
      )}
      {...(animated
        ? {
            initial: { scale: 0, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0, opacity: 0 },
            transition: springs.bouncy,
          }
        : {})}
    >
      {children}
    </Component>
  );
}
