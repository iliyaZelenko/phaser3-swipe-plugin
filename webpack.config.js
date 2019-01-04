const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'MyLib',
    umdNamedDefine: true
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ },
      { test: /phaser\.js$/, loader: 'expose-loader?Phaser' }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ],
  optimization: {
    minimize: true
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}
