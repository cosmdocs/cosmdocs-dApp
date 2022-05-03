module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './src/**/*.{js,ts,jsx,tsx}'
    ],
    options: {
      safelist: [/data-theme$/],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [require('./src/styles/daisyui-themes.json')],
  },
}
