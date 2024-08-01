const jwt = require('jsonwebtoken');
const User = require('../models/user');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};