const {
  getProposals,
  createProposal,
} = require("../src/controllers/proposals.js");

const prisma = require("../src/controllers/prisma.js");

// Mocking PrismaClient
jest.mock("../src/controllers/prisma.js", () => ({
  Proposal: {
    findMany: jest.fn(() => {}),
    create: jest.fn(() => {}),
  },
}));

beforeEach(() => {
  jest.restoreAllMocks();
});

describe("getProposals", () => {
  test("should return empty list if there are no propsals", async () => {
    const mockProposal = {
      title: "test",
      supervisor: "ikhan",
      keywords: [],
      type: "ikhan",
      groups: "ikhana",
      description: "iji",
      notes: "tamara",
      expiration: "iui",
      level: "ihk",
      cds: "ijji",
      teacher: "ihi",
      requiredKnowledge: "uytu",
      degree: "er",
    };
    prisma.Proposal.findMany.mockResolvedValue(mockProposal);

    const response = await getProposals();

    expect(prisma.Proposal.findMany).toHaveBeenCalled();
    expect(response).toEqual(mockProposal);
  });
});

describe("createProposlas", () => {
  test("should create a new proposal", async () => {
    const mockReq = {
      title: "test",
      supervisor: "ikhan",
      keywords: [],
      type: "ikhan",
      groups: "ikhana",
      description: "iji",
      notes: "tamara",
      expiration: "iui",
      level: "ihk",
      cds: "ijji",
      teacher: "ihi",
      requiredKnowledge: "uytu",
      degree: "er",
    };

    prisma.Proposal.create.mockResolvedValue({ ...mockReq });

    const response = await createProposal({ ...mockReq });

    expect(response).toEqual({ ...mockReq });
    expect(prisma.Proposal.create).toHaveBeenCalled();
  });
});
