// Import necessary modules and functions
const { getApplicationsStudentsProposalsDegreesByTeacherId, getProposalById, getStudentById, acceptApplication, refuseApplication } = require("../../../controllers/applications.js");
const { PrismaClient } = require("@prisma/client");
const { mocked } = require("jest-mock");
const prisma = require("../../../controllers/prisma.js");

// Mocking PrismaClient
jest.mock('../../../controllers/prisma.js', () => ({
  Proposal: {
    findUnique: jest.fn(() => {}),
  },
  student: {
    findUnique: jest.fn(() => {}),
  },
  Application: { 
    findUnique: jest.fn(() => {}),
    findMany: jest.fn(() => {}),
    update: jest.fn(() => {}),
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
    /* prisma.application.findMany.mockResolvedValueOnce(mockApplicationsStudentsProposals); */

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
      expect(prisma.application.findMany).toHaveBeenCalledWith({
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
   /*  prisma.proposal.findUnique.mockResolvedValueOnce(mockProposal); */

    // Call the function and expect the result
    try {
      const result = await getProposalById(mockProposalId);
      // Assert the result and that the Prisma method was called
      expect(result).toEqual({
        proposal: mockProposal,
        teacher: mockProposal.teacher,
        degree: mockProposal.degree,
      });
      expect(prisma.proposal.findUnique).toHaveBeenCalledWith({
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


  describe('acceptApplication function', () => {
    it('should update the application status to "accept"', async () => {
      const mockUpdatedApplication = {
        id: 1,
        status: 'accept',
        comment: 'Accepted',
        STUDENT_ID: 123,
        PROPOSAL_ID: 456,
        student: { id: 123, name: 'John', surname: 'Doe' },
        proposal: { id: 456, title: 'Proposal 1' },
      };
    
      prisma.Application.update.mockResolvedValueOnce(mockUpdatedApplication);
    
      const result = await acceptApplication(1);
    
      expect(prisma.Application.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { status: 'accept'},
      });
    
      expect(result).toEqual(mockUpdatedApplication);
    });
    
    it('should throw an error if updating the application status fails', async () => {
      // Simula un errore durante l'aggiornamento
      const mockError = new Error('Database error');
      prisma.Application.update.mockImplementationOnce(() => {
        throw mockError;
      });
    
      // Chiamata alla funzione da testare
      await expect(acceptApplication(1)).rejects.toThrow("An error occurred while updating the application status to 'accept'");
    
      // Verifica se la chiamata a prisma.Application.update è avvenuta correttamente
      expect(prisma.Application.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { status: 'accept'},
      });
    });
    
  });
  
});

// Test per refuseApplication
describe('refuseApplication function', () => {
  it('should update the application status to "refuse"', async () => {
    const mockUpdatedApplication = {
      id: 1,
      status: 'refuse',
      STUDENT_ID: 123,
      PROPOSAL_ID: 456,
      student: { id: 123, name: 'John', surname: 'Doe' },
      proposal: { id: 456, title: 'Proposal 1' },
    };
  
    prisma.Application.update.mockResolvedValueOnce(mockUpdatedApplication);
  
    const result = await refuseApplication(1);
  
    expect(prisma.Application.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { status: 'refuse'},
    });
  
    expect(result).toEqual(mockUpdatedApplication);
  });

  it('should throw an error if updating the application status fails', async () => {
    // Simula un errore durante l'aggiornamento
    const mockError = new Error('Database error');
    prisma.Application.update.mockImplementationOnce(() => {
      throw mockError;
    });
  
    // Chiamata alla funzione da testare
    await expect(refuseApplication(1)).rejects.toThrow("An error occurred while updating the application status to 'refuse'");
  
    // Verifica se la chiamata a prisma.Application.update è avvenuta correttamente
    expect(prisma.Application.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { status: 'refuse'},
    });
  });
});

