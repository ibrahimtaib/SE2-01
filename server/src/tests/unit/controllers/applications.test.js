const { application } = require("../../../controllers/application.js");
const { PrismaClient } = require("@prisma/client");
const { mocked } = require("jest-mock");
const prisma = require("../../../controllers/prisma.js");

// Mocking PrismaClient
jest.mock('../../../controllers/prisma.js', () => ({
  Application: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
  Proposal: {
    findUnique: jest.fn(),
  },
  Student: {
    findUnique: jest.fn(),
  },
}));

describe('Application Controller', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  // Mocked data for testing purposes
  const mockApplicationData = [
    {
      id: 1,
      date: new Date('2023-01-01'),
      status: 'pending',
      comment: 'Mock Comment',
      STUDENT_ID: 1,
      PROPOSAL_ID: 1,
      student: {
        id: 1,
        surname: 'MockStudentSurname',
        name: 'MockStudentName',
        degree: {
          COD_DEGREE: 'MockDegreeCode',
          TITLE_DEGREE: 'MockDegreeTitle',
        },
      },
      proposal: {
        id: 1,
        title: 'MockProposalTitle',
        teacher: {
          id: 1,
          surname: 'MockTeacherSurname',
          name: 'MockTeacherName',
          email: 'mock@example.com',
        },
        degree: {
          COD_DEGREE: 'MockDegreeCode',
          TITLE_DEGREE: 'MockDegreeTitle',
        },
      },
    },
    // Add more mocked application data as needed
  ];

  const mockProposalData = {
    id: 1,
    title: 'MockProposalTitle',
    supervisor: 1,
    coSupervisors: 'Mock Co-Supervisor',
    keywords: ['mock', 'keywords'],
    applications: [],
    type: 'Mock Type',
    groups: ['Group1', 'Group2'],
    description: 'Mock Description',
    notes: 'Mock Notes',
    expiration: new Date('2023-12-31'),
    level: 'Mock Level',
    cds: 'Mock CDS',
    teacher: {
      id: 1,
      surname: 'MockTeacherSurname',
      name: 'MockTeacherName',
      email: 'mock@example.com',
      COD_GROUP: 'MockGroup',
      COD_DEPARTMENT: 'MockDepartment',
    },
    requiredKnowledge: 'Mock Required Knowledge',
    degree: {
      COD_DEGREE: 'MockDegreeCode',
      TITLE_DEGREE: 'MockDegreeTitle',
    },
  };

  const mockStudentData = {
    id: 1,
    surname: 'MockStudentSurname',
    name: 'MockStudentName',
    gender: 'MockGender',
    nationality: 'MockNationality',
    email: 'mockstudent@example.com',
    COD_DEGREE: 'MockDegreeCode',
    ENROLLMENT_YEAR: 2020,
    applications: [],
    degree: {
      COD_DEGREE: 'MockDegreeCode',
      TITLE_DEGREE: 'MockDegreeTitle',
    },
    Career: [],
  };

  // Test getApplicationsStudentsProposalsDegreesByTeacherId function
  describe('getApplicationsStudentsProposalsDegreesByTeacherId function', () => {
    it('should resolve with an array of applications, students, proposals, and degrees', async () => {
      // Mock the Prisma method
      prisma.Application.findMany.mockResolvedValueOnce(mockApplicationData);

      // Call the function and expect the result
      const result = await application.getApplicationsStudentsProposalsDegreesByTeacherId('1');
      expect(result).toEqual(expect.arrayContaining([
        {
          application: expect.any(Object),
          student: {
            ...mockStudentData,
            degree: expect.any(Object),
          },
          proposal: expect.any(Object),
        },
        // Add more expected result objects as needed
      ]));
      expect(prisma.Application.findMany).toHaveBeenCalled();
    });

    it('should reject with an error if there is a database error', async () => {
      // Mocked error for the error case
      const mockedError = new Error("Database error");

      // Mock the Prisma method
      prisma.Application.findMany.mockRejectedValueOnce(mockedError);

      // Call the function and expect it to throw an error
      await expect(application.getApplicationsStudentsProposalsDegreesByTeacherId('1')).rejects.toEqual({
        error: 'An error occurred while querying the database for applications, students, degrees, and proposals',
      });
      expect(prisma.Application.findMany).toHaveBeenCalled();
    });
  });

  // Test getProposalById function
  describe('getProposalById function', () => {
    it('should resolve with a proposal, teacher, and degree', async () => {
      // Mock the Prisma method
      prisma.Proposal.findUnique.mockResolvedValueOnce(mockProposalData);

      // Call the function and expect the result
      const result = await application.getProposalById('1');
      expect(result).toEqual({
        proposal: expect.any(Object),
        teacher: expect.any(Object),
        degree: expect.any(Object),
      });
      expect(prisma.Proposal.findUnique).toHaveBeenCalled();
    });

    it('should reject with an error if there is a database error', async () => {
      // Mocked error for the error case
      const mockedError = new Error("Database error");

      // Mock the Prisma method
      prisma.Proposal.findUnique.mockRejectedValueOnce(mockedError);

      // Call the function and expect it to throw an error
      await expect(application.getProposalById('1')).rejects.toEqual({
        error: 'An error occurred while querying the database for the proposal and related information',
      });
      expect(prisma.Proposal.findUnique).toHaveBeenCalled();
    });
  });

  // Test getStudentById function
  describe('getStudentById function', () => {
    it('should resolve with a student', async () => {
      // Mock the Prisma method
      prisma.Student.findUnique.mockResolvedValueOnce(mockStudentData);

      // Call the function and expect the result
      const result = await application.getStudentById('1');
      expect(result).toEqual({
        student: expect.any(Object),
      });
      expect(prisma.Student.findUnique).toHaveBeenCalled();
    });

    it('should reject with an error if there is a database error', async () => {
      // Mocked error for the error case
      const mockedError = new Error("Database error");

      // Mock the Prisma method
      prisma.Student.findUnique.mockRejectedValueOnce(mockedError);

      // Call the function and expect it to throw an error
      await expect(application.getStudentById('1')).rejects.toEqual({
        error: 'An error occurred while querying the database for student information',
      });
      expect(prisma.Student.findUnique).toHaveBeenCalled();
    });
  });
});
