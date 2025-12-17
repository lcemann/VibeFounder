import type { Archetype } from '@/types';

export const archetypes: Archetype[] = [
  {
    id: 'visionary',
    name: 'The Visionary',
    tagline: 'See what others cannot',
    description:
      'You paint pictures of the future that inspire others to follow. Your strength lies in articulating bold visions that challenge the status quo.',
    traits: ['Forward-thinking', 'Inspirational', 'Big-picture focused', 'Risk-tolerant'],
    icon: 'Eye',
    glowColor: 'rgba(99, 102, 241, 0.4)',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'builder',
    name: 'The Builder',
    tagline: 'Create something that lasts',
    description:
      'You thrive on turning ideas into reality. Methodical and persistent, you build systems and products that stand the test of time.',
    traits: ['Systematic', 'Persistent', 'Quality-focused', 'Hands-on'],
    icon: 'Hammer',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 'connector',
    name: 'The Connector',
    tagline: 'Bring people together',
    description:
      'Your superpower is building relationships and communities. You see the potential in partnerships and know how to bring the right people together.',
    traits: ['Empathetic', 'Networked', 'Community-minded', 'Collaborative'],
    icon: 'Users',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    id: 'disruptor',
    name: 'The Disruptor',
    tagline: 'Break the rules',
    description:
      'You see inefficiency as opportunity. Unafraid to challenge conventions, you find innovative ways to solve problems others accept as unsolvable.',
    traits: ['Innovative', 'Bold', 'Unconventional', 'Challenger'],
    icon: 'Zap',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'analyst',
    name: 'The Analyst',
    tagline: 'Data drives decisions',
    description:
      'You turn complexity into clarity. Your ability to analyze patterns and extract insights helps you make decisions others miss.',
    traits: ['Data-driven', 'Logical', 'Detail-oriented', 'Strategic'],
    icon: 'BarChart',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'storyteller',
    name: 'The Storyteller',
    tagline: 'Every brand needs a voice',
    description:
      'You understand that behind every successful product is a compelling narrative. You craft stories that resonate and build emotional connections.',
    traits: ['Creative', 'Persuasive', 'Authentic', 'Emotive'],
    icon: 'BookOpen',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    gradient: 'from-violet-500 to-purple-500',
  },
];
