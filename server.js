const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

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

const PORT = process.env.PORT || 5600;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));