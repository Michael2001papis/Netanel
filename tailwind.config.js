/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        premium: {
          gold: '#D4AF37',
          dark: '#0A0A0A',
          gray: '#1A1A1A',
          light: '#F5F5F5',
        },
        admin: {
          dark: '#0F172A',
          blue: '#1E40AF',
          light: '#F8FAFC',
        },
        ceo: {
          purple: '#7C3AED',
          dark: '#1E1B4B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}