import Product from '../models/productModel.js';
import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

const getProducts = asyncHandler(async function (req, res) {
    const products = await Product.find();
    if (products) {
        res.json(products);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Fetch specific product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async function (req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(404);
        throw new Error('Product not found');
    }

    const products = await Product.findById(req.params.id);

    if (products) {
        res.json(products);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export { getProducts, getProductById };
