import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { NoiseOverlay } from '@/components/effects/NoiseOverlay';
import { LandingPage } from '@/components/LandingPage';
import { WizardLayout } from '@/components/wizard/WizardLayout';
import { FounderVibe } from '@/components/founder-vibe/FounderVibe';
import { IndustryVibe } from '@/components/industry-vibe/IndustryVibe';
import { VisionLab } from '@/components/vision-lab/VisionLab';
import { IdentityForge } from '@/components/identity-forge/IdentityForge';
import { LogoEvolutionLab } from '@/components/identity-forge/LogoEvolutionLab';
import { NameArena } from '@/components/name-arena/NameArena';
import { PlanStudio } from '@/components/plan-studio/PlanStudio';
import { Launch } from '@/components/Launch';

function App() {
  const location = useLocation();

  return (
    <>
      <NoiseOverlay />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create" element={<WizardLayout />}>
            <Route index element={<FounderVibe />} />
            <Route path="founder-vibe" element={<FounderVibe />} />
            <Route path="industry-vibe" element={<IndustryVibe />} />
            <Route path="vision-lab" element={<VisionLab />} />
            <Route path="identity-forge" element={<IdentityForge />} />
            <Route path="identity-forge/logo" element={<LogoEvolutionLab />} />
            <Route path="identity-forge/name" element={<NameArena />} />
            <Route path="identity-forge/plan" element={<PlanStudio />} />
          </Route>
          <Route path="/launch" element={<Launch />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
