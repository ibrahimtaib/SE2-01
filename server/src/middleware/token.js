const jwt = require("jsonwebtoken");
require("dotenv").config();
const prisma = require("../controllers/prisma");

module.exports = {
  /**
   * Middleware that verifies if the access token is valid.
   * @date 2023-11-14
   * @param {any} req  Incoming request
   * @param {any} res  Outgoing response
   * @param {any} next Next middleware
   * @returns {any}
   */
  verifyToken: (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      // If verification is successful, return the decoded user information
      next();
    } catch (error) {
      console.log(error);
      // If verification fails, return an error message
      res.status(401).send({
        message: "Unauthorized!",
      });
    }
  },

  /**
   * Middleware that verifies if the access token is associated to a
   * student account. Does not check if token is valid.
   * @date 2023-11-14
   * @param {any} req  Incoming request
   * @param {any} res  Outgoing response
   * @param {any} next Next middleware
   * @returns {any}
   */
  verifyStudent: async function (req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const student = await prisma.student.findUnique({
      where: {
        id: decoded.id,
      },
    });
    if (!student) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.student = student;
    next();
  },

  /**
   * Middleware that verifies if the access token is associated to a
   * teacher account. Does not check if token is valid.
   * @date 2023-11-14
   * @param {any} req  Incoming request
   * @param {any} res  Outgoing response
   * @param {any} next Next middleware
   * @returns {any}
   */
  verifyTeacher: async function (req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const teacher = await prisma.teacher.findUnique({
      where: {
        id: decoded.id,
      },
    });
    if (!teacher) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.teacher = teacher;
    next();
  },
};
