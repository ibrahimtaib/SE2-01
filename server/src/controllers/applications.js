// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient({ log: ["query"] });

const { PrismaClient } = require("@prisma/client");
const prisma = require("./prisma");
const { resolve } = require("path");

module.exports = {
    getApplicationsStudentsProposalsDegreesByTeacherId: async (teacherId) => {
        try {
          const applicationsStudentsProposals = await prisma.Application.findMany({
            where: {
              proposal: {
                teacher: {
                  id: teacherId,
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
      
          return applicationsStudentsProposals
            .map((application) => ({
              application,
              student: {
                ...application.student,
                degree: application.student.degree,
              },
              proposal: application.proposal,
            }))
            .sort((a, b) => new Date(a.application.date) - new Date(b.application.date));
        } catch (error) {
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
    try {
    const student = await prisma.student.findUnique({
        where: {
            id: studentId,
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
  acceptApplication: async (applicationId) => {
    let intApplicationId = parseInt(applicationId);
    try {
      const updatedApplication = await prisma.Application.update({
        where: { id: intApplicationId },
        data: { status: 'accept' },
      });
        
      return updatedApplication;
    } catch (error) {
      throw new Error("An error occurred while updating the application status to 'accept'");
    }
  },
    refuseApplication: async (applicationId) => {
        let intApplicationId = parseInt(applicationId);
        try {
            const updatedApplication = await prisma.Application.update({
            where: { id: intApplicationId },
            data: { status: 'refuse' },
            });
            
            return updatedApplication;
        } catch (error) {
            throw new Error("An error occurred while updating the application status to 'refuse'");
        }
    },
    getProposalIdByApplicationId: async(applicationId) => {
        try {
        const application = await prisma.Application.findUnique({
            where: { id: parseInt(applicationId) },
            select: { PROPOSAL_ID: true },
        });

        return application.PROPOSAL_ID;
        } catch (error) {
        throw new Error('An error occurred while fetching the proposalId for the application');
        }
    },

    rejectWaitingApplicationsByProposalId: async(proposalId) => {
    try {
    const rejectedApplications = await prisma.Application.updateMany({
        where: {
        PROPOSAL_ID: parseInt(proposalId),
        status: 'pending',
        },
        data: {
        status: 'refuse',
        },
    });

    return rejectedApplications;
    } catch (error) {
    throw new Error('An error occurred while rejecting pending applications for the proposal');
    }
    },
}