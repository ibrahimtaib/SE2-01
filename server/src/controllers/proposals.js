const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });

module.exports = {
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
  getAllCds: async () => {
    return new Promise((resolve, reject) =>
      prisma.Degree
        .findMany()
        .then((cds) => {
          return resolve(cds);
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
      prisma.Proposal
        .findMany({
          select: {
            type: true,
          },
        })
        .then((types) => {
          // Utilizza un set per garantire l'unicità dei valori
          const uniqueTypes = new Set(types.map((tp) => tp.type));
          // Converti il set in un array
          const uniqueTypesArray = Array.from(uniqueTypes);
          return resolve(uniqueTypesArray);
        })
        .catch((error) => {
          console.error(error);
          return reject({
            error: "An error occurred while querying the database for type",
          });
        })
    );
  },

  getAllLevels: async () => {
    return new Promise((resolve, reject) =>
      prisma.Proposal
        .findMany({
          select: {
            level: true,
          },
        })
        .then((levels) => {
          // Utilizza un set per garantire l'unicità dei valori
          const uniqueLevels = new Set(levels.map((lv) => lv.level));
          // Converti il set in un array
          const uniqueLevelsArray = Array.from(uniqueLevels);
          return resolve(uniqueLevelsArray);
        })
        .catch((error) => {
          console.error(error);
          return reject({
            error: "An error occurred while querying the database for level",
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

  getApplicationsBySupervisorId: async (teacherId) => {
    return new Promise((resolve, reject) =>
      prisma.Application
        .findMany({
          where: {
            proposal: {
              supervisor: {
                id: teacherId,
              },
            },
          },
        })
        .then((applications) => {
          return resolve(applications);
        })
        .catch((error) => {
          console.error(error);
          return reject({
            error: "An error occurred while querying the database for applications",
          });
        })
    );
},
};
