/* eslint-env node */
const path = require('path');

module.exports = {
  entry: {
    'dashboard-api': './components/dashboard-api/src/dashboard-api',
    localization: './components/localization/src/localization'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'Dashboard',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {targets: 'safari >= 13, last 2 iOS versions'}]
            ]
          }
        }
      }
    ]
  }
};
