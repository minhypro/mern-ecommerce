import express from 'express'
import { authUser, getUserProfile, registerUser, updateUserProfile, getAllUsers } from '../controllers/userControllers.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser).get(protect,isAdmin,getAllUsers)
router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router
