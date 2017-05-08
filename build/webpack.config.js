var path = require('path')
var config = require('../config')
var webpack = require('webpack')
var HTMLPlugin = require('html-webpack-plugin')
    // var ExtractTextPlugin = require('extract-text-webpack-plugin')
var projectRoot = path.resolve(__dirname, '../')
    // const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
    //var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    entry: {
        index: './js/index.js',
        // vendor: [
        //     'vue',
        //     'vue-router',
        //     'vuex',
        //     'vuex-router-sync',
        //     'axios',
        //     'fastclick',
        //     'lodash',
        //     'swiper'
        // ]
    },
    output: {
        filename: '[name].js',
        path: config.build.assetsRoot,
        publicPath: config.build.assetsPublicPath
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    css: ['vue-style-loader', 'css-loader']
                }
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: [
                    { loader: "style-loader" }, {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        }
                    },
                    { loader: 'postcss-loader' },
                ]
                // use: ExtractTextPlugin.extract({
                //     fallback: "style-loader",
                //     use: ["css-loader"]
                // })
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]?[hash]'
            }
        }]
    },
    resolve: {
        extensions: ['.js', '.vue', '.css'],
        alias: {
            src: path.resolve(__dirname, '../js'),
            assets: path.resolve(__dirname, '../static'),
            components: path.resolve(__dirname, '../js/components'),
            'vue$': 'vue/dist/vue.esm.js',
        }
    },
    devtool: process.env.NODE_ENV === JSON.parse(config.dev.env.NODE_ENV) ? '#eval-source-map' : 'source-map',
    plugins: [
        //      new BundleAnalyzerPlugin(),
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor'
        // }),

        // new ExtractTextPlugin('[name].[contenthash].css'),
        // new UglifyJSPlugin({
        //     sourceMap: false
        // }),
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.LoaderOptionsPlugin({
        //     minimize: false
        // }),
        new HTMLPlugin({
            template: 'index.html'
        }),
    ]
};
