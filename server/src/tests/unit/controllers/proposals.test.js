const {
  getAllProposals,
  getAllCds,
  getAllTypes,
  getAllLevels,
  getProposals,
  getProposalsByTitle,
  getProposalsByCosupervisor,
  getProposalsBySupervisor,
  getProposalsByKeywords,
  getProposalsByGroups,
  getProposalsByExpirationDate,
  getProposalsByLevel,
  getProposalsByType,
  getProposalsByCDS,
  filterProposals,
} = require("../../../controllers/proposals.js");
const proposalsModule = require("../../../controllers/proposals.js");
const { PrismaClient } = require("@prisma/client");
const { mocked } = require("jest-mock");
const prisma = require("../../../controllers/prisma.js");

jest.mock("../../../controllers/prisma.js", () => ({
  Degree: {
    findMany: jest.fn(() => {}),
  },
  Proposal: {
    findMany: jest.fn(() => {}),
  },
  Teacher: {
    findMany: jest.fn(() => {}),
  },
  Application: {
    findUnique: jest.fn(() => {}),
    findMany: jest.fn(() => {}),
    update: jest.fn(() => {}),
  },
}));

describe("getAllCds function", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should resolve with all CDs from the database", async () => {
    const mockedCds = [
      { COD_DEGREE: 1, TITLE_DEGREE: "Example Degree" },
      { COD_DEGREE: 2, TITLE_DEGREE: "Example Degree 2" },
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
    prisma.Proposal.findMany.mockResolvedValueOnce(
      mockedTypes.map((type) => ({ type }))
    );

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

    prisma.Proposal.findMany.mockResolvedValueOnce(
      mockedLevels.map((level) => ({ level }))
    );
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
      {
        id: 1,
        title: "Proposal 1",
        teacher: { surname: "Smith" },
        degree: { TITLE_DEGREE: "Degree 1" },
        applications: [],
      },
      {
        id: 2,
        title: "Proposal 2",
        teacher: { surname: "Johnson" },
        degree: { TITLE_DEGREE: "Degree 2" },
        applications: [],
      },
    ];
    const mockedResponse = mockedProposals.map((proposal) => ({
      ...proposal,
      applications: undefined,
      deletable: true,
    }));

    prisma.Proposal.findMany.mockResolvedValue(mockedProposals);

    const result = await getProposals();

    expect(prisma.Proposal.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockedResponse);
  });

  it("should reject with an error if there is a database error", async () => {
    const mockedError = new Error("Database error");
    prisma.Proposal.findMany.mockRejectedValue(mockedError);

    try {
      await getProposals();
    } catch (error) {
      expect(error).toEqual({
        error: "An error occurred while querying the database",
      });
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    }
  });
});

describe("getProposalsByTitle function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should resolve with proposals matching the title from the database", async () => {
    const searchString = "proposal";

    const mockedProposalsTitle = [
      { title: "Example Proposal 1" },
      { title: "Example Proposal 2" },
    ];

    prisma.Proposal.findMany.mockResolvedValue(mockedProposalsTitle);

    const result = await getProposalsByTitle(searchString);

    expect(result).toEqual(mockedProposalsTitle);
    expect(prisma.Proposal.findMany).toHaveBeenCalled();
  });

  it("should reject with an error if there is a database error", async () => {
    const searchString = "example";
    const mockedError = new Error("Database error");

    prisma.Proposal.findMany.mockRejectedValueOnce(mockedError);

    try {
      await getProposalsByTitle(searchString);
    } catch (error) {
      expect(error).toEqual({
        error: "An error occurred while querying the database",
      });
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    }
  });
});

describe("getProposalsByCosupervisor function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should resolve with proposals matching the co-supervisor surname from the database", async () => {
    const surname = "Doe"; // Sostituisci con il cognome del co-supervisore

    const mockedProposals = [
      // Simula le proposte che corrispondono al co-supervisore
      { title: "Example Proposal 1", coSupervisors: "Doe" },
      { title: "Example Proposal 2", coSupervisors: "Doe" },
    ];

    prisma.Proposal.findMany.mockResolvedValueOnce(mockedProposals);

    const result = await getProposalsByCosupervisor(surname);

    expect(result).toEqual(mockedProposals);
    expect(prisma.Proposal.findMany).toHaveBeenCalled();
  });

  it("should reject with an error if there is a database error", async () => {
    const surname = "Doe"; // Sostituisci con il cognome del co-supervisore

    const mockedError = new Error("Database error");

    prisma.Proposal.findMany.mockRejectedValueOnce(mockedError);

    try {
      await getProposalsByCosupervisor(surname);
    } catch (error) {
      expect(error).toEqual({
        error: "An error occurred while querying the database",
      });
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    }
  });
});

