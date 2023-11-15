const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser for parsing JSON in requests
const router = require('../../../routes/application.js');

// Create an Express app and use the router
const app = express();
app.use(bodyParser.json());
app.use(router);

describe('Application Router', () => {
  it('should handle POST /applications', async () => {
    // Mock the createApplication function from the controller
    jest.mock('../../../controllers/application.js', () => ({
      createApplication: jest.fn(() => Promise.resolve({ id: 1, status: 'pending' })),
    }));

    // Import the controller after mocking
    const applicationController = require('../../../controllers/application.js');

    // Mock the createApplication function to resolve with a mock application
    applicationController.createApplication.mockResolvedValueOnce({ id: 1, status: 'pending' });

    // Send a POST request to the /applications endpoint
    const response = await request(app)
      .post('/applications')
      .send({
        comment: 'Test comment',
        STUDENT_ID: 1,
        PROPOSAL_ID: 1,
      })
      .expect(200); // Expecting a 200 OK status

    // Assert the response body
    expect(response.body).toEqual({ id: 1, status: 'pending' });

    // Assert that createApplication was called with the correct arguments
    expect(applicationController.createApplication).toHaveBeenCalledWith({
      comment: 'Test comment',
      STUDENT_ID: 1,
      PROPOSAL_ID: 1,
    });
  });
});

