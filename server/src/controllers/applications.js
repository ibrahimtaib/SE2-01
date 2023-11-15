const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });

module.exports = {
  getApplicationsStudentsProposalsDegreesByTeacherId: async (teacherId) => {
    let int_id = parseInt(teacherId);
    try {
        const applicationsStudentsProposals = await prisma.Application.findMany({
            where: {
                proposal: {
                    teacher: {
                        id: int_id,
                    },
                },
            },
            include: {
                proposal: {
                    include: {
                        teacher: true,
                        degree: true,
                    },
                },
                student: {
                    include: {
                        degree: true,
                    },
                },
            },
        });

        return applicationsStudentsProposals.map((application) => ({
            application,
            student: {
                ...application.student,
                degree: application.student.degree, 
            },
            proposal: application.proposal,
        }));
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while querying the database for applications, students, degrees, and proposals");
    }
  },
  getProposalById: async (proposalId) => {
    let int_proposal_id = parseInt(proposalId);
    try {
          const proposal = await prisma.Proposal.findUnique({
            where: {
                id: int_proposal_id,
            },
            include: {
                teacher: true,
                degree: true,
            },
        });
    

        return {
            proposal,
            teacher: proposal.teacher,
            degree: proposal.degree,
        };
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while querying the database for the proposal and related information");
    }
  },
  getStudentById: async (studentId) => {
    let int_student_id = parseInt(studentId);
    try {
    const student = await prisma.student.findUnique({
        where: {
            id: int_student_id,
        },
        include: {
            applications: true,
            degree: true,
            Career: true,
        },
        });
  
      return {
        student
      };
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while querying the database for student information");
    }
  },
}