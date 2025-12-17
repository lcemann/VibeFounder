import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Palette,
  Shapes,
  Zap,
  Circle,
  Square,
  Triangle,
  Hexagon,
  Star,
  Heart,
  Waves,
  Wind,
  Flame,
  Leaf,
  Anchor,
  Sun,
  Moon,
  Cloud,
  Check,
} from 'lucide-react';
import { TextArea } from '@/components/ui/TextArea';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { GlowCard } from '@/components/ui/GlowCard';
import { staggerContainer, staggerItem, fadeUp } from '@/lib/motion';

interface LogoSeedingProps {
  onComplete: (seeds: string[]) => void;
}

// Color palette options
const colorOptions = [
  { id: 'indigo', color: '#6366F1', name: 'Indigo' },
  { id: 'purple', color: '#8B5CF6', name: 'Purple' },
  { id: 'pink', color: '#EC4899', name: 'Pink' },
  { id: 'rose', color: '#F43F5E', name: 'Rose' },
  { id: 'red', color: '#EF4444', name: 'Red' },
  { id: 'orange', color: '#F97316', name: 'Orange' },
  { id: 'amber', color: '#F59E0B', name: 'Amber' },
  { id: 'yellow', color: '#EAB308', name: 'Yellow' },
  { id: 'lime', color: '#84CC16', name: 'Lime' },
  { id: 'green', color: '#22C55E', name: 'Green' },
  { id: 'emerald', color: '#10B981', name: 'Emerald' },
  { id: 'teal', color: '#14B8A6', name: 'Teal' },
  { id: 'cyan', color: '#06B6D4', name: 'Cyan' },
  { id: 'sky', color: '#0EA5E9', name: 'Sky' },
  { id: 'blue', color: '#3B82F6', name: 'Blue' },
  { id: 'slate', color: '#64748B', name: 'Slate' },
];

// Shape options
const shapeOptions = [
  { id: 'geometric', icon: Hexagon, name: 'Geometric' },
  { id: 'circular', icon: Circle, name: 'Circular' },
  { id: 'angular', icon: Triangle, name: 'Angular' },
  { id: 'squared', icon: Square, name: 'Squared' },
  { id: 'organic', icon: Leaf, name: 'Organic' },
  { id: 'stellar', icon: Star, name: 'Stellar' },
  { id: 'flowing', icon: Waves, name: 'Flowing' },
  { id: 'abstract', icon: Wind, name: 'Abstract' },
];

// Energy options
const energyOptions = [
  { id: 'calm', icon: Moon, name: 'Calm', description: 'Peaceful & serene' },
  { id: 'balanced', icon: Sun, name: 'Balanced', description: 'Harmonious & stable' },
  { id: 'dynamic', icon: Wind, name: 'Dynamic', description: 'Active & moving' },
  { id: 'powerful', icon: Flame, name: 'Powerful', description: 'Strong & bold' },
  { id: 'friendly', icon: Heart, name: 'Friendly', description: 'Warm & approachable' },
  { id: 'grounded', icon: Anchor, name: 'Grounded', description: 'Stable & reliable' },
  { id: 'dreamy', icon: Cloud, name: 'Dreamy', description: 'Soft & imaginative' },
  { id: 'radiant', icon: Sparkles, name: 'Radiant', description: 'Bright & energetic' },
];

