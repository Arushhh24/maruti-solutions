/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: '#041E42',
          50: '#E6EBF2',
          100: '#C0CEDF',
          200: '#8FADC8',
          300: '#5E8CB0',
          400: '#2D6B99',
          500: '#041E42',
          600: '#031A3A',
          700: '#021530',
          800: '#011026',
          900: '#000B1C',
        },
        orange: {
          DEFAULT: '#FF7A00',
          50: '#FFF3E6',
          100: '#FFE0BF',
          200: '#FFC080',
          300: '#FFA040',
          400: '#FF8C1A',
          500: '#FF7A00',
          600: '#E06E00',
          700: '#B85C00',
          800: '#904A00',
          900: '#683800',
        },
        background: '#030712',
        foreground: '#FFFFFF',
        muted: '#9CA3AF',
        success: '#10B981',
        border: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['4rem', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-md': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      backgroundImage: {
        'grid-pattern':
          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.03)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'count-up': 'countUp 1s ease forwards',
        shimmer: 'shimmer 2s infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      boxShadow: {
        'glow-orange': '0 0 40px rgba(255, 122, 0, 0.15)',
        'glow-navy': '0 0 40px rgba(4, 30, 66, 0.4)',
        premium: '0 20px 60px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
