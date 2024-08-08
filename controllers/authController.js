const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register new user
const registerUser = async (req, res) => {
    const { email, password } = req.body;

    // Conduct check to see if user already exists or not
    const userExists = await User.findOne({ email});

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({ email, password });

    if (user) {
        // Provide user data and token
        res.status(201).json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// Log in user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Search for user by email
    const user = await User.findOne({ email });

    // Conduct check to see if user exists and if the user's password matches
    if (user && (await user.matchPassword(password))) {
        // Provide user data and token
        res.json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password provided' });
    }
};

module.exports = { registerUser, loginUser};