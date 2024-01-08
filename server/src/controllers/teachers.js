const prisma = require('./prisma');

module.exports = {
  /**
   * Function that returns all courses in the database.
   * @param {}
   * @returns {Promise<[{id: Number, COD_COURSE: Number, TITLE_COURSE: String}]>}
   */
  getTeachers: async () => {
    try {
      const teachers = await prisma.Teacher.findMany();
      return teachers;
    } catch (error) {
      throw new Error("An error occurred while querying the database for teachers");
    }
  },
  getTeachersById: async (id) => {
    try {
      const teacher = await prisma.Teacher.findUnique({
        where: {
          id: id,
        },
      });
      return teacher;
    } catch (error) {
      throw new Error("An error occurred while querying the database for teachers");
    }
  }
};