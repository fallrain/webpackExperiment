const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');//优化编译信息展示
const notifier = require('node-notifier');//优化错误信息展示
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, './index.html'),
  filename: 'index.html',
  hash: true
});
const webpackCfg = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].dist.js'
  },
  devtool: 'cheap-eval-source-map',
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
  devServer: {
    port: 9999,
    quiet: true,//不在控制台打印经过编译的文件等信息friendly-errors-webpack-plugin
  },
  plugins: [
    htmlWebpackPlugin
  ]
};
webpackCfg.plugins.push(new FriendlyErrorsPlugin({
  compilationSuccessInfo: {
    messages: [`Your application is running here: http://localhost:${webpackCfg.devServer.port}`],
  },
  onErrors: function (severity, errors) {
    if (severity !== 'error') {
      return;
    }
    const error = errors[0];
    console.log(error);
    notifier.notify({
      title: "Webpack error",
      message: severity + ': ' + error.webpackError,
      subtitle: error.file || '',
      //icon: ICON
    });
  },
}));
module.exports = webpackCfg;