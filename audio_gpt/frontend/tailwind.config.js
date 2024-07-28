/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2C3E50',
        secondary: '#1ABC9C',
        accent: '#E74C3C',
        background: '#ECF0F1',
        text: '#2F4F4F',
      }
    },
  },
  plugins: [],
}
