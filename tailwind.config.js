/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
    `./gatsby-browser.jsx`,
  ],
  theme: {
    extend: {
      colors: {
        codebox: '#011627',
      },
    },
  },
  plugins: [],
}
