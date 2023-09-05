const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json()) // middleware for json

app.use(express.urlencoded({ extended: false })) // middleware for form url encoded

// routes
app.get('/', (req, res) => {
	res.send('Hello Node API!')
})

app.get('/blog', (req, res) => {
	res.send("Hello this is JTA's Blog!")
})

// get all products
app.get('/products', async (req, res) => {
	try {
		const products = await Product.find({})
		res.status(200).json(products)
	} catch (error) {
		console.log(error.message)
		res.status(500).json({ message: error.message })
	}
})

// get a single product with id
app.get('/products/:id', async (req, res) => {
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
})

// post a product
app.post('/products', async (req, res) => {
	try {
		const product = await Product.create(req.body)
		res.status(200).json(product)
	} catch (error) {
		console.log(error.message)
		res.status(500).json({ message: error.message })
	}
})

// update a product --> use 'put' or 'patch'
app.put('/products/:id', async (req, res) => {
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
})

// delete a single product with id
app.delete('/products/:id', async (req, res) => {
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
})

mongoose.set('strictQuery', false)

mongoose
	.connect(
		'mongodb+srv://admin:admin@jtaapi.o4fa8tt.mongodb.net/Node-API?retryWrites=true&w=majority'
	)
	.then(() => {
		console.log('Connected to MongoDB!')
		app.listen(3000, () => {
			console.log('Node API app is running at port 3000')
		})
	})
	.catch((error) => {
		console.log(error)
	})

// ^ 'Node-API' is the collection name
