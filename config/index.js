var path = require('path')

module.exports = {
	build: {
		env: {
			NODE_ENV: '"production"'
		},
		index: path.resolve(__dirname, '../dist/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsPublicPath: '/', //h5plus app 需使用本地相对路径，需要注释掉
		assetsSubDirectory: 'static',
		productionSourceMap: true,
		productionGzip: false,
		productionGzipExtensions: ['js', 'css']
	},
	dev: {
		env: {
			NODE_ENV: '"development"'
		},
		port: 8081,
		proxyTable: {},
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
	}
}