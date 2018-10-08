const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackConfigName = 'webpack.' + process.env.env + '.config';
const webpackEnvCfg = require('./' + webpackConfigName);
const webpack = require('webpack');
const webpackCfg = {
  mode: 'development',
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/index.js',
    another: './src/assets/component/Grid.js'
  },
  devtool: process.env.env === 'dev' ? 'cheap-eval-source-map' : 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),//必须绝对路径
    filename: '[name].dist.js'
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
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff)$/,
        loader: 'url-loader'
      }]
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