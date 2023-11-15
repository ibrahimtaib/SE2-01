// Import necessary modules and functions
const { application } = require("../../../controllers/application.js");
const { PrismaClient } = require("@prisma/client");
const { mocked } = require("jest-mock");
const prisma = require("../../../controllers/prisma.js");

// Mocking the prisma module
jest.mock('../../../controllers/prisma.js', () => {
  const { PrismaClient } = require('@prisma/client');
  return {
    __esModule: true,
    PrismaClient: jest.fn(() => new PrismaClient()),
  };
});

describe('createApplication', () => {
  let prisma;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create an application successfully', async () => {
    // Mocking the necessary data for the test
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
      expiration: new Date(Date.now() + 1000000), // Set a future expiration date
      applications: [], // Assuming no applications yet
      archived: false,
      // Add other necessary fields for proposal
    };

    // Mock the prisma methods
    prisma.student.findUnique.mockResolvedValue(mockStudent);
    prisma.proposal.findUnique.mockResolvedValue(mockProposal);
    prisma.application.create.mockResolvedValue({/* mock application data */});

    // Execute the function
    const result = await createApplication(mockBody);

    // Assertions
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

    // Add more assertions as needed based on your specific logic
    expect(result).toBeDefined();
    // Add more expectations based on the result
  });

  // Add more test cases for different scenarios, edge cases, and error cases
});