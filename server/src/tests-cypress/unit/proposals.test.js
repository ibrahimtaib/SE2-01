const { getAllCds, getAllTypes, getAllLevels, getProposals, getProposalsByTitle, getProposalsByCosupervisor, getProposalsBySupervisor, getProposalsByKeywords, getProposalsByGroups, getProposalsByExpirationDate, getProposalsByLevel, getProposalsByType, getProposalsByCDS } = require("../../controllers/proposals.js");
const { PrismaClient } = require("@prisma/client");
const { mocked } = require("jest-mock");
const prisma = require("../../controllers/prisma.js");


jest.mock("../../controllers/prisma.js", () => ({
  Degree: {
    findMany: jest.fn(() => {}),
  },
  Proposal: {
    findMany: jest.fn(() => {}),
  },
  Teacher: {
    findMany: jest.fn(() => {}),
  },
}));


describe("getAllCds function", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should resolve with all CDs from the database", async () => {
    const mockedCds = [
      { COD_DEGREE: 1, TITLE_DEGREE: "Example Degree"},
      { COD_DEGREE: 2, TITLE_DEGREE: 'Example Degree 2'},
    ];
    prisma.Degree.findMany.mockResolvedValueOnce(mockedCds);
    const result = await getAllCds();

    expect(result).toEqual(mockedCds);
    expect(prisma.Degree.findMany).toHaveBeenCalled();
  });

  it("should reject with an error if there is a database error", async () => {
    const mockedError = new Error("Database error");
    prisma.Degree.findMany.mockRejectedValueOnce(mockedError);

    try {
      await getAllCds();
    } catch (error) {
      expect(error).toEqual({
        error: "An error occurred while querying the database for cds",
      });
      expect(prisma.Degree.findMany).toHaveBeenCalled();
    }
  });
});

describe("getAllTypes function", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should resolve with all types of proposals from the database", async () => {
    const mockedTypes = ["Type 1", "Type 2", "Type 3"];
    prisma.Proposal.findMany.mockResolvedValueOnce(mockedTypes.map(type => ({ type })));

    const result = await getAllTypes();
    expect(result).toEqual(mockedTypes);
    expect(prisma.Proposal.findMany).toHaveBeenCalled();
  });

  it("should reject with an error if there is a database error", async () => {
    const mockedError = new Error("Database error");
    prisma.Proposal.findMany.mockRejectedValueOnce(mockedError);

    try {
      await getAllTypes();
    } catch (error) {
      expect(error).toEqual({
        error: "An error occurred while querying the database for types",
      });
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    }
  });
});


describe("getAllLevels function", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should resolve with unique levels from the database", async () => {
    const mockedLevels = ["Level 1", "Level 2", "Level 3"];

    prisma.Proposal.findMany.mockResolvedValueOnce(mockedLevels.map(level => ({ level })));
    const result = await getAllLevels();

    expect(result).toEqual(mockedLevels);
    expect(prisma.Proposal.findMany).toHaveBeenCalled();
  });

  it("should reject with an error if there is a database error", async () => {
    const mockedError = new Error("Database error");
    prisma.Proposal.findMany.mockRejectedValueOnce(mockedError);

    try {
      await getAllLevels();
    } catch (error) {
      expect(error).toEqual({
        error: "An error occurred while querying the database for level",
      });
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    }
  });
});


describe("getProposals function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should resolve with proposals from the database", async () => {
    const mockedProposals = [
      { id: 1, title: "Proposal 1", teacher: { surname: "Smith" }, degree: { TITLE_DEGREE: "Degree 1" } },
      { id: 2, title: "Proposal 2", teacher: { surname: "Johnson" }, degree: { TITLE_DEGREE: "Degree 2" } },
    ];

    prisma.Proposal.findMany.mockResolvedValue(mockedProposals);

    const result = await getProposals();

    expect(prisma.Proposal.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockedProposals);
  });

  it("should reject with an error if there is a database error", async () => {
    const mockedError = new Error("Database error");
    prisma.Proposal.findMany.mockRejectedValue(mockedError);

    try {
      await getProposals();
    } catch (error) {
      expect(error).toEqual({
        error: 'An error occurred while querying the database',
      });
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    }
  });
});


describe('getProposalsByTitle function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve with proposals matching the title from the database', async () => {
    const searchString = 'proposal'; 

    const mockedProposalsTitle = [
      { title: 'Example Proposal 1' },
      { title: 'Example Proposal 2' },
    ];

    prisma.Proposal.findMany.mockResolvedValue(mockedProposalsTitle);

    const result = await getProposalsByTitle(searchString);

    expect(result).toEqual(mockedProposalsTitle);
    expect(prisma.Proposal.findMany).toHaveBeenCalled()
  });

  it('should reject with an error if there is a database error', async () => {
    const searchString = 'example'; 
    const mockedError = new Error('Database error');

    prisma.Proposal.findMany.mockRejectedValueOnce(mockedError);

    try {
      await getProposalsByTitle(searchString);
    } catch (error) {
      expect(error).toEqual({
        error: 'An error occurred while querying the database',
      });
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    }
  });
});


describe('getProposalsByCosupervisor function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve with proposals matching the co-supervisor surname from the database', async () => {
    const surname = 'Doe'; // Sostituisci con il cognome del co-supervisore

    const mockedProposals = [
      // Simula le proposte che corrispondono al co-supervisore
      { title: 'Example Proposal 1', coSupervisors: 'Doe' },
      { title: 'Example Proposal 2', coSupervisors: 'Doe' },
    ];

    prisma.Proposal.findMany.mockResolvedValueOnce(mockedProposals);

    const result = await getProposalsByCosupervisor(surname);

    expect(result).toEqual(mockedProposals);
    expect(prisma.Proposal.findMany).toHaveBeenCalled();
  });

  it('should reject with an error if there is a database error', async () => {
    const surname = 'Doe'; // Sostituisci con il cognome del co-supervisore

    const mockedError = new Error('Database error');

    prisma.Proposal.findMany.mockRejectedValueOnce(mockedError);

    try {
      await getProposalsByCosupervisor(surname);
    } catch (error) {
      expect(error).toEqual({
        error: 'An error occurred while querying the database',
      });
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    }
  });
});

describe('getProposalsBySupervisor function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve with proposals from the database for a specific supervisor', async () => {
    const surname = 'Doe'; 

    const mockedTeachers = [
      { id: 1, surname: 'Doe' },
      { id: 2, surname: 'Doe' },
    ];

    const mockedProposals = [
      { title: 'Proposal 1', supervisor: 1 },
      { title: 'Proposal 2', supervisor: 2 },
    ];

    prisma.Teacher.findMany.mockResolvedValueOnce(mockedTeachers);
    prisma.Proposal.findMany.mockResolvedValueOnce(mockedProposals);

    const result = await getProposalsBySupervisor(surname);

    expect(prisma.Teacher.findMany).toHaveBeenCalled();

    expect(prisma.Proposal.findMany).toHaveBeenCalled();

    expect(result).toEqual(mockedProposals);
  });

  it('should reject with an error if the supervisor is not found', async () => {
    const surname = 'Nonexistent'; 

    const mockedTeachers = [];
    prisma.Teacher.findMany.mockResolvedValueOnce(mockedTeachers);

    try {
      await getProposalsBySupervisor(surname);
    } catch (error) {
      expect(error).toEqual({
        error: 'An error occurred while querying the database',
      });
      expect(prisma.Teacher.findMany).toHaveBeenCalled();
    }
  });
});

describe('getProposalsByKeywords function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve with proposals matching the keywords from the database', async () => {
    const inputKeywords = 'keyword1, keyword2'; 
    const keywordsArray = inputKeywords.split(',').map(keyword => keyword.trim().toLowerCase());

    const mockedProposals = [
      { keywords: ['keyword1', 'keyword3'] },
      { keywords: ['keyword2', 'keyword4'] },
    ];

    prisma.Proposal.findMany.mockResolvedValueOnce(mockedProposals);

    const result = await getProposalsByKeywords(inputKeywords);

    const filteredProposals = mockedProposals.filter(proposal =>
      keywordsArray.every(keyword =>
        proposal.keywords.map(k => k.toLowerCase()).includes(keyword)
      )
    );

    expect(result).toEqual(filteredProposals);
    expect(prisma.Proposal.findMany).toHaveBeenCalled();
  });

  it('should reject with an error if there is a database error', async () => {
    const mockedError = new Error('Database error');
    prisma.Proposal.findMany.mockRejectedValueOnce(mockedError);

    const inputKeywords = 'keyword1, keyword2'; 
    try {
      await getProposalsByKeywords(inputKeywords);
    } catch (error) {
      expect(error).toEqual({
        error: 'An error occurred while querying the database',
      });
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    }
  });
});

describe('getProposalsByGroups function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve with proposals filtered by groups from the database', async () => {
    const groups = 'group1, group2'; 

    const mockedProposals = [
      {
        groups: ['group1', 'group3'],
      },
      {
        groups: ['group2', 'group4'],
      },
    ];

    prisma.Proposal.findMany.mockResolvedValueOnce(mockedProposals);

    const result = await getProposalsByGroups(groups);

    const expectedFilteredProposals = mockedProposals.filter(
      (proposal) =>
        proposal.groups.includes('group1') || proposal.groups.includes('group2')
    );

    expect(result).toEqual(expectedFilteredProposals);
    expect(prisma.Proposal.findMany).toHaveBeenCalled();
  });

  it('should reject with an error if there is a database error', async () => {
    const groups = 'group1, group2'; 

    const mockedError = new Error('Database error');

    prisma.Proposal.findMany.mockRejectedValueOnce(mockedError);

    try {
      await getProposalsByGroups(groups);
    } catch (error) {
      expect(error).toEqual({
        error: 'An error occurred while querying the database',
      });
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    }
  });
});

describe('getProposalsByExpirationDate function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve with proposals filtered by expiration date from the database', async () => {
    const expirationDate = '2023-12-31'; 

    const mockedProposals = [
      {
        expiration: new Date('2023-12-30'),
      },
      {
        expiration: new Date('2023-12-31'),
      },
    ];

    prisma.Proposal.findMany.mockResolvedValueOnce(mockedProposals);

    const result = await getProposalsByExpirationDate(expirationDate);

    const expectedFilteredProposals = mockedProposals.filter(
      (proposal) => proposal.expiration <= new Date(expirationDate)
    );

    expect(result).toEqual(expectedFilteredProposals);
    expect(prisma.Proposal.findMany).toHaveBeenCalled();
  });

  it('should reject with an error if there is a database error', async () => {
    const expirationDate = '2023-12-31'; 

    const mockedError = new Error('Database error');

    prisma.Proposal.findMany.mockRejectedValueOnce(mockedError);

    try {
      await getProposalsByExpirationDate(expirationDate);
    } catch (error) {
      expect(error).toEqual({
        error: 'An error occurred while querying the database',
      });
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    }
  });
});


describe("getProposalsByLevel function", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should resolve with proposals filtered by level from the database", async () => {
    const level = "SomeLevel";

    const mockedProposals = [
      {
        id: 1,
        title: "Proposal 1",
        teacher: {
          surname: "Smith",
        },
        degree: {
          TITLE_DEGREE: "Degree 1",
        },
        level: "SomeLevel",
      },
      {
        id: 2,
        title: "Proposal 2",
        teacher: {
          surname: "Johnson",
        },
        degree: {
          TITLE_DEGREE: "Degree 2",
        },
        level: "SomeLevel",
      },
    ];

    prisma.Proposal.findMany.mockResolvedValue(mockedProposals);

    const result = await getProposalsByLevel(level);

    const expectedFilteredProposals = mockedProposals.filter(
      (proposal) => proposal.level.toLowerCase() === level.toLowerCase()
    );

    expect(result).toEqual(expectedFilteredProposals);
    expect(prisma.Proposal.findMany).toHaveBeenCalled();
  });

  it("should reject with an error if there is a database error", async () => {
    const level = "SomeLevel";

    const mockedError = new Error("Database error");

    prisma.Proposal.findMany.mockRejectedValue(mockedError);

    try {
      await getProposalsByLevel(level);
    } catch (error) {
      expect(error).toEqual({
        error: "An error occurred while querying the database",
      });
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    }
  });
});

describe("getProposalsByType function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should resolve with proposals filtered by type from the database", async () => {
    const type = "SomeType";
    const mockedProposals = [
      {
        id: 1,
        title: "Proposal 1",
        teacher: {
          surname: "Smith",
        },
        degree: {
          TITLE_DEGREE: "Degree 1",
        },
        type: "SomeType",
      },
      {
        id: 2,
        title: "Proposal 2",
        teacher: {
          surname: "Johnson",
        },
        degree: {
          TITLE_DEGREE: "Degree 2",
        },
        type: "SomeType",
      },
    ];

    prisma.Proposal.findMany.mockResolvedValue(mockedProposals);

    const result = await getProposalsByType(type);

    const expectedFilteredProposals = mockedProposals.filter(
      (proposal) => proposal.type.toLowerCase() === type.toLowerCase()
    );

    expect(result).toEqual(expectedFilteredProposals);
    expect(prisma.Proposal.findMany).toHaveBeenCalled();
  });

  it("should reject with an error if there is a database error", async () => {
    const type = "SomeType";

    const mockedError = new Error("Database error");

    prisma.Proposal.findMany.mockRejectedValue(mockedError);

    try {
      await getProposalsByType(type);
    } catch (error) {
      expect(error).toEqual({
        error: "An error occurred while querying the database",
      });
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    }
  });
});

describe("getProposalsByCDS function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should resolve with proposals filtered by CDS from the database", async () => {
    const cds = "SomeCDS";

    const mockedProposals = [
      {
        id: 1,
        title: "Proposal 1",
        teacher: {
          surname: "Smith",
        },
        degree: {
          TITLE_DEGREE: "Degree 1",
        },
        cds: "SomeCDS",
      },
      {
        id: 2,
        title: "Proposal 2",
        teacher: {
          surname: "Johnson",
        },
        degree: {
          TITLE_DEGREE: "Degree 2",
        },
        cds: "SomeCDS",
      },
    ];

    prisma.Proposal.findMany.mockResolvedValueOnce(mockedProposals);

    const result = await getProposalsByCDS(cds);

    const expectedFilteredProposals = mockedProposals.filter(
      (proposal) => proposal.cds === cds
    );

    expect(result).toEqual(expectedFilteredProposals);
    expect(prisma.Proposal.findMany).toHaveBeenCalled();
  });

  it("should reject with an error if there is a database error", async () => {
    const cds = "SomeCDS";

    const mockedError = new Error("Database error");

    prisma.Proposal.findMany.mockRejectedValueOnce(mockedError);

    try {
      await getProposalsByCDS(cds);
    } catch (error) {
      expect(error).toEqual({
        error: "An error occurred while querying the database",
      });
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    }
  });
});



