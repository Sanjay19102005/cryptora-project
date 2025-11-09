/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cryptora-navy': '#0B1C2C',
        'cryptora-neon': '#00C3FF',
        'cryptora-dark': '#050508',
        'cryptora-light': '#1a1a2e',
        cryptora: {
          navy: '#0B1C2C',
          neon: '#00C3FF',
          dark: '#050508',
          light: '#1a1a2e',
        }
      },
      fontFamily: {
        futura: ['Orbitron', 'Rajdhani', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'particle': 'particle 15s linear infinite',
        'data-flow': 'dataFlow 3s linear infinite',
        'glow-ring': 'glowRing 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00C3FF, 0 0 10px #00C3FF' },
          '100%': { boxShadow: '0 0 20px #00C3FF, 0 0 30px #00C3FF, 0 0 40px #00C3FF' },
        },
        neonPulse: {
          '0%, 100%': { 
            textShadow: '0 0 5px #00C3FF, 0 0 10px #00C3FF, 0 0 15px #00C3FF',
            opacity: 1 
          },
          '50%': { 
            textShadow: '0 0 10px #00C3FF, 0 0 20px #00C3FF, 0 0 30px #00C3FF, 0 0 40px #00C3FF',
            opacity: 0.9 
          },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
        },
        particle: {
          '0%': { transform: 'translateY(0) translateX(0) scale(1)', opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { transform: 'translateY(-100vh) translateX(50px) scale(0)', opacity: 0 },
        },
        dataFlow: {
          '0%': { stroke-dashoffset: 0 },
          '100%': { stroke-dashoffset: 100 },
        },
        glowRing: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 195, 255, 0.3), 0 0 40px rgba(0, 195, 255, 0.2), inset 0 0 20px rgba(0, 195, 255, 0.1)' 
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(0, 195, 255, 0.5), 0 0 60px rgba(0, 195, 255, 0.3), inset 0 0 30px rgba(0, 195, 255, 0.2)' 
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
      }
    },
  },
  plugins: [],
}

