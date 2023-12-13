const prisma = require('./prisma');
const {REQUESTSTATUS} = require('../constants/application')

module.exports = {
  getThesisRequests: async () => {
    return new Promise((resolve, reject) =>
      prisma.ThesisRequest
        .findMany({
          include: {
            teacher: true,
            student: {
              include: {
                degree: true,
              },
            },
            },
        })
        .then((secretaries) => {
          return resolve(secretaries);
        })
        .catch((error) => {
          console.error(error);
          return reject({
            error: "An error occurred while querying the database for secretaries",
          });
        })
    );
  },

  getPendingThesisRequests: async () => {
    return new Promise((resolve, reject) =>
      prisma.ThesisRequest
        .findMany({
          where: {
            status: REQUESTSTATUS.pending,
          },
          include: {
            teacher: true,
            student: {
              include: {
                degree: true,
              },
            },
            },
        })
        .then((secretaries) => {
          return resolve(secretaries);
        })
        .catch((error) => {
          console.error(error);
          return reject({
            error: "An error occurred while querying the database for secretaries",
          });
        })
    );
  },

  getThesisRequestsById: async (id) => {
    return new Promise((resolve, reject) =>
      prisma.ThesisRequest
        .findUnique({
          where: {
            id: id,
          },
          include: {
            teacher: true,
            student: true,
            },
        })
        .then((secretary) => {
          return resolve(secretary);
        })
        .catch((error) => {
          console.error(error);
          return reject({
            error: "An error occurred while querying the database for secretary",
          });
        })
    );
  },

  getSecretaryAcceptedThesisRequests: async () => {
    return new Promise((resolve, reject) =>
      prisma.ThesisRequest
        .findMany({
          where: {
            status: REQUESTSTATUS.acceptedBySecretary,
          },
          include: {
            teacher: true,
            student: {
              include: {
                degree: true,
              },
            },
            },
        })
        .then((ThesisRequests) => {
          return resolve(ThesisRequests);
        })
        .catch((error) => {
          console.error(error);
          return reject({
            error: "An error occurred while querying the database for secretary accepted ThesisRequests",
          });
        })
    );
  },

  getThesisRequestsByTeacherId: async (id) => {
    return new Promise((resolve, reject) =>
      prisma.ThesisRequest
        .findMany({
          where: {
            teacherId: id
          },
          include: {
            teacher: true,
            student: {
              include: {
                degree: true,
              },
            },
            },
        })
        .then((ThesisRequests) => {
          return resolve(ThesisRequests);
        })
        .catch((error) => {
          console.error(error);
          return reject({
            error: "An error occurred while querying the database for secretary accepted ThesisRequests",
          });
        })
    );
  },

  getSecretaryRejectedThesisRequests: async () => {
    return new Promise((resolve, reject) =>
      prisma.ThesisRequest
        .findMany({
          where: {
            status: REQUESTSTATUS.rejectedBySecretary,
          },
          include: {
            teacher: true,
            student: {
              include: {
                degree: true,
              },
            },
            },
        })
        .then((ThesisRequests) => {
          return resolve(ThesisRequests);
        })
        .catch((error) => {
          console.error(error);
          return reject({
            error: "An error occurred while querying the database for secretary rejected ThesisRequests",
          });
        })
    );
  },

  actionOnThesisRequestBySecretary: async (action,id) => {
    return new Promise((resolve, reject) =>
      prisma.ThesisRequest
        .update({
          where: {
            id: id,
          },
          data: {
            status: action === "accept"? REQUESTSTATUS.acceptedBySecretary: REQUESTSTATUS.rejectedBySecretary,
          },
        })
        .then((ThesisRequest) => {
          return resolve(ThesisRequest);
        })
        .catch((error) => {
          console.error(error);
          return reject({
            error: `An error occurred while trying to ${action} ThesisRequest by secretary Clerk`,
          });
        })
    );
  },

  actionOnThesisRequestByTeacher: async (action, id) => {
    return new Promise((resolve, reject) =>
      prisma.ThesisRequest
        .update({
          where: {
            id: id,
          },
          data: {
            status: action === "accept"? REQUESTSTATUS.acceptedByTeacher: REQUESTSTATUS.rejectedByTeacher,
          },
        })
        .then((ThesisRequest) => {
          return resolve(ThesisRequest);
        })
        .catch((error) => {
          console.error(error);
          return reject({
            error: `An error occurred while trying to ${action} ThesisRequest by teacher`,
          });
        })
    );
  }


};