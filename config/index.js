var path = require('path')

module.exports = {
	build: {
		env: 'production',
		index: path.resolve(__dirname, '../dist/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsPublicPath: '/dist/',
		assetsSubDirectory: 'static',
		productionSourceMap: true,
		productionGzip: false,
		productionGzipExtensions: ['js', 'css']
	}
}