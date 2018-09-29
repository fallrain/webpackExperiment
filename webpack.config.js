const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, './index.html'),
  filename: 'index.html',
  hash: true
});
module.exports = {
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
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use:
          [ 'style-loader','css-loader','sass-loader']

      }
    ]
  },
  devServer: {
    port: 9999
  },
  plugins: [
    htmlWebpackPlugin
  ]
};