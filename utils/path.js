const path = require('path')

rootDir = path.dirname(process.mainModule.filename)
const viewPath = view => path.join(rootDir, 'views', view)
const publicPath = path.join(rootDir, 'public')

module.exports = {viewPath, publicPath}
