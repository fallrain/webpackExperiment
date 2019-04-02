const path = require('path');
const webpackCommonCfg = require('./webpack.common.config');
const merge = require('webpack-merge');//合并
const CleanWebpack = require('clean-webpack-plugin');//清理文件夹
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//提取css
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const webpackCfg = merge(webpackCommonCfg, {
  mode: 'production',
  plugins: [
    new CleanWebpack(
      ['dist'],
      {
        root: path.resolve(__dirname, '../')//必须指定根目录
        //exclude: ['shared.js'],
        //verbose: true,
        //dry: false
      }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',//contenthash保证css的hash不会随着js的变化而变化
      chunkFilename: "[id].[contenthash].css"
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimizer:[
      new OptimizeCssAssetsPlugin()
    ]
  }
});
module.exports = webpackCfg;
