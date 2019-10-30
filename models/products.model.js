const fs = require('fs')

const { dataPath } = require('../utils/path')

const getProductsFromFile = (cb) => {
  fs.readFile(dataPath, (err, fileContent) => {
    if (err) {
      return cb([])
    }
    return cb(JSON.parse(fileContent))
  })
}

class Product {
  constructor(t) {
    this.title = t
  }

  save() {
    getProductsFromFile((products) =>{
      products.push(this)
      fs.writeFile(dataPath, JSON.stringify(products), err => {
        console.log(err)
      })
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb)
  }
}

module.exports = Product
