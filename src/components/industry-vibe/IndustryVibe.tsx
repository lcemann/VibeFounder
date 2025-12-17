import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useWizardStore } from '@/stores/wizardStore';
import { StepHeader, StepNavigation } from '@/components/wizard';
import { IndustryGrid } from './IndustryGrid';
import { IndustrySearch } from './IndustrySearch';
import { industries } from '@/lib/data/industries';
import { fadeUp } from '@/lib/motion';

export function IndustryVibe() {
  const navigate = useNavigate();
  const {
    selectedIndustries,
    toggleIndustry,
    customIndustry,
    setCustomIndustry,
    completeStep,
  } = useWizardStore();

  const [searchQuery, setSearchQuery] = useState('');

  const handleIndustrySelect = (industryId: string) => {
    const industry = industries.find((i) => i.id === industryId);
    if (industry) {
      toggleIndustry(industry);
    }
  };

  const handleRemoveIndustry = (industryId: string) => {
    const industry = industries.find((i) => i.id === industryId);
    if (industry) {
      toggleIndustry(industry);
    }
  };

  const handleCustomIndustry = (value: string) => {
    setCustomIndustry(value);
  };

  const handleNext = () => {
    completeStep('industry-vibe');
    navigate('/create/vision-lab');
  };

  const handleBack = () => {
    navigate('/create/founder-vibe');
  };

  const filteredIndustries = searchQuery
    ? industries.filter(
        (i) =>
          i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.subIndustries.some((s) =>
            s.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : industries;

  const canProceed = selectedIndustries.length > 0 || customIndustry.trim().length >= 3;

  return (
    <div className="max-w-5xl mx-auto">
      <StepHeader
        step={2}
        title="Choose Your Arena"
        subtitle="Select the industries where you'll make your mark. You can choose multiple industries that your business spans."
      />

      <IndustrySearch
        value={searchQuery}
        onChange={setSearchQuery}
        customIndustry={customIndustry}
        onCustomIndustryChange={handleCustomIndustry}
      />

      <IndustryGrid
        industries={filteredIndustries}
        selectedIds={selectedIndustries.map((i) => i.id)}
        onSelect={handleIndustrySelect}
      />

      {selectedIndustries.length > 0 && (
        <motion.div
          className="mt-8 p-6 rounded-2xl bg-surface border border-accent/30"
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={fadeUp.transition}
        >
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Selected Industries ({selectedIndustries.length})
          </h3>
          <div className="flex flex-wrap gap-3">
            {selectedIndustries.map((industry) => (
              <motion.div
                key={industry.id}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                layout
              >
                <span className="font-medium">{industry.name}</span>
                <button
                  onClick={() => handleRemoveIndustry(industry.id)}
                  className="w-5 h-5 rounded-full bg-accent/30 hover:bg-accent/50 flex items-center justify-center transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <StepNavigation
        onBack={handleBack}
        onNext={handleNext}
        isNextDisabled={!canProceed}
      />
    </div>
  );
}
