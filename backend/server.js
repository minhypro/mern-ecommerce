import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import products from './data/products.js'
import connectDB from './config/db.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 4000

connectDB()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', function (req, res) {
    res.send("API is running")
})

app.get('/api/products', function (req, res) {
    res.send(products)
})

app.get('/api/products/:id', function (req, res) {
    const product = products.find(p => p._id === req.params.id)
    res.send(product)
})

app.listen(port, () => {
    console.log(`MERN server is listening on port ${port}`)
})
