import express from 'express'

import {
  getProducts,
  getProductById,
  deleteProductById,
  addProduct,
  updateProduct
} from '../controllers/productControllers.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts)
router.route('/add').post(addProduct)
router.route('/:id').get(getProductById)
router.route('/:id/update').put(protect, isAdmin, updateProduct)
router.route('/:id/delete').delete(protect, isAdmin, deleteProductById)

export default router
