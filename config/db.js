const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        // Connect to MongoDB using URI from .env
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected!');
    } catch (err) {
        // Log errors and exit process
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;