const { PrismaClient } = require("@prisma/client");
const prisma = require("./prisma");

module.exports = {

  getAllCds: async () => {
    return new Promise((resolve, reject) =>
      prisma.Degree
        .findMany()
        .then((cds) => {
          return resolve(cds);
        })
        .catch(() => {
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
          const uniqueTypes = new Set(types.map((tp) => tp.type));
          const uniqueTypesArray = Array.from(uniqueTypes);
          return resolve(uniqueTypesArray);
        })
        .catch(() => {
          return reject({
            error: "An error occurred while querying the database for cds",
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
    return new Promise((resolve, reject) => {
      prisma.proposal.findMany({
        include: {
          teacher: {
            select: {
              surname: true,
            }
          },
          degree: {
            select: {
              TITLE_DEGREE: true,
            }
          },
        },
      })
      .then((proposals) => {
        resolve(proposals);
      })
      .catch((error) => {
        console.error(error);
        reject(new Error("An error occurred while querying the database for proposals"));
      });
    });
  },
  



  getProposalsByTitle: async (searchString) => {
    return new Promise((resolve, reject) => {
      prisma.Proposal
        .findMany({
          include: {
            teacher: {
              select: {
                surname: true,
              }
            },  // Utilizzo del nome minuscolo 'teacher' per rispettare la convenzione del modello
            degree: {
              select: {
                TITLE_DEGREE: true,
              }
            },
          },
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
          include: {
            teacher: {
              select: {
                surname: true,
              }
            },  // Utilizzo del nome minuscolo 'teacher' per rispettare la convenzione del modello
            degree: {
              select: {
                TITLE_DEGREE: true,
              }
            },
          },
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
        include: {
          teacher: {
            select: {
              surname: true,
            }
          },  // Utilizzo del nome minuscolo 'teacher' per rispettare la convenzione del modello
          degree: {
            select: {
              TITLE_DEGREE: true,
            }
          },
        },
        where: {
          supervisor: {
            in: teacherIds,
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
        .findMany({
          include: {
            teacher: {
              select: {
                surname: true,
              }
            },  // Utilizzo del nome minuscolo 'teacher' per rispettare la convenzione del modello
            degree: {
              select: {
                TITLE_DEGREE: true,
              }
            },
          },
        })
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
    return new Promise((resolve, reject) => {
      prisma.Proposal
        .findMany({
          include: {
            teacher: {
              select: {
                surname: true,
              }
            },  // Utilizzo del nome minuscolo 'teacher' per rispettare la convenzione del modello
            degree: {
              select: {
                TITLE_DEGREE: true,
              }
            },
          },
        })
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
          include: {
            teacher: {
              select: {
                surname: true,
              }
            },  // Utilizzo del nome minuscolo 'teacher' per rispettare la convenzione del modello
            degree: {
              select: {
                TITLE_DEGREE: true,
              }
            },
          },
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
          include: {
            teacher: {
              select: {
                surname: true,
              }
            },  // Utilizzo del nome minuscolo 'teacher' per rispettare la convenzione del modello
            degree: {
              select: {
                TITLE_DEGREE: true,
              }
            },
          },
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
          include: {
            teacher: {
              select: {
                surname: true,
              }
            },  // Utilizzo del nome minuscolo 'teacher' per rispettare la convenzione del modello
            degree: {
              select: {
                TITLE_DEGREE: true,
              }
            },
          },
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
          include: {
            teacher: {
              select: {
                surname: true,
              }
            },  // Utilizzo del nome minuscolo 'teacher' per rispettare la convenzione del modello
            degree: {
              select: {
                TITLE_DEGREE: true,
              }
            },
          },
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

  filterProposals: async (filter) => {
    try {
      let cdsFilter = filter.cds;
      let levelFilter = filter.level;
      let typeFilter = filter.type;
      let titleFilter = filter.title;
      let supervisorFilter = filter.supervisor;
      let coSupervisorFilter = filter.coSupervisor;
      let keywordsFilter = filter.keywords;
      let groupsFilter = filter.groups;
      let expirationFilter = filter.expiration;

      let filteredProposals; // Dichiaro la variabile fuori dal blocco if

      if (cdsFilter) {
        filteredProposals = await module.exports.getProposalsByCDS(cdsFilter);
      }

      if (levelFilter) {
        let levelProposals = await module.exports.getProposalsByLevel(levelFilter);

        if (filteredProposals) {
          // Filtra gli oggetti che hanno lo stesso id
          filteredProposals = filteredProposals.filter((proposal) =>
            levelProposals.some((levelProposal) => levelProposal.id === proposal.id)
          );
        } else {
          // Se filteredProposals non esiste, assegna semplicemente levelProposals
          filteredProposals = levelProposals;
        }
      }

      if (typeFilter) {
        let typeProposals = await module.exports.getProposalsByType(typeFilter);
        if (filteredProposals) {
          // Filtra gli oggetti che hanno lo stesso id
          filteredProposals = filteredProposals.filter((proposal) =>
            typeProposals.some((typeProposal) => typeProposal.id === proposal.id)
          );
        } else {
          // Se filteredProposals non esiste, assegna semplicemente levelProposals
          filteredProposals = typeProposals;
        }
      }

      if (titleFilter) {
        let titleProposals = await module.exports.getProposalsByTitle(titleFilter);
        if (filteredProposals) {
          // Filtra gli oggetti che hanno lo stesso id
          filteredProposals = filteredProposals.filter((proposal) =>
            titleProposals.some((titleProposal) => titleProposal.id === proposal.id)
          );
        } else {
          // Se filteredProposals non esiste, assegna semplicemente levelProposals
          filteredProposals = titleProposals;
        }
      }

      if (supervisorFilter) {
        let supervisorProposals = await module.exports.getProposalsBySupervisor(supervisorFilter);
        if (filteredProposals) {
          // Filtra gli oggetti che hanno lo stesso id
          filteredProposals = filteredProposals.filter((proposal) =>
            supervisorProposals.some((supervisorProposal) => supervisorProposal.id === proposal.id)
          );
        } else {
          // Se filteredProposals non esiste, assegna semplicemente levelProposals
          filteredProposals = supervisorProposals;
        }
      }

      if (coSupervisorFilter) {
        let coSupervisorProposals = await module.exports.getProposalsByCosupervisor(coSupervisorFilter);
        if (filteredProposals) {
          // Filtra gli oggetti che hanno lo stesso id
          filteredProposals = filteredProposals.filter((proposal) =>
            coSupervisorProposals.some((coSupervisorProposal) => coSupervisorProposal.id === proposal.id)
          );
        } else {
          // Se filteredProposals non esiste, assegna semplicemente levelProposals
          filteredProposals = coSupervisorProposals;
        }
      }

      if (keywordsFilter) {
        let keywordsProposals = await module.exports.getProposalsByKeywords(keywordsFilter);
        if (filteredProposals) {
          // Filtra gli oggetti che hanno lo stesso id
          filteredProposals = filteredProposals.filter((proposal) =>
            keywordsProposals.some((keywordsProposals) => keywordsProposals.id === proposal.id)
          );
        } else {
          // Se filteredProposals non esiste, assegna semplicemente levelProposals
          filteredProposals = keywordsProposals;
        }
      }

      if (groupsFilter) {
        let groupsProposals = await module.exports.getProposalsByGroups(groupsFilter);
        if (filteredProposals) {
          // Filtra gli oggetti che hanno lo stesso id
          filteredProposals = filteredProposals.filter((proposal) =>
            groupsProposals.some((groupsProposals) => groupsProposals.id === proposal.id)
          );
        } else {
          // Se filteredProposals non esiste, assegna semplicemente levelProposals
          filteredProposals = groupsProposals;
        }
      }

      if (expirationFilter) {
        let expirationProposals = await module.exports.getProposalsByExpirationDate(expirationFilter);
        if (filteredProposals) {
          // Filtra gli oggetti che hanno lo stesso id
          filteredProposals = filteredProposals.filter((proposal) =>
            expirationProposals.some((expirationProposals) => expirationProposals.id === proposal.id)
          );
        } else {
          // Se filteredProposals non esiste, assegna semplicemente levelProposals
          filteredProposals = expirationProposals;
        }
      }
      return filteredProposals;
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while filtering proposals");
    }
  }

};
