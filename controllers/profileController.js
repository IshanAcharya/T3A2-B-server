const User = require('../modles/User');

const getProfile = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
};

const updateProfile = 








module.exports = { getProfile, updateProfile };