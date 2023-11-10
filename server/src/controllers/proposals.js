const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    getProposalsByLevel: async (level) => {
      return new Promise((resolve, reject) =>
        prisma.proposal
          .findMany({
            where: {
              level: level,
            },
          })
          .then((proposals) => {
            return resolve(proposals);
          })
          .catch((error) => {
            console.error(error);
            return reject({
              error: "An error occurred while querying the database",
            });
          })
      );
    },
  };
  