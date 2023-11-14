const { getAllCds, getAllTypes, getAllLevels, getAllProposals, getProposalsByTitle, getProposalsByCosupervisor, getProposalsBySupervisor, getProposalsByKeywords, getProposalsByGroups, getProposalsByExpirationDate, getProposalsByLevel, getProposalsByType, getProposalsByCDS } = require("../../controllers/proposals.js");
const { PrismaClient } = require("@prisma/client");
const { mocked } = require("jest-mock");
const prisma = require("../../controllers/prisma.js");

// Mock di PrismaClient per il modulo dei cds
jest.mock("../../controllers/prisma.js", () => ({
  cds: {
    findMany: jest.fn(() => {}),
  },
}));

describe("getAllCds function", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should resolve with all CDs from the database", async () => {
    // Mock dei cds per il caso di successo
    const mockedCds = [
      { COD_DEGREE: 1, TITLE_DEGREE: "Example Degree"},
      // Aggiungi altri cds simulati secondo necessità per test più approfonditi
    ];

    // Mock di PrismaClient e del suo metodo findMany
    prisma.cds.findMany.mockResolvedValueOnce(mockedCds);

    // Chiamata della funzione e attesa del risultato
    const result = await getAllCds();

    // Assert del risultato e del fatto che findMany sia stato chiamato
    expect(result).toEqual(mockedCds);
    expect(prisma.cds.findMany).toHaveBeenCalled();
  });

  it("should reject with an error if there is a database error", async () => {
    // Mock dell'errore per il caso di errore
    const mockedError = new Error("Database error");

    // Mock di PrismaClient e del suo metodo findMany per simulare un errore
    prisma.cds.findMany.mockRejectedValueOnce(mockedError);

    try {
      await getAllCds();
    } catch (error) {
      // Assert del messaggio di errore e del fatto che findMany sia stato chiamato
      expect(error).toEqual({
        error: "An error occurred while querying the database for cds",
      });
      expect(prisma.cds.findMany).toHaveBeenCalled();
    }
  });
});

