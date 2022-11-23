/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      serif: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [require('daisyui')],

  daisyui: {
    themes: ['light'],
  },
};
