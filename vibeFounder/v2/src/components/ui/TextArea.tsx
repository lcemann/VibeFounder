import { motion } from 'framer-motion';
import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}
        <motion.div
          initial={false}
          animate={error ? { x: [0, -4, 4, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <textarea
            ref={ref}
            className={cn(
              'w-full px-4 py-3 rounded-xl bg-surface-elevated border transition-all duration-200',
              'text-text-primary placeholder:text-text-muted resize-none',
              'focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent',
              error
                ? 'border-red focus:ring-red/30 focus:border-red'
                : 'border-border hover:border-border-hover',
              className
            )}
            {...props}
          />
        </motion.div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
