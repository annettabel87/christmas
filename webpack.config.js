const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


const baseConfig = {
    entry: path.resolve(__dirname, './src/index.ts'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
                type: 'asset/resource',
              },
               {
                test: /\.json$/i,
                type: 'asset/resource',
              },
            {
                test: /\.[tj]s$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
         new CopyPlugin({
             patterns: [
               { from:  "./src/assets/toys", to: "./assets/toys" },
               { from: "./src/assets/audio", to: "./assets/audio" },
               { from: "./src/assets", to: "./assets" },
             ],
          }),
        
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'dev';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');
    new ESLintPlugin({extensions: ['.ts', '.js']})
    return merge(baseConfig, envConfig);
};
