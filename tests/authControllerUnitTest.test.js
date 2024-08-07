require('dotenv').config();
const { registerUser, loginUser } = require('../controllers/authController');
const User = require('../models/user');

