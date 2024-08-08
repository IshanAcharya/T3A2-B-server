const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect to the MongoDB database
connectDB();

// Add middleware
app.use(express.json());

// Add CORS middleware
app.use(cors());

// Add routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/sessions', sessionRoutes);

// Define port for server to run on
const PORT = process.env.PORT || 5600;

// Start server and listen on port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));