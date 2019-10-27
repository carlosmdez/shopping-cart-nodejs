const express = require('express')
const router = express.Router()

const { viewPath } = require('../utils/path')
const adminData = require('./admin.routes')

router.get('/', (req, res) => {
  console.log(adminData.products)
  res.sendFile(viewPath('shop.html'))
})

module.exports = router
