import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0B',
        surface: {
          DEFAULT: '#141416',
          elevated: '#1C1C1F',
          hover: '#242428',
          active: '#2C2C30',
        },
        text: {
          primary: '#FAFAFA',
          secondary: '#A0A0A0',
          tertiary: '#666666',
          muted: '#444444',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.15)',
          focus: 'rgba(255, 255, 255, 0.25)',
          active: 'rgba(99, 102, 241, 0.5)',
        },
        indigo: {
          DEFAULT: '#6366F1',
          light: '#818CF8',
          dark: '#4F46E5',
        },
        amber: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706',
        },
        emerald: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669',
        },
        pink: {
          DEFAULT: '#EC4899',
          light: '#F472B6',
          dark: '#DB2777',
        },
        cyan: {
          DEFAULT: '#06B6D4',
          light: '#22D3EE',
          dark: '#0891B2',
        },
        red: {
          DEFAULT: '#EF4444',
          light: '#F87171',
          dark: '#DC2626',
        },
        accent: {
          DEFAULT: '#6366F1',
          light: '#818CF8',
          dark: '#4F46E5',
        },
      },
      fontFamily: {
        sans: ['Inter Tight', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        display: 'clamp(4rem, 10vw, 7rem)',
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        normal: '0',
        wide: '0.02em',
        wider: '0.04em',
        widest: '0.08em',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
        md: '0 4px 12px rgba(0, 0, 0, 0.4)',
        lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
        xl: '0 20px 40px rgba(0, 0, 0, 0.6)',
        glow: {
          indigo: '0 0 20px rgba(99, 102, 241, 0.3)',
          amber: '0 0 20px rgba(245, 158, 11, 0.3)',
          pink: '0 0 20px rgba(236, 72, 153, 0.3)',
          cyan: '0 0 20px rgba(6, 182, 212, 0.3)',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366F1, #8B5CF6)',
        'gradient-warm': 'linear-gradient(135deg, #F59E0B, #EF4444)',
        'gradient-cool': 'linear-gradient(135deg, #06B6D4, #6366F1)',
        'gradient-success': 'linear-gradient(135deg, #10B981, #06B6D4)',
        'gradient-surface': 'linear-gradient(180deg, #1C1C1F, #141416)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(99, 102, 241, 0.4)',
          },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
