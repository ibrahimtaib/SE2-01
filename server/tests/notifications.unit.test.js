const nodemailer = require('nodemailer');
const { sendMail } = require('../src/controllers/notifications'); // Update the path to match your file structure

// Mock the nodemailer library
jest.mock('nodemailer');

describe('sendMail function', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods of the mock
    nodemailer.createTransport.mockClear();
    nodemailer.createTransport.mockReturnValue({
      sendMail: jest.fn().mockResolvedValue({ response: 'Mocked response' }),
    });
  });

  it('should send an email with correct parameters', async () => {
    const applicationId = 123;
    const student = { name: 'John', surname: 'Doe', email: 'john.doe@example.com' };
    const action = 'accept';

    // Mock the environment variables
    process.env.EMAIL_USER = 'your-email@gmail.com';
    process.env.EMAIL_PASSWORD = 'your-password';

    // Call the sendMail function
    const result = await sendMail(applicationId, student, action);

    // Assertions
    expect(result).toEqual({ response: 'Mocked response' });
    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: 'smtp.mailgun.org',
      port: 587,
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password',
      },
    });
    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith({
      from: 'teacher@polito.it',
      to: 'jaouadouchaib2@gmail.com', // Update with the correct email
      subject: 'Congratulations your Application has been Accepted',
      text: expect.stringContaining('Hello John Doe, this is a notification email'),
    });
  });

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
});
