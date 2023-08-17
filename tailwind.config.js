/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef9ff',
          100: '#dcf4ff',
          200: '#b2eaff',
          300: '#6ddbff',
          400: '#20c9ff',
          500: '#00b3ff',
          600: '#008fdf',
          700: '#0072b4',
          800: '#006095',
          900: '#004f7a',
          950: '#003b60',
        },
        secondary: {
          50: '#fff9eb',
          100: '#feeec7',
          200: '#fedc89',
          300: '#fdc54c',
          400: '#fcad23',
          500: '#e98208',
          600: '#da6505',
          700: '#b54408',
          800: '#93340d',
          900: '#792c0e',
          950: '#451403',
        },
        third: {
          50: '#eefaeb',
          100: '#dbf3d4',
          200: '#b9e9ad',
          300: '#8ed97d',
          400: '#68c754',
          500: '#4bb138',
          600: '#358828',
          700: '#2a6922',
          800: '#265420',
          900: '#23481f',
          950: '#0e270c',
        },
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}