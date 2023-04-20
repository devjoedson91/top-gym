/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#121214',
        secondary: '#202024',
        green_700: '#00875F',
        green_500: '#00B37E',
        gray_600: '#202024',
        gray_500: '#29292E',
        gray_400: '#323238',
        gray_300: '#7C7C8A',
        gray_200: '#C4C4CC',
        gray_100: '#E1E1E6',
        white: '#ffffff'
      },
      fontFamily: {
        regular: 'Roboto_400Regular',
        medium: 'Roboto_500Medium',
        bold: 'Roboto_700Bold',
        extrabold: 'Roboto_900Black'
      },
    },
  },
  plugins: [],
}