export function LogoSeeding({ onComplete }: LogoSeedingProps) {
  const [vibe, setVibe] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const [selectedEnergy, setSelectedEnergy] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleColor = (colorId: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorId)
        ? prev.filter((c) => c !== colorId)
        : prev.length < 3
        ? [...prev, colorId]
        : prev
    );
  };

  const toggleShape = (shapeId: string) => {
    setSelectedShapes((prev) =>
      prev.includes(shapeId)
        ? prev.filter((s) => s !== shapeId)
        : prev.length < 2
        ? [...prev, shapeId]
        : prev
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));

    const seeds = [
      vibe,
      selectedColors.map((c) => colorOptions.find((o) => o.id === c)?.name).filter(Boolean).join(', '),
      selectedShapes.map((s) => shapeOptions.find((o) => o.id === s)?.name).filter(Boolean).join(', '),
      selectedEnergy ? energyOptions.find((e) => e.id === selectedEnergy)?.name ?? '' : '',
    ].filter((s): s is string => Boolean(s));

    onComplete(seeds);
    setIsGenerating(false);
  };

  // Calculate filled sections
  const filledSections = [
    vibe.trim().length > 0,
    selectedColors.length > 0,
    selectedShapes.length > 0,
    selectedEnergy !== null,
  ].filter(Boolean).length;

  const canGenerate = filledSections >= 2;

  return (
    <motion.div
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      exit={{ opacity: 0 }}
      transition={fadeUp.transition}
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Vibe - Text Input */}
        <motion.div variants={staggerItem}>
          <GlowCard glowColor="rgba(99, 102, 241, 0.4)">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-hover flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Vibe</h3>
                  <p className="text-xs text-text-muted">e.g., "Minimalist and tech-forward"</p>
                </div>
              </div>
              <TextArea
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
                placeholder="Modern, bold, playful, sophisticated..."
                rows={2}
                className="text-sm"
              />
            </div>
          </GlowCard>
        </motion.div>

        {/* Colors - Color Selector */}
        <motion.div variants={staggerItem}>
          <GlowCard glowColor="rgba(236, 72, 153, 0.4)">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-hover flex items-center justify-center">
                  <Palette className="w-5 h-5 text-text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Colors</h3>
                  <p className="text-xs text-text-muted">Select up to 3 colors</p>
                </div>
              </div>
              <div className="grid grid-cols-8 gap-2">
                {colorOptions.map((option) => {
                  const isSelected = selectedColors.includes(option.id);
                  return (
                    <motion.button
                      key={option.id}
                      onClick={() => toggleColor(option.id)}
                      className="relative w-8 h-8 rounded-lg transition-transform"
                      style={{ backgroundColor: option.color }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title={option.name}
                    >
                      {isSelected && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center rounded-lg ring-2 ring-white ring-offset-2 ring-offset-background"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Check className="w-4 h-4 text-white drop-shadow-md" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
              {selectedColors.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {selectedColors.map((colorId) => {
                    const color = colorOptions.find((c) => c.id === colorId);
                    return (
                      <span
                        key={colorId}
                        className="text-xs px-2 py-1 rounded-full bg-surface-hover text-text-secondary"
                      >
                        {color?.name}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </GlowCard>
        </motion.div>

        {/* Shapes - Shape Selector */}
        <motion.div variants={staggerItem}>
          <GlowCard glowColor="rgba(16, 185, 129, 0.4)">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-hover flex items-center justify-center">
                  <Shapes className="w-5 h-5 text-text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Shapes</h3>
                  <p className="text-xs text-text-muted">Select up to 2 shape styles</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {shapeOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = selectedShapes.includes(option.id);
                  return (
                    <motion.button
                      key={option.id}
                      onClick={() => toggleShape(option.id)}
                      className={`
                        flex flex-col items-center gap-1 p-3 rounded-xl border transition-colors
                        ${isSelected
                          ? 'bg-accent/20 border-accent text-accent'
                          : 'bg-surface-hover border-border text-text-secondary hover:border-accent/50'}
                      `}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{option.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </GlowCard>
        </motion.div>

        {/* Energy - Icon Selector */}
        <motion.div variants={staggerItem}>
          <GlowCard glowColor="rgba(245, 158, 11, 0.4)">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-hover flex items-center justify-center">
                  <Zap className="w-5 h-5 text-text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Energy</h3>
                  <p className="text-xs text-text-muted">Choose the feel of your brand</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {energyOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = selectedEnergy === option.id;
                  return (
                    <motion.button
                      key={option.id}
                      onClick={() => setSelectedEnergy(option.id)}
                      className={`
                        flex flex-col items-center gap-1 p-3 rounded-xl border transition-colors
                        ${isSelected
                          ? 'bg-accent/20 border-accent text-accent'
                          : 'bg-surface-hover border-border text-text-secondary hover:border-accent/50'}
                      `}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      title={option.description}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{option.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-sm text-text-secondary mb-4">
          Complete at least 2 sections to generate your first logo generation
        </p>
        <AnimatedButton
          onClick={handleGenerate}
          disabled={!canGenerate}
          loading={isGenerating}
          size="lg"
        >
          {isGenerating ? 'Generating Logos...' : `Generate First Generation (${filledSections}/4)`}
        </AnimatedButton>
      </motion.div>
    </motion.div>
  );
}
