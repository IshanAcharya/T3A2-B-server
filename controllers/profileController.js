const User = require('../models/user');
const Session = require('../models/session');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Get user's profile
const getProfile = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
};

// Update user's profile
const updateProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    // Update user's email if provided in request, otherwise keep email. Update password if provided in request
    if (user) {
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        // Save updated user to database and provide updated user information and new token
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            email: updatedUser.email,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// Delete user's account and their type tutor typing session data
const deleteUserAndSessions = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Delete all user typing session data
        await Session.deleteMany({ userID: userId });

        // Delete user account
        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: 'User and all sessions deleted successfully' });
    } catch (error) { 
        res.status(500).json({ message: 'Failed to delete user', error });
    }
};


module.exports = { getProfile, updateProfile, deleteUserAndSessions };