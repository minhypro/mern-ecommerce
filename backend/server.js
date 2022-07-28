import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 4000

connectDB()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/products', productRoutes)
app.get('/', function (req, res) {
    res.send("API is running")
})

app.listen(port, () => {
    console.log(`MERN server is listening on port ${port}`)
})