import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 4000

connectDB()

app.use(express.static('public'))
app.use(bodyParser.json({ inflate: true }))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', '*')
    next()
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', function (req, res) {
    res.send('API is running')
})

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`MERN server is listening on port ${port}`)
})
