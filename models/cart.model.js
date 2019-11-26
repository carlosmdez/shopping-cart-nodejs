const fs = require('fs')
const { cartPath } = require('../utils/path')

class Cart {
  constructor() {
    this.products = []
  }

  static addProduct(id, productPrice) {
    //Fetch the previous cart
    fs.readFile(cartPath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 }
      if (!err) {
        cart = JSON.parse(fileContent)
      }
      //Analyze the cart => find existing product
      const existingProductIndex = cart.products.findIndex(
        product => product.id == id
      )
      const existingProduct = cart.products[existingProductIndex]
      let updatedProduct
      //Add new product or increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct }
        updatedProduct.quantity++
        cart.products[existingProductIndex] = updatedProduct
      } else {
        updatedProduct = { id, quantity: 1 }
        cart.products = [...cart.products, updatedProduct]
      }
      cart.totalPrice = cart.totalPrice + +productPrice
      fs.writeFile(cartPath, JSON.stringify(cart), err => {
        console.log(err)
      })
    })
  }
  static deleteProduct(id, price) {
    fs.readFile(cartPath, (err, fileContent) => {
      if (err) {
        return
      }
      let cart = JSON.parse(fileContent)
      const updatedCart = { ...cart }
      const product = updatedCart.products.find(product => product.id === id)
      if (!product) {
        return
      }
      const productQuantity = product.quantity
      updatedCart.products = updatedCart.products.filter(
        product => product.id !== id
      )
      updatedCart.totalPrice = updatedCart.totalPrice - productQuantity * price
      fs.writeFile(cartPath, JSON.stringify(updatedCart), err => {
        console.log(err)
      })
    })
  }

  static getProducts(cb) {
    fs.readFile(cartPath, (err, fileContent) => {
      if (err) {
        cb(null)
      } else {
        let cart = JSON.parse(fileContent)
        cb(cart)
      }
    })
  }
}

module.exports = Cart
