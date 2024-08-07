const express = require('express');
const connectDB = require('../config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('../routes/authRoutes');
const profileRoutes = require('../routes/profileRoutes');
const sessionRoutes = require('../routes/sessionRoutes');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/sessions', sessionRoutes);

module.exports = app;