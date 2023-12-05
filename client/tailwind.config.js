/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'ayurgreen': '#539C52',
        'yellowapp': '#F5CB5C'
      },
      fontFamily:{
        'opensans': ['Open Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}