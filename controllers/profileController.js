const User = require('../modles/User');

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
        })
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};


module.exports = { getProfile, updateProfile };