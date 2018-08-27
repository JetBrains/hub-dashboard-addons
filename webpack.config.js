/* eslint-env node */
var path = require('path');

module.exports = {
    entry: {
        'dashboard-api': './components/dashboard-api/src/dashboard-api',
        'localization': './components/localization/src/localization'
    },
    output: {
        path: __dirname + '/dist',
        libraryTarget: 'umd',
        library: 'Dashboard',
        filename: '[name].js'
    },
    module: {
        strictExportPresence: true,
        rules: [
          {
            test: /\.js/,
            include: [__dirname],
            loader: 'babel-loader',
            query: {
              presets: [
                path.resolve(__dirname, path.join('node_modules', '@jetbrains', 'babel-preset-jetbrains'))
              ],
              plugins: [
                'babel-plugin-transform-runtime'
              ]
            }
          }
        ]
    }
};