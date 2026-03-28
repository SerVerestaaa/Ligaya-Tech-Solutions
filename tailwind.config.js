/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Ligaya brand palette
        void:    '#03020F',   // deepest background
        deep:    '#07051A',   // section background
        surface: '#0D0B2A',   // card background
        'surface-2': '#13103A',
        cyan:    '#00D4FF',   // primary accent
        purple:  '#7B2FFF',   // secondary accent
        pink:    '#FF2FBB',   // tertiary accent
        'cyan-dim':   '#00A0C0',
        'purple-dim': '#5C22C0',
        ghost:   'rgba(255,255,255,0.06)',
        'ghost-2': 'rgba(255,255,255,0.10)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Syne', 'sans-serif'],
        body: ['var(--font-body)', 'DM Sans', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'grad-brand': 'linear-gradient(135deg, #00D4FF 0%, #7B2FFF 100%)',
        'grad-hero':  'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(123,47,255,0.25) 0%, transparent 70%)',
        'grad-glow':  'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
      },
      animation: {
        'float':     'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow':  'spin 20s linear infinite',
        'marquee':    'marquee 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,212,255,0.4)' },
          '50%':      { boxShadow: '0 0 40px rgba(0,212,255,0.8), 0 0 80px rgba(123,47,255,0.4)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'glow-cyan':   '0 0 30px rgba(0,212,255,0.4)',
        'glow-purple': '0 0 30px rgba(123,47,255,0.4)',
        'glow-pink':   '0 0 30px rgba(255,47,187,0.4)',
        'glass':       '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
