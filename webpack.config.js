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
        test: /\.js/,
        include: [path.resolve('.', './components/localization')],
        loader: 'babel-loader',
        query: {
          presets: [
            [
              'env', {
                useBuiltIns: true,
                modules: 'umd'
              }
            ]
          ],
          plugins: [
            'babel-plugin-transform-runtime',
            'babel-plugin-transform-class-properties'
          ]
        }
      }
    ]
  }
};
