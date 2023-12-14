const { PrismaClient } = require("@prisma/client");
const prisma = require("../../../controllers/prisma.js");
const thesisRequestModule = require("../../../controllers/thesisRequests.js"); // Update the path as needed
const { REQUESTSTATUS } = require("../../../constants/application");

jest.mock('../../../controllers/prisma.js', () => ({
    Proposal: {
      findUnique: jest.fn(() => {}),
    },
    student: {
      findUnique: jest.fn(() => {}),
    },
    Application: {
      findUnique: jest.fn(() => {}),
      findMany: jest.fn(() => {}),
      update: jest.fn(() => {}),
      updateMany: jest.fn(() => {}),
    },
    Teacher: {
        findUnique: jest.fn(() => {}),
        findMany: jest.fn(() => {}),
        update: jest.fn(() => {}),
        updateMany: jest.fn(() => {}),
      },
    ThesisRequest: {
    findUnique: jest.fn(() => {}),
    findMany: jest.fn(() => {}),
    update: jest.fn(() => {}),
    updateMany: jest.fn(() => {}),
    },
  }));
  

describe("Thesis Request Module", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all thesis requests", async () => {
    const mockThesisRequests = {
  id: 1,
  title: "Mock Thesis Request",
  description: "Mock description",
  teacherId: "teacher123", // Replace with a valid teacher ID
  studentId: "student456", // Replace with a valid student ID
  type: "mockType",
  notes: "Mock notes",
  status: "mockStatus",
  teacher: {
    // Mock Teacher data
    id: "teacher123",
    surname: "Teacher",
    name: "John",
    email: "john.teacher@example.com",
    COD_GROUP: "A1",
    COD_DEPARTMENT: "DEP1",
  },
  student: {
    // Mock Student data
    id: "student456",
    surname: "Student",
    name: "Alice",
    gender: "Female",
    nationality: "MockNationality",
    email: "alice.student@example.com",
    COD_DEGREE: "mockDegreeCode",
    ENROLLMENT_YEAR: 2022,
    // Add other student fields as needed
  },
};

// Use this mockThesisRequest in your test cases


    prisma.ThesisRequest.findMany.mockResolvedValueOnce(mockThesisRequests);

    const result = await thesisRequestModule.getThesisRequests();

    expect(result).toEqual(mockThesisRequests);
    expect(prisma.ThesisRequest.findMany).toHaveBeenCalledTimes(1);
  });

  it("should get thesis requests by ID", async () => {
    const thesisRequestId = 1;
    const mockThesisRequest = {
  id: 1,
  title: "Mock Thesis Request",
  description: "Mock description",
  teacherId: "teacher123", // Replace with a valid teacher ID
  studentId: "student456", // Replace with a valid student ID
  type: "mockType",
  notes: "Mock notes",
  status: "mockStatus",
  teacher: {
    // Mock Teacher data
    id: "teacher123",
    surname: "Teacher",
    name: "John",
    email: "john.teacher@example.com",
    COD_GROUP: "A1",
    COD_DEPARTMENT: "DEP1",
  },
  student: {
    // Mock Student data
    id: "student456",
    surname: "Student",
    name: "Alice",
    gender: "Female",
    nationality: "MockNationality",
    email: "alice.student@example.com",
    COD_DEGREE: "mockDegreeCode",
    ENROLLMENT_YEAR: 2022,
    // Add other student fields as needed
  },
};

    prisma.ThesisRequest.findUnique.mockResolvedValueOnce(mockThesisRequest);

    const result = await thesisRequestModule.getThesisRequestsById(thesisRequestId);

    expect(result).toEqual(mockThesisRequest);
    expect(prisma.ThesisRequest.findUnique).toHaveBeenCalledWith({
      where: {
        id: thesisRequestId,
      },
      include: {
        teacher: true,
        student: true,
        },
      
    });
  });

  it("should get pending thesis requests", async () => {
    const mockPendingThesisRequests = [
      {
        id: 1,
        title: "Pending Thesis Request 1",
        status: REQUESTSTATUS.pending,
        // Add other fields as needed
      },
      // Add more mock data as needed
    ];

    prisma.ThesisRequest.findMany.mockResolvedValueOnce(mockPendingThesisRequests);

    const result = await thesisRequestModule.getPendingThesisRequests();

    expect(result).toEqual(mockPendingThesisRequests);
    expect(prisma.ThesisRequest.findMany).toHaveBeenCalledWith({
      where: {
        status: REQUESTSTATUS.pending,
      },
      include: {
        teacher: true,
        student: {
          include: {
            degree: true,
          },
        },
      },
    });
  });
  
  it("should get secretary accepted thesis requests", async () => {
    const mockSecretaryAcceptedThesisRequests = [
      {
        id: 1,
        title: "Secretary Accepted Thesis Request 1",
        description: "Mock description",
        teacherId: "teacher123", // Replace with a valid teacher ID
        studentId: "student456", // Replace with a valid student ID
        type: "mockType",
        notes: "Mock notes",
        status: REQUESTSTATUS.acceptedBySecretary,
        teacher: {
            // Mock Teacher data
            id: "teacher123",
            surname: "Teacher",
            name: "John",
            email: "john.teacher@example.com",
            COD_GROUP: "A1",
            COD_DEPARTMENT: "DEP1",
          },
          student: {
            // Mock Student data
            id: "student456",
            surname: "Student",
            name: "Alice",
            gender: "Female",
            nationality: "MockNationality",
            email: "alice.student@example.com",
            COD_DEGREE: "mockDegreeCode",
            ENROLLMENT_YEAR: 2022,
            // Add other student fields as needed
          },
        // Add other fields as needed
      },
      // Add more mock data as needed
    ];

    prisma.ThesisRequest.findMany.mockResolvedValueOnce(
      mockSecretaryAcceptedThesisRequests
    );

    const result = await thesisRequestModule.getSecretaryAcceptedThesisRequests();

    expect(result).toEqual(mockSecretaryAcceptedThesisRequests);
    expect(prisma.ThesisRequest.findMany).toHaveBeenCalledWith({
      where: {
        status: REQUESTSTATUS.acceptedBySecretary,
      },
      include: {
        teacher: true,
        student: {
          include: {
            degree: true,
          },
        },
      },
    });
  });

  it("should get thesis requests by teacher ID", async () => {
    const teacherId = "teacher123"; // Replace with a valid teacher ID
    const mockThesisRequestsByTeacherId = [
      {
        id: 1,
        title: "Thesis Request by Teacher 1",
        teacherId: teacherId,
        // Add other fields as needed
      },
      // Add more mock data as needed
    ];

    prisma.ThesisRequest.findMany.mockResolvedValueOnce(
      mockThesisRequestsByTeacherId
    );

    const result = await thesisRequestModule.getThesisRequestsByTeacherId(teacherId);

    expect(result).toEqual(mockThesisRequestsByTeacherId);
    expect(prisma.ThesisRequest.findMany).toHaveBeenCalledWith({
      where: {
        teacherId: teacherId,
      },
      include: {
        teacher: true,
        student: {
          include: {
            degree: true,
          },
        },
      },
    });
  });

  it("should get secretary rejected thesis requests", async () => {
    const mockSecretaryRejectedThesisRequests = [
      {
        id: 1,
        title: "Secretary Rejected Thesis Request 1",
        status: REQUESTSTATUS.rejectedBySecretary,
        // Add other fields as needed
      },
      // Add more mock data as needed
    ];

    prisma.ThesisRequest.findMany.mockResolvedValueOnce(
      mockSecretaryRejectedThesisRequests
    );

    const result = await thesisRequestModule.getSecretaryRejectedThesisRequests();

    expect(result).toEqual(mockSecretaryRejectedThesisRequests);
    expect(prisma.ThesisRequest.findMany).toHaveBeenCalledWith({
      where: {
        status: REQUESTSTATUS.rejectedBySecretary,
      },
      include: {
        teacher: true,
        student: {
          include: {
            degree: true,
          },
        },
      },
    });
  });

  it("should perform action on thesis request by secretary", async () => {
    const thesisRequestId = 1;
    const action = "accept";
    const mockUpdatedThesisRequest = {
      id: thesisRequestId,
      title: "Updated Thesis Request",
      status: REQUESTSTATUS.acceptedBySecretary,
      // Add other fields as needed
    };

    prisma.ThesisRequest.update.mockResolvedValueOnce(mockUpdatedThesisRequest);

    const result = await thesisRequestModule.actionOnThesisRequestBySecretary(
      action,
      thesisRequestId
    );

    expect(result).toEqual(mockUpdatedThesisRequest);
    expect(prisma.ThesisRequest.update).toHaveBeenCalledWith({
      where: {
        id: thesisRequestId,
      },
      data: {
        status: REQUESTSTATUS.acceptedBySecretary,
      },
    });
  });

  it("should perform action on thesis request by teacher", async () => {
    const thesisRequestId = 1;
    const action = "accept";
    const mockUpdatedThesisRequest = {
      id: thesisRequestId,
      title: "Updated Thesis Request",
      status: REQUESTSTATUS.acceptedByTeacher,
      // Add other fields as needed
    };

    prisma.ThesisRequest.update.mockResolvedValueOnce(mockUpdatedThesisRequest);

    const result = await thesisRequestModule.actionOnThesisRequestByTeacher(
      action,
      thesisRequestId
    );

    expect(result).toEqual(mockUpdatedThesisRequest);
    expect(prisma.ThesisRequest.update).toHaveBeenCalledWith({
      where: {
        id: thesisRequestId,
      },
      data: {
        status: REQUESTSTATUS.acceptedByTeacher,
      },
    });
  });

  it('should handle errors when getting all thesis requests', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error

    const errorMessage = 'An error occurred while querying the database for secretaries';
    prisma.ThesisRequest.findMany.mockRejectedValueOnce(new Error(errorMessage));

    await expect(thesisRequestModule.getThesisRequests()).rejects.toEqual({ error: errorMessage });

    expect(prisma.ThesisRequest.findMany).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
  });

  it('should handle errors when getting pending thesis requests', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error

    const errorMessage = 'An error occurred while querying the database for secretaries';
    prisma.ThesisRequest.findMany.mockRejectedValueOnce(new Error(errorMessage));

    await expect(thesisRequestModule.getPendingThesisRequests()).rejects.toEqual({ error: errorMessage });

    expect(prisma.ThesisRequest.findMany).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
  });

  it('should handle errors when getting thesis request by ID', async () => {
    const thesisRequestId = 1;
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error

    const errorMessage = 'An error occurred while querying the database for secretary';
    prisma.ThesisRequest.findUnique.mockRejectedValueOnce(new Error(errorMessage));

    await expect(thesisRequestModule.getThesisRequestsById(thesisRequestId)).rejects.toEqual({ error: errorMessage });

    expect(prisma.ThesisRequest.findUnique).toHaveBeenCalledWith({
      where: {
        id: thesisRequestId,
      },
      include: {
        teacher: true,
        student: true,
      },
    });
    expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
  });

  it('should handle errors when getting secretary accepted thesis requests', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error

    const errorMessage = 'An error occurred while querying the database for secretary accepted ThesisRequests';
    prisma.ThesisRequest.findMany.mockRejectedValueOnce(new Error(errorMessage));

    await expect(thesisRequestModule.getSecretaryAcceptedThesisRequests()).rejects.toEqual({ error: errorMessage });

    expect(prisma.ThesisRequest.findMany).toHaveBeenCalledWith({
      where: {
        status: REQUESTSTATUS.acceptedBySecretary,
      },
      include: {
        teacher: true,
        student: {
          include: {
            degree: true,
          },
        },
      },
    });
    expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
  });

  it('should handle errors when getting thesis requests by teacher ID', async () => {
    const teacherId = 'teacher123';
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error

    const errorMessage = 'An error occurred while querying the database for secretary accepted ThesisRequests';
    prisma.ThesisRequest.findMany.mockRejectedValueOnce(new Error(errorMessage));

    await expect(thesisRequestModule.getThesisRequestsByTeacherId(teacherId)).rejects.toEqual({ error: errorMessage });

    expect(prisma.ThesisRequest.findMany).toHaveBeenCalledWith({
      where: {
        teacherId: teacherId,
      },
      include: {
        teacher: true,
        student: {
          include: {
            degree: true,
          },
        },
      },
    });
    expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
  });

  it('should handle errors when getting secretary rejected thesis requests', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error

    const errorMessage = 'An error occurred while querying the database for secretary rejected ThesisRequests';
    prisma.ThesisRequest.findMany.mockRejectedValueOnce(new Error(errorMessage));

    await expect(thesisRequestModule.getSecretaryRejectedThesisRequests()).rejects.toEqual({ error: errorMessage });

    expect(prisma.ThesisRequest.findMany).toHaveBeenCalledWith({
      where: {
        status: REQUESTSTATUS.rejectedBySecretary,
      },
      include: {
        teacher: true,
        student: {
          include: {
            degree: true,
          },
        },
      },
    });
    expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
  });

  it('should handle errors when performing action on thesis request by secretary', async () => {
    const thesisRequestId = 1;
    const action = 'accept';
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error

    const errorMessage = `An error occurred while trying to ${action} ThesisRequest by secretary Clerk`;
    prisma.ThesisRequest.update.mockRejectedValueOnce(new Error(errorMessage));

    await expect(thesisRequestModule.actionOnThesisRequestBySecretary(action, thesisRequestId)).rejects.toEqual({ error: errorMessage });

    expect(prisma.ThesisRequest.update).toHaveBeenCalledWith({
      where: {
        id: thesisRequestId,
      },
      data: {
        status: REQUESTSTATUS.acceptedBySecretary,
      },
    });
    expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
  });

  it('should handle errors when performing action on thesis request by teacher', async () => {
    const thesisRequestId = 1;
    const action = 'accept';
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error

    const errorMessage = `An error occurred while trying to ${action} ThesisRequest by teacher`;
    prisma.ThesisRequest.update.mockRejectedValueOnce(new Error(errorMessage));

    await expect(thesisRequestModule.actionOnThesisRequestByTeacher(action, thesisRequestId)).rejects.toEqual({ error: errorMessage });

    expect(prisma.ThesisRequest.update).toHaveBeenCalledWith({
      where: {
        id: thesisRequestId,
      },
      data: {
        status: REQUESTSTATUS.acceptedByTeacher,
      },
    });
    expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
  });

  // Add more test cases as needed
});
