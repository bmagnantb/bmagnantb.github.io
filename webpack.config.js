const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: { path: __dirname + '/build', filename: 'bundle.js' },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [ 'babel-loader', 'eslint-loader' ]
      },
      { test: /\.(css)$/, use: [ 'style-loader', 'css-loader' ] }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('./build'),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: { hot: true, overlay: true },
  resolve: {
  alias: {
    'styled-components': path.resolve(process.cwd(), 'node_modules', 'styled-components'),
  }
  }
}
