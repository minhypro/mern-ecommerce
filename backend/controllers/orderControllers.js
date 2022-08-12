import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'

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

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async function (req, res) {
  const user = await User.findById(req.user._id)

  if (user.isAdmin) {
    const order = await Order.findById(req.params.id)
    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()

      const updateOrder = await order.save()
      res.json(updateOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  } else {
    res.status(401)
    throw new Error('You are not allowed to update')
  }
})

// @desc    Update order to mark payment sent
// @route   PUT /api/orders/:id/sentpayment
// @access  Private
const updateOrderSentPayment = asyncHandler(async function (req, res) {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isSentPayment = true

    const updateOrder = await order.save()
    res.json(updateOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Get logged in user orders
// @route   Get /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async function (req, res) {
  const order = await Order.find({ user: req.user._id })
  res.json(order)
})

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, updateOrderSentPayment }
