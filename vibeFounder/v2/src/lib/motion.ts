// Spring configurations for physics-based animations
export const springs = {
  // Gentle - for page transitions, large elements
  gentle: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 15,
    mass: 1,
  },

  // Snappy - for buttons, toggles, quick feedback
  snappy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
    mass: 1,
  },

  // Bouncy - for success states, celebrations
  bouncy: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 10,
    mass: 1,
  },

  // Wobbly - for drag release, playful moments
  wobbly: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 8,
    mass: 0.8,
  },

  // Stiff - for precise movements
  stiff: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 35,
    mass: 1,
  },
};

export const durations = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
  glacial: 1.2,
};

export const easings = {
  easeOutExpo: [0.16, 1, 0.3, 1] as const,
  easeOutBack: [0.34, 1.56, 0.64, 1] as const,
  easeInOutCirc: [0.85, 0, 0.15, 1] as const,
  easeOutQuart: [0.25, 1, 0.5, 1] as const,
};

// Fade variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: durations.normal },
};

export const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: springs.gentle,
};

export const fadeScale = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: springs.snappy,
};

// Pop variants (with overshoot)
export const popIn = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: springs.bouncy,
};

export const popOut = {
  initial: { opacity: 1, scale: 1 },
  animate: { opacity: 0, scale: 1.1 },
  transition: { duration: durations.fast },
};

// Slide variants
export const slideFromLeft = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
  transition: springs.gentle,
};

export const slideFromRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
  transition: springs.gentle,
};

export const slideFromBottom = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
  transition: springs.gentle,
};

// Stagger variants
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springs.snappy,
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: { duration: durations.fast },
  },
};

// Glow pulse animation
export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(99, 102, 241, 0.2)',
      '0 0 40px rgba(99, 102, 241, 0.4)',
      '0 0 20px rgba(99, 102, 241, 0.2)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Page transitions
export const pageTransition = {
  initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: durations.slow,
      ease: easings.easeOutExpo,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(5px)',
    transition: {
      duration: durations.normal,
    },
  },
};

// Card hover variants
export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    transition: springs.snappy,
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: springs.snappy,
  },
  tap: {
    scale: 0.98,
    transition: springs.stiff,
  },
};

// Celebration confetti burst
export const confettiBurst = {
  initial: { scale: 0, rotate: 0 },
  animate: (i: number) => ({
    scale: [0, 1, 1, 0],
    rotate: [0, Math.random() * 360],
    x: Math.cos((i / 12) * Math.PI * 2) * 150,
    y: Math.sin((i / 12) * Math.PI * 2) * 150,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  }),
};
