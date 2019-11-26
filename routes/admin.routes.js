const express = require('express')
const router = express.Router()

const adminController = require('../controllers/admin.controller')

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct)

// /admin/edit-product/id => GET
router.get('/edit-product/:id', adminController.getEditProduct)

// /admin/products => GET
router.get('/products', adminController.getProducts)

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct)

// /admin/edit-product => POST
router.post('/edit-product', adminController.postEditProduct)

// /admin/delete-product/id => POST
router.post('/delete-product', adminController.postDeleteProduct)

module.exports = router
