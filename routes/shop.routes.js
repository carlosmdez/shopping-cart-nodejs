const express = require('express')
const router = express.Router()

const adminData = require('./admin.routes')

router.get('/', (req, res) => {
  const products = adminData.products
  res.render('shop', {products, title: 'Shop', path: '/'})
})

module.exports = router
