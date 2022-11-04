import express from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userControllers.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'

passport.use(
  new GoogleStrategy(
    {
      clientID: '784228161482-ku0vtmf5u1djefrdv8t7kvdiae3qrhmt.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: '/oauth2/redirect/google',
      scope: ['profile', 'email'],
      state: true,
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile)
    }
  )
)


const router = express.Router()

router.route('/').post(registerUser).get(protect, isAdmin, getAllUsers)

router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').get(protect, isAdmin, getUserById).put(protect, isAdmin, updateUser)
router.route('/:id/delete').delete(protect, isAdmin, deleteUser)


router.get('/login/federated/google', passport.authenticate('google'))

/*
    This route completes the authentication sequence when Google redirects the
    user back to the application.  When a new user signs in, a user account is
    automatically created and their Google account is linked.  When an existing
    user returns, they are signed in to their linked account.
*/
router.get(
  '/oauth2/redirect/google',
  passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
  })
)



export default router
