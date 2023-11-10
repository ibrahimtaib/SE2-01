const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({log:["query"]});

module.exports = {
  /**
   * Function that returns all courses in the database.
   * @param {}
   * @returns {Promise<[{id: Number, COD_COURSE: Number, TITLE_COURSE: String}]>}
   */
  getTeachers: async () => {
    return new Promise((resolve, reject) =>
      prisma.Teacher
        .findMany()
        .then((teachers) => {
          return resolve(teachers);
        })
        .catch((error) => {
          console.error(error);
          return reject({
            error: "An error occurred while querying the database for teachers",
          });
        })
    );
  },
};