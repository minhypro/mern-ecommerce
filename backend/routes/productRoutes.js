import express from 'express'

import {
  getProducts,
  getProductById,
  deleteProductById,
} from '../controllers/productControllers.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts)

router.route('/:id').get(getProductById)
router.route('/:id/delete').delete(protect, isAdmin, deleteProductById)

export default router
