import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw, Shuffle, Check } from 'lucide-react';
import { useWizardStore } from '@/stores/wizardStore';
import { StepHeader, StepNavigation } from '@/components/wizard';
import { NameMatchup } from './NameMatchup';
import { NameChampion } from './NameChampion';
import { fadeUp } from '@/lib/motion';
import type { BrandName, NameMatchup as NameMatchupType } from '@/types';

// Multiple sets of brand names - in production these would come from AI
const brandNameSets: BrandName[][] = [
  [
    { id: '1', name: 'Vexel', tagline: 'Build at the speed of thought', meaning: 'Combination of "velocity" and "pixel" - representing fast, precise creation', domainAvailable: true },
    { id: '2', name: 'Foundry', tagline: 'Where ideas take shape', meaning: 'A place where things are created and forged - classic and strong', domainAvailable: false },
    { id: '3', name: 'Lumina', tagline: 'Illuminate your vision', meaning: 'From Latin "lumen" meaning light - suggests clarity and guidance', domainAvailable: true },
    { id: '4', name: 'Nexus', tagline: 'Connect, create, conquer', meaning: 'A connection or link - represents bringing together ideas and people', domainAvailable: true },
    { id: '5', name: 'Prism', tagline: 'See every angle', meaning: 'Transforms light into spectrum - represents diverse perspectives', domainAvailable: false },
    { id: '6', name: 'Zenith', tagline: 'Reach your peak', meaning: 'The highest point - represents ambition and achievement', domainAvailable: true },
    { id: '7', name: 'Flux', tagline: 'Embrace the change', meaning: 'Continuous movement and change - represents adaptability', domainAvailable: true },
    { id: '8', name: 'Cipher', tagline: 'Decode your potential', meaning: 'A secret code - represents innovation and problem-solving', domainAvailable: true },
  ],
  [
    { id: '9', name: 'Ember', tagline: 'Spark your ambition', meaning: 'A glowing piece of fire - represents potential and warmth', domainAvailable: true },
    { id: '10', name: 'Vertex', tagline: 'Peak performance awaits', meaning: 'The highest point of a geometric shape - represents excellence', domainAvailable: true },
    { id: '11', name: 'Pulse', tagline: 'Feel the rhythm of success', meaning: 'A rhythmic beat - represents energy and life', domainAvailable: false },
    { id: '12', name: 'Nova', tagline: 'Explode into greatness', meaning: 'A star showing sudden brightness - represents breakthrough moments', domainAvailable: true },
    { id: '13', name: 'Drift', tagline: 'Navigate your journey', meaning: 'Gentle movement with purpose - represents exploration', domainAvailable: true },
    { id: '14', name: 'Apex', tagline: 'Reach the summit', meaning: 'The highest point - represents ultimate achievement', domainAvailable: false },
    { id: '15', name: 'Forge', tagline: 'Shape your destiny', meaning: 'To create through heat and pressure - represents transformation', domainAvailable: true },
    { id: '16', name: 'Echo', tagline: 'Make your voice heard', meaning: 'A repeated sound - represents lasting impact', domainAvailable: true },
  ],
  [
    { id: '17', name: 'Spark', tagline: 'Ignite innovation', meaning: 'The beginning of fire - represents the start of something great', domainAvailable: true },
    { id: '18', name: 'Orbit', tagline: 'Revolve around success', meaning: 'A path around a center - represents momentum and cycles', domainAvailable: false },
    { id: '19', name: 'Bloom', tagline: 'Grow beyond limits', meaning: 'A flower opening - represents growth and beauty', domainAvailable: true },
    { id: '20', name: 'Axis', tagline: 'Center your vision', meaning: 'A central line - represents balance and foundation', domainAvailable: true },
    { id: '21', name: 'Crest', tagline: 'Ride the wave', meaning: 'The top of a wave - represents peak moments', domainAvailable: true },
    { id: '22', name: 'Aura', tagline: 'Radiate excellence', meaning: 'An emanating atmosphere - represents presence and energy', domainAvailable: true },
    { id: '23', name: 'Ripple', tagline: 'Create lasting impact', meaning: 'Expanding circles - represents influence spreading outward', domainAvailable: false },
    { id: '24', name: 'Beacon', tagline: 'Guide the way forward', meaning: 'A light that guides - represents leadership and clarity', domainAvailable: true },
  ],
];

