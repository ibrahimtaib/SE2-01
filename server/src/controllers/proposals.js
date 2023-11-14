const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });

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

  getAllTypes: async () => {
    return new Promise((resolve, reject) =>
      prisma.Proposals
        .findMany({
          select: {
            type: true,
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
          where: {
            coSupervisors: {
              contains: surname,
              mode: "insensitive",
            }
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

  getProposalsBySupervisor: async (surname) => {
    try {
      // Trova l'insegnante con il cognome specificato
      const teachers = await prisma.Teacher.findMany({
        where: {
          surname: {
            contains: surname,
            mode: "insensitive",
          }
        },
      });
  
      // Se l'insegnante non è stato trovato, restituisci un array vuoto
      if (!teachers) {
        throw new Error("An error occurred while querying the database");;
      }
  
      const teacherIds = teachers.map((teacher) => teacher.id);
      // Trova le proposte associate all'insegnante
      const proposals = await prisma.Proposal.findMany({
        where: {
          supervisor: {
            in:teacherIds,
          },
        },
      });
  
      return proposals;
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while querying the database");
    }
  },


  getProposalsByKeywords: async (keywords) => {
    const separatedKeywords = keywords.split(',').map(keyword => keyword.trim().toLowerCase());
  
    return new Promise((resolve, reject) => {
      prisma.Proposal
        .findMany()
        .then((proposals) => {
          const filteredProposals = proposals.filter(proposal => {
            const proposalKeywords = proposal.keywords.map(keyword => keyword.toLowerCase());
            return separatedKeywords.every(keyword => proposalKeywords.includes(keyword));
          });
  
          resolve(filteredProposals);
        })
        .catch((error) => {
          console.error(error);
          reject({
            error: "An error occurred while querying the database",
          });
        });
    });
  },
  
  

  getProposalsByGroups: async (groups) => {
    const separatedGroups = groups.split(',').map(group => group.trim().toLowerCase());
    console.log(separatedGroups)
    return new Promise((resolve, reject) => {
      prisma.Proposal
        .findMany()
        .then((proposals) => {
          const filteredProposals = proposals.filter(proposal => {
            const proposalGroups = proposal.groups.map(group => group.toLowerCase());
            return separatedGroups.some(group => proposalGroups.includes(group));
          });
  
          resolve(filteredProposals);
        })
        .catch((error) => {
          console.error(error);
          reject({
            error: "An error occurred while querying the database",
          }); 
      });
    });
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
  
getProposalsByLevel: async (level) => {
    return new Promise((resolve, reject) =>
      prisma.Proposal
        .findMany({
          where: {
            level: {
              equals: level,
              mode: "insensitive",
            }
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
          where: {
            type: {
              equals: type,
              mode: "insensitive",
            }
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

  getProposalsByCDS: async (cds) => {
    return new Promise((resolve, reject) =>
      prisma.Proposal
        .findMany({
          where: {
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

  filterProposals: async (filters) => {
    let result = [];

    for (const filter of filters) {
      let proposals = [];

      switch (filter.type) {
        case 'title':
          proposals = await proposalsController.getProposalsByTitle(filter.value);
          break;
        case 'cosupervisor':
          proposals = await proposalsController.getProposalsByCosupervisor(filter.value);
          break;

        default:
          break;
      }

      if (result.length === 0) {
        result = proposals;
      } else {
        result = result.filter(proposal => proposals.some(p => p.id === proposal.id));
      }
    }

    return result;
  },



};
