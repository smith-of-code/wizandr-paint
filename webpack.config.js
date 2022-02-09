const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        app: path.resolve(__dirname, './src/js/app.js'),
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader']

            },
            {test: /\.(js)$/, use: 'babel-loader'}
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(
            {filename: 'app.css'}
        ),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        })
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
    }
}