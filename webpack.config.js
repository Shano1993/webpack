const webpack = require('webpack');
const path = require('path');
const development = require("./webpack.config.dev");
const production = require("./webpack.config.prod");

module.exports = (env, argv) => {

    const config = argv.mode === 'development' ? development : production;

    return {
        entry: {
            front: './assets/js/front/main.js',
            admin: './assets/js/admin/main.js'
        },
        output: {
            path: path.resolve(__dirname, 'public/build'),
            filename: './js/[name]-bundle.js',
            publicPath: '/build/',
            clean: true,
        },
        ...config,
    }
}