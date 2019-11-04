const Product = require('../models/products.model')

exports.getIndex = (req, res) => {
  Product.fetchAll(products => {
    res.render('shop/index', { products, title: 'Home', path: '/' })
  })
}

exports.getProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      products,
      title: 'All products',
      path: '/products'
    })
  })
}

exports.getCart = (req, res) => {
  res.render('shop/cart', { title: 'My Cart', path: '/cart' })
}

exports.getOrders = (req, res) => {
  res.render('shop/orders', { title: 'My Orders', path: '/orders' })
}

exports.getCheckout = () => {
  res.render('shop/checkout', {
    products,
    title: 'Checkout',
    path: '/checkout'
  })
}