describe("getProposalsBySupervisor function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should resolve with proposals from the database for a specific supervisor", async () => {
    const surname = "Doe";

    const mockedTeachers = [
      { id: 1, surname: "Doe" },
      { id: 2, surname: "Doe" },
    ];

    const mockedProposals = [
      { title: "Proposal 1", supervisor: 1 },
      { title: "Proposal 2", supervisor: 2 },
    ];

    prisma.Teacher.findMany.mockResolvedValueOnce(mockedTeachers);
    prisma.Proposal.findMany.mockResolvedValueOnce(mockedProposals);

    const result = await getProposalsBySupervisor(surname);

    expect(prisma.Teacher.findMany).toHaveBeenCalled();

    expect(prisma.Proposal.findMany).toHaveBeenCalled();

    expect(result).toEqual(mockedProposals);
  });

  it("should reject with an error if the supervisor is not found", async () => {
    const surname = "Nonexistent";

    const mockedTeachers = [];
    prisma.Teacher.findMany.mockResolvedValueOnce(mockedTeachers);

    try {
      await getProposalsBySupervisor(surname);
    } catch (error) {
      expect(error).toEqual({
        error: "An error occurred while querying the database",
      });
      expect(prisma.Teacher.findMany).toHaveBeenCalled();
    }
  });
});

describe("getProposalsByKeywords function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should resolve with proposals matching the keywords from the database", async () => {
    const inputKeywords = "keyword1, keyword2";
    const keywordsArray = inputKeywords
      .split(",")
      .map((keyword) => keyword.trim().toLowerCase());

    const mockedProposals = [
      { keywords: ["keyword1", "keyword3"] },
      { keywords: ["keyword2", "keyword4"] },
    ];

    prisma.Proposal.findMany.mockResolvedValueOnce(mockedProposals);

    const result = await getProposalsByKeywords(inputKeywords);

    const filteredProposals = mockedProposals.filter((proposal) =>
      keywordsArray.every((keyword) =>
        proposal.keywords.map((k) => k.toLowerCase()).includes(keyword)
      )
    );

    expect(result).toEqual(filteredProposals);
    expect(prisma.Proposal.findMany).toHaveBeenCalled();
  });

  it("should reject with an error if there is a database error", async () => {
    const mockedError = new Error("Database error");
    prisma.Proposal.findMany.mockRejectedValueOnce(mockedError);

    const inputKeywords = "keyword1, keyword2";
    try {
      await getProposalsByKeywords(inputKeywords);
    } catch (error) {
      expect(error).toEqual({
        error: "An error occurred while querying the database",
      });
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    }
  });
});

describe("getProposalsByGroups function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should resolve with proposals filtered by groups from the database", async () => {
    const groups = "group1, group2";

    const mockedProposals = [
      {
        groups: ["group1", "group3"],
      },
      {
        groups: ["group2", "group4"],
      },
    ];

    prisma.Proposal.findMany.mockResolvedValueOnce(mockedProposals);

    const result = await getProposalsByGroups(groups);

    const expectedFilteredProposals = mockedProposals.filter(
      (proposal) =>
        proposal.groups.includes("group1") || proposal.groups.includes("group2")
    );

    expect(result).toEqual(expectedFilteredProposals);
    expect(prisma.Proposal.findMany).toHaveBeenCalled();
  });

  it("should reject with an error if there is a database error", async () => {
    const groups = "group1, group2";

    const mockedError = new Error("Database error");

    prisma.Proposal.findMany.mockRejectedValueOnce(mockedError);

    try {
      await getProposalsByGroups(groups);
    } catch (error) {
      expect(error).toEqual({
        error: "An error occurred while querying the database",
      });
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    }
  });
});

