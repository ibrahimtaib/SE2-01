const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const prisma = require("../controllers/prisma");

/**
 * Middleware that verifies if the access token is valid.
 * @date 2023-11-14
 * @param {any} req  Incoming request
 * @param {any} res  Outgoing response
 * @param {any} next Next middleware
 * @returns {any}
 */
export function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  const secretKey = dotenv("SECRET_KEY");
  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);

    // If verification is successful, return the decoded user information
    next();
  } catch (error) {
    // If verification fails, return an error message
    res.status(401).send({
      message: "Unauthorized!",
    });
  }
}

/**
 * Middleware that verifies if the access token is associated to a
 * student account. Does not check if token is valid.
 * @date 2023-11-14
 * @param {any} req  Incoming request
 * @param {any} res  Outgoing response
 * @param {any} next Next middleware
 * @returns {any}
 */
export async function verifyStudent(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  const student = await prisma.student.findUnique({
    where: {
      id: token.id,
    },
  });
  if (!student) {
    return res.status(401).send({
      message: "Unauthorized!",
    });
  }
  req.student = student;
  next();
}

/**
 * Middleware that verifies if the access token is associated to a
 * teacher account. Does not check if token is valid.
 * @date 2023-11-14
 * @param {any} req  Incoming request
 * @param {any} res  Outgoing response
 * @param {any} next Next middleware
 * @returns {any}
 */
export async function verifyTeacher(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  const teacher = await prisma.teacher.findUnique({
    where: {
      id: token.id,
    },
  });
  if (!teacher) {
    return res.status(401).send({
      message: "Unauthorized!",
    });
  }
  req.teacher = teacher;
  next();
}
