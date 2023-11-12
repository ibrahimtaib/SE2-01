const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({log:["query"]});

module.exports = {

  getAllCds: async () => {
    return new Promise((resolve, reject) =>
      prisma.Degree
        .findMany({
          select: {
            TITLE_DEGREE: true,
          },
        })
        .then((cds) => {
          return resolve(cds.map((cd) => cd.TITLE_DEGREE));
        })
        .catch((error) => {
          console.error(error);
          return reject({
            error: "An error occurred while querying the database for cds",
          });
        })
    );
  },
  

  getProposals: async () => {
    return new Promise((resolve, reject) =>
      prisma.Proposal
        .findMany()
        .then((proposals) => {
          return resolve(proposals);
        })
        .catch((error) => {
          console.error(error);
          return reject({
            error: "An error occurred while querying the database for proposals",
          });
        })
    );
  },

  getProposalsByTitle: async (searchString) => {
    //const searchWords = searchString.split(' ');
  
    return new Promise((resolve, reject) => {
      prisma.Proposal
        .findMany({
          where: {
            title: {
              contains: searchString,
              mode: "insensitive",
            },
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
        });
    });
  },

  getProposalsByCosupervisor: async (surname) => {
    return new Promise((resolve, reject) =>
      prisma.Proposal
        .findMany({
          where:{
            coSupervisors: surname,
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

  getProposalsByType: async (type) => {
    return new Promise((resolve, reject) =>
      prisma.Proposal
        .findMany({
          where:{
            type: type
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


      getProposalsByExpirationDate: async (expirationDate) => {
      return new Promise((resolve, reject) =>
        prisma.Proposal
          .findMany({
            where: {
              expiration: {
                lte: new Date(expirationDate),
              },
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
  