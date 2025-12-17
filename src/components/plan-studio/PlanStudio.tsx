import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWizardStore } from '@/stores/wizardStore';
import { StepHeader, StepNavigation } from '@/components/wizard';
import { PlanSection } from './PlanSection';
import { PlanProgress } from './PlanProgress';
import { staggerContainer, staggerItem } from '@/lib/motion';
import type { BusinessPlan } from '@/types';

// Mock business plan - in production this would come from AI
const generateMockPlan = (): BusinessPlan => ({
  id: 'plan-1',
  overallApproved: false,
  sections: [
    {
      id: 'executive-summary',
      title: 'Executive Summary',
      content: `Your company represents a bold vision to transform how entrepreneurs build and scale their businesses. By combining cutting-edge AI technology with human-centered design, you're positioned to capture a significant share of the rapidly growing startup enablement market.

Key highlights:
- Target market of 500M+ global entrepreneurs
- AI-powered brand identity and business planning
- Unique "vibe-based" approach to founder matching
- Projected $10M ARR within 24 months`,
      approved: false,
    },
    {
      id: 'problem-solution',
      title: 'Problem & Solution',
      content: `**The Problem:**
Most entrepreneurs struggle with the foundational elements of building a brand. They lack access to professional brand strategists, designers, and business planners. The result is inconsistent branding, unclear positioning, and wasted resources.

**Our Solution:**
An AI-powered platform that guides founders through a comprehensive brand-building journey. From discovering their founder archetype to generating logos, names, and business plans - all personalized to their unique vision and industry.`,
      approved: false,
    },
    {
      id: 'market-analysis',
      title: 'Market Analysis',
      content: `**Total Addressable Market (TAM):** $50B
The global entrepreneurship market continues to grow, with 305 million startups created annually.

**Serviceable Addressable Market (SAM):** $5B
Digital-first founders seeking brand and business planning tools.

**Serviceable Obtainable Market (SOM):** $500M
Early adopters willing to use AI-powered brand creation tools.

**Key Trends:**
- 70% increase in solo entrepreneurship
- Growing acceptance of AI tools
- Shift toward personal branding`,
      approved: false,
    },
    {
      id: 'business-model',
      title: 'Business Model',
      content: `**Revenue Streams:**

1. **Freemium Tier** - Basic brand discovery (free)
   - Founder archetype quiz
   - Limited vision exploration

2. **Pro Tier** - $49/month
   - Full logo evolution
   - Name generation
   - Business plan creation

3. **Enterprise** - Custom pricing
   - White-label solutions
   - API access
   - Volume licensing

**Unit Economics:**
- CAC: $45
- LTV: $580
- LTV/CAC Ratio: 12.9x`,
      approved: false,
    },
    {
      id: 'go-to-market',
      title: 'Go-to-Market Strategy',
      content: `**Phase 1: Launch (Months 1-3)**
- Product Hunt launch
- Indie hacker community engagement
- Content marketing (founder stories)

**Phase 2: Growth (Months 4-8)**
- SEO optimization
- Partnership with accelerators
- Referral program launch

**Phase 3: Scale (Months 9-12)**
- Paid acquisition
- Enterprise sales team
- International expansion

**Key Partnerships:**
- Y Combinator, Techstars
- Stripe Atlas, Clerky
- Domain registrars`,
      approved: false,
    },
  ],
});

export function PlanStudio() {
  const navigate = useNavigate();
  const {
    businessPlan,
    setBusinessPlan,
    approvePlanSection,
  } = useWizardStore();

  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Initialize or generate plan
  useEffect(() => {
    if (!businessPlan) {
      setIsGenerating(true);
      // Simulate AI generation delay
      const timer = setTimeout(() => {
        setBusinessPlan(generateMockPlan());
        setIsGenerating(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [businessPlan, setBusinessPlan]);

  const handleApproveSection = (sectionId: string, approved: boolean, feedback?: string) => {
    approvePlanSection(sectionId, approved, feedback);
  };

  const handleNext = () => {
    navigate('/create/identity-forge');
  };

  const handleBack = () => {
    navigate('/create/identity-forge');
  };

  const approvedCount = businessPlan?.sections.filter((s) => s.approved).length ?? 0;
  const totalSections = businessPlan?.sections.length ?? 0;
  const allApproved = approvedCount === totalSections && totalSections > 0;

  if (isGenerating) {
    return (
      <div className="max-w-4xl mx-auto">
        <StepHeader
          step={6}
          title="Plan Studio"
          subtitle="Generating your personalized business plan..."
        />
        <motion.div
          className="flex flex-col items-center justify-center py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 rounded-full border-4 border-accent border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <p className="mt-6 text-text-secondary">
            Crafting your business plan based on your founder vibe...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <StepHeader
        step={6}
        title="Plan Studio"
        subtitle="Review and approve each section of your AI-generated business plan. Click to expand, provide feedback, and approve."
      />

      <PlanProgress
        approvedCount={approvedCount}
        totalCount={totalSections}
      />

      <motion.div
        className="space-y-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {businessPlan?.sections.map((section, index) => (
          <motion.div key={section.id} variants={staggerItem}>
            <PlanSection
              section={section}
              isExpanded={expandedSection === section.id}
              onToggle={() =>
                setExpandedSection(
                  expandedSection === section.id ? null : section.id
                )
              }
              onApprove={(approved, feedback) =>
                handleApproveSection(section.id, approved, feedback)
              }
              index={index}
            />
          </motion.div>
        ))}
      </motion.div>

      {allApproved && (
        <motion.div
          className="mt-8 p-6 rounded-2xl bg-emerald/10 border border-emerald/30 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-lg font-medium text-emerald">
            All sections approved! Your business plan is ready.
          </p>
        </motion.div>
      )}

      <StepNavigation
        onBack={handleBack}
        onNext={handleNext}
        nextLabel="Done"
        isNextDisabled={!allApproved}
      />
    </div>
  );
}
