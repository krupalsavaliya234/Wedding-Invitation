/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Traditional Indian Wedding Theme Colors
        maroon: '#7A1E2D',           // Deep Maroon - Primary
        gold: '#D4AF37',             // Royal Gold - Secondary
        saffron: '#FF9933',          // Saffron - Accent
        ivory: '#FFF8ED',            // Ivory/Cream - Background
        'text-primary': '#3B1F1F',   // Dark Brown - Text Primary
        'text-secondary': '#8C6A2F', // Muted Gold - Text Secondary
        'border-gold': '#E6C87A',    // Soft Gold - Border
        // Legacy colors for compatibility
        cream: '#FFF8ED',
        obsidian: '#0a0a0f',
        'teal-glow': '#00d4ff',
        'violet-glow': '#b794f6',
        'maroon-neon': '#ff0040',
        'sage-green': '#8B9D83',
        'coral-pink': '#E8A598',
        'olive-green': '#6B7F5F',
        'soft-peach': '#F5D5C8',
      },
      fontFamily: {
        // Heading Fonts - Elegant Serif
        playfair: ['Playfair Display', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        // Body Fonts - Readable Modern
        poppins: ['Poppins', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        // Decorative Fonts
        'great-vibes': ['Great Vibes', 'cursive'],
        // Legacy fonts for compatibility
        hind: ['Hind', 'sans-serif'],
        gujarati: ['Noto Sans Gujarati', 'sans-serif'],
        signature: ['Great Vibes', 'Alex Brush', 'cursive'],
        'alex-brush': ['Alex Brush', 'cursive'],
        bodoni: ['Bodoni Moda', 'serif'],
      },
      animation: {
        'fade-in': 'fade-in 1s ease-in',
        'slide-up': 'slide-up 0.8s ease-out',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite',
        'gradient-shift': 'gradient-shift 4s ease infinite',
      },
      keyframes: {
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'slide-up': {
          'from': { transform: 'translateY(30px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) translateZ(0px)' },
          '50%': { transform: 'translateY(-20px) translateZ(10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.4)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        'wedding': '12px',
        'wedding-lg': '20px',
        'wedding-xl': '30px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glass-premium': '0 20px 60px rgba(0, 212, 255, 0.15), 0 10px 40px rgba(183, 148, 246, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.15)',
        'glow-teal': '0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(0, 212, 255, 0.3)',
        'glow-violet': '0 0 20px rgba(183, 148, 246, 0.5), 0 0 40px rgba(183, 148, 246, 0.3)',
        'glow-gold': '0 0 20px rgba(212, 175, 55, 0.6), 0 0 40px rgba(212, 175, 55, 0.4)',
        'wedding-gold': '0 4px 20px rgba(212, 175, 55, 0.3), 0 0 0 1px rgba(230, 200, 122, 0.2)',
        'wedding-maroon': '0 4px 20px rgba(122, 30, 45, 0.3), 0 0 0 1px rgba(122, 30, 45, 0.2)',
      },
    },
  },
  plugins: [],
}
