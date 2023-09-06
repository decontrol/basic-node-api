const Product = require('./../models/productModel')
const asyncHandler = require('express-async-handler')

// logic should be in comntroller not routes

// get all products
const getProducts = asyncHandler(async (req, res) => {
	try {
		const products = await Product.find({})
		res.status(200).json(products)
	} catch (error) {
		res.status(500)
		throw new Error(error.message)
	}
})

// get a single product
const getProduct = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params
		const product = await Product.findById(id)
		if (!product) {
			res.status(404)
			throw new Error(`Can't find any product with ID ${id}'`)
			// return res
			// 	.status(404)
			// 	.json({ message: `Can't find any product with ID ${id}'` })
		}
		res.status(200).json(product)
	} catch (error) {
		res.status(500)
		throw new Error(error.message)
		// console.log(error.message)
		// res.status(500).json({ message: error.message })
	}
})

// create a product
const createProduct = asyncHandler(async (req, res) => {
	try {
		const product = await Product.create(req.body)
		res.status(200).json(product)
	} catch (error) {
		res.status(500)
		throw new Error(error.message)
	}
})

// update a product
const updateProduct = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params
		const product = await Product.findByIdAndUpdate(id, req.body)
		// can't find product with id provided
		if (!product) {
			res.status(404)
			throw new Error(`Can't find any product with ID ${id}'`)
			// return res
			// 	.status(404)
			// 	.json({ message: `Can't find any product with ID ${id}'` })
		}
		const updatedProduct = await Product.findById(id)
		res.status(200).json(updatedProduct)
	} catch (error) {
		res.status(500)
		throw new Error(error.message)
	}
})

// delete a product
const deleteProduct = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params
		const product = await Product.findByIdAndDelete(id)
		// can't find product with id provided
		if (!product) {
			res.status(404)
			throw new Error(`Can't find any product with ID ${id}'`)
			// return res
			// 	.status(404)
			// 	.json({ message: `Can't find any product with ID ${id}'` })
		}
		res.status(200).json(product)
	} catch (error) {
		res.status(500)
		throw new Error(error.message)
	}
})

module.exports = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
}
