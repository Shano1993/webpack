const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");


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

const production = {
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            import: true,
                            sourceMap: true,
                        }
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: "asset/resource",
                generator: {
                    filename: 'images/[name][ext]'
                }
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-object-rest-spread']
                }
            }
        ],
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/[name].css',
        }),
    ]
}

const development = {
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            import: true,
                            sourceMap: true,
                        }
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: "asset/resource",
                generator: {
                    filename: 'images/[name][ext]'
                }
            },
        ]
    },
    optimization: {
        minimize: false,
    }
}