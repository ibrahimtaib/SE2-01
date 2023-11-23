const prisma = require("../../../controllers/prisma.js");
const { deleteProposal } = require("../../../controllers/proposals.js");
const app = require("../../../app.js");
const supertest = require("supertest");
// Mocking PrismaClient
jest.mock("../../../controllers/proposals.js", () => {
  return {
    deleteProposal: jest.fn(() => {}),
  };
});

describe("deleteProposals= route", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("Successful delete request", async () => {
    deleteProposal.mockResolvedValueOnce({
      status: 200,
      message: "Operation successful!",
    });

    // Call the route and expect the result
    await supertest(app)
      .delete("/proposals/1")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect({ status: 200, message: "Operation successful!" });

    expect(deleteProposal).toHaveBeenCalledWith(1);
  });
});
