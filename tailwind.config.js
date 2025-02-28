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
        chicPrimary: '#2C3E50',
        chicSecondary: '#34495E',
        chicThree: '#7F8C8D',
        chicFour: '#BDC3C7',
        chicFive: '#ECF0F1',
      },
    },
  },
  plugins: [],
}
