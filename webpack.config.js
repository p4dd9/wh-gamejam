const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: {
		controller: './app/js/controller/controller.js',
		screen: './app/js/screen/screen.js',
	},
	output: {
		filename: 'assets/[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		assetModuleFilename: 'assets/[name][ext]',
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		],
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
		new CopyPlugin({
			patterns: [
				{
					from: '**/*',
					to: 'assets',
					context: path.resolve(__dirname, 'app/img/'),
				},
			],
		}),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		compress: true,
		port: 8887,
	},
}
