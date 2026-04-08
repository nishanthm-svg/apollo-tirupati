export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        apollo: {
          pink: '#A62159',
          'pink-dark': '#8a1a49',
          'pink-light': '#f5d6e6',
          teal: '#033B49',
          'teal-light': '#0a5a70',
          'teal-mid': '#065570',
        }
      },
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
      }
    }
  },
  plugins: []
}
