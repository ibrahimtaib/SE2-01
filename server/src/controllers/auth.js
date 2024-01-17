const prisma = require('./prisma');

module.exports = {
    checkUser: (userID) => {
        return new Promise((resolve, reject) => {
            prisma.teacher
                .findUnique({
                    where: {
                        id: userID,
                    },
                })
                .then((teacher) => {
                    if (teacher) {
                        const customTeacherObject = {
                            id: teacher.id,
                            name: `${teacher.name} ${teacher.surname}`,
                            role: "teacher",
                            email: teacher.email,
                        };
                        resolve(customTeacherObject);
                    } else {
                        return prisma.student.findUnique({
                            where: {
                                id: userID,
                            },
                        });
                    }
                })
                .then((student) => {
                    if (student) {
                        const customStudentObject = {
                            id: student.id,
                            name: `${student.name} ${student.surname}`,
                            role: "student",
                            email: student.email,
                            cds: student.COD_DEGREE,
                        };
                        resolve(customStudentObject);
                    } else {
                        return prisma.secretaryClerk.findUnique({
                            where: {
                                id: userID,
                            },
                        });
                    }
                })
                .then((secretaryClerk) => {
                    console.log(secretaryClerk);
                    if (secretaryClerk) {
                        const customSecretaryClerkObject = {
                            id: secretaryClerk.id,
                            name: `${secretaryClerk.name} ${secretaryClerk.surname}`,
                            role: "secretary",
                            email: secretaryClerk.email,
                        };
                        resolve(customSecretaryClerkObject);
                    } else {
                        return prisma.coSupervisor.findUnique({
                            where: {
                                id: userID,
                            },
                            include: {
                                teacher: true,
                                proposal: true,
                            },
                        });
                    }
                })
                .then((coSupervisor) => {
                    console.log("ciaoooooooooooooooooooooooooooooooooooooooooo");
                    console.log(coSupervisor);
                    if (coSupervisor) {
                        const customCoSupervisorObject = {
                            id: coSupervisor.id,
                            name: `${coSupervisor.name} ${coSupervisor.surname}`,
                            role: "coSupervisor",
                            email: coSupervisor.email,
                            teacher: coSupervisor.teacher,
                            proposal: coSupervisor.proposal,
                        };
                        resolve(customCoSupervisorObject);
                    } else {
                        throw new Error('User not found');
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
};
