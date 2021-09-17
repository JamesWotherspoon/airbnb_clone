const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    devtool: 'inline-source-map',
    devServer: {
        inline: true,
        contentBase: './dist',
        watchContentBase: true,
        liveReload: true,
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: "https://jameswotherspoon.github.io/airbnb_clone/",
    },
    module: {
        rules: [
          {
            test: /\.scss$/i,
            use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
          },
          {
            test: /\.html$/i,
            loader: 'html-loader',
          },
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }, 
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
          }
        ],
      },
      plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
          title: 'Airbnb',
          template: "./src/index.html",
          filename: "./index.html"
        }),
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
        })
      ],
    };





