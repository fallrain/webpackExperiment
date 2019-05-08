const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfigName = `webpack.${process.env.env}.config`;
const webpackEnvCfg = require(`./${webpackConfigName}`);
const envCfg = require(`../config/${process.env.env}`);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// 提取css
const webpack = require('webpack');

let splitCssLoader;
const isDev = process.env.env === 'dev';
if (isDev) {
  splitCssLoader = {
    loader: 'style-loader',
    options: {
      sourceMap: true
    }
  };
} else {
  splitCssLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      sourceMap: true
    }
  };
}
const webpackCfg = {
  mode: 'development',
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/index.js',
    another: 'xlsx'// 多入口
  },
  devtool: process.env.env === 'dev' ? 'cheap-eval-source-map' : 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist'), // 必须绝对路径
    filename: '[name].[chunkhash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      ax: path.resolve(__dirname, '../src/axios'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: {
          loader: 'babel-loader?cacheDirectory=true',
        },
        exclude: [/node_modules/],
      },
      {
        test: /\.(sass|scss)$/,
        use: [splitCssLoader, {
          loader: 'css-loader',
          options: {
            modules: true, // 作用域css
            sourceMap: true
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
        ],
      },
      {
        test: /\.less$/,
        use: [
          splitCssLoader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              javascriptEnabled: true // less是否可内联js
            },
          },
        ],
      },
      {
        test: /\.css$/,
        // use: [splitCssLoader, 'css-loader?modules']
        use: [splitCssLoader, 'css-loader'],
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
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      hash: true,
    }),
    new webpack.DefinePlugin({
      'process.envCfg': envCfg,
    }),
  ],
};

module.exports = webpackCfg;
