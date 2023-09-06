const Product = require('./../models/productModel')

// logic should be in comntroller not routes

// get all products
const getProducts = async (req, res) => {
	try {
		const products = await Product.find({})
		res.status(200).json(products)
	} catch (error) {
		console.log(error.message)
		res.status(500).json({ message: error.message })
	}
}

// get a single product
const getProduct = async (req, res) => {
	try {
		const { id } = req.params
		const product = await Product.findById(id)
		if (!product) {
			return res
				.status(404)
				.json({ message: `Can't find any product with ID ${id}'` })
		}
		res.status(200).json(product)
	} catch (error) {
		console.log(error.message)
		res.status(500).json({ message: error.message })
	}
}

// create a product
const createProduct = async (req, res) => {
	try {
		const product = await Product.create(req.body)
		res.status(200).json(product)
	} catch (error) {
		console.log(error.message)
		res.status(500).json({ message: error.message })
	}
}

// update a product
const updateProduct = async (req, res) => {
	try {
		const { id } = req.params
		const product = await Product.findByIdAndUpdate(id, req.body)
		// can't find product with id provided
		if (!product) {
			return res
				.status(404)
				.json({ message: `Can't find any product with ID ${id}'` })
		}
		const updatedProduct = await Product.findById(id)
		res.status(200).json(updatedProduct)
	} catch (error) {
		console.log(error.message)
		res.status(500).json({ message: error.message })
	}
}

// delete a product
const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params
		const product = await Product.findByIdAndDelete(id)
		// can't find product with id provided
		if (!product) {
			return res
				.status(404)
				.json({ message: `Can't find any product with ID ${id}'` })
		}
		res.status(200).json(product)
	} catch (error) {
		console.log(error.message)
		res.status(500).json({ message: error.message })
	}
}

module.exports = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
}
