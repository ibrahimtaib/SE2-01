const {
  getProposals,
  createProposal,
  updateProposal
} = require("../src/controllers/proposals.js");
const prisma = require("../src/controllers/prisma.js");

// Mocking PrismaClient
jest.mock("../src/controllers/prisma.js", () => ({
  Proposal: {
    findMany: jest.fn(() => {}),
    create: jest.fn(() => {}),
   update: jest.fn()
  },
}));

beforeEach(() => {
  jest.restoreAllMocks();
});

describe("getProposals", () => {
  test("should return empty list if there are no propsals", async () => {
    const mockProposal = [
      {
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
        applications: [],
        teacher: "ihi",
        requiredKnowledge: "uytu",
        degree: "er",
        applications: [],
      },
    ];
    const mockResponse = [
      { ...mockProposal[0], applications: undefined, deletable: true },
    ];
    prisma.Proposal.findMany.mockResolvedValue(mockProposal);

    const response = await getProposals();

    expect(prisma.Proposal.findMany).toHaveBeenCalled();
    expect(response).toEqual(mockResponse);
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



describe("updateProposal", () => {
  test("should update an existing proposal", async () => {
    const mockReq = {
      id: 1,
      title: "Updated Title",
      supervisor: "Updated Supervisor",
      keywords: ["new", "keywords"],
      type: "Updated Type",
      groups: "Updated Groups",
      description: "Updated Description",
      notes: "Updated Notes",
      expiration: "Updated Expiration",
      level: "Updated Level",
      cds: "Updated CDS",
      teacher: "Updated Teacher",
      requiredKnowledge: "Updated Knowledge",
      degree: "Updated Degree",
    };

    prisma.Proposal.update.mockResolvedValue({ ...mockReq });

    const response = await updateProposal(mockReq);

    expect(response).toEqual({ ...mockReq });
    expect(prisma.Proposal.update).toHaveBeenCalledWith({
      where: { id: mockReq.id },
      data: {
        title: mockReq.title,
        supervisor: mockReq.supervisor,
        keywords: mockReq.keywords,
        type: mockReq.type,
        groups: mockReq.groups,
        description: mockReq.description,
        notes: mockReq.notes,
        expiration: mockReq.expiration,
        level: mockReq.level,
        cds: mockReq.cds,
        teacher: mockReq.teacher,
        requiredKnowledge: mockReq.requiredKnowledge,
        degree: mockReq.degree,
      },
    });
  });

  test("should handle errors during proposal update", async () => {
    const mockReq = {
      id: 1,
      // other properties...
    };

    const mockError = new Error("Mock Prisma Error");
    prisma.Proposal.update.mockRejectedValue(mockError);

    await expect(updateProposal(mockReq)).rejects.toEqual({
      error: "An error occurred while updating proposal",
    });

    expect(prisma.Proposal.update).toHaveBeenCalledWith({
      where: { id: mockReq.id },
      data: {
        // properties...
      },
    });
  });
});

