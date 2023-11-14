const prisma = require("../controllers/prisma");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const SECRET_KEY = dotenv("SECRET_KEY");
module.exports = {
  /**
   * Function that generates a token for a user. If the user is neither a student nor a teacher, returns null.
   * @date 2023-11-14
   * @param {String} email
   * @param {Number} id
   * @returns {String | null}
   */
  generateToken: async (email, id) => {
    // Verify if it's a student account
    const student = await prisma.student.findUnique({
      where: {
        id: id,
        email: email,
      },
    });
    if (!student) {
      // Verify if it's a teacher account
      const teacher = await prisma.teacher.findUnique({
        where: {
          id: id,
          email: email,
        },
      });
      if (!teacher) {
        return null;
      }
      const token = jwt.sign(teacher, SECRET_KEY, {
        expiresIn: 86400, // 24 hours
      });
      return token;
    }
    const token = jwt.sign(student, SECRET_KEY, {
      expiresIn: 86400, // 24 hours
    });
    return token;
  },
};
