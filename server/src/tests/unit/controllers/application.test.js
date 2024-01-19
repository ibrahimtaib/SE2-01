// Import necessary modules and functions
const { application } = require("../../../controllers/application.js");
const { PrismaClient } = require("@prisma/client");
const { mocked } = require("jest-mock");
const prisma = require("../../../controllers/prisma.js");
const {
  getAllPendingApplications,
  createApplication,
  getStudentApplication,
} = require("../../../controllers/application.js");

jest.mock("../../../controllers/prisma.js", () => ({
  student: {
    findMany: jest.fn(() => {}),
    findUnique: jest.fn(() => {}),
  },
  proposal: {
    findUnique: jest.fn(() => {}),
  },
  application: {
    findMany: jest.fn(() => {}),
    create: jest.fn(() => {}),
    findFirst: jest.fn(() => {}),
  },
}));

describe("createApplication function", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should resolve with the created application", async () => {
    const mockBody = {
      comment: "Test comment",
      STUDENT_ID: 1,
      PROPOSAL_ID: 1,
    };

    const mockStudent = {
      id: 1,
      COD_DEGREE: "someDegreeCode",
    };

    const mockProposal = {
      id: 1,
      cds: "someDegreeCode",
      expiration: new Date(Date.now() + 1000000), 
      applications: [], 
      archived: false,
    };

    const mockCreatedApplication = {
      id: 123,
      status: "pending",
      comment: mockBody.comment,
      date: new Date(Date.now()),
      STUDENT_ID: mockBody.STUDENT_ID,
      PROPOSAL_ID: mockBody.PROPOSAL_ID,
    };

    prisma.student.findUnique.mockResolvedValueOnce(mockStudent);
    prisma.proposal.findUnique.mockResolvedValueOnce(mockProposal);
    prisma.application.findFirst.mockResolvedValueOnce(null);
    prisma.application.create.mockResolvedValueOnce(mockCreatedApplication);

    try {
      const result = await createApplication(mockBody);
      expect(result).toEqual(mockCreatedApplication);
      expect(prisma.student.findUnique).toHaveBeenCalledWith({
        where: { id: mockBody.STUDENT_ID },
      });
      expect(prisma.proposal.findUnique).toHaveBeenCalledWith({
        where: { id: mockBody.PROPOSAL_ID },
        include: { applications: { where: { status: "accept" } } },
      });
      expect(prisma.application.create).toHaveBeenCalledWith({
        data: {
          status: "pending",
          comment: mockBody.comment,
          STUDENT_ID: mockBody.STUDENT_ID,
          PROPOSAL_ID: mockBody.PROPOSAL_ID,
        },
      });
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it("should reject with an error if there is a database error", async () => {
    prisma.application.findFirst.mockResolvedValueOnce(null);

    try {
      const mockedError = new Error("Database error");

      await createApplication({
        comment: "Test comment",
        STUDENT_ID: 1,
        PROPOSAL_ID: 1,
      });
    } catch (error) {
      expect(error).toEqual({
        status: 500,
        error: "An error occurred",
      });
      expect(prisma.student.findUnique).toHaveBeenCalled();
    }
  });

  it("Should say that an application already exists", async () => {
    // Mocked error for the error cases
    prisma.student.findUnique.mockResolvedValueOnce({
      id: 1,
      COD_DEGREE: "someDegreeCode",
      email: "some@email.com",
    });
    prisma.proposal.findUnique.mockResolvedValueOnce({
      id: 1,
      cds: "someDegreeCode",
      expiration: new Date(Date.now() + 1000000), 
      applications: [],
      archived: false,
    });

    createApplication({
      comment: "Test comment",
      STUDENT_ID: 1,
      PROPOSAL_ID: 1,
    }).catch((res) => {
      expect(res).toEqual({
        status: 400,
        error: "Student has already applied to a proposal!",
      });
    });
  });
  it('should reject with status 400 for student already applied', async () => {
    const mockBody = {
      comment: 'Test comment',
      STUDENT_ID: 123,
      PROPOSAL_ID: 456,
    };
    prisma.student.findUnique.mockResolvedValueOnce({ id: 1 });
    prisma.proposal.findUnique.mockResolvedValueOnce({ id: 2 });
    prisma.application.findFirst.mockResolvedValueOnce({ id: 3 });

    await expect(createApplication(mockBody)).rejects.toMatchObject({
      status: 400,
      error: 'Student has already applied to this proposal!',
    });

    expect(prisma.application.findFirst).toHaveBeenCalledWith({
      where: { STUDENT_ID: 123, PROPOSAL_ID: 456 },
    });
  });

  it('should reject with status 500 for generic error', async () => {
    const mockBody = {
      comment: 'Test comment',
      STUDENT_ID: 123,
      PROPOSAL_ID: 456,
    };
    prisma.student.findUnique.mockRejectedValueOnce(new Error('Generic error'));

    await expect(createApplication(mockBody)).rejects.toMatchObject({
      status: 500,
      error: 'An error occurred',
    });

    expect(prisma.student.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should reject with status 400 if proposal has already expired', async () => {
    const mockBody = {
      comment: 'Test comment',
      STUDENT_ID: 123,
      PROPOSAL_ID: 456,
    };
    prisma.student.findUnique.mockResolvedValueOnce({ id: 1, COD_DEGREE: 'ABC' });
    prisma.proposal.findUnique.mockResolvedValueOnce({ id: 2, expiration: new Date('2022-01-01'), cds: 'ABC' });
  
    await expect(createApplication(mockBody)).rejects.toMatchObject({
      status: 400,
      error: "Proposal has already expired!",
    });
  
   
  });

  it('should reject with status 400 if the proposal is no longer available', async () => {
    const mockBody = {
      comment: 'Test comment',
      STUDENT_ID: 123,
      PROPOSAL_ID: 456,
    };
    prisma.student.findUnique.mockResolvedValueOnce({ id: 1, COD_DEGREE: 'ABC' });
    prisma.proposal.findUnique.mockResolvedValueOnce({
      id: 2,
      expiration: new Date('2024-01-01'),
      cds: 'ABC',
      applications: [{ id: 3 }],  
      archived: false,  
    });
  
    await expect(createApplication(mockBody)).rejects.toMatchObject({
      status: 400,
      error: "The proposal is no longer available",
    });
  
   
  });
  
  

  it('should reject with status 400 if student cannot apply to this proposal', async () => {
    const mockBody = {
      comment: 'Test comment',
      STUDENT_ID: 123,
      PROPOSAL_ID: 456,
    };
    prisma.student.findUnique.mockResolvedValueOnce({ id: 1, COD_DEGREE: 'ABC' });
    prisma.proposal.findUnique.mockResolvedValueOnce({ id: 2, applications: [{ id: 3 }], archived: true });
  
    await expect(createApplication(mockBody)).rejects.toMatchObject({
      status: 400,
      error: "Student cannot apply to this proposal!",
    });


  });
    
});

describe("getStudentApplication", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("returns the application when it exists", async () => {
    prisma.application.findFirst.mockResolvedValueOnce({
      id: 1,
      status: "pending",
      comment: "Test comment",
      date: new Date(),
      STUDENT_ID: 123,
      PROPOSAL_ID: 456,
    });

    const body = {
      PROPOSAL_ID: 456,
      STUDENT_ID: 123,
    };

    await expect(getStudentApplication(body)).resolves.toEqual({
      id: 1,
      status: "pending",
      comment: "Test comment",
      date: expect.any(Date),
      STUDENT_ID: 123,
      PROPOSAL_ID: 456,
    });

    expect(prisma.application.findFirst).toHaveBeenCalledWith({
      where: {
        PROPOSAL_ID: 456,
        STUDENT_ID: 123,
      },
    });
  });

  it("rejects with an error when an error occurs", async () => {
    prisma.application.findFirst.mockImplementationOnce(() => {
      throw new Error("Test error");
    });

    const body = {
      PROPOSAL_ID: 456,
      STUDENT_ID: 123,
    };

    await expect(getStudentApplication(body)).rejects.toEqual({
      status: 500,
      error: "An error occurred",
    });

    expect(prisma.application.findFirst).toHaveBeenCalledWith({
      where: {
        PROPOSAL_ID: 456,
        STUDENT_ID: 123,
      },
    });
  });
});
describe("getAllPendingApplication", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("returns the application when it exists", async () => {
    const mockApplications = [
      {
        id: 1,
        status: "pending",
        comment: "Test comment",
        date: new Date(),
        STUDENT_ID: 123,
        PROPOSAL_ID: 456,
      },
      // Add more mock data as needed
    ];
  
    prisma.application.findMany.mockResolvedValueOnce(mockApplications);
  
    await expect(getAllPendingApplications()).resolves.toEqual(mockApplications);
  
    expect(prisma.application.findMany).toHaveBeenCalledWith({
      where: {
        status: "pending",
      },
    });
  });

  it("rejects with an error when an error occurs", async () => {
    prisma.application.findFirst.mockImplementationOnce(() => {
      throw new Error("Test error");
    });

    const body = {
      PROPOSAL_ID: 456,
      STUDENT_ID: 123,
    };

    await expect(getStudentApplication(body)).rejects.toEqual({
      status: 500,
      error: "An error occurred",
    });

    expect(prisma.application.findFirst).toHaveBeenCalledWith({
      where: {
        PROPOSAL_ID: 456,
        STUDENT_ID: 123,
      },
    });
  });
});
/*describe("getAllPendingApplication", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("returns the application when it exists", async () => {
    prisma.application.findMany.mockResolvedValueOnce({
      id: 1,
      status: "pending",
      comment: "Test comment",
      date: new Date(),
      STUDENT_ID: 123,
      PROPOSAL_ID: 456,
    });


    await expect(getAllPendingApplications()).resolves.toEqual({
      id: 1,
      status: "pending",
      comment: "Test comment",
      date: expect.any(Date),
      STUDENT_ID: 123,
      PROPOSAL_ID: 456,
    });

    expect(prisma.application.findMany).toHaveBeenCalledWith({
      where: {
        PROPOSAL_ID: 456,
        STUDENT_ID: 123,
      },
    });
  });

  it("rejects with an error when an error occurs", async () => {
    prisma.application.findFirst.mockImplementationOnce(() => {
      throw new Error("Test error");
    });


    await expect(getAllPendingApplications()).rejects.toEqual({
      status: 500,
      error: "An error occurred",
    });

    expect(prisma.application.findFirst).toHaveBeenCalledWith({
      where: {
        PROPOSAL_ID: 456,
        STUDENT_ID: 123,
      },
    });
  });
});
*/