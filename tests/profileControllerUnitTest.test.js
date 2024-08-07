require('dotenv').config();
const { deleteUserAndSessions } = require('../controllers/profileController');
const User = require('../models/user');
const Session = require('../models/session');

describe('Profile Controller Unit Tests', () => {
    describe('deleteUserAndSessions', () => {
      it('should delete user and their sessions', async () => {
        const mockRequest = {
          user: { id: 'testUserId' }
        };
        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
  
        Session.deleteMany.mockResolvedValue({ deletedCount: 1 });
        User.findByIdAndDelete.mockResolvedValue({ _id: 'testUserId' });
  
        await deleteUserAndSessions(mockRequest, mockResponse);
  
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User and all sessions deleted successfully' });
      });
  
      it('should return 500 if deletion fails', async () => {
        const mockRequest = {
          user: { id: 'testUserId' }
        };
        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
  
        Session.deleteMany.mockImplementation(() => {
          throw new Error('Failed to delete sessions');
        });
  
        await deleteUserAndSessions(mockRequest, mockResponse);
  
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Failed to delete user', error: expect.any(Error) });
      });
    });
});