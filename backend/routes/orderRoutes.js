import express from 'express'
import { addOrderItems, getOrderById, updateOrderToPaid, updateOrderSentPayment, getMyOrders } from '../controllers/orderControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/sentpayment').put(protect, updateOrderSentPayment)

export default router
