const path = require('path');
const webpackCommonCfg = require('./webpack.common.config');
const merge = require('webpack-merge');
const webpackCfg = merge(webpackCommonCfg, {
  mode: 'production',
  plugins: []
});
module.exports = webpackCfg;