const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: colors.sky[700],
      secondary: colors.slate[600],
      dark: colors.slate[900],
      light: colors.slate[200],
      white: colors.slate[50],
      error: colors.red[700],
    },
    extend: {
      fontSize: {
        base: ['18px', '24px'],
      },
      fontFamily: {
        sans: ['var(--font-catamaran)', ...fontFamily.sans],
      },
    },

  },
  plugins: [],
}
