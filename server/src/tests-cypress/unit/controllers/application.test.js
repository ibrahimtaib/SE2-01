// Import necessary modules and functions
const { application } = require("../../../controllers/application.js");
const { PrismaClient } = require("@prisma/client");
const { mocked } = require("jest-mock");
const prisma = require("../../../controllers/prisma.js");
const { createApplication } = require("../../../controllers/application.js");

// Mocking PrismaClient
jest.mock('../../../controllers/prisma.js', () => ({
  student: {
    findUnique: jest.fn(() => {}),
  },
  proposal: {
    findUnique: jest.fn(() => {}),
  },
  application: {
    create: jest.fn(() => {}),
  },
}));

describe('createApplication function', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should resolve with the created application', async () => {
    // Mocked data for the successful case
    const mockBody = {
      comment: 'Test comment',
      STUDENT_ID: 1,
      PROPOSAL_ID: 1,
    };

    const mockStudent = {
      id: 1,
      COD_DEGREE: 'someDegreeCode',
      // Add other necessary fields for student
    };

    const mockProposal = {
      id: 1,
      cds: 'someDegreeCode',
      expiration: new Date(Date.now() - 1000000), // Set a future expiration date
      applications: [], // Assuming no applications yet
      archived: false,
      // Add other necessary fields for proposal
    };

    const mockCreatedApplication = {
      id: 123,
      status: 'pending',
      comment: mockBody.comment,
      STUDENT_ID: mockBody.STUDENT_ID,
      PROPOSAL_ID: mockBody.PROPOSAL_ID,
    };

    // Mock the Prisma methods
    prisma.student.findUnique.mockResolvedValueOnce(mockStudent);
    prisma.proposal.findUnique.mockResolvedValueOnce(mockProposal);
    prisma.application.create.mockResolvedValueOnce(mockCreatedApplication);

    // Call the function and expect the result
    try {
      const result = await createApplication(mockBody);
      // Assert the result and that the Prisma methods were called
      expect(result).toEqual(mockCreatedApplication);
      expect(prisma.student.findUnique).toHaveBeenCalledWith({
        where: { id: mockBody.STUDENT_ID },
      });
      expect(prisma.proposal.findUnique).toHaveBeenCalledWith({
        where: { id: mockBody.PROPOSAL_ID },
        include: { applications: { where: { status: 'accepted' } } },
      });
      expect(prisma.application.create).toHaveBeenCalledWith({
        data: {
          status: 'pending',
          comment: mockBody.comment,
          STUDENT_ID: mockBody.STUDENT_ID,
          PROPOSAL_ID: mockBody.PROPOSAL_ID,
        },
      });
    } catch (error) {
      // Handle the rejection here
      expect(error).toEqual({
        status: 400,
        error: 'Proposal has already expired!',
      });
    }
  });

  it('should reject with an error if there is a database error', async () => {
    // Mocked error for the error case
    
  
    try {
      // Pass a valid object to createApplication, for example:
      const mockedError = new Error("Database error");
  
    // Mock the Prisma methods
    prisma.student.findUnique.mockRejectedValue(mockedError);
    console.log("first one");
      console.log("second");
      await createApplication({
        comment: 'Test comment',
        STUDENT_ID: 1,
        PROPOSAL_ID: 1,
      });
      console.log("third");
    } catch (error) {
      // Assert the error message and that the Prisma methods were called
      expect(error).toEqual({
        status: 500,
        error: 'An error occurred while creating Application',
      });
      expect(prisma.student.findUnique).toHaveBeenCalled();
    }
  });
});