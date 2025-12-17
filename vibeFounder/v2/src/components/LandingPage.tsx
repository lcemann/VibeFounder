import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  Palette,
  Target,
  Trophy,
  FileText,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { GlowCard } from '@/components/ui/GlowCard';
import { springs, fadeUp, staggerContainer, staggerItem } from '@/lib/motion';

const features = [
  {
    icon: Sparkles,
    title: 'Discover Your Vibe',
    description: 'Uncover your founder archetype through our unique personality assessment.',
    glowColor: 'rgba(99, 102, 241, 0.4)',
  },
  {
    icon: Target,
    title: 'Define Your Vision',
    description: 'Swipe through AI-generated vision statements to find the one that resonates.',
    glowColor: 'rgba(236, 72, 153, 0.4)',
  },
  {
    icon: Palette,
    title: 'Evolve Your Logo',
    description: 'Watch your logo evolve through generations of AI-powered design.',
    glowColor: 'rgba(245, 158, 11, 0.4)',
  },
  {
    icon: Trophy,
    title: 'Choose Your Name',
    description: 'Battle-test brand names in a tournament-style selection process.',
    glowColor: 'rgba(16, 185, 129, 0.4)',
  },
  {
    icon: FileText,
    title: 'Build Your Plan',
    description: 'Get a comprehensive business plan tailored to your unique brand.',
    glowColor: 'rgba(6, 182, 212, 0.4)',
  },
  {
    icon: Zap,
    title: 'Launch Fast',
    description: 'Go from idea to launch-ready brand in minutes, not months.',
    glowColor: 'rgba(139, 92, 246, 0.4)',
  },
];

export function LandingPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/create/founder-vibe');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 60%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 60%)',
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -30, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-text-secondary">
              AI-Powered Brand Creation
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-display font-display font-bold text-text-primary mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ...springs.gentle }}
          >
            Build Your Brand
            <br />
            <span className="text-gradient-primary">In Minutes</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Discover your founder vibe, evolve your logo, and launch your brand
            with the power of AI.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <AnimatedButton size="lg" onClick={handleStart}>
              Start Building
              <ArrowRight className="w-5 h-5" />
            </AnimatedButton>
            <AnimatedButton variant="ghost" size="lg">
              Watch Demo
            </AnimatedButton>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{
              opacity: { delay: 1 },
              y: { delay: 1, duration: 1.5, repeat: Infinity },
            }}
          >
            <ChevronDown className="w-6 h-6 text-text-muted" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={fadeUp.initial}
            whileInView={fadeUp.animate}
            viewport={{ once: true }}
            transition={fadeUp.transition}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-4">
              How It Works
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Six steps to transform your idea into a launch-ready brand
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={feature.title} variants={staggerItem}>
                  <GlowCard glowColor={feature.glowColor} className="h-full">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-surface-hover flex items-center justify-center">
                          <Icon className="w-6 h-6 text-text-secondary" />
                        </div>
                        <span className="text-xs text-text-muted uppercase tracking-wider">
                          Step {index + 1}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-text-primary mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-text-secondary text-sm flex-grow">
                        {feature.description}
                      </p>
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={{ once: true }}
          transition={fadeUp.transition}
        >
          <div className="p-12 rounded-3xl bg-gradient-to-br from-surface to-surface-elevated border border-border">
            <h2 className="text-4xl font-display font-bold text-text-primary mb-4">
              Ready to Build Your Brand?
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-xl mx-auto">
              Join thousands of founders who have discovered their unique brand
              identity with VibeFounder.
            </p>
            <AnimatedButton size="lg" onClick={handleStart}>
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </AnimatedButton>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-xl font-bold text-text-primary">
            VibeFounder
          </div>
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} VibeFounder. Built with AI magic.
          </p>
        </div>
      </footer>
    </div>
  );
}
