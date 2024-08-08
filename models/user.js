const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define user model schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true}, // User email
    password: { type: String, required: true }, // User password
});

// Hash password before it is saved
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;