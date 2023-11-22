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
          return reject({
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
          return reject({
            status: 400,
            error: "Student has already applied to this proposal!",
          });
        }

        // Check student is suitable
        if (student.COD_DEGREE !== proposal.cds) {
          return reject({
            status: 400,
            error: "Student cannot apply to this proposal!",
          });
        }

        // Check proposal is valid
        if (proposal.expiration <= Date.now()) {
          return reject({
            status: 400,
            error: "Proposal has already expired!",
          });
        }
        if (proposal.applications.length > 0 || proposal.archived) {
          return reject({
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

  /**
   * Returns the application of a student for a proposal. Returns null if the student has not applied.
   * @date 2023-11-22
   * @param {{PROPOSAL_ID: number, STUDENT_ID: number}} body
   * @returns {null | {id: number, status: string, comment: string, date: Date, STUDENT_ID: number, PROPOSAL_ID: number}}
   */
  getStudentApplication: (body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { PROPOSAL_ID, STUDENT_ID } = body;

        const application = await prisma.application.findFirst({
          where: {
            PROPOSAL_ID,
            STUDENT_ID,
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
