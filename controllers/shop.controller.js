const Product = require('../models/products.model')
const Cart = require('../models/cart.model')

exports.getIndex = (req, res) => {
  Product.fetchAll()
    .then(([products, fieldData]) => {
      res.render('shop/index', { products, title: 'Home', path: '/' })
    })
    .catch(er => console.log(err))
}

exports.getProducts = (req, res) => {
  Product.fetchAll()
    .then(([products, fieldData]) => {
      res.render('shop/product-list', {
        products,
        title: 'All products',
        path: '/products'
      })
    })
    .catch(er => console.log(err))
}

exports.getProduct = (req, res) => {
  const prodId = req.params.productId
  Product.findById(prodId)
  .then(([product]) => {
    res.render('shop/product-detail', {
      title: 'Product Detail',
      path: '/products',
      product: product[0]
    })
  })
  .catch(err => console.log(err))
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
