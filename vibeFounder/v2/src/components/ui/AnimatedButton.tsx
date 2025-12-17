import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { ReactNode } from 'react';
import { springs } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function AnimatedButton({
  children,
  loading,
  disabled,
  variant = 'primary',
  size = 'md',
  onClick,
  className,
  type = 'button',
}: AnimatedButtonProps) {
  const isDisabled = disabled || loading;

  const variants = {
    primary: 'bg-gradient-to-r from-indigo to-purple-500 text-white',
    secondary: 'bg-surface-elevated border border-border text-text-primary hover:border-border-hover',
    ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-hover',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      type={type}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className={cn(
        'relative overflow-hidden rounded-xl font-medium',
        variants[variant],
        sizes[size],
        isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className
      )}
      whileHover={isDisabled ? {} : { scale: 1.02 }}
      whileTap={isDisabled ? {} : { scale: 0.98 }}
      transition={springs.snappy}
    >
      {/* Shimmer effect on hover */}
      {variant === 'primary' && !isDisabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
          whileHover={{ translateX: '100%' }}
          transition={{ duration: 0.6 }}
        />
      )}

      {/* Content */}
      <span className="relative flex items-center justify-center gap-2">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Loader2 className="w-5 h-5 animate-spin" />
            </motion.span>
          ) : (
            <motion.span
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              {children}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}
