var shell=require('shelljs')
shell.env['NODE_ENV']='production'

var path=require('path')
var config=require('../config')
var ora=require('ora')
var webpack=require('webpack')
var webpackConfig=require('./webpack.config')

var spinner=ora('build for production ...')
spinner.start()

var assetsPath=path.join(config.build.assetsRoot,config.build.assetsSubDirectory)

//shell.rm('-rf',assetsPath)
//shell.mkdir('-p',assetsPath)
//shell.cp('-Rf','static/*',assetsPath)
shell.rm('-rf',config.build.assetsRoot)
shell.mkdir('-p',config.build.assetsRoot) 

webpack(webpackConfig,function (err,stats) {
	spinner.stop()
	if(err) throw err
	process.stdout.write(stats.toString({
		colors:true,
		modules:false,
		children:false,
		chunks:false,
		chunkModules:false
	})+'\n')
})
