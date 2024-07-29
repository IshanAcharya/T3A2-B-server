const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    date: { type: Date, default: Date.now },
    wpm: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    errors: { type: Number, required: true },
    difficulty: { type: String, required: true },

});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;