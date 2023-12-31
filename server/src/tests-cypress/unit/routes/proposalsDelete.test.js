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

  it("Unsuccessful delete request", async () => {
    deleteProposal.mockRejectedValue({
      status: 404,
      message: "Proposal not found!",
    });

    // Call the route and expect the result
    await supertest(app)
      .delete("/proposals/1")
      .expect(404)
      .expect("Content-Type", /json/)
      .expect({ status: 404, message: "Proposal not found!" });

    expect(deleteProposal).toHaveBeenCalledWith(1);
  });

  it("Wrong id format", async () => {
    // Call the route and expect the result
    await supertest(app)
      .delete("/proposals/abc")
      .expect(400)
      .expect("Content-Type", /json/)
      .expect({
        status: 400,
        error: "Wrong Id format",
      });
  });
});
