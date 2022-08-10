import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private

const addOrderItems = asyncHandler(async function (req, res) {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } =
        req.body

        console.log({ orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice });
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

export { addOrderItems }
