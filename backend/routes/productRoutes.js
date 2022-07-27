import express from 'express'
import Product from '../models/productModel.js'
import mongoose from 'mongoose'

const router = express.Router()

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

router.get('/', async function (req, res) {
    const products = await Product.find()
    res.json(products)
})


// @desc    Fetch specific product
// @route   GET /api/products/:id
// @access  Public

router.get('/:id', async function (req, res) {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(404).json({ message: 'Product not found' })
        return 
    }

    const products = await Product.findById(req.params.id)

    if (products) {
        res.json(products)
    } else {
        res.status(404).json({ message: 'Product not found' })
    }

})

export default router