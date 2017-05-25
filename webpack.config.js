/* eslint-env node */
var path = require('path');

module.exports = {
    entry: {
        'dashboard-api': './dashboard-api'
    },
    output: {
        path: __dirname + '/dist',
        libraryTarget: 'umd',
        library: 'Dashboard',
        filename: '[name].js'
    },
    module: {}
};