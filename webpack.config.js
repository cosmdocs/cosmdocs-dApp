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
webpackFinal: async (config) => {
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto",
  })
  return config
}