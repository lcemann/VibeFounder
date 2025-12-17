import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { fadeUp } from '@/lib/motion';

interface IndustrySearchProps {
  value: string;
  onChange: (value: string) => void;
  customIndustry: string;
  onCustomIndustryChange: (value: string) => void;
}

export function IndustrySearch({
  value,
  onChange,
  customIndustry,
  onCustomIndustryChange,
}: IndustrySearchProps) {
  return (
    <motion.div
      className="mb-8 space-y-4"
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={{ ...fadeUp.transition, delay: 0.1 }}
    >
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search industries..."
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-surface-elevated border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-sm text-text-muted">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <Input
        value={customIndustry}
        onChange={(e) => onCustomIndustryChange(e.target.value)}
        placeholder="Enter a custom industry (e.g., 'Space Tourism')"
        label="Building something unique?"
      />
    </motion.div>
  );
}
