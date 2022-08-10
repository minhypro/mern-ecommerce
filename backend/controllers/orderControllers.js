import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async function (req, res) {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } =
        req.body
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = await Order.create({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
        })

        res.status(201).json(order)
    }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async function (req, res) {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (!order) {
        res.status(404)
        throw new Error('Order not found')
    } else {
        res.json(order)
    }
})

export { addOrderItems, getOrderById }
