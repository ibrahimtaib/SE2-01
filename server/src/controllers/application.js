const { PrismaClient } = require("@prisma/client");
const prisma = require("./prisma.js");

module.exports = {
  /**
   * Function that creates an application in the database.
   * @param {}
   * @returns {}
   */

  createApplication: async (body) => {
    const { comment, STUDENT_ID, PROPOSAL_ID } = body;
    return new Promise(async (resolve, reject) => {
      // Fetch student
      const student = await prisma.student.findUnique({
        where: {
          id: STUDENT_ID,
        },
      });
      // Fetch proposal
      const proposal = await prisma.proposal.findUnique({
        where: {
          id: PROPOSAL_ID,
        },
        include: {
          applications: {
            where: {
              status: "accepted",
            },
          },
        },
      });

      if (student == null || proposal == null) {
        return reject({
          status: 500,
          error: "no student found",
        });
      }
      // Check student is suitable
      /*
      // Check proposal is valid
      if (proposal.expiration > Date.now()) {
        return reject({
          status: 400,
          error: "Proposal has already expired!",
        });
      }*/
      if (proposal.applications.length > 0 || proposal.archived) {
        return reject({
          status: 400,
          error: "The proposal is no longer available",
        });
      }

      // Create application
      prisma.application
        .create({
          data: {
            status: "pending",
            comment,
            STUDENT_ID,
            PROPOSAL_ID,
          },
        })
        .then((application) => {
          resolve(application);
        })
        .catch((error) => {
          console.error(error);
          reject({
            status: 500,
            error: "An error occurred while creating Application",
          });
        });
    });
  },
};
