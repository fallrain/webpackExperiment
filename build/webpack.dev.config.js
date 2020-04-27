const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');// 优化编译信息展示
const notifier = require('node-notifier');// 优化错误信息展示
const merge = require('webpack-merge');
const webpackCommonCfg = require('./webpack.common.config');
const config = require('../config/dev');

const webpackCfg = merge(webpackCommonCfg, {
  mode: 'development',
  devServer: {
    port: 9999,
    host: '0.0.0.0',
    quiet: true, // 不在控制台打印经过编译的文件等信息friendly-errors-webpack-plugin
    publicPath: '/',
    proxy: {
      '/vipcenter': {
        // target: 'http://10.190.179.188:8089/',
        target: 'http://testvip.haier.net/',
        changeOrigin: true
      }
    },
    // contentBase: '../dist'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config
    }),
  ],
});
webpackCfg.plugins.push(new FriendlyErrorsPlugin({
  compilationSuccessInfo: {
    messages: [`Your application is running here: http://localhost:${webpackCfg.devServer.port}`],
  },
  onErrors(severity, errors) {
    if (severity !== 'error') {
      return;
    }
    const error = errors[0];
    console.log(error);
    notifier.notify({
      title: 'Webpack error',
      message: `${severity}: ${error.webpackError}`,
      subtitle: error.file || '',
      // icon: ICON
    });
  },
}));
module.exports = webpackCfg;
