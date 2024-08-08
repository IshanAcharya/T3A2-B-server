const express = require('express');
const { getProfile, updateProfile, deleteUserAndSessions } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware')
const router = express.Router();

// Routes to get user profile, update user profile and delete user account and typing session data
router.route('/').get(protect, getProfile).put(protect, updateProfile).delete(protect, deleteUserAndSessions);

module.exports = router;