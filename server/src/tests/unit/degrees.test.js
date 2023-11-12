const { getDegrees } = require('../../controllers/degrees.js');
const { PrismaClient } = require('@prisma/client');

// Mocking PrismaClient
jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn(() => ({
      degree: {
        findMany: jest.fn(() => [{ id: 1, COD_DEGREE: 123, TITLE_DEGREE: 'Example Degree', CFU: 3 }]),
      },
    })),
  }));

describe('getDegrees function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve with degrees from the database', async () => {
    const mockedDegrees = [
      { id: 1, COD_DEGREE: 123, TITLE_DEGREE: 'Example Degree',CFU: 3 },
      // Add more mocked degrees as needed for thorough testing
    ];
    const mockFindMany = jest.fn().mockResolvedValue(mockedDegrees);
    PrismaClient.mockImplementation(() => ({
      degree: {
        findMany: mockFindMany,
      },
    }));

    const result = await getDegrees();
    expect(result).toEqual(mockedDegrees);
    expect(mockFindMany).toHaveBeenCalled();
  });

  it('should reject with an error if there is a database error', async () => {
    const mockedError = new Error('Database error');
    const mockFindMany = jest.fn().mockRejectedValue(mockedError);
    PrismaClient.mockImplementation(() => ({
      degree: {
        findMany: mockFindMany,
      },
    }));

    try {
      await getDegrees();
    } catch (error) {
      expect(error).toEqual({ error: "An error occurred while querying the database for teachers" });
    }
    expect(mockFindMany).toHaveBeenCalled();
  });
});
