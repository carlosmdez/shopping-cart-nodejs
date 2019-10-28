const Product = require('../models/products.model')

exports.getAddProduct = (req, res) => {
  res.render('add-product', {
    title: 'Add Product',
    path: '/admin/add-product'
  })
}

exports.postAddProduct = (req, res) => {
  const product = new Product(req.body.title)
  product.save()
  res.redirect('/')
}

exports.getProducts = (req, res) => {
  const products = Product.fetchAll()
  res.render('shop', { products, title: 'Shop', path: '/' })
}
