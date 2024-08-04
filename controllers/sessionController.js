const Session = require('../models/session');

const saveSession = async (req, res) => {
    const { wpm, accuracy, errors, difficulty } = req.body;

    const session = await Session.create({
        userId: req.user._id,
        wpm,
        accuracy,
        errors,
        difficulty,
    });

    res.status(201).json(session);
};

const getSessions = async (req, res) => {
    const sessions = await Session.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(sessions);
}

module.exports = { saveSession, getSessions };