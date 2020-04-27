const path = require('path');
const merge = require('webpack-merge');// 合并
const CleanWebpack = require('clean-webpack-plugin');// 清理文件夹
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// 提取css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');// 压缩js
const webpackCommonCfg = require('./webpack.common.config');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

const webpackCfg = merge(webpackCommonCfg, {
  mode: 'production',
  plugins: [
    new CleanWebpack(
      ['dist'],
      {
        root: path.resolve(__dirname, '../'), // 必须指定根目录
        // exclude: ['shared.js'],
        // verbose: true,
        // dry: false
      },
    ),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css', // contenthash保证css的hash不会随着js的变化而变化
      chunkFilename: '[id].[contenthash].css',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new OptimizeCssAssetsPlugin({
      }),
      new TerserPlugin({
        // terserOptions参考vuecli3
        terserOptions: {
          compress: {
            // turn off flags with small gains to speed up minification
            arrows: false,
            collapse_vars: false, // 0.3kb
            comparisons: false,
            computed_props: false,
            hoist_funs: false,
            hoist_props: false,
            hoist_vars: false,
            inline: false,
            loops: false,
            negate_iife: false,
            properties: false,
            reduce_funcs: false,
            reduce_vars: false,
            switches: false,
            toplevel: false,
            typeofs: false,

            // a few flags with noticable gains/speed ratio
            // numbers based on out of the box vendor bundle
            booleans: true, // 0.7kb
            if_return: true, // 0.4kb
            sequences: true, // 0.7kb
            unused: true, // 2.3kb

            // required features to drop conditional branches
            conditionals: true,
            dead_code: true,
            evaluate: true
          },
          mangle: {
            safari10: true
          }
        },
        cache: false,
        sourceMap: true
      })
    ]
  },
});
module.exports = smp.wrap(webpackCfg);
