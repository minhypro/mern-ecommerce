import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import generateToken from '../ultils/generateToken.js';
import asyncHandler from 'express-async-handler';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async function (req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        const checkPassword = await bcrypt.compare(password, user.password);
        if (checkPassword) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401)
            throw new Error('Wrong password')
        }
    } else {
        res.status(401)
        throw new Error('Email not found')
    }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export { authUser, getUserProfile };
