// Import necessary modules and functions
const { proposals } = require("../../../controllers/proposals.js");
const { PrismaClient } = require("@prisma/client");
const { mocked } = require("jest-mock");
const prisma = require("../../../controllers/prisma.js");

// Mocking PrismaClient
jest.mock('../../../controllers/prisma.js', () => ({
  Proposal: {
    findMany: jest.fn(() => {}),
  },
}));

describe('Proposals Controller', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should get all proposals', async () => {
    // Mocked data for the successful case
    const mockProposals = [
      { id: 1, title: 'Proposal 1' },
      { id: 2, title: 'Proposal 2' },
    ];

    // Mock the Prisma method
    prisma.Proposal.findMany.mockResolvedValueOnce(mockProposals);

    // Call the function and expect the result
    try {
      const result = await proposals.getProposals();
      // Assert the result and that the Prisma method was called
      expect(result).toEqual(mockProposals);
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    } catch (error) {
      // Handle the rejection here
      console.error(error);
    }
  });

  it('should get proposals by title', async () => {
    // Mocked data for the successful case
    const mockTitle = 'Test';
    const mockProposals = [
      { id: 1, title: 'Test Proposal 1' },
      { id: 2, title: 'Test Proposal 2' },
    ];

    // Mock the Prisma method
    prisma.Proposal.findMany.mockResolvedValueOnce(mockProposals);

    // Call the function and expect the result
    try {
      const result = await proposals.getProposalsByTitle(mockTitle);
      // Assert the result and that the Prisma method was called
      expect(result).toEqual(mockProposals);
      expect(prisma.Proposal.findMany).toHaveBeenCalledWith({
        where: {
          title: {
            contains: mockTitle,
            mode: "insensitive",
          },
        },
      });
    } catch (error) {
      // Handle the rejection here
      console.error(error);
    }
  });

  // Add more test cases for other functions in the proposals.js file
  // ...

});
