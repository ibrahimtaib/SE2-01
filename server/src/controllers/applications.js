const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });

module.exports = {

    getApplicationsByTeacherId: async (teacherId) => {
        return new Promise((resolve, reject) =>
          prisma.Application
            .findMany({
              where: {
                proposal: {
                  teacher: {
                    id: teacherId,
                  },
                },
              },
            })
            .then((applications) => {
              return resolve(applications);
            })
            .catch((error) => {
              console.error(error);
              return reject({
                error: "An error occurred while querying the database for applications",
              });
            })
        );
      },
      

}