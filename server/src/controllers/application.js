const { PrismaClient } = require("@prisma/client");
const prisma = require("./prisma.js");

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
          reject({
            status: 500,
            error: "An error occurred",
          });
        }

        // Check the student does not have any prior applications
        const prevApplication = await prisma.application.findFirst({
          where: {
            STUDENT_ID,
            PROPOSAL_ID,
          },
        });

        if (prevApplication != null) {
          reject({
            status: 400,
            error: "Student has already applied to this proposal!",
          });
        }

        // Check student is suitable
        if (student.COD_DEGREE !== proposal.cds) {
          reject({
            status: 400,
            error: "Student cannot apply to this proposal!",
          });
        }

        // Check proposal is valid
        if (proposal.expiration <= Date.now()) {
          reject({
            status: 400,
            error: "Proposal has already expired!",
          });
        }
        if (proposal.applications.length > 0 || proposal.archived) {
          reject({
            status: 400,
            error: "The proposal is no longer available",
          });
        }

        // Create application
        const application = await prisma.application.create({
          data: {
            status: "pending",
            comment,
            STUDENT_ID,
            PROPOSAL_ID,
          },
        });

        resolve(application);
      } catch (error) {
        console.error(error);
        reject({
          status: 500,
          error: "An error occurred",
        });
      }
    });
  },
};
