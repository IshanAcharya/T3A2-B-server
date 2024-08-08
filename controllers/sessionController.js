const Session = require('../models/session');

// Save new Type Tutor typing session
const saveSession = async (req, res) => {
    const { wpm, accuracy, errors, difficulty } = req.body;

    try {
        // Create a new session
        const session = await Session.create({
            userID: req.user._id,
            wpm,
            accuracy,
            errors,
            difficulty,
        });

        res.status(201).json(session);
    } catch (error) {
        res.status(400).json({ message: 'Failed to save session', error});
    }
};

// Get user's typing session data
const getSessions = async (req, res) => {
    try {
        // Find sessions for user and sort by date in descending order from current date
        const sessions = await Session.find({ userID: req.user._id }).sort({ date: -1 });
        res.json(sessions);
    } catch (error) {
        res.status(400).json({ message: 'Failed to retrieve sessions', error});
    }
};

module.exports = { saveSession, getSessions };