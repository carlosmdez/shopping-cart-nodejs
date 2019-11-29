const Product = require('../models/products.model')

exports.getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    title: 'Add Product',
    path: '/admin/add-product',
    editMode: false
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
  const product = new Product(null, title, imageUrl, description, price)
  product
    .save()
    .then(() => {
      res.redirect('/')
    })
    .catch(err => console.log(err))
}

exports.postEditProduct = (req, res) => {
  const { id, title, imageUrl, description, price } = req.body
  const product = new Product(id, title, imageUrl, description, price)
  product.save()
  res.redirect('/')
}

exports.getEditProduct = (req, res) => {
  const prodId = req.params.id
  Product.findById(prodId, product => {
    if (!product) {
      res.redirect('/')
    }
    res.render('admin/edit-product', {
      title: 'Edit Product',
      path: '/admin/edit-product',
      product,
      editMode: true
    })
  })
}

exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId
  Product.deleteById(prodId)
  res.redirect('/admin/products')
}
