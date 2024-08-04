const Session = require('../models/session');

const saveSession = async (req, res) => {
    const { wpm, accuracy, errors, difficulty } = req.body;

    try {
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

const getSessions = async (req, res) => {
    try {
        const sessions = await Session.find({ userID: req.user._id }).sort({ date: -1 });
        res.json(sessions);
    } catch (error) {
        res.status(400).json({ message: 'Failed to retrieve sessions', error});
    }
};

module.exports = { saveSession, getSessions };