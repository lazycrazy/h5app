var path = require('path')
module.exports = {
    plugins: [
        require('postcss-import')({ path: path.resolve(__dirname, 'js/css') }),
        require('precss')({ /* ...options */ }),
        require('autoprefixer')({ /* ...options */ }),
    ]
}