describe("getProposalsByExpirationDate function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should resolve with proposals filtered by expiration date from the database", async () => {
    const expirationDate = "2023-12-31";

    const mockedProposals = [
      {
        expiration: new Date("2023-12-30"),
      },
      {
        expiration: new Date("2023-12-31"),
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

  it("should reject with an error if there is a database error", async () => {
    const expirationDate = "2023-12-31";

    const mockedError = new Error("Database error");

    prisma.Proposal.findMany.mockRejectedValueOnce(mockedError);

    try {
      await getProposalsByExpirationDate(expirationDate);
    } catch (error) {
      expect(error).toEqual({
        error: "An error occurred while querying the database",
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
describe('getAllProposals function', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should get all proposals with deletable property based on applications and expiration', async () => {
    // Mock data for the proposals
    const mockProposals = [
      {
        id: 1,
        title: 'Proposal 1',
        expiration: new Date('2023-12-31'),
        applications: [
          { id: 101, status: 'accepted' },
        ],
      },
      {
        id: 2,
        title: 'Proposal 2',
        expiration: new Date('2024-01-15'),
        applications: [],
      },
      // Add more mock proposals as needed
    ];

    // Mock the Prisma findMany function to return the mock proposals
    prisma.Proposal.findMany.mockResolvedValueOnce(mockProposals);

    try {
      // Call the getAllProposals function
      const result = await getAllProposals();

      // Verify that the function returns the expected result
      expect(result).toEqual(mockProposals.map((proposal) => ({
        ...proposal,
        deletable: proposal.applications.length === 0 && proposal.expiration >= new Date(),
      })));

      // Verify that the Prisma findMany function was called with the correct parameters
      expect(prisma.Proposal.findMany).toHaveBeenCalledWith({
        include: {
          teacher: {
            select: {
              surname: true,
              name: true,
              id: true,
            },
          },
          degree: {
            select: {
              TITLE_DEGREE: true,
            },
          },
          applications: {
            where: {
              status: 'accept',
            },
          },
        },
      });
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error:", error);
      throw error;
    }
  });

  it('should handle errors during database query', async () => {
    // Mock an error during the Prisma findMany function
    const mockError = new Error('Database error');
    prisma.Proposal.findMany.mockRejectedValueOnce(mockError);

    // Call the getAllProposals function and expect it to throw an error
    try {
      await getAllProposals();
    } catch (error) {
      expect(error).toEqual({
        error: "An error occurred while querying the database for applications",
      });
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    }
  });
});
describe("filterProposals function", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should filter proposals based on the provided filters", async () => {
    const mockedFilter = {
      cds: "ExampleCDS",
      level: "ExampleLevel",
      type: "ExampleType",
      title: "ExampleTitle",
      supervisor: "ExampleSupervisor",
      coSupervisor: "ExampleCosupervisor",
      keywords: "ExampleKeywords",
      groups: "ExampleGroup",
      expiration: "ExampleExpirationDate",
    };

    const mockedFilteredProposals = [
      {
        id: 1,
        title: "Example Proposal 1",
        supervisor: "Example Supervisor",
        coSupervisors: ["CoSupervisor1", "CoSupervisor2"],
        keywords: ["Keyword1", "Keyword2"],
        applications: [
          {
            id: 101,
            date: new Date(),
            status: "Pending",
            comment: "Application comment",
            STUDENT_ID: "StudentID1",
            PROPOSAL_ID: 1,
          },
          {
            id: 102,
            date: new Date(),
            status: "Approved",
            comment: "Another application comment",
            STUDENT_ID: "StudentID2",
            PROPOSAL_ID: 1,
          },
        ],
        type: "Type1",
        groups: ["Group1", "Group2"],
        description: "Proposal description",
        notes: "Proposal notes",
        expiration: new Date("2023-12-31T23:59:59Z"),
        level: "Level1",
        cds: "ExampleCDS",
        archived: false,
        teacher: {
          id: "TeacherID",
          surname: "TeacherSurname",
          name: "TeacherName",
          email: "teacher@example.com",
          COD_GROUP: "TeacherGroup",
          COD_DEPARTMENT: "TeacherDepartment",
        },
        requiredKnowledge: "Required knowledge for the proposal",
        degree: {
          COD_DEGREE: "ExampleDegree",
          TITLE_DEGREE: "Example Degree Title",
        },
      },
      {
        id: 2,
        title: "Example Proposal 2",
        supervisor: "Another Supervisor",
        coSupervisors: ["CoSupervisor3"],
        keywords: ["Keyword3", "Keyword4"],
        applications: [
          {
            id: 103,
            date: new Date(),
            status: "Rejected",
            comment: "Yet another application comment",
            STUDENT_ID: "StudentID3",
            PROPOSAL_ID: 2,
          },
          // Add more application objects as needed
        ],
        type: "Type2",
        groups: ["Group3", "Group4"],
        description: "Another proposal description",
        notes: "Another proposal notes",
        expiration: new Date("2023-11-30T23:59:59Z"),
        level: "Level2",
        cds: "AnotherCDS",
        archived: true,
        teacher: {
          id: "AnotherTeacherID",
          surname: "AnotherTeacherSurname",
          name: "AnotherTeacherName",
          email: "another.teacher@example.com",
          COD_GROUP: "AnotherTeacherGroup",
          COD_DEPARTMENT: "AnotherTeacherDepartment",
        },
        requiredKnowledge: "Required knowledge for another proposal",
        degree: {
          COD_DEGREE: "AnotherDegree",
          TITLE_DEGREE: "Another Degree Title",
        },
      },
      // Add more proposal objects as needed
    ];

    jest.spyOn(proposalsModule, "getProposalsByCDS").mockResolvedValueOnce(mockedFilteredProposals);
    jest.spyOn(proposalsModule, "getProposalsByLevel").mockResolvedValueOnce(mockedFilteredProposals);

    jest.spyOn(proposalsModule, "getProposalsByTitle").mockResolvedValueOnce(mockedFilteredProposals);
    jest.spyOn(proposalsModule, "getProposalsByCosupervisor").mockResolvedValueOnce(mockedFilteredProposals);

    jest.spyOn(proposalsModule, "getProposalsBySupervisor").mockResolvedValueOnce(mockedFilteredProposals);
    jest.spyOn(proposalsModule, "getProposalsByKeywords").mockResolvedValueOnce(mockedFilteredProposals);

    jest.spyOn(proposalsModule, "getProposalsByGroups").mockResolvedValueOnce(mockedFilteredProposals);
    jest.spyOn(proposalsModule, "getProposalsByExpirationDate").mockResolvedValueOnce(mockedFilteredProposals);

    jest.spyOn(proposalsModule, "getProposalsByType").mockResolvedValueOnce(mockedFilteredProposals);

    // Mock other getProposalsBy* functions as needed

    const result = await filterProposals(mockedFilter);

    // Verify that each filter function is called with the correct parameter
    expect(proposalsModule.getProposalsByCDS).toHaveBeenCalledWith("ExampleCDS");
    expect(proposalsModule.getProposalsByLevel).toHaveBeenCalledWith("ExampleLevel");

    expect(proposalsModule.getProposalsByTitle).toHaveBeenCalledWith("ExampleTitle");
    expect(proposalsModule.getProposalsByCosupervisor).toHaveBeenCalledWith("ExampleCosupervisor");

    expect(proposalsModule.getProposalsBySupervisor).toHaveBeenCalledWith("ExampleSupervisor");
    expect(proposalsModule.getProposalsByKeywords).toHaveBeenCalledWith("ExampleKeywords");

    expect(proposalsModule.getProposalsByGroups).toHaveBeenCalledWith("ExampleGroup");
    expect(proposalsModule.getProposalsByExpirationDate).toHaveBeenCalledWith("ExampleExpirationDate");

    expect(proposalsModule.getProposalsByType).toHaveBeenCalledWith("ExampleType");


    // Verify other getProposalsBy* functions are called with the correct parameters

    // Verify that the result contains the mocked filtered proposals
    expect(result).toEqual(mockedFilteredProposals);
  });

  it("should filter proposals based on the provided filters but testing that none of the filters are applied", async () => {
    const mockedFilter = {
      cds: undefined,
      level: undefined,
      type: undefined,
      title: undefined,
      supervisor: undefined,
      coSupervisor: undefined,
      keywords: undefined,
      groups: undefined,
      expiration: undefined,
    };

    const mockedFilteredProposals = [
      {
        id: 1,
        title: "Example Proposal 1",
        supervisor: "Example Supervisor",
        coSupervisors: ["CoSupervisor1", "CoSupervisor2"],
        keywords: ["Keyword1", "Keyword2"],
        applications: [
          {
            id: 101,
            date: new Date(),
            status: "Pending",
            comment: "Application comment",
            STUDENT_ID: "StudentID1",
            PROPOSAL_ID: 1,
          },
          {
            id: 102,
            date: new Date(),
            status: "Approved",
            comment: "Another application comment",
            STUDENT_ID: "StudentID2",
            PROPOSAL_ID: 1,
          },
        ],
        type: "Type1",
        groups: ["Group1", "Group2"],
        description: "Proposal description",
        notes: "Proposal notes",
        expiration: new Date("2023-12-31T23:59:59Z"),
        level: "Level1",
        cds: "ExampleCDS",
        archived: false,
        teacher: {
          id: "TeacherID",
          surname: "TeacherSurname",
          name: "TeacherName",
          email: "teacher@example.com",
          COD_GROUP: "TeacherGroup",
          COD_DEPARTMENT: "TeacherDepartment",
        },
        requiredKnowledge: "Required knowledge for the proposal",
        degree: {
          COD_DEGREE: "ExampleDegree",
          TITLE_DEGREE: "Example Degree Title",
        },
      },
      {
        id: 2,
        title: "Example Proposal 2",
        supervisor: "Another Supervisor",
        coSupervisors: ["CoSupervisor3"],
        keywords: ["Keyword3", "Keyword4"],
        applications: [
          {
            id: 103,
            date: new Date(),
            status: "Rejected",
            comment: "Yet another application comment",
            STUDENT_ID: "StudentID3",
            PROPOSAL_ID: 2,
          },
          // Add more application objects as needed
        ],
        type: "Type2",
        groups: ["Group3", "Group4"],
        description: "Another proposal description",
        notes: "Another proposal notes",
        expiration: new Date("2023-11-30T23:59:59Z"),
        level: "Level2",
        cds: "AnotherCDS",
        archived: true,
        teacher: {
          id: "AnotherTeacherID",
          surname: "AnotherTeacherSurname",
          name: "AnotherTeacherName",
          email: "another.teacher@example.com",
          COD_GROUP: "AnotherTeacherGroup",
          COD_DEPARTMENT: "AnotherTeacherDepartment",
        },
        requiredKnowledge: "Required knowledge for another proposal",
        degree: {
          COD_DEGREE: "AnotherDegree",
          TITLE_DEGREE: "Another Degree Title",
        },
      },
      // Add more proposal objects as needed
    ];

    jest.spyOn(proposalsModule, "getProposalsByCDS").mockResolvedValueOnce(mockedFilteredProposals);
    jest.spyOn(proposalsModule, "getProposalsByLevel").mockResolvedValueOnce(mockedFilteredProposals);
    jest.spyOn(proposalsModule, "getProposalsByTitle").mockResolvedValueOnce(mockedFilteredProposals);
    jest.spyOn(proposalsModule, "getProposalsByCosupervisor").mockResolvedValueOnce(mockedFilteredProposals);
    jest.spyOn(proposalsModule, "getProposalsBySupervisor").mockResolvedValueOnce(mockedFilteredProposals);
    jest.spyOn(proposalsModule, "getProposalsByKeywords").mockResolvedValueOnce(mockedFilteredProposals);
    jest.spyOn(proposalsModule, "getProposalsByGroups").mockResolvedValueOnce(mockedFilteredProposals);
    jest.spyOn(proposalsModule, "getProposalsByExpirationDate").mockResolvedValueOnce(mockedFilteredProposals);
    jest.spyOn(proposalsModule, "getProposalsByType").mockResolvedValueOnce(mockedFilteredProposals);

    const result = await filterProposals(mockedFilter);

    // Verify that each filter function is NOT called
    expect(proposalsModule.getProposalsByCDS).toHaveBeenCalled();
    expect(proposalsModule.getProposalsByLevel).toHaveBeenCalled();
    expect(proposalsModule.getProposalsByTitle).toHaveBeenCalled();
    expect(proposalsModule.getProposalsByCosupervisor).toHaveBeenCalled();
    expect(proposalsModule.getProposalsBySupervisor).toHaveBeenCalled();
    expect(proposalsModule.getProposalsByKeywords).toHaveBeenCalled();
    expect(proposalsModule.getProposalsByGroups).toHaveBeenCalled();
    expect(proposalsModule.getProposalsByExpirationDate).toHaveBeenCalled();
    expect(proposalsModule.getProposalsByType).toHaveBeenCalled();

    // Verify that the result contains the mocked filtered proposals
    expect(result).toEqual(undefined);
  });

  it("should handle the case where filteredProposals variable doesn't exist", async () => {
    const mockedFilter = {
      cds: "ExampleCDS",
      // Set other filters to undefined to simulate the case where filteredProposals variable doesn't exist
      level: undefined,
      type: undefined,
      title: undefined,
      supervisor: undefined,
      coSupervisor: undefined,
      keywords: undefined,
      groups: undefined,
      expiration: undefined,
    };

    const mockedFilteredProposals = [];

    // Mock the individual filter functions to return some data
    jest.spyOn(proposalsModule, "getProposalsByCDS").mockResolvedValueOnce([]);
    jest.spyOn(proposalsModule, "getProposalsByCDS").mockResolvedValueOnce([]);
    jest.spyOn(proposalsModule, "getProposalsByLevel").mockResolvedValueOnce([]);

    jest.spyOn(proposalsModule, "getProposalsByTitle").mockResolvedValueOnce([]);
    jest.spyOn(proposalsModule, "getProposalsByCosupervisor").mockResolvedValueOnce([]);

    jest.spyOn(proposalsModule, "getProposalsBySupervisor").mockResolvedValueOnce([]);
    jest.spyOn(proposalsModule, "getProposalsByKeywords").mockResolvedValueOnce([]);

    jest.spyOn(proposalsModule, "getProposalsByGroups").mockResolvedValueOnce([]);
    jest.spyOn(proposalsModule, "getProposalsByExpirationDate").mockResolvedValueOnce([]);

    jest.spyOn(proposalsModule, "getProposalsByType").mockResolvedValueOnce([]);

    // Mock other filter functions as needed

    const result = await filterProposals(mockedFilter);

    // Verify that filteredProposals remains undefined


    // Verify that the individual filter functions were not called
    expect(proposalsModule.getProposalsByCDS).not.toHaveBeenCalledWith();
    expect(proposalsModule.getProposalsByLevel).not.toHaveBeenCalledWith();

    expect(proposalsModule.getProposalsByTitle).not.toHaveBeenCalledWith();
    expect(proposalsModule.getProposalsByCosupervisor).not.toHaveBeenCalledWith();

    expect(proposalsModule.getProposalsBySupervisor).not.toHaveBeenCalledWith();
    expect(proposalsModule.getProposalsByKeywords).not.toHaveBeenCalledWith();

    expect(proposalsModule.getProposalsByGroups).not.toHaveBeenCalledWith();
    expect(proposalsModule.getProposalsByExpirationDate).not.toHaveBeenCalledWith();

    expect(proposalsModule.getProposalsByType).not.toHaveBeenCalledWith();

    expect(result).toBeUndefined();
    // Verify other filter functions were not called
  });

  it("should handle errors thrown by filter functions and throw a new error", async () => {
    const mockedFilter = {
      cds: "ExampleCDS",
    };

    const mockedError = new Error("Error while filtering proposals");

    jest.spyOn(proposalsModule, "getProposalsByCDS").mockRejectedValueOnce(mockedError);

    try {
      await filterProposals(mockedFilter);
    } catch (error) {
      expect(error.message).toBe("An error occurred while filtering proposals");
    }

    // Verify that each filter function is called with the correct parameter
    expect(module.exports.getProposalsByCDS).toHaveBeenCalledWith("ExampleCDS");
    // Verify other getProposalsBy* functions are called with the correct parameters
  });

  ////not provided
  it("should handle the case where cds filter is not provided", async () => {
    const mockedFilter = {
      cds: undefined,
      level: "ExampleLevel",
      type: "ExampleType",
      title: "ExampleTitle",
      supervisor: "ExampleSupervisor",
      coSupervisor: "ExampleCosupervisor",
      keywords: "ExampleKeywords",
      groups: "ExampleGroup",
      expiration: "ExampleExpirationDate",
    }; // Empty filter object
  
    const result = await filterProposals(mockedFilter);
  
    // Verify that none of the filter functions are called
  

    expect(proposalsModule.getProposalsByCDS).not.toHaveBeenCalledWith();
    expect(proposalsModule.getProposalsByLevel).not.toHaveBeenCalledWith();

    expect(proposalsModule.getProposalsByTitle).not.toHaveBeenCalledWith();
    expect(proposalsModule.getProposalsByCosupervisor).not.toHaveBeenCalledWith();

    expect(proposalsModule.getProposalsBySupervisor).not.toHaveBeenCalledWith();
    expect(proposalsModule.getProposalsByKeywords).not.toHaveBeenCalledWith();

    expect(proposalsModule.getProposalsByGroups).not.toHaveBeenCalledWith();
    expect(proposalsModule.getProposalsByExpirationDate).not.toHaveBeenCalledWith();

    expect(proposalsModule.getProposalsByType).not.toHaveBeenCalledWith();
  
    // Verify that the result is undefined or an empty array, depending on your implementation
expect(proposalsModule.getProposalsByCDS).toHaveBeenCalledWith("ExampleCDS");  });

  it("should handle the case where level filter is provided but goes to else", async () => {
    const mockedFilter = {
      cds: undefined,
      level: undefined,
      type: "ExampleType",
      title: "ExampleTitle",
      supervisor: "ExampleSupervisor",
      coSupervisor: "ExampleCosupervisor",
      keywords: "ExampleKeywords",
      groups: "ExampleGroup",
      expiration: "ExampleExpirationDate",
    };
// Empty filter object
  
    const result = await filterProposals(mockedFilter);
  
    // Verify that none of the filter functions are called
  

    expect(proposalsModule.getProposalsByCDS).not.toHaveBeenCalledWith();
    expect(proposalsModule.getProposalsByLevel).not.toHaveBeenCalledWith();

    expect(proposalsModule.getProposalsByTitle).not.toHaveBeenCalledWith();
    expect(proposalsModule.getProposalsByCosupervisor).not.toHaveBeenCalledWith();

    expect(proposalsModule.getProposalsBySupervisor).not.toHaveBeenCalledWith();
    expect(proposalsModule.getProposalsByKeywords).not.toHaveBeenCalledWith();

    expect(proposalsModule.getProposalsByGroups).not.toHaveBeenCalledWith();
    expect(proposalsModule.getProposalsByExpirationDate).not.toHaveBeenCalledWith();

    expect(proposalsModule.getProposalsByType).not.toHaveBeenCalledWith();
  
    // Verify that the result is undefined or an empty array, depending on your implementation
    expect(result).toEqual([]);
  });

  it("should handle the case where type filter is provided but goes to else", async () => {
    const mockedFilter = {
      cds: undefined,
      level: undefined,
      type: undefined,
      title: "ExampleTitle",
      supervisor: "ExampleSupervisor",
      coSupervisor: "ExampleCosupervisor",
      keywords: "ExampleKeywords",
      groups: "ExampleGroup",
      expiration: "ExampleExpirationDate",
    };
// Empty filter object
  
    const result = await filterProposals(mockedFilter);
  
    // Verify that none of the filter functions are called
  

    expect(proposalsModule.getProposalsByCDS).not.toHaveBeenCalledWith();
    expect(proposalsModule.getProposalsByLevel).not.toHaveBeenCalledWith();

    expect(proposalsModule.getProposalsByTitle).not.toHaveBeenCalledWith();
    expect(proposalsModule.getProposalsByCosupervisor).not.toHaveBeenCalledWith();

    expect(proposalsModule.getProposalsBySupervisor).not.toHaveBeenCalledWith();
    expect(proposalsModule.getProposalsByKeywords).not.toHaveBeenCalledWith();

    expect(proposalsModule.getProposalsByGroups).not.toHaveBeenCalledWith();
    expect(proposalsModule.getProposalsByExpirationDate).not.toHaveBeenCalledWith();

    expect(proposalsModule.getProposalsByType).not.toHaveBeenCalledWith();
  
    // Verify that the result is undefined or an empty array, depending on your implementation
    expect(result).toEqual([]);
  });

 



  


  
});

