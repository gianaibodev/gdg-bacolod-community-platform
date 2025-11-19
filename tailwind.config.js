/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Google Sans"', 'Inter', 'sans-serif'],
        display: ['"Inter"', 'sans-serif'],
      },
      colors: {
        google: {
          blue: '#4285F4',
          red: '#DB4437',
          yellow: '#F4B400',
          green: '#0F9D58',
          grey: '#F1F3F4'
        },
        dark: {
          bg: '#121212',       /* Softened from #050505 */
          surface: '#1E1E1E',  /* Softened from #121212 */
          border: '#2D2D30'
        }
      },
      backgroundImage: {
        'dot-pattern': 'radial-gradient(#E2E8F0 1px, transparent 1px)',
        'dot-pattern-dark': 'radial-gradient(#333333 1px, transparent 1px)',
      },
      animation: {
        'orbit': 'orbit 20s linear infinite',
        'orbit-reverse': 'orbit-reverse 25s linear infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'blob': 'blob 7s infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'gradient-x': 'gradient-x 3s ease infinite',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'orbit-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      }
    }
  },
  plugins: [],
}

