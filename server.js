require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/productRoute')
const errorMiddleware = require('./middleware/errorMIddleware')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI
const FRONTEND = process.env.FRONTEND

// Middlewarer
const corsOptions = {
	origin: FRONTEND, // use array for multiple domains
	optionSuccessStatus: 200, // some legacy browsers (IE 11 or smart tv browsers) choke on 204
}

app.use(cors(corsOptions))
app.use(express.json()) // middleware for json
app.use(express.urlencoded({ extended: false })) // middleware for form url encoded
app.use('/api/products', productRoute)

// routes
app.get('/', (req, res) => {
	// throw new Error('fake error')
	res.send('Hello Node API!')
})

app.get('/blog', (req, res) => {
	res.send("Hello this is JTA's Blog!")
})

mongoose.set('strictQuery', false)

app.use(errorMiddleware)

mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log('Connected to MongoDB!')
		app.listen(PORT, () => {
			console.log(`Node API app is running at port ${PORT}`)
		})
	})
	.catch((error) => {
		console.log(error)
	})

// ^ 'Node-API' is the collection name
