import { motion } from 'framer-motion';
import { TextArea } from '@/components/ui/TextArea';
import { fadeUp } from '@/lib/motion';
import type { Archetype } from '@/types';

interface PersonalStatementProps {
  archetype: Archetype;
  value: string;
  onChange: (value: string) => void;
}

export function PersonalStatement({
  archetype,
  value,
  onChange,
}: PersonalStatementProps) {
  const placeholders: Record<string, string> = {
    visionary: "I see a future where technology empowers every individual to...",
    builder: "I'm driven to create systems that solve...",
    connector: "I believe the best solutions emerge when we bring together...",
    disruptor: "The industry is broken because... and I'm going to change it by...",
    analyst: "The data tells me that the real opportunity is in...",
    storyteller: "Every great product needs a story, and mine is about...",
  };

  return (
    <motion.div
      className="mt-12 p-8 rounded-2xl bg-surface border border-border"
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={{ ...fadeUp.transition, delay: 0.2 }}
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Make it personal
        </h3>
        <p className="text-text-secondary">
          As a <span className="text-accent font-medium">{archetype.name}</span>,
          share what drives you. What problem are you obsessed with solving?
        </p>
      </div>

      <TextArea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholders[archetype.id] || "Tell us what drives you..."}
        rows={4}
        className="text-base"
      />

      <div className="mt-3 flex justify-between text-sm">
        <span className="text-text-tertiary">
          {value.length < 20 ? (
            `${20 - value.length} more characters needed`
          ) : (
            <span className="text-emerald">Looking good!</span>
          )}
        </span>
        <span className="text-text-muted">{value.length} characters</span>
      </div>
    </motion.div>
  );
}
