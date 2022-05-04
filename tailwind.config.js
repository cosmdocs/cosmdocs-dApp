module.exports = {
  mode: 'jit',
  content: [
    './src/components/*.{js,ts,jsx,tsx}',
    './src/pages/*.{js,ts,jsx,tsx}',
    './src/pages/[multisigAddress]/*.{js,ts,jsx,tsx}',
  ],
  purge: {
    content: [
      './src/components/*.{js,ts,jsx,tsx}',
      './src/pages/*.{js,ts,jsx,tsx}',
      './src/pages/[multisigAddress]/*.{js,ts,jsx,tsx}',
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
