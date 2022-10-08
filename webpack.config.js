const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: {
		controller: './app/js/controller/controller.js',
		screen: './app/js/screen/screen.js',
	},
	output: {
		filename: 'assets/[name].[contenthash].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'screen.html',
			template: 'app/html/screen.html',
			chunks: ['screen'],
		}),
		new HtmlWebpackPlugin({
			filename: 'controller.html',
			template: 'app/html/controller.html',
			chunks: ['controller'],
		}),
	],
}
