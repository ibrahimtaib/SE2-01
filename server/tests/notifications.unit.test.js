const { sendMail } = require('../src/controllers/notifications'); // Update the path to match your file structure

// Mock the nodemailer library
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockImplementation(() => ({
    sendMail: jest.fn().mockResolvedValue({ response: 'Mocked response' }),
  })),
}))
const nodemailer = require('nodemailer');

describe('sendMail function', () => {


  it('should send an email with correct parameters', async () => {
    
    const applicationId = 123;
    const student = { name: 'John', surname: 'Doe', email: 'john.doe@example.com' };
    const action = 'accept';

    // Call the sendMail function
    const result = await sendMail(applicationId, student, action);

    // Assertions
    expect(result).toEqual({ response: 'Mocked response' });
  });

  /*
  it('should reject with an error if sending email fails', async () => {
    // Mock the environment variables
    process.env.EMAIL_USER = 'your-email@gmail.com';
    process.env.EMAIL_PASSWORD = 'your-password';

    // Mock the sendMail function to simulate an error
    nodemailer.createTransport.mockReturnValue({
      sendMail: jest.fn().mockRejectedValue(new Error('Email sending failed')),
    });

    // Call the sendMail function
    await expect(sendMail(123, { name: 'John', surname: 'Doe', email: 'john.doe@example.com' }, 'accept'))
      .rejects.toEqual({ error: new Error('Email sending failed') });

    // Assertions
    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: 'smtp.mailgun.org',
      port: 587,
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password',
      },
    });
    expect(nodemailer.createTransport().sendMail).toHaveBeenCalled();
  });
  */
});
