const { getAllCds, getAllTypes, getAllLevels, getProposals, getProposalsByTitle, getProposalsByCosupervisor, getProposalsBySupervisor, getProposalsByKeywords, getProposalsByGroups, getProposalsByExpirationDate, getProposalsByLevel, getProposalsByType, getProposalsByCDS } = require("../../controllers/proposals.js");
const { PrismaClient } = require("@prisma/client");
const { mocked } = require("jest-mock");
const prisma = require("../../controllers/prisma.js");

// Mock di PrismaClient per il modulo dei cds
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
    // Mock dei cds per il caso di successo
    const mockedCds = [
      { COD_DEGREE: 1, TITLE_DEGREE: "Example Degree"},
      // Aggiungi altri cds simulati secondo necessità per test più approfonditi
    ];

    // Mock di PrismaClient e del suo metodo findMany
    prisma.Degree.findMany.mockResolvedValueOnce(mockedCds);

    // Chiamata della funzione e attesa del risultato
    const result = await getAllCds();

    // Assert del risultato e del fatto che findMany sia stato chiamato
    expect(result).toEqual(mockedCds);
    expect(prisma.Degree.findMany).toHaveBeenCalled();
  });

  it("should reject with an error if there is a database error", async () => {
    // Mock dell'errore per il caso di errore
    const mockedError = new Error("Database error");

    // Mock di PrismaClient e del suo metodo findMany per simulare un errore
    prisma.Degree.findMany.mockRejectedValueOnce(mockedError);

    try {
      await getAllCds();
    } catch (error) {
      // Assert del messaggio di errore e del fatto che findMany sia stato chiamato
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
    // Mock dei tipi per il caso di successo
    const mockedTypes = [
      { type: "Type 1" },
      { type: "Type 2" },
      { type: "Type 3" },
    ];

    // Mock di PrismaClient e del suo metodo findMany
    prisma.Proposal.findMany.mockResolvedValueOnce(mockedTypes);

    // Chiamata della funzione e attesa del risultato
    const result = await getAllTypes();

    // Assert del risultato e del fatto che findMany sia stato chiamato
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
})

describe('getAllLevels function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve with unique levels from the database', async () => {
    // Mock dei livelli per il caso di successo
    const mockedLevels = [
      { level: 'Level 1' },
      { level: 'Level 2' },
      { level: 'Level 3' },
    ];

    // Mock di PrismaClient e del suo metodo findMany
    prisma.Proposal.findMany.mockResolvedValueOnce(mockedLevels);

    // Chiamata della funzione e attesa del risultato
    const result = await getAllLevels();

    // Verifica che la funzione abbia restituito un array con livelli unici
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3); // Dovrebbero essere solo 3 livelli unici

    // Assert del fatto che findMany sia stato chiamato
    expect(prisma.Proposal.findMany).toHaveBeenCalled();
  });

  it('should reject with an error if there is a database error', async () => {
    const mockedError = new Error('Database error');
    prisma.Proposal.findMany.mockRejectedValueOnce(mockedError);

    try {
      await getAllLevels();
    } catch (error) {
      // Verifica che la funzione abbia gestito correttamente l'errore
      expect(error).toEqual({
        error: 'An error occurred while querying the database for level',
      });

      // Assert del fatto che findMany sia stato chiamato
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    }
  });
});

describe('getProposals function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve with proposals from the database', async () => {
    // Mock delle proposte per il caso di successo
    const mockedProposals = [
      { id: 1, title: 'Proposal 1' },
      { id: 2, title: 'Proposal 2' },
      { id: 3, title: 'Proposal 3' },
    ];

    // Mock di PrismaClient e del suo metodo findMany
    prisma.Proposal.findMany.mockResolvedValueOnce(mockedProposals);

    // Chiamata della funzione e attesa del risultato
    const result = await getProposals();

    // Verifica che la funzione abbia restituito le proposte
    expect(result).toEqual(mockedProposals);

    // Assert del fatto che findMany sia stato chiamato
    expect(prisma.Proposal.findMany).toHaveBeenCalled();
  });

  it('should reject with an error if there is a database error', async () => {
    const mockedError = new Error('Database error');
    prisma.Proposal.findMany.mockRejectedValueOnce(mockedError);

    try {
      await getProposals();
    } catch (error) {
      // Verifica che la funzione abbia gestito correttamente l'errore
      expect(error).toEqual({
        error: 'An error occurred while querying the database for proposals',
      });

      // Assert del fatto che findMany sia stato chiamato
      expect(prisma.Proposal.findMany).toHaveBeenCalled();
    }
  });
});

describe('getProposalsByTitle function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve with proposals matching the title from the database', async () => {
    const searchString = 'example'; // Sostituisci con una stringa di ricerca

    const mockedProposals = [
      // Simula le proposte che corrispondono alla ricerca
      { title: 'Example Proposal 1' },
      { title: 'Example Proposal 2' },
    ];

    prisma.Proposal.findMany.mockResolvedValueOnce(mockedProposals);

    const result = await getProposalsByTitle(searchString);

    expect(result).toEqual(mockedProposals);
    expect(prisma.Proposal.findMany).toHaveBeenCalledWith({
      where: {
        title: {
          contains: searchString,
          mode: 'insensitive',
        },
      },
    });
  });

  it('should reject with an error if there is a database error', async () => {
    const searchString = 'example'; // Sostituisci con una stringa di ricerca

    const mockedError = new Error('Database error');

    prisma.Proposal.findMany.mockRejectedValueOnce(mockedError);

    try {
      await getProposalsByTitle(searchString);
    } catch (error) {
      expect(error).toEqual({
        error: 'An error occurred while querying the database',
      });
      expect(prisma.Proposal.findMany).toHaveBeenCalledWith({
        where: {
          title: {
            contains: searchString,
            mode: 'insensitive',
          },
        },
      });
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
    expect(prisma.Proposal.findMany).toHaveBeenCalledWith({
      where: {
        coSupervisors: {
          contains: surname,
          mode: 'insensitive',
        },
      },
    });
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
      expect(prisma.Proposal.findMany).toHaveBeenCalledWith({
        where: {
          coSupervisors: {
            contains: surname,
            mode: 'insensitive',
          },
        },
      });
    }
  });
});

describe('getProposalsBySupervisor function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve with proposals from the database for a specific supervisor', async () => {
    const surname = 'Doe'; // Sostituisci con un cognome di esempio

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

    expect(prisma.Teacher.findMany).toHaveBeenCalledWith({
      where: {
        surname: {
          contains: surname,
          mode: 'insensitive',
        },
      },
    });

    expect(prisma.Proposal.findMany).toHaveBeenCalledWith({
      where: {
        supervisor: {
          in: [1, 2], // IDs simulated from the mocked teachers
        },
      },
    });

    expect(result).toEqual(mockedProposals);
  });

  it('should reject with an error if the supervisor is not found', async () => {
    const surname = 'Nonexistent'; // Sostituisci con un cognome inesistente

    const mockedTeachers = []; // Array vuoto simula l'assenza di insegnanti

    prisma.Teacher.findMany.mockResolvedValueOnce(mockedTeachers);

    try {
      await getProposalsBySupervisor(surname);
    } catch (error) {
      expect(error).toEqual({
        error: 'An error occurred while querying the database',
      });
      expect(prisma.Teacher.findMany).toHaveBeenCalledWith({
        where: {
          surname: {
            contains: surname,
            mode: 'insensitive',
          },
        },
      });
    }
  });
});

describe('getProposalsByKeywords function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve with proposals matching the keywords from the database', async () => {
    const inputKeywords = 'keyword1, keyword2'; // Sostituisci con una stringa di parole chiave
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
    expect(prisma.Proposal.findMany).toHaveBeenCalledWith();
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
      expect(prisma.Proposal.findMany).toHaveBeenCalledWith();
    }
  });
});

describe('getProposalsByExpirationDate function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve with proposals filtered by expiration date from the database', async () => {
    const expirationDate = '2023-12-31'; // Sostituisci con la data di scadenza per i test

    const mockedProposals = [
      // Simula le proposte nel database
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
    expect(prisma.Proposal.findMany).toHaveBeenCalledWith({
      where: {
        expiration: {
          lte: new Date(expirationDate),
        },
      },
    });
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
      expect(prisma.Proposal.findMany).toHaveBeenCalledWith({
        where: {
          expiration: {
            lte: new Date(expirationDate),
          },
        },
      });
    }
  });
});



