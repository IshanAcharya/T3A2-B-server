const mongoose = require('mongoose');

// Define session model schema
const sessionSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    date: { type: Date, default: Date.now }, // Date of typing session, populates current date
    wpm: { type: Number, required: true }, // Words per minute during typing session
    accuracy: { type: Number, required: true }, // Accuracy percentage of typing session
    errors: { type: Number, required: true }, // Total number of errors during typing session
    difficulty: { type: String, required: true }, // Selected typing session difficulty level

});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;