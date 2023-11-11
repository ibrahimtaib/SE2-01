const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({log:["query"]});

module.exports = {

    getProposalsByCDS: async (cds) => {
      return new Promise((resolve, reject) =>
        prisma.Proposal
          .findMany({
            where:{
              cds: cds
            }
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
  