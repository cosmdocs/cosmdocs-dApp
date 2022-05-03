module.exports = {
  webpack: (config) => {
  // Override config of webpack CRA
  const overrideConfig = override(
  addPostcssPlugins([
  require('tailwindcss')('./tailwind.config.js'),
  require('autoprefixer'),
  ]),
  addWebpackAlias(nxPathAlias),
  )(config);
  return config;
  },
  };
// webpackFinal: async (config) => {
//   config.module.rules.push({
//     test: /\.mjs$/,
//     include: /node_modules/,
//     type: "javascript/auto",
//   }),
//   addPostcssPlugins([
//     require('tailwindcss')('./tailwind.config.js'),
//     require('autoprefixer'),
//     ])
//   return config
// }
// const config = {
//     mode: 'production', // "production" | "development" | "none"
//     resolve: {
//       extensions: ['*', '.mjs', '.js', '.json']
//     },
//     module: {
//       rules: [
//         {
//           test: /\.mjs$/,
//           include: /node_modules/,
//           type: 'javascript/auto'
//         }
//       ]
//     }
//   }
  
//   module.exports = config