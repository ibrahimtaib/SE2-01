require('setimmediate');
const request = require('supertest');
const express = require('express');
const notificationsRouter = require('../../../routes/notifications.js');
const notificationsController = require('../../../controllers/notifications.js');

const app = express();
app.use(express.json());
app.use('/', notificationsRouter);

jest.mock('../../../controllers/notifications.js');

describe('Notifications Router', () => {
  it('should send email and return 200 status on success', async () => {
    const mockRequestBody = {/* dati mockati per il body della richiesta */};
    const mockMailOptions = {/* dati mockati per le opzioni della mail */};
    const mockMailResponse = {/* dati mockati per la risposta della mail */};
    
    notificationsController.sendMail.mockResolvedValue(mockMailResponse);

    const response = await request(app)
      .post('/send-email')
      .send(mockRequestBody)
  });

 
});
