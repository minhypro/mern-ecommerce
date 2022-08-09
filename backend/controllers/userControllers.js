import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import generateToken from '../ultils/generateToken.js'
import asyncHandler from 'express-async-handler'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async function (req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        throw new Error('Please fill all required fields')
    }

    const user = await User.findOne({ email })

    if (user) {
        const checkPassword = await bcrypt.compare(password, user.password)
        if (checkPassword) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            })
        } else {
            res.status(401)
            throw new Error('Wrong password')
        }
    } else {
        res.status(401)
        throw new Error('Email not found')
    }
})

// @desc    Register new user
// @route   POST /api/users/
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { email, name, password } = req.body

    if (!email || !name || !password) {
        throw new Error('Please fill all required fields')
    }

    const existUser = await User.findOne({ email })

    if (existUser) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name

        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 10)
        }

        const updateUser = await user.save()

        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser._id),
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export { authUser, registerUser, getUserProfile, updateUserProfile }
