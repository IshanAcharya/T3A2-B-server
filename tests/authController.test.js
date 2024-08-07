require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./serverTestSetup');
const User = require('../models/user');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });
  
  afterAll(async () => {
    await mongoose.disconnect();
  });
  
  beforeEach(async () => {
    await User.deleteMany({});
  });
  
  describe('Workflow 1: User Registration and Login', () => {
    it('should register a new user and then login', async () => {
      // Register a new user
      const registerRes = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });
      
      expect(registerRes.statusCode).toBe(201);
      expect(registerRes.body).toHaveProperty('token');
  
      // Login with the newly registered user
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });
      
      expect(loginRes.statusCode).toBe(200);
      expect(loginRes.body).toHaveProperty('token');
    });
  });