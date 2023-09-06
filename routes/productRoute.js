const express = require('express')
const {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} = require('./../controllers/productController')

const router = express.Router()

// get all products
router.get('/', getProducts)

// get a single product with id
router.get('/:id', getProduct)

// post a product
router.post('/', createProduct)

// update a product --> use 'put' or 'patch'
router.put('/:id', updateProduct)

// delete a single product with id
router.delete('/:id', deleteProduct)

module.exports = router
