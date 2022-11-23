/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './app.js'],
  theme: {
    extend: {
      fontFamily: {
        "sans": "Roboto",
        "title": "Acme"
      },
      colors: {
        "yellow": "#e8bc49",
        "green": "#98ce85",
        "orange": "#d86550",
      },
    },
  },
  plugins: [],
}
