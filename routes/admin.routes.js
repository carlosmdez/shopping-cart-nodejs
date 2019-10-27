const express = require('express')
const router = express.Router()

const { viewPath } = require('../utils/path')

const products = []

router.get('/add-product', (req, res) => {
  console.log('Add product')
  res.sendFile(viewPath('add-product.html'))
})

router.post('/add-product', (req, res) => {
  products.push({ title: req.body.title })
  res.redirect('/')
})

module.exports = { router, products }
