import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWizardStore } from '@/stores/wizardStore';
import { StepHeader, StepNavigation } from '@/components/wizard';
import { ArchetypeGrid } from './ArchetypeGrid';
import { PersonalStatement } from './PersonalStatement';
import { archetypes } from '@/lib/data/archetypes';

export function FounderVibe() {
  const navigate = useNavigate();
  const {
    selectedArchetype,
    setSelectedArchetype,
    personalStatement,
    setPersonalStatement,
    completeStep,
  } = useWizardStore();

  const [showStatement, setShowStatement] = useState(!!selectedArchetype);

  const handleArchetypeSelect = (archetypeId: string) => {
    const archetype = archetypes.find((a) => a.id === archetypeId);
    if (archetype) {
      setSelectedArchetype(archetype);
      setShowStatement(true);
    }
  };

  const handleNext = () => {
    completeStep('founder-vibe');
    navigate('/create/industry-vibe');
  };

  const canProceed = !!selectedArchetype;

  return (
    <div className="max-w-5xl mx-auto">
      <StepHeader
        step={1}
        title="Discover Your Founder Vibe"
        subtitle="Every great company starts with a founder's unique perspective. Select the archetype that resonates most with how you approach building."
      />

      <ArchetypeGrid
        archetypes={archetypes}
        selectedId={selectedArchetype?.id}
        onSelect={handleArchetypeSelect}
      />

      {showStatement && selectedArchetype && (
        <PersonalStatement
          archetype={selectedArchetype}
          value={personalStatement}
          onChange={setPersonalStatement}
        />
      )}

      <StepNavigation
        onBack={() => navigate('/')}
        onNext={handleNext}
        isNextDisabled={!canProceed}
        showBack={true}
      />
    </div>
  );
}
