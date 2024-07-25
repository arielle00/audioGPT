/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColorRed: '#704045', 
        customColorGray: '#8B8B94',
      }
    },
  },
  plugins: [],
}