const getRandomBrandNames = (): BrandName[] => {
  const setIndex = Math.floor(Math.random() * brandNameSets.length);
  return brandNameSets[setIndex];
};

function createTournamentMatchups(names: BrandName[]): NameMatchupType[] {
  const shuffled = [...names].sort(() => Math.random() - 0.5);
  const matchups: NameMatchupType[] = [];

  for (let i = 0; i < shuffled.length; i += 2) {
    if (shuffled[i + 1]) {
      matchups.push({
        id: `round1-${i / 2}`,
        name1: shuffled[i],
        name2: shuffled[i + 1],
        round: 1,
      });
    }
  }

  return matchups;
}

export function NameArena() {
  const navigate = useNavigate();
  const {
    brandNames,
    setBrandNames,
    nameMatchups,
    setNameMatchups,
    recordMatchupWinner,
    championName,
    setChampionName,
  } = useWizardStore();

  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedContender, setSelectedContender] = useState<BrandName | null>(null);

  // Reset and initialize tournament
  const initializeTournament = () => {
    const newNames = getRandomBrandNames();
    setBrandNames(newNames);
    setNameMatchups(createTournamentMatchups(newNames));
    setChampionName(null);
    setSelectedContender(null);
  };

  // Initialize tournament on mount - reset if data looks corrupted
  useEffect(() => {
    const maxValidMatchups = brandNames.length > 0 ? brandNames.length - 1 : 7;
    const isCorrupted = nameMatchups.length > maxValidMatchups + 5; // Allow some buffer

    if (brandNames.length === 0 || isCorrupted) {
      initializeTournament();
    }
    setIsInitialized(true);
  }, []);

  // Find the first incomplete matchup
  const incompleteMatchup = nameMatchups.find((m) => !m.winner);
  const maxRound = nameMatchups.length > 0 ? Math.max(...nameMatchups.map(m => m.round)) : 1;
  const currentRound = incompleteMatchup?.round ?? maxRound;
  const currentRoundMatchups = nameMatchups.filter((m) => m.round === currentRound);
  const completedInRound = currentRoundMatchups.filter((m) => m.winner).length;
  const currentMatchupIndex = completedInRound;

  // Get remaining contenders
  const getRemainingContenders = (): BrandName[] => {
    const eliminated = new Set<string>();

    nameMatchups.forEach(m => {
      if (m.winner) {
        const loserId = m.winner === m.name1.id ? m.name2.id : m.name1.id;
        eliminated.add(loserId);
      }
    });

    return brandNames.filter(name => !eliminated.has(name.id));
  };

  const remainingContenders = getRemainingContenders();

  const handleSelectWinner = (winnerId: string) => {
    if (!incompleteMatchup) return;

    const winner = incompleteMatchup.name1.id === winnerId
      ? incompleteMatchup.name1
      : incompleteMatchup.name2;

    // Record the winner first
    recordMatchupWinner(incompleteMatchup.id, winnerId);

    // Check if this completes the current round
    const otherMatchupsInRound = currentRoundMatchups.filter(m => m.id !== incompleteMatchup.id);
    const allOthersComplete = otherMatchupsInRound.every(m => m.winner);

    if (allOthersComplete) {
      // Round complete - gather all winners
      const roundWinners: BrandName[] = [];

      // Add winners from other matchups
      otherMatchupsInRound.forEach(m => {
        const matchWinner = m.winner === m.name1.id ? m.name1 : m.name2;
        roundWinners.push(matchWinner);
      });

      // Add current winner
      roundWinners.push(winner);

      if (roundWinners.length === 1) {
        // Champion!
        setChampionName(roundWinners[0]);
      } else if (roundWinners.length >= 2) {
        // Create next round
        const nextRound = currentRound + 1;

        // Check if next round already exists
        const existingNextRound = nameMatchups.filter(m => m.round === nextRound);
        if (existingNextRound.length > 0) {
          return; // Already created
        }

        const nextMatchups: NameMatchupType[] = [];
        for (let i = 0; i < roundWinners.length; i += 2) {
          if (roundWinners[i + 1]) {
            nextMatchups.push({
              id: `round${nextRound}-match${i / 2}-${Date.now()}`,
              name1: roundWinners[i],
              name2: roundWinners[i + 1],
              round: nextRound,
            });
          }
        }

        if (nextMatchups.length > 0) {
          setNameMatchups([...nameMatchups, ...nextMatchups]);
        } else if (roundWinners.length === 1) {
          setChampionName(roundWinners[0]);
        }
      }
    }
  };

  const handleReset = () => {
    initializeTournament();
  };

  const handleNext = () => {
    navigate('/create/identity-forge');
  };

  const handleBack = () => {
    navigate('/create/identity-forge');
  };

  const totalRounds = Math.ceil(Math.log2(brandNames.length || 8));
  const completedMatchups = nameMatchups.filter(m => m.winner).length;
  const totalMatchups = brandNames.length - 1 || 7;
  const progress = completedMatchups / totalMatchups;

  if (!isInitialized) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <StepHeader
        step={5}
        title="Name Arena"
        subtitle={
          championName
            ? "We have a champion! Your brand name has been decided through the ultimate showdown."
            : `Round ${currentRound} of ${totalRounds}. Pick the name that resonates more with your brand.`
        }
      />

      {!championName && incompleteMatchup && (
        <>
          {/* Tournament progress */}
          <motion.div
            className="mb-8"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
          >
            <div className="flex items-center justify-between text-sm text-text-secondary mb-2">
              <div className="flex items-center gap-3">
                <span>Round {currentRound}</span>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
                <button
                  onClick={initializeTournament}
                  className="flex items-center gap-1 text-xs text-text-muted hover:text-accent transition-colors"
                >
                  <Shuffle className="w-3 h-3" />
                  New Names
                </button>
              </div>
              <span>
                Match {currentMatchupIndex + 1} of {currentRoundMatchups.length}
              </span>
            </div>
            <div className="h-1 bg-surface-elevated rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber to-pink"
                initial={{ width: 0 }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ type: 'spring', stiffness: 200, damping: 30 }}
              />
            </div>
          </motion.div>

          {/* Remaining contenders */}
          {remainingContenders.length > 2 && (
            <motion.div
              className="mb-8 p-4 rounded-xl bg-surface border border-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber" />
                  <span className="text-sm font-medium text-text-secondary">
                    Remaining Contenders ({remainingContenders.length})
                  </span>
                </div>
                <span className="text-xs text-text-muted">
                  Click to select directly
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {remainingContenders.map((name) => (
                  <button
                    key={name.id}
                    onClick={() => setSelectedContender(selectedContender?.id === name.id ? null : name)}
                    className={`
                      px-3 py-1 text-sm rounded-full transition-all
                      ${selectedContender?.id === name.id
                        ? 'bg-accent text-white ring-2 ring-accent ring-offset-2 ring-offset-surface'
                        : 'bg-surface-hover text-text-primary hover:bg-surface-elevated'}
                    `}
                  >
                    {name.name}
                  </button>
                ))}
              </div>
              {selectedContender && (
                <motion.div
                  className="mt-4 pt-4 border-t border-border"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-secondary">
                        Select <span className="font-semibold text-text-primary">{selectedContender.name}</span> as your champion?
                      </p>
                      <p className="text-xs text-text-muted mt-1">{selectedContender.tagline}</p>
                    </div>
                    <motion.button
                      onClick={() => setChampionName(selectedContender)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber to-pink text-white font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Check className="w-4 h-4" />
                      Confirm
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Current matchup */}
          <AnimatePresence mode="wait">
            <NameMatchup
              key={incompleteMatchup.id}
              matchup={incompleteMatchup}
              onSelectWinner={handleSelectWinner}
            />
          </AnimatePresence>
        </>
      )}

      {championName && (
        <NameChampion name={championName} />
      )}

      <StepNavigation
        onBack={handleBack}
        onNext={handleNext}
        isNextDisabled={!championName}
      />
    </div>
  );
}
