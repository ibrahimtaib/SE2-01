const prisma = require('./prisma');

module.exports = {
  /**
   * Function that returns all courses in the database.
   * @param {}
   * @returns {Promise<[{id: Number, COD_COURSE: Number, TITLE_COURSE: String}]>}
   */
  getSecretaries: async () => {
    return new Promise((resolve, reject) =>
      prisma.ThesisRequest
        .findMany({
          include: {
            teacher: true,
            student: {
              include: {
                degree: true,
              },
            },
            },
        })
        .then((secretaries) => {
          return resolve(secretaries);
        })
        .catch((error) => {
          console.error(error);
          return reject({
            error: "An error occurred while querying the database for secretaries",
          });
        })
    );
  },
  getSecretariesById: async (id) => {
    return new Promise((resolve, reject) =>
      prisma.ThesisRequest
        .findUnique({
          where: {
            id: id,
          },
          include: {
            teacher: true,
            student: true,
            },
        })
        .then((secretary) => {
          return resolve(secretary);
        })
        .catch((error) => {
          console.error(error);
          return reject({
            error: "An error occurred while querying the database for secretary",
          });
        })
    );
  }
};