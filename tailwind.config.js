/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        dark: {
          100: '#2D2D2D',
          200: '#252525',
          300: '#1F1F1F',
          400: '#181818',
          500: '#121212',
          600: '#0A0A0A',
          700: '#070707',
          800: '#050505',
          900: '#000000',
        },
        gray: {
          850: '#151515',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'xxs': '0.65rem',
      },
    },
  },
  plugins: [],
}
