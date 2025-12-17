import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Palette, Type, FileText, ChevronRight, Check } from 'lucide-react';
import { useWizardStore } from '@/stores/wizardStore';
import { StepHeader, StepNavigation } from '@/components/wizard';
import { staggerContainer, staggerItem } from '@/lib/motion';

interface SectionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'completed';
  onClick: () => void;
}

function SectionCard({ icon, title, description, status, onClick }: SectionCardProps) {
  return (
    <motion.button
      variants={staggerItem}
      onClick={onClick}
      className="w-full p-6 rounded-2xl bg-surface border border-border hover:border-accent/50 transition-colors text-left group"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-center gap-4">
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center
          ${status === 'completed' ? 'bg-emerald/20 text-emerald' : 'bg-surface-hover text-text-secondary'}
        `}>
          {status === 'completed' ? <Check className="w-6 h-6" /> : icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary mb-1">{title}</h3>
          <p className="text-sm text-text-tertiary">{description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" />
      </div>
    </motion.button>
  );
}

interface StatusItemProps {
  label: string;
  value: string;
  hasValue: boolean;
}

function StatusItem({ label, value, hasValue }: StatusItemProps) {
  return (
    <div className="p-4 rounded-xl bg-surface border border-border">
      <p className="text-xs text-text-muted mb-1">{label}</p>
      <p className={`font-medium ${hasValue ? 'text-text-primary' : 'text-text-tertiary'}`}>
        {value}
      </p>
    </div>
  );
}

export function IdentityForge() {
  const navigate = useNavigate();
  const { finalLogo, championName, businessPlan, completeStep } = useWizardStore();

  const handleNext = () => {
    completeStep('identity-forge');
    navigate('/launch');
  };

  const handleBack = () => {
    navigate('/create/vision-lab');
  };

  // Determine status for each section
  const logoStatus = finalLogo ? 'completed' : 'not_started';
  const nameStatus = championName ? 'completed' : 'not_started';

  // Check if all business plan sections are approved
  const allSectionsApproved = businessPlan?.sections?.length
    ? businessPlan.sections.every(s => s.approved)
    : false;
  const planStatus = allSectionsApproved ? 'completed' : businessPlan ? 'in_progress' : 'not_started';

  // Can proceed when all sections are complete
  const canProceed = finalLogo !== null && championName !== null;

  return (
    <div className="max-w-3xl mx-auto">
      <StepHeader
        step={4}
        title="Identity Forge"
        subtitle="Complete each section to build your brand identity. Your logo, name, and business plan will form the foundation of your startup."
      />

      <motion.div
        className="space-y-4 mb-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <SectionCard
          icon={<Palette className="w-6 h-6" />}
          title="Logo Evolution Lab"
          description="Evolve your logo through generations of AI-powered design"
          status={logoStatus}
          onClick={() => navigate('/create/identity-forge/logo')}
        />

        <SectionCard
          icon={<Type className="w-6 h-6" />}
          title="Name Arena"
          description="Find the perfect name through head-to-head matchups"
          status={nameStatus}
          onClick={() => navigate('/create/identity-forge/name')}
        />

        <SectionCard
          icon={<FileText className="w-6 h-6" />}
          title="Business Plan Studio"
          description="Craft a compelling business narrative section by section"
          status={planStatus}
          onClick={() => navigate('/create/identity-forge/plan')}
        />
      </motion.div>

      {/* Status Summary */}
      <motion.div
        className="p-6 rounded-2xl bg-surface-elevated border border-border mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-text-primary mb-4">Your Brand Identity</h3>
        <div className="grid grid-cols-3 gap-4">
          <StatusItem
            label="Logo"
            value={finalLogo ? 'Selected' : 'Not selected'}
            hasValue={!!finalLogo}
          />
          <StatusItem
            label="Name"
            value={championName?.name || 'Not selected'}
            hasValue={!!championName}
          />
          <StatusItem
            label="Business Plan"
            value={planStatus === 'completed' ? 'Completed' : planStatus === 'in_progress' ? 'In progress' : 'Not started'}
            hasValue={planStatus !== 'not_started'}
          />
        </div>
      </motion.div>

      <StepNavigation
        onBack={handleBack}
        onNext={handleNext}
        isNextDisabled={!canProceed}
        nextLabel="Launch"
      />
    </div>
  );
}
