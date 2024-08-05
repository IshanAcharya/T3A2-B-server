const express = require('express');
const { getProfile, updateProfile, deleteUserAndSessions } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware')
const router = express.Router();

router.route('/').get(protect, getProfile).put(protect, updateProfile).delete(protect, deleteUserAndSessions);

module.exports = router;