import Product from '../models/productModel.js'
import mongoose from 'mongoose'
import asyncHandler from 'express-async-handler'

// GET

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

const getProducts = asyncHandler(async function (req, res) {
  const products = await Product.find()
  if (products) {
    res.json(products)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Fetch specific product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async function (req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404)
    throw new Error('Product not found')
  }

  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// POST

// @desc    Add new product
// @route   POST /api/products/add
// @access  Private/Admin
const addProduct = asyncHandler(async function (req, res) {
  const {user, name, image, description, category, brand, price, countInStock} = req.body

  const product = await Product.create({
    user,
    name,
    image,
    description,
    brand,
    category,
    price,
    countInStock,
  })

  if (product) {
    res.json(product)
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})

// PUT

// DELETE

// @desc    Delete a specific product
// @route   DELETE /api/products/:id/delete
// @access  Private/Admin
const deleteProductById = asyncHandler(async function (req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404)
    throw new Error('Product not found')
  }

  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'User deleted successfully' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProducts, getProductById, deleteProductById, addProduct }
