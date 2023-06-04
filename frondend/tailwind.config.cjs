/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'color-change': {
          '0%': { backgroundColor: '#48bb78' },
          '25%': { backgroundColor: '#ed64a6' },
          '50%': { backgroundColor: '#818cf8' },
          '75%': { backgroundColor: '#f56565' },
          '100%': { backgroundColor: '#48bb78' },
        },
      },
      animation: {
        'color-change': 'color-change 5s infinite',
      },
    },
  },
  plugins: [require("daisyui")],
}