const User = require('../models/user');
const Session = require('../models/session');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const getProfile = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
};

const updateProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

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

const deleteUserAndSessions = async (req, res) => {
    try {
        const userId = req.user.id;

        await Session.deleteMany({ userID: userId });

        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: 'User and all sessions deleted successfully' });
    } catch (error) { 
        res.status(500).json({ message: 'Failed to delete user', error });
    }
};


module.exports = { getProfile, updateProfile, deleteUserAndSessions };