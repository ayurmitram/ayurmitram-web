/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'ayurgreen': '#539C52'
      },
      fontFamily:{
        'opensans': ['Open Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}