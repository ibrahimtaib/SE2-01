const { PrismaClient } = require("@prisma/client");
const prisma = require("../../../controllers/prisma.js");
const teachersModule = require("../../../controllers/teachers.js"); // Update the path as needed

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
  }));
  

describe("Teachers Module", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all teachers", async () => {
    const mockTeachers = [
      {
        id: "1",
        surname: "Doe",
        name: "John",
        email: "john.doe@example.com",
        COD_GROUP: "A1",
        COD_DEPARTMENT: "DEP1",
      },
      // Add more mock data as needed
    ];

    prisma.Teacher.findMany.mockResolvedValueOnce(mockTeachers);

    const result = await teachersModule.getTeachers();

    expect(result).toEqual(mockTeachers);
    expect(prisma.Teacher.findMany).toHaveBeenCalledTimes(1);
  });

  it("should get a teacher by ID", async () => {
    const teacherId = "1";
    const mockTeacher = {
      id: teacherId,
      surname: "Doe",
      name: "John",
      email: "john.doe@example.com",
      COD_GROUP: "A1",
      COD_DEPARTMENT: "DEP1",
    };

    prisma.Teacher.findUnique.mockResolvedValueOnce(mockTeacher);

    const result = await teachersModule.getTeachersById(teacherId);

    expect(result).toEqual(mockTeacher);
    expect(prisma.Teacher.findUnique).toHaveBeenCalledWith({
      where: {
        id: teacherId,
      },
    });
  });

  // Add more test cases as needed
});
