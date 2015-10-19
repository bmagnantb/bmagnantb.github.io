var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: {
		app: './js/app.js'
	},
	output: {
		path: __dirname + '/dist',
		filename: 'app.js',
		publicPath: 'dist'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: [/node_modules/],
				loader: 'babel'
			},
			{
				test: /\.s?css$/,
				loader: ExtractTextPlugin.extract('style', 'css?minimize!postcss!sass')
			}
		],
		postcss: function() { return [ autoprefixer ] }
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	plugins: [
		new ExtractTextPlugin('style.css')
	]
}