/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand greens
        forest: '#1B4332',
        emerald: '#2D6A4F',
        sage: '#52B788',
        mint: '#B7E4C7',
        foam: '#D8F3DC',
        // Accent
        citrus: '#E9C46A',
        'citrus-dk': '#F4A261',
        'citrus-pale': '#FFF8E7',
        // Neutrals
        ink: '#1A1A1A',
        charcoal: '#2D2D2D',
        slate: '#4A5568',
        mist: '#718096',
        cloud: '#E2E8F0',
        snow: '#F7F9F8',
        // Semantic
        danger: '#C0392B',
        'danger-lt': '#FDECEA',
        warn: '#E67E22',
        'warn-lt': '#FEF3E2',
        'success-lt': '#D8F3DC',
        info: '#2B6CB0',
        'info-lt': '#EBF8FF',
      },
      fontFamily: {
        display: ['Lora', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.6' }],
        'sm': ['0.8125rem', { lineHeight: '1.6' }],
        'base': ['0.9375rem', { lineHeight: '1.6' }],
        'md': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.125rem', { lineHeight: '1.4' }],
        'xl': ['1.375rem', { lineHeight: '1.3' }],
        '2xl': ['1.5rem', { lineHeight: '1.2' }],
        '3xl': ['2rem', { lineHeight: '1.2' }],
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
      },
      boxShadow: {
        'sm': '0 1px 4px rgba(0,0,0,0.06)',
        'md': '0 4px 16px rgba(0,0,0,0.10)',
        'citrus': '0 2px 8px rgba(233,196,106,0.35)',
        'forest': '0 4px 16px rgba(27,67,50,0.30)',
        'nav': '0 -2px 16px rgba(0,0,0,0.06)',
      },
      spacing: {
        'nav': '64px',
        'topbar': '56px',
        'fab': '56px',
      },
    },
  },
  plugins: [],
}
