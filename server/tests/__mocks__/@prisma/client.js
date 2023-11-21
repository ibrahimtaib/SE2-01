
module.exports = {
  PrismaClient: jest.fn(() => ({
    Proposal: {
      findUnique: jest.fn(),
      findMany: jest.fn()
    },
    // Add other mock methods and models as needed
  })),
};