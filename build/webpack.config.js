var path = require('path')
var config = require('../config')
var webpack = require('webpack')
var HTMLPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var projectRoot = path.resolve(__dirname, '../')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
//var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
	entry: {
		index: './js/index.js',
		vendor: [
			'vue',
			'vue-router',
			'vuex',
			'vuex-router-sync',
			'axios',
			'fastclick',
			'lodash',
			'swiper'
		]
	},
	output: {
		filename: process.env.NODE_ENV === config.dev.env.NODE_ENV ? '[name].[hash].js' : '[name].[chunkhash].js',
		path: config.build.assetsRoot,
		publicPath: config.build.assetsPublicPath
	},
	module: {
		rules: [{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						css: ExtractTextPlugin.extract({
							use: 'css-loader',
							fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
						})
					}
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: projectRoot,
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				// exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader"]
				})
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	resolve: {
		extensions: ['.js', '.vue', '.css'],
		alias: {
			vue$: 'vue/dist/vue.common.js',
			src: path.resolve(__dirname, '../js'),
			assets: path.resolve(__dirname, '../static'),
			components: path.resolve(__dirname, '../js/components')
		}
	},
	devtool: process.env.NODE_ENV === config.dev.env.NODE_ENV ? '#eval-source-map' : 'source-map',
	plugins: [
		//		new BundleAnalyzerPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: `'${process.env.NODE_ENV}'`
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new HTMLPlugin({
			template: 'index.html'
		}),
		new ExtractTextPlugin('[name].[contenthash].css'),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new UglifyJSPlugin({
			sourceMap: true
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	]
};