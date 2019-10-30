const path = require('path')

rootDir = path.dirname(process.mainModule.filename)
const dataPath = path.join(rootDir, 'data', 'products.json')
const publicPath = path.join(rootDir, 'public')

module.exports = {dataPath, publicPath}
