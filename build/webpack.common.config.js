const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackConfigName = 'webpack.' + process.env.env + '.config';
const webpackEnvCfg = require('./' + webpackConfigName);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//提取css
const webpack = require('webpack');
let splitCssLoader;
if (process.env.env === 'dev') {
  splitCssLoader = 'style-loader';
} else {
  splitCssLoader = MiniCssExtractPlugin.loader;
}
const webpackCfg = {
  mode: 'development',
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/index.js',
    another: './src/assets/component/Grid.js'//多入口
  },
  devtool: process.env.env === 'dev' ? 'cheap-eval-source-map' : 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),//必须绝对路径
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: {
          loader: 'babel-loader?cacheDirectory=true'
        },
        exclude: [/node_modules/]
      },
      {
        test: /\.(sass|scss)$/,
        use: [splitCssLoader, 'css-loader?modules', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: [splitCssLoader, 'css-loader?modules']
      },
      {
        test: /\.(eot|svg|ttf|woff)$/,
        loader: 'url-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      hash: true
    }),
    new webpack.DefinePlugin({
      'process.envCfg': require('../config/' + process.env.env)
    }),
  ]
};

module.exports = webpackCfg;
