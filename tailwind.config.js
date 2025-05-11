/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          950: '#0a051c',
          900: '#1a0b3b',
          800: '#2c1166',
          700: '#3d1992',
          600: '#4e22bd',
          500: '#5e2ae3',
          400: '#7e54e8',
          300: '#9e7eee',
          200: '#bea8f4',
          100: '#ded1fa',
        },
        pink: {
          900: '#4d0733',
          800: '#800c55',
          700: '#b31176',
          600: '#e61598',
          500: '#ff1cab',
          400: '#ff4dbc',
          300: '#ff7ecd',
          200: '#ffadde',
          100: '#ffdcef',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};