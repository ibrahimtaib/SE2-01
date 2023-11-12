const degreesController = require("../controllers/degrees");

// Mocking the PrismaClient and its method
jest.mock("@prisma/client", () => {
  const prismaMock = {
    Degree: {
      findMany: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => prismaMock) };
});

describe('Degrees Controller Tests', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods
    jest.clearAllMocks();
  });

  test('getDegrees function - Successful Scenario', async () => {
    const mockDegrees = [{ id: 1, COD_COURSE: 101, TITLE_COURSE: 'Example Course' }];
    const expected = mockDegrees;

    // Mocking the Prisma query response
    const prismaMock = new degreesController.PrismaClient();
    prismaMock.Degree.findMany.mockResolvedValue(mockDegrees);

    const result = await degreesController.getDegrees();
    expect(result).toEqual(expected);
    // Verifying the method is called
    expect(prismaMock.Degree.findMany).toHaveBeenCalled();
  });

  test('getDegrees function - Error Scenario', async () => {
    const error = 'Database Error';
    
    // Mocking the Prisma query to simulate an error
    const prismaMock = new degreesController.PrismaClient();
    prismaMock.Degree.findMany.mockRejectedValue(error);

    try {
      await degreesController.getDegrees();
    } catch (e) {
      expect(e).toEqual({ error: 'An error occurred while querying the database for teachers' });
      // Verifying the method is called
      expect(prismaMock.Degree.findMany).toHaveBeenCalled();
    }
  });
});
