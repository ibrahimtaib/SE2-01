const { PrismaClient } = require("@prisma/client");
const prisma = require('./prisma');

module.exports = {
  /**
   * Function that returns all courses in the database.
   * @param {}
   * @returns {Promise<[{id: Number, COD_COURSE: Number, TITLE_COURSE: String}]>}
   */
  getProposals: async () => {
    return new Promise((resolve, reject) =>
      prisma.Proposal
        .findMany()
        .then((propoals) => {
          return resolve(propoals);
        })
        .catch((error) => {
          console.error(error);
          return reject({
            error: "An error occurred while querying the database for proposals",
          });
        })
    );
  },

  createProposal: async (body) => {
    const {title, supervisor, keywords, type, groups, description, notes, expiration, level, cds, teacher, requiredKnowledge, degree} = body;
    return new Promise((resolve, reject) =>
        prisma.Proposal.create({
        data:{
            title, 
            supervisor,
            keywords, 
            type, 
            groups, 
            description, 
            notes, 
            expiration,
            level,
            cds,
            teacher,
            requiredKnowledge,
            degree
           }
        })
        .then((proposal) => {
            return resolve(proposal);
        })
        .catch((error) => {
          console.error(error);
          return reject({
            error: "An error occurred while creating propsal",
          });
        })
    );
  },
};