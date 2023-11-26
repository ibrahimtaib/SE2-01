const prisma = require('./prisma');

module.exports = {
    /**
     * Check if user is in the database and return a user object to the front-end
     * @param {string} userID
     * @returns {Promise<object>} customObject
     */
    checkUser: (userID) => {
        return new Promise((resolve, reject) => {
            console.log(userID);

            prisma.teacher
                .findUnique({
                    where: {
                        id: userID,
                    },
                })
                .then((teacher) => {
                    console.log(teacher);
                    if (teacher) {
                        const customTeacherObject = {
                            id: teacher.id,
                            name: `${teacher.name} ${teacher.surname}`,
                            role: "teacher",
                            email: teacher.email,
                        };
                        console.log(customTeacherObject);
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
                    console.log(student);
                    if (student) {
                        const customStudentObject = {
                            id: student.id,
                            name: `${student.name} ${student.surname}`,
                            role: "student",
                            email: student.email,
                        };
                        console.log(customStudentObject);
                        resolve(customStudentObject);
                    } else {
                        throw new Error('User not found');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    reject(error);
                });
        });
    },
};
