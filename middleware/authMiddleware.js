const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Protect routes and ensure user is authenticated
const protect = async (req, res, next) => {
    let token;

    // Conduct check for authorization header beginning with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try { 
            // Obtain token from header
            token = req.headers.authorization.split (' ') [1];
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Find user by ID and exclue their password from search
            req.user = await User.findById(decoded.id).select('-password');
            next();
        }   catch (error) {
            // Return 401 status code if token verification fails
            res.status(401).json({ message: 'Not authorised, token failed'});
        }
    }
    // Return 401 status code if no token is provided
    if (!token) {
        res.status(401).json({ message: 'Not authorised, no token provided'});
    }
};

module.exports = { protect };