const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../../../routes/degrees'); // Assicurati che il percorso sia corretto
app.use(express.json());
app.use('/degrees', router);

const degreesController = require('../../../controllers/degrees');
jest.mock('../../../controllers/degrees');

describe('GET /degrees', () => {
  it('should return a list of degrees when the promise resolves', async () => {
    degreesController.getDegrees.mockResolvedValue(['Bachelor', 'Master', 'PhD']);
    const response = await request(app).get('/degrees');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(['Bachelor', 'Master', 'PhD']);
  });

  it('should handle errors when the promise is rejected', async () => {
    const mockError = new Error('Internal Server Error');
    degreesController.getDegrees.mockRejectedValue(mockError);
    const response = await request(app).get('/degrees');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
  });
});
