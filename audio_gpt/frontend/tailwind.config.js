/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColorRed: '#D23E3E', 
        customColorGray: '#8B8B94',
        customColorGreen:  '#4CAF50',
      }
    },
  },
  plugins: [],
}
