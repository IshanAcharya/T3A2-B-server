require('dotenv').config();
const { registerUser, loginUser } = require('../controllers/authController');
const User = require('../models/user');

jest.mock('../models/user');

describe('Auth Controller Unit Tests', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {
      body: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it('should not register a user with existing email', async () => {
    mockRequest.body = { email: 'existing@example.com', password: 'password123' };
    User.findOne.mockResolvedValue({ email: 'existing@example.com' });

    await registerUser(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User already exists' });
  });
});