const Product = require('../models/products.model')

exports.getAddProduct = (req, res) => {
  res.render('admin/add-product', {
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
  Product.fetchAll(products => {
    res.render('shop/product-list', { products, title: 'Shop', path: '/' })
  })
}
