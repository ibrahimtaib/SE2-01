// Import necessary modules and functions
const { getApplicationsStudentsProposalsDegreesByTeacherId, getProposalById, getStudentById } = require("../../../controllers/applications.js");
const { PrismaClient } = require("@prisma/client");
const { mocked } = require("jest-mock");
const prisma = require("../../../controllers/prisma.js");


// Mocking PrismaClient
jest.mock('../../../controllers/prisma.js', () => ({
  Application: {
    findMany: jest.fn(() => {}),
  },
  Proposal: {
    findUnique: jest.fn(() => {}),
  },
  student: {
    findUnique: jest.fn(() => {}),
  },
}));

describe('Applications Controller', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should get applications, students, proposals, and degrees by teacherId', async () => {
    // Mocked data for the successful case
    const mockTeacherId = '1';
    const mockApplicationsStudentsProposals = [
      {
        application: { id: 1, status: 'pending' },
        student: { id: 1, name: 'John Doe', degree: { COD_DEGREE: 'ABC123' } },
        proposal: { id: 1, title: 'Test Proposal', teacher: { id: 1 }, degree: { COD_DEGREE: 'ABC123' } },
      },
      // Add more mocked data as needed
    ];

    // Mock the Prisma method
    prisma.Application.findMany.mockResolvedValueOnce(mockApplicationsStudentsProposals);

    // Call the function and expect the result
    try {
      const result = await getApplicationsStudentsProposalsDegreesByTeacherId(mockTeacherId);
      // Assert the result and that the Prisma method was called
      expect(result).toEqual(mockApplicationsStudentsProposals.map((application) => ({
        application,
        student: {
          ...application.student,
          degree: application.student.degree, 
        },
        proposal: application.proposal,
      })));
      expect(prisma.Application.findMany).toHaveBeenCalledWith({
        where: {
          proposal: {
            teacher: {
              id: parseInt(mockTeacherId),
            },
          },
        },
        include: {
          proposal: {
            include: {
              teacher: true,
              degree: true,
            },
          },
          student: {
            include: {
              degree: true,
            },
          },
        },
      });
    } catch (error) {
      // Handle the rejection here
      console.error(error);
    }
  });

  it('should get proposal by proposalId', async () => {
    // Mocked data for the successful case
    const mockProposalId = '1';
    const mockProposal = {
      id: 1,
      title: 'Test Proposal',
      teacher: { id: 1 },
      degree: { COD_DEGREE: 'ABC123' },
    };

    // Mock the Prisma method
    prisma.Proposal.findUnique.mockResolvedValueOnce(mockProposal);

    // Call the function and expect the result
    try {
      const result = await getProposalById(mockProposalId);
      // Assert the result and that the Prisma method was called
      expect(result).toEqual({
        proposal: mockProposal,
        teacher: mockProposal.teacher,
        degree: mockProposal.degree,
      });
      expect(prisma.Proposal.findUnique).toHaveBeenCalledWith({
        where: {
          id: parseInt(mockProposalId),
        },
        include: {
          teacher: true,
          degree: true,
        },
      });
    } catch (error) {
      // Handle the rejection here
      console.error(error);
    }
  });

  it('should get student by studentId', async () => {
    // Mocked data for the successful case
    const mockStudentId = '1';
    const mockStudent = {
      id: 1,
      name: 'John Doe',
      applications: [{ id: 1, status: 'pending' }],
      degree: { COD_DEGREE: 'ABC123' },
      Career: [{ id: 1, COD_COURSE: 'C001' }],
    };

    // Mock the Prisma method
    prisma.student.findUnique.mockResolvedValueOnce(mockStudent);

    // Call the function and expect the result
    try {
      const result = await getStudentById(mockStudentId);
      // Assert the result and that the Prisma method was called
      expect(result).toEqual({
        student: mockStudent,
      });
      expect(prisma.student.findUnique).toHaveBeenCalledWith({
        where: {
          id: parseInt(mockStudentId),
        },
        include: {
          applications: true,
          degree: true,
          Career: true,
        },
      });
    } catch (error) {
      // Handle the rejection here
      console.error(error);
    }
  });

  // Add more test cases for other functions in the applications.js file
  // ...

});
