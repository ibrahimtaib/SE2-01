const { PrismaClient } = require("@prisma/client");
const prisma = require("./prisma");
const { resolve } = require("path");
const { STATUS } = require("../constants/application");
module.exports = {
  createProposal: async (body) => {
    const {
      title,
      coSupervisors,
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
      degree,
    } = body;
    return new Promise((resolve, reject) =>
      prisma.Proposal.create({
        data: {
          title,
          supervisor,
          coSupervisors,
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
          degree,
        },
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
  /**
   * Archive a proposal and set all applications to canceled. Returns an object with status 200 if successful.
   * 400 if proposal doesn't exist, 500 if an error occurred.
   * @date 2023-11-23
   * @param {Number} id
   * @returns {{status: Number, message: String} | {status: Number, error: String}}
   */
  deleteProposal: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const proposal = await prisma.Proposal.findUnique({
          where: {
            id: id,
          },
          include: {
            applications: {
              where: {
                status: STATUS.accepted,
              },
            },
          },
        });

        // Check if proposal exists
        if (!proposal) {
          return reject({
            status: 404,
            message: "Proposal does not exist!",
          });
        }
        // Check if proposal can be deleted
        console.log(proposal);
        if (proposal.applications.length > 0) {
          return reject({
            status: 400,
            message:
              "Proposal cannot be deleted because it has accepted applications!",
          });
        }

        //initiate a prisma transaction
        prisma.$transaction(async (prisma) => {
          // Set all applications to canceled
          await prisma.Application.updateMany({
            where: {
              PROPOSAL_ID: id,
            },
            data: {
              status: STATUS.canceled,
            },
          });

          // Archive the proposal
          await prisma.Proposal.delete({
            where: {
              id: id,
            },
          });
        });
        resolve({
          status: 200,
          message: "Operation successful!",
        });
      } catch (error) {
        console.error(error);
        return reject({
          status: 500,
          error: "An error occurred while deleting the proposal",
        });
      }
    });
  },
  getAllCds: async () => {
    return new Promise((resolve, reject) =>
      prisma.Degree.findMany()
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
      prisma.Proposal.findMany({
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
            error: "An error occurred while querying the database for types",
          });
        })
    );
  },

  getAllLevels: async () => {
    return new Promise((resolve, reject) =>
      prisma.Proposal.findMany({
        select: {
          level: true,
        },
      })
        .then((levels) => {
          const uniqueLevels = new Set(levels.map((lv) => lv.level));
          const uniqueLevelsArray = Array.from(uniqueLevels);
          return resolve(uniqueLevelsArray);
        })
        .catch((error) => {
          return reject({
            error: "An error occurred while querying the database for level",
          });
        })
    );
  },

  getProposals: async () => {
    return new Promise((resolve, reject) => {
      prisma.Proposal.findMany({
        include: {
          teacher: {
            select: {
              surname: true,
              name: true,
              id: true,
            },
          },
          degree: {
            select: {
              TITLE_DEGREE: true,
            },
          },
          applications: {
            where: {
              status: STATUS.accepted,
            },
          },
        },
      })
        .then((proposals) => {
          proposals.forEach((proposal) => {
            if (
              proposal.applications.length > 0 ||
              proposal.expiration < new Date()
            ) {
              proposal.deletable = false;
            } else {
              proposal.deletable = true;
            }
            delete proposal.applications;
          });

          resolve(proposals);
        })
        .catch((error) => {
          console.error(error);
          return reject({
            error: "An error occurred while querying the database",
          });
        });
    });
  },

  getProposalsByTitle: async (searchString) => {
    return new Promise((resolve, reject) => {
      prisma.Proposal.findMany({
        include: {
          teacher: {
            select: {
              surname: true,
            },
          }, // Utilizzo del nome minuscolo 'teacher' per rispettare la convenzione del modello
          degree: {
            select: {
              TITLE_DEGREE: true,
            },
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
        .catch(() => {
          return reject({
            error: "An error occurred while querying the database",
          });
        });
    });
  },

  getProposalsByCosupervisor: async (surname) => {
    const separatedCoSupervisors = surname
      .split(",")
      .map((surname) => surname.trim().toLowerCase());
    return new Promise((resolve, reject) => {
      prisma.Proposal.findMany({
        include: {
          teacher: {
            select: {
              surname: true,
            },
          }, // Utilizzo del nome minuscolo 'teacher' per rispettare la convenzione del modello
          degree: {
            select: {
              TITLE_DEGREE: true,
            },
          },
        },
      })
        .then((proposals) => {
          const filteredProposals = proposals.filter((proposal) => {
            const proposalCoSup = proposal.coSupervisors.map((group) =>
              group.toLowerCase()
            );
            return separatedCoSupervisors.some((group) =>
              proposalCoSup.includes(group)
            );
          });

          resolve(filteredProposals);
        })
        .catch(() => {
          reject({
            error: "An error occurred while querying the database",
          });
        });
    });
  },

  getProposalsBySupervisor: async (surname) => {
    try {
      const teachers = await prisma.Teacher.findMany({
        where: {
          surname: {
            contains: surname,
            mode: "insensitive",
          },
        },
      });

      if (!teachers) {
        throw new Error("An error occurred while querying the database");
      }

      const teacherIds = teachers.map((teacher) => teacher.id);
      const proposals = await prisma.Proposal.findMany({
        include: {
          teacher: {
            select: {
              surname: true,
            },
          },
          degree: {
            select: {
              TITLE_DEGREE: true,
            },
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
      throw new Error("An error occurred while querying the database");
    }
  },

  getProposalsByKeywords: async (keywords) => {
    const separatedKeywords = keywords
      .split(",")
      .map((keyword) => keyword.trim().toLowerCase());

    return new Promise((resolve, reject) => {
      prisma.Proposal.findMany({
        include: {
          teacher: {
            select: {
              surname: true,
            },
          }, // Utilizzo del nome minuscolo 'teacher' per rispettare la convenzione del modello
          degree: {
            select: {
              TITLE_DEGREE: true,
            },
          },
        },
      })
        .then((proposals) => {
          const filteredProposals = proposals.filter((proposal) => {
            const proposalKeywords = proposal.keywords.map((keyword) =>
              keyword.toLowerCase()
            );
            return separatedKeywords.every((keyword) =>
              proposalKeywords.includes(keyword)
            );
          });

          resolve(filteredProposals);
        })
        .catch(() => {
          reject({
            error: "An error occurred while querying the database",
          });
        });
    });
  },

  getProposalsByGroups: async (groups) => {
    const separatedGroups = groups
      .split(",")
      .map((group) => group.trim().toLowerCase());
    return new Promise((resolve, reject) => {
      prisma.Proposal.findMany({
        include: {
          teacher: {
            select: {
              surname: true,
            },
          }, // Utilizzo del nome minuscolo 'teacher' per rispettare la convenzione del modello
          degree: {
            select: {
              TITLE_DEGREE: true,
            },
          },
        },
      })
        .then((proposals) => {
          const filteredProposals = proposals.filter((proposal) => {
            const proposalGroups = proposal.groups.map((group) =>
              group.toLowerCase()
            );
            return separatedGroups.some((group) =>
              proposalGroups.includes(group)
            );
          });

          resolve(filteredProposals);
        })
        .catch(() => {
          reject({
            error: "An error occurred while querying the database",
          });
        });
    });
  },

  getProposalsByExpirationDate: async (expirationDate) => {
    return new Promise((resolve, reject) =>
      prisma.Proposal.findMany({
        include: {
          teacher: {
            select: {
              surname: true,
            },
          }, // Utilizzo del nome minuscolo 'teacher' per rispettare la convenzione del modello
          degree: {
            select: {
              TITLE_DEGREE: true,
            },
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
        .catch(() => {
          return reject({
            error: "An error occurred while querying the database",
          });
        })
    );
  },

  getProposalsByLevel: async (level) => {
    return new Promise((resolve, reject) =>
      prisma.Proposal.findMany({
        include: {
          teacher: {
            select: {
              surname: true,
            },
          }, // Utilizzo del nome minuscolo 'teacher' per rispettare la convenzione del modello
          degree: {
            select: {
              TITLE_DEGREE: true,
            },
          },
        },
        where: {
          level: {
            equals: level,
            mode: "insensitive",
          },
        },
      })
        .then((proposals) => {
          return resolve(proposals);
        })
        .catch(() => {
          return reject({
            error: "An error occurred while querying the database",
          });
        })
    );
  },

  getProposalsByType: async (type) => {
    return new Promise((resolve, reject) =>
      prisma.Proposal.findMany({
        include: {
          teacher: {
            select: {
              surname: true,
            },
          },
          degree: {
            select: {
              TITLE_DEGREE: true,
            },
          },
        },
        where: {
          type: {
            equals: type,
            mode: "insensitive",
          },
        },
      })
        .then((proposals) => {
          return resolve(proposals);
        })
        .catch(() => {
          return reject({
            error: "An error occurred while querying the database",
          });
        })
    );
  },

  getProposalsByCDS: async (cds) => {
    return new Promise((resolve, reject) => {
      prisma.Proposal.findMany({
        include: {
          teacher: {
            select: {
              surname: true,
              name: true,
              id: true,
            },
          },
          degree: {
            select: {
              TITLE_DEGREE: true,
            },
          },
          applications: {
            where: {
              status: STATUS.accepted,
            },
          },
        },
        where: {
          cds: cds
        }
      })
        .then((proposals) => {
          proposals.forEach((proposal) => {
            if (
              proposal.applications.length > 0 ||
              proposal.expiration < new Date()
            ) {
              proposal.deletable = false;
            } else {
              proposal.deletable = true;
            }
            delete proposal.applications;
          });

          resolve(proposals);
        })
        .catch((error) => {
          console.error(error);
          return reject({
            error: "An error occurred while querying the database",
          });
        });
    });
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
        let levelProposals = await module.exports.getProposalsByLevel(
          levelFilter
        );

        if (filteredProposals) {
          // Filtra gli oggetti che hanno lo stesso id
          filteredProposals = filteredProposals.filter((proposal) =>
            levelProposals.some(
              (levelProposal) => levelProposal.id === proposal.id
            )
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
            typeProposals.some(
              (typeProposal) => typeProposal.id === proposal.id
            )
          );
        } else {
          // Se filteredProposals non esiste, assegna semplicemente levelProposals
          filteredProposals = typeProposals;
        }
      }

      if (titleFilter) {
        let titleProposals = await module.exports.getProposalsByTitle(
          titleFilter
        );
        if (filteredProposals) {
          // Filtra gli oggetti che hanno lo stesso id
          filteredProposals = filteredProposals.filter((proposal) =>
            titleProposals.some(
              (titleProposal) => titleProposal.id === proposal.id
            )
          );
        } else {
          // Se filteredProposals non esiste, assegna semplicemente levelProposals
          filteredProposals = titleProposals;
        }
      }

      if (supervisorFilter) {
        let supervisorProposals = await module.exports.getProposalsBySupervisor(
          supervisorFilter
        );
        if (filteredProposals) {
          // Filtra gli oggetti che hanno lo stesso id
          filteredProposals = filteredProposals.filter((proposal) =>
            supervisorProposals.some(
              (supervisorProposal) => supervisorProposal.id === proposal.id
            )
          );
        } else {
          // Se filteredProposals non esiste, assegna semplicemente levelProposals
          filteredProposals = supervisorProposals;
        }
      }

      if (coSupervisorFilter) {
        let coSupervisorProposals =
          await module.exports.getProposalsByCosupervisor(coSupervisorFilter);
        if (filteredProposals) {
          // Filtra gli oggetti che hanno lo stesso id
          filteredProposals = filteredProposals.filter((proposal) =>
            coSupervisorProposals.some(
              (coSupervisorProposal) => coSupervisorProposal.id === proposal.id
            )
          );
        } else {
          // Se filteredProposals non esiste, assegna semplicemente levelProposals
          filteredProposals = coSupervisorProposals;
        }
      }

      if (keywordsFilter) {
        let keywordsProposals = await module.exports.getProposalsByKeywords(
          keywordsFilter
        );
        if (filteredProposals) {
          // Filtra gli oggetti che hanno lo stesso id
          filteredProposals = filteredProposals.filter((proposal) =>
            keywordsProposals.some(
              (keywordsProposals) => keywordsProposals.id === proposal.id
            )
          );
        } else {
          // Se filteredProposals non esiste, assegna semplicemente levelProposals
          filteredProposals = keywordsProposals;
        }
      }

      if (groupsFilter) {
        let groupsProposals = await module.exports.getProposalsByGroups(
          groupsFilter
        );
        if (filteredProposals) {
          // Filtra gli oggetti che hanno lo stesso id
          filteredProposals = filteredProposals.filter((proposal) =>
            groupsProposals.some(
              (groupsProposals) => groupsProposals.id === proposal.id
            )
          );
        } else {
          // Se filteredProposals non esiste, assegna semplicemente levelProposals
          filteredProposals = groupsProposals;
        }
      }

      if (expirationFilter) {
        let expirationProposals =
          await module.exports.getProposalsByExpirationDate(expirationFilter);
        if (filteredProposals) {
          // Filtra gli oggetti che hanno lo stesso id
          filteredProposals = filteredProposals.filter((proposal) =>
            expirationProposals.some(
              (expirationProposals) => expirationProposals.id === proposal.id
            )
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
  },

  getTeacherProposals: async (teacherId) => {
    return new Promise((resolve, reject) =>
      prisma.Proposal
        .findMany({
          where: {
            supervisor: teacherId,
          },
        })
        .then((proposals) => {
          return resolve(proposals);
        })
        .catch(() => {
          return reject({
            error: "An error occurred while querying the database for applications",
          });
        })
    );
  },

  getApplicationsBySupervisorId: async (teacherId) => {
    return new Promise((resolve, reject) =>
      prisma.Application.findMany({
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
            error:
              "An error occurred while querying the database for applications",
          });
        })
    );
  },

  //for updating proposals
  updateProposal: async (body) => {
    const {
      id,
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
      degree,
    } = body;
    return new Promise((resolve, reject) =>
      prisma.Proposal.update({
        where: { id: id },
        data: {
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
          degree,
        },
      })
        .then((proposal) => {
          return resolve(proposal);
        })
        .catch((error) => {
          console.error(error);
          return reject({
            error: "An error occurred while updating proposal",
          });
        })
    );
  },
};
