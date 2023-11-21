const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  /**
   * Function that creates an application in the database.
   * @param {Object} body - The request body containing the necessary data for creating an application.
   * @returns {Promise} - The created application or an error object.
   */
  createApplication: (body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { comment, STUDENT_ID, PROPOSAL_ID } = body;

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
          throw {
            status: 500,
            error: "An error occurred",
          };
        }

        // Check student is suitable
        if (student.COD_DEGREE !== proposal.cds) {
          throw {
            status: 400,
            error: "Student cannot apply to this proposal!",
          };
        }

        // Check proposal is valid
        if (proposal.expiration <= Date.now()) {
          throw {
            status: 400,
            error: "Proposal has already expired!",
          };
        }
        if (proposal.applications.length > 0 || proposal.archived) {
          throw {
            status: 400,
            error: "The proposal is no longer available",
          };
        }

        // Create application
        const application = await prisma.application.create({
          data: {
            status: "pending",
            comment,
            STUDENT_ID,
            PROPOSAL_ID,
            date: new Date(),
          },
        });

        resolve(application);
      } catch (error) {
        console.error(error);
        reject({
          status: error.status || 500,
          error: error.error || "An error occurred while creating Application",
        });
      }
    });
  },
};