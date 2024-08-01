const Session = require('../models/Session');

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

