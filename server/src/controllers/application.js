const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({log:["query"]});

module.exports = {
  /**
   * Function that returns all courses in the database.
   * @param {}
   * @returns {Promise<[{id: Number, COD_COURSE: Number, TITLE_COURSE: String}]>}
   */

  createApplication: async (body) => {
    const { date,status,comment,STUDENT_ID,PROPOSAL_ID,student,proposal} = body;
    return new Promise((resolve, reject) =>
        prisma.Application.create({
        data:{
            date,
            status,
            comment,
            STUDENT_ID,
            PROPOSAL_ID,
            student,proposal
           }
        })
        .then((application) => {
            return resolve(application);
        })
        .catch((error) => {
          console.error(error);
          return reject({
            error: "An error occurred while creating Application",
          });
        })
    );
  },
};