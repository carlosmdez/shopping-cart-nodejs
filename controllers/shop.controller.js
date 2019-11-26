const Product = require('../models/products.model')
const Cart = require('../models/cart.model')

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

exports.getProduct = (req, res) => {
  const prodId = req.params.productId
  console.log(prodId)
  Product.findById(prodId, product => {
    res.render('shop/product-detail', {
      title: 'Product Detail',
      path: '/products',
      product
    })
  })
}

exports.getCart = (req, res) => {
  Cart.getProducts(cart => {
    Product.fetchAll(products => {
      cartProducts = []
      for (const product of products) {
        const cartProductData = cart.products.find(p => p.id === product.id)
        if (cartProductData) {
          cartProducts.push({
            productData: product,
            quantity: cartProductData.quantity
          })
        }
      }
      res.render('shop/cart', {
        title: 'My Cart',
        path: '/cart',
        products: cartProducts
      })
    })
  })
}

exports.postCart = (req, res) => {
  const { productId } = req.body
  Product.findById(productId, product => {
    Cart.addProduct(productId, product.price)
  })
  res.redirect('/cart')
}

exports.deleteCartItem = (req, res) => {
  const { productId } = req.body
  Product.findById(productId, product => {
    Cart.deleteProduct(productId, product.price)
    res.redirect('/cart')
  })
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
