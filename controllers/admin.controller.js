const Product = require('../models/products.model')

exports.getAddProduct = (req, res) => {
  res.render('admin/add-product', {
    title: 'Add Product',
    path: '/admin/add-product'
  })
}

exports.getProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      products,
      title: 'Admin products',
      path: '/admin/products'
    })
  })
}

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, description, price } = req.body
  const product = new Product(title, imageUrl, description, price)
  product.save()
  res.redirect('/')
}
