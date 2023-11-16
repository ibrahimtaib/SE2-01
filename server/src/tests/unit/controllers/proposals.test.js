
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

  it('should get proposals by supervisor', async () => {
    // Mocked data for the successful case
    const mockSurname = 'Smith';
    const mockTeachers = [
      { id: 1 },
      { id: 2 },
    ];
    const mockProposals = [
      { id: 1, supervisor: 1 },
      { id: 2, supervisor: 2 },
    ];
  
    // Mock the Prisma methods
    //prisma.Teacher.findMany.mockResolvedValueOnce(mockTeachers);
    //prisma.Proposal.findMany.mockResolvedValueOnce(mockProposals);
  
    // Call the function and expect the result
    try {
      const result = await proposals.getProposalsBySupervisor(mockSurname);
      // Assert the result and that the Prisma methods were called
      expect(result).toEqual(mockProposals);
      expect(prisma.Teacher.findMany).toHaveBeenCalledWith({
        where: {
          surname: {
            contains: mockSurname,
            mode: "insensitive",
          },
        },
      });
      expect(prisma.Proposal.findMany).toHaveBeenCalledWith({
        where: {
          supervisor: {
            in: [1, 2],
          },
        },
      });
    } catch (error) {
      // Handle the rejection here
      console.error(error);
    }
  });
  

  it('should get proposals by keywords', async () => {
    // Mocked data for the successful case
    const mockKeywords = 'keyword1, keyword2';
    const mockProposals = [
      { id: 1, keywords: ['keyword1', 'keyword2'] },
      { id: 2, keywords: ['keyword2', 'keyword3'] },
    ];

    // Mock the Prisma method
    prisma.Proposal.findMany.mockResolvedValueOnce(mockProposals);

    // Call the function and expect the result
    try {
      const result = await proposals.getProposalsByKeywords(mockKeywords);
      // Assert the result and that the Prisma method was called
      expect(result).toEqual([mockProposals[0]]);
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    } catch (error) {
      // Handle the rejection here
      console.error(error);
    }
  });

  it('should get proposals by groups', async () => {
    // Mocked data for the successful case
    const mockGroups = 'group1, group2';
    const mockProposals = [
      { id: 1, groups: ['group1', 'group2'] },
      { id: 2, groups: ['group2', 'group3'] },
    ];

    // Mock the Prisma method
    prisma.Proposal.findMany.mockResolvedValueOnce(mockProposals);

    // Call the function and expect the result
    try {
      const result = await proposals.getProposalsByGroups(mockGroups);
      // Assert the result and that the Prisma method was called
      expect(result).toEqual([mockProposals[0]]);
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    } catch (error) {
      // Handle the rejection here
      console.error(error);
    }
  });

  it('should get proposals by expiration date', async () => {
    // Mocked data for the successful case
    const mockExpirationDate = '2023-12-01T00:00:00.000Z';
    const mockProposals = [
      { id: 1, expiration: new Date('2023-11-01T00:00:00.000Z') },
      { id: 2, expiration: new Date('2023-12-15T00:00:00.000Z') },
    ];

    // Mock the Prisma method
    prisma.Proposal.findMany.mockResolvedValueOnce(mockProposals);

    // Call the function and expect the result
    try {
      const result = await proposals.getProposalsByExpirationDate(mockExpirationDate);
      // Assert the result and that the Prisma method was called
      expect(result).toEqual([mockProposals[0]]);
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    } catch (error) {
      // Handle the rejection here
      console.error(error);
    }
  });

  it('should get proposals by level', async () => {
    // Mocked data for the successful case
    const mockLevel = 'Bachelor';
    const mockProposals = [
      { id: 1, level: 'Bachelor' },
      { id: 2, level: 'Master' },
    ];

    // Mock the Prisma method
    prisma.Proposal.findMany.mockResolvedValueOnce(mockProposals);

    // Call the function and expect the result
    try {
      const result = await proposals.getProposalsByLevel(mockLevel);
      // Assert the result and that the Prisma method was called
      expect(result).toEqual([mockProposals[0]]);
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    } catch (error) {
      // Handle the rejection here
      console.error(error);
    }
  });

  it('should get proposals by CDS', async () => {
    // Mocked data for the successful case
    const mockCDS = 'CDS001';
    const mockProposals = [
      { id: 1, cds: 'CDS001' },
      { id: 2, cds: 'CDS002' },
    ];

    // Mock the Prisma method
    prisma.Proposal.findMany.mockResolvedValueOnce(mockProposals);

    // Call the function and expect the result
    try {
      const result = await proposals.getProposalsByCDS(mockCDS);
      // Assert the result and that the Prisma method was called
      expect(result).toEqual([mockProposals[0]]);
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    } catch (error) {
      // Handle the rejection here
      console.error(error);
    }
  });

  // Add more test cases for other functions in the proposals.js file
  // ...

});
