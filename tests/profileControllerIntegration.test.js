require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./serverTestSetup');
const User = require('../models/user');
const Session = require('../models/session');

// Connect to database before tests start
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

// Disconnect from database after tests finished
afterAll(async () => {
  await mongoose.disconnect();
});

// Clear user data and session data before each test
beforeEach(async () => {
  await User.deleteMany({});
  await Session.deleteMany({});
});

describe('Workflow 2: Create Profile, Save Session, and Retrieve Sessions', () => {
  it('should create a profile, save a session, and retrieve sessions', async () => {
    // Register a user
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test2@example.com',
        password: 'password123'
      });
      
    const token = registerRes.body.token;
  
    // Update profile
    const updateProfileRes = await request(app)
      .put('/api/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'updated@example.com'
      });
    
    // Verify provide update was successful 
    expect(updateProfileRes.statusCode).toBe(200);
    expect(updateProfileRes.body).toHaveProperty('email', 'updated@example.com');
  
    // Save a session
    const saveSessionRes = await request(app)
      .post('/api/sessions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        wpm: 50,
        accuracy: 95,
        errors: 5,
        difficulty: 'medium'
      });
    
    // Verify session save was successful
    expect(saveSessionRes.statusCode).toBe(201);
  
    // Retrieve sessions
    const getSessionsRes = await request(app)
      .get('/api/sessions')
      .set('Authorization', `Bearer ${token}`);
    
    // Verify sessions retrieval was successful and contains saved sessions
    expect(getSessionsRes.statusCode).toBe(200);
    expect(getSessionsRes.body).toBeInstanceOf(Array);
    expect(getSessionsRes.body.length).toBe(1);
    expect(getSessionsRes.body[0]).toHaveProperty('wpm', 50);
  });
});