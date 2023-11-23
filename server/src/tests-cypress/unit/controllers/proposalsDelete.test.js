// Import necessary modules and functions
const { deleteProposal } = require("../../../controllers/proposals");
const prisma = require("../../../controllers/prisma.js");
const { STATUS } = require("../../../constants/application.js");

// Mocking PrismaClient
jest.mock("../../../controllers/prisma.js", () => ({
  Proposal: {
    findUnique: jest.fn(() => {}),
    update: jest.fn(() => {}),
  },
  Application: {
    updateMany: jest.fn(() => {}),
  },
  $transaction: jest.fn(),
}));

describe("deleteProposal function", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should delete a proposal and update associated applications", async () => {
    // Mocked data for the successful case
    const mockedApplications = [
      { id: 1, status: STATUS.PENDING },
      { id: 2, status: STATUS.PENDING },
    ];
    const mockedProposal = { id: 1, archived: false, applications: [] };

    // Mock the Prisma methods
    prisma.Proposal.findUnique.mockResolvedValueOnce(mockedProposal);
    prisma.Proposal.update.mockResolvedValueOnce({
      ...mockedProposal,
      archived: true,
    });

    // Mock application update
    prisma.Application.updateMany.mockResolvedValueOnce(
      mockedApplications.map((application) => {
        return { ...application, status: STATUS.CANCELED };
      })
    );
    prisma.$transaction.mockImplementation(async (callback) =>
      callback(prisma)
    );

    // Call the function and expect the result
    const result = await deleteProposal(1);

    // Assert the result and that the Prisma methods were called
    expect(result).toEqual({
      status: 200,
      message: "Operation successful!",
    });
    expect(prisma.Proposal.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        applications: {
          where: { status: STATUS.ACCEPTED },
        },
      },
    });
    expect(prisma.Proposal.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { archived: true },
    });
    expect(prisma.Application.updateMany).toHaveBeenCalledWith({
      where: { proposalId: 1 },
      data: { status: STATUS.CANCELED },
    });
  });

  it("should reject with 400 if proposal does not exist", async () => {
    // Mock the Prisma methods to simulate a case where the proposal does not exist
    prisma.Proposal.findUnique.mockResolvedValueOnce(null);

    // Call the function and expect it to reject with the appropriate error
    await expect(deleteProposal(1)).rejects.toEqual({
      status: 404,
      message: "Proposal does not exist!",
    });

    // Assert that the Prisma methods were called
    expect(prisma.Proposal.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        applications: {
          where: { status: STATUS.ACCEPTED },
        },
      },
    });
  });

  it("should reject with 500 on Prisma transaction error", async () => {
    // Mock the Prisma methods to simulate a database error during the transaction
    prisma.Proposal.findUnique.mockResolvedValueOnce({ id: 1 });
    prisma.$transaction.mockRejectedValueOnce(
      new Error("Some Prisma transaction error")
    );

    // Call the function and expect it to reject with the appropriate error
    await expect(deleteProposal(1)).rejects.toEqual({
      status: 500,
      error: "An error occurred while deleting the proposal",
    });

    // Assert that the Prisma methods were called
    expect(prisma.Proposal.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        applications: {
          where: { status: STATUS.ACCEPTED },
        },
      },
    });
  });
});
