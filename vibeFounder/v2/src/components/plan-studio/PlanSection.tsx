import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, MessageSquare } from 'lucide-react';
import { TextArea } from '@/components/ui/TextArea';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { springs } from '@/lib/motion';
import type { PlanSection as PlanSectionType } from '@/types';

interface PlanSectionProps {
  section: PlanSectionType;
  isExpanded: boolean;
  onToggle: () => void;
  onApprove: (approved: boolean, feedback?: string) => void;
  index: number;
}

export function PlanSection({
  section,
  isExpanded,
  onToggle,
  onApprove,
  index,
}: PlanSectionProps) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState(section.feedback || '');

  const handleApprove = () => {
    onApprove(true);
    setShowFeedback(false);
  };

  const handleRequestChanges = () => {
    if (feedback.trim()) {
      onApprove(false, feedback);
      setShowFeedback(false);
    }
  };

  return (
    <motion.div
      className={`
        rounded-2xl border overflow-hidden transition-colors
        ${section.approved
          ? 'bg-emerald/5 border-emerald/30'
          : 'bg-surface border-border hover:border-border-hover'}
      `}
      layout
    >
      {/* Header */}
      <motion.button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left"
        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
              ${section.approved
                ? 'bg-emerald text-white'
                : 'bg-surface-hover text-text-secondary'}
            `}
          >
            {section.approved ? <Check className="w-4 h-4" /> : index + 1}
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">{section.title}</h3>
            {section.approved && (
              <span className="text-xs text-emerald">Approved</span>
            )}
            {section.feedback && !section.approved && (
              <span className="text-xs text-amber">Changes requested</span>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={springs.snappy}
        >
          <ChevronDown className="w-5 h-5 text-text-muted" />
        </motion.div>
      </motion.button>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={springs.snappy}
          >
            <div className="px-4 pb-4 border-t border-border pt-4">
              {/* Markdown-style content */}
              <div className="prose prose-invert prose-sm max-w-none mb-6">
                {section.content.split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('**') && paragraph.includes(':**')) {
                    // Bold heading
                    const [heading, ...rest] = paragraph.split(':**');
                    return (
                      <div key={i} className="mb-3">
                        <h4 className="text-sm font-semibold text-text-primary mb-1">
                          {heading.replace(/\*\*/g, '')}
                        </h4>
                        <p className="text-text-secondary text-sm">{rest.join(':**')}</p>
                      </div>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    // List items
                    return (
                      <ul key={i} className="list-disc list-inside text-text-secondary text-sm space-y-1 mb-3">
                        {paragraph.split('\n').map((item, j) => (
                          <li key={j}>{item.replace(/^- /, '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  // Regular paragraph
                  return (
                    <p key={i} className="text-text-secondary text-sm mb-3">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Previous feedback */}
              {section.feedback && (
                <div className="mb-4 p-3 rounded-lg bg-amber/10 border border-amber/30">
                  <p className="text-sm text-amber">
                    <strong>Your feedback:</strong> {section.feedback}
                  </p>
                </div>
              )}

              {/* Feedback form */}
              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mb-4"
                  >
                    <TextArea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="What changes would you like to see?"
                      rows={3}
                      className="text-sm"
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <AnimatedButton
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowFeedback(false)}
                      >
                        Cancel
                      </AnimatedButton>
                      <AnimatedButton
                        variant="secondary"
                        size="sm"
                        onClick={handleRequestChanges}
                        disabled={!feedback.trim()}
                      >
                        Submit Feedback
                      </AnimatedButton>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              {!showFeedback && (
                <div className="flex justify-end gap-2">
                  <AnimatedButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFeedback(true)}
                  >
                    <MessageSquare className="w-4 h-4" />
                    Request Changes
                  </AnimatedButton>
                  <AnimatedButton
                    variant={section.approved ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={handleApprove}
                  >
                    {section.approved ? (
                      <>
                        <Check className="w-4 h-4" />
                        Approved
                      </>
                    ) : (
                      'Approve Section'
                    )}
                  </AnimatedButton>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
