const {
  getTeachers,
  getTeachersById
} = require("../../../controllers/teachers.js");
const { PrismaClient } = require("@prisma/client");
const prisma = require("../../../controllers/prisma.js");

jest.mock('../../../controllers/prisma.js', () => ({
  Teacher: {
    findMany: jest.fn(() => {}),
    findUnique: jest.fn(() => {}),
  },
}));

describe('Teachers Controller', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('getTeachers function', () => {
    it('should return a list of teachers', async () => {
      const mockedTeachers = [
        { id: 1, name: 'John', surname: 'Doe' },
        { id: 2, name: 'Jane', surname: 'Smith' },
      ];

      prisma.Teacher.findMany.mockResolvedValueOnce(mockedTeachers);

      const result = await getTeachers();

      expect(result).toEqual(mockedTeachers);
      expect(prisma.Teacher.findMany).toHaveBeenCalled();
    });

    it('should handle errors during database query', async () => {
      const mockError = new Error('Database error');
      prisma.Teacher.findMany.mockRejectedValueOnce(mockError);

      try {
        await getTeachers();
      } catch (error) {
        console.error("Actual error:", error.message);
        expect(error.message).toContain('An error occurred while querying the database for teachers');
      }

      expect(prisma.Teacher.findMany).toHaveBeenCalled();
    });
  });

  describe('getTeachersById function', () => {
    it('should return a teacher for a valid teacherId', async () => {
      const mockTeacherId = 1;
      const mockTeacher = { id: 1, name: 'John', surname: 'Doe' };

      prisma.Teacher.findUnique.mockResolvedValueOnce(mockTeacher);

      const result = await getTeachersById(mockTeacherId);

      expect(result).toEqual(mockTeacher);
      expect(prisma.Teacher.findUnique).toHaveBeenCalledWith({
        where: { id: mockTeacherId },
      });
    });

    it('should throw an error for an invalid teacherId', async () => {
      const mockInvalidTeacherId = 'invalid';
      const mockError = new Error('Invalid teacherId');

      prisma.Teacher.findUnique.mockRejectedValueOnce(mockError);

      try {
        await getTeachersById(mockInvalidTeacherId);
      } catch (error) {
        console.error("Actual error:", error.message);
        expect(error.message).toContain('An error occurred while querying the database for teachers');
      }

      expect(prisma.Teacher.findUnique).toHaveBeenCalledWith({
        where: { id: 'invalid' },
      });
    });

    it('should handle errors during database query', async () => {
      const mockTeacherId = 1;
      const mockError = new Error('Database error');

      prisma.Teacher.findUnique.mockRejectedValueOnce(mockError);

      try {
        await getTeachersById(mockTeacherId);
      } catch (error) {
        console.error("Actual error:", error.message);
        expect(error.message).toContain('An error occurred while querying the database for teachers');
      }

      expect(prisma.Teacher.findUnique).toHaveBeenCalledWith({
        where: { id: mockTeacherId },
      });
    });
  });
});
