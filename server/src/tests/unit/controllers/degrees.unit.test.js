const { getDegrees } = require("../../../controllers/degrees.js");

const prisma = require("../../../controllers/prisma.js");

// Mocking PrismaClient
jest.mock("../../../controllers/prisma.js", (()=>({
  degree: {
    findMany: jest.fn(() => {}),
  }
})));

describe("getDegrees function", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should resolve with degrees from the database", async () => {
    // Mocked degrees for the successful case
    const mockedDegrees = [
      { id: 1, COD_DEGREE: 123, TITLE_DEGREE: "Example Degree", CFU: 3 },
      // Add more mocked degrees as needed for thorough testing
    ];

    // Mock the PrismaClient and its findMany method
    prisma.degree.findMany.mockResolvedValueOnce(mockedDegrees);
    // Call the function and expect the result
    const result = await getDegrees();

    // Assert the result and that findMany was called
    expect(result).toEqual(mockedDegrees);
    expect(prisma.degree.findMany).toHaveBeenCalled();
  });

  it("should reject with an error if there is a database error", async () => {
    // Mocked error for the error case
    const mockedError = new Error("Database error");

    // Mock the PrismaClient and its findMany method
    prisma.degree.findMany.mockRejectedValueOnce(mockedError);

    try {
      await getDegrees();
    } catch (error) {
      // Assert the error message and that findMany was called
      expect(error).toEqual({
        error: "An error occurred while querying the database for teachers",
      });
      expect(prisma.degree.findMany).toHaveBeenCalled();
    }
  });
});
