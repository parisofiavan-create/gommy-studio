/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Nunito Sans', 'sans-serif'],
      },
      colors: {
        ink: '#17131d',
        paper: '#f7f1fa',
        pink: '#f0a8cc',
        purple: '#bba4ed',
        silver: '#d9dbe7',
        gold: '#e8ca83',
      },
    },
  },
  plugins: [],
}
