const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
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
      }
    ]
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
    console.log('errors:',errors);
  },
}));
module.exports = webpackCfg;