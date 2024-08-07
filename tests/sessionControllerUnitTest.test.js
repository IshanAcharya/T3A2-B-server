require('dotenv').config();
const { saveSession } = require('../controllers/sessionController');
const Session = require('../models/session');

jest.mock('../models/session');

describe('Session Controller Unit Tests', () => {
  it('should save a new session', async () => {
    const mockRequest = {
      user: { _id: 'testUserId' },
      body: { wpm: 50, accuracy: 95, errors: 5, difficulty: 'medium' }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Session.create.mockResolvedValue({
      _id: 'testSessionId',
      userID: 'testUserId',
      wpm: 50,
      accuracy: 95,
      errors: 5,
      difficulty: 'medium'
    });

    await saveSession(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      _id: 'testSessionId',
      userID: 'testUserId',
      wpm: 50,
      accuracy: 95,
      errors: 5,
      difficulty: 'medium'
    });
  });
});