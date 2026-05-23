/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'typewriter': 'typewriter 2s steps(40) forwards',
        'scan': 'scan 2.5s ease-in-out infinite',
        'confetti-fall': 'confettiFall 3s ease-in forwards',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { '0%': { opacity: '0', transform: 'translateY(-10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        bounceGentle: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-5px)' } },
        float: { '0%,100%': { transform: 'translateY(0) translateX(0)' }, '25%': { transform: 'translateY(-20px) translateX(10px)' }, '50%': { transform: 'translateY(-10px) translateX(-10px)' }, '75%': { transform: 'translateY(-30px) translateX(15px)' } },
        glow: { '0%': { boxShadow: '0 0 20px rgba(99,102,241,0.3)' }, '100%': { boxShadow: '0 0 40px rgba(99,102,241,0.6)' } },
        typewriter: { '0%': { width: '0' }, '100%': { width: '100%' } },
        scan: { '0%': { top: '-5%', opacity: '0' }, '5%': { opacity: '1' }, '95%': { opacity: '1' }, '100%': { top: '105%', opacity: '0' } },
        confettiFall: { '0%': { transform: 'translateY(-20px) rotate(0deg) scale(1)', opacity: '1' }, '100%': { transform: 'translateY(110vh) rotate(720deg) scale(0.2)', opacity: '0' } },
        scaleIn: { '0%': { transform: 'scale(0.95)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      backgroundSize: { '200%': '200%' },
    },
  },
  plugins: [],
};
