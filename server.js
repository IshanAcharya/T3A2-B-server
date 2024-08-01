const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

dotenv.config();

const app = express();

// Connect to the MongoDB database
connectDB();

// Add middleware
app.use(express.json());

// Add routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/sessions', sessionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));