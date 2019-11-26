const fs = require('fs')

const Cart = require('./cart.model')

const { dataPath } = require('../utils/path')

const getProductsFromFile = cb => {
  fs.readFile(dataPath, (err, fileContent) => {
    if (err) {
      return cb([])
    }
    return cb(JSON.parse(fileContent))
  })
}

class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(product => product.id === this.id)
        const updatedProducts = [...products]
        updatedProducts[existingProductIndex] = this
        fs.writeFile(dataPath, JSON.stringify(updatedProducts), err => {
          console.log(err)
        })
      } else {
        this.id = Math.random().toString()
        products.push(this)
        fs.writeFile(dataPath, JSON.stringify(products), err => {
          console.log(err)
        })
      }
    })
  }

  static deleteById(id){
    getProductsFromFile(products => {
      const productPrice = products.find(product => product.id === id).price
      const updatedProducts = products.filter(product => product.id !== id)
      fs.writeFile(dataPath, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, productPrice)
        }
      })
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb)
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id)
      cb(product)
    })
  }
}

module.exports = Product
