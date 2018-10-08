const path = require('path');
const webpackConfigName = 'webpack.' + process.env.env + '.config';
const webpackCfg = require('./build/' + webpackConfigName);
module.exports = webpackCfg;