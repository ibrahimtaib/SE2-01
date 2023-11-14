const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const tokenMiddleware = require("../middleware/token");
router.use("/login", authRouter);
router.use("*", tokenMiddleware.verifyToken);
router.use("/teachers*", tokenMiddleware.verifyTeacher);
router.use("/students*", tokenMiddleware.verifyStudent);

// You can test this
// router.get("/teachers/", (req, res) => {
//   res.send("Hello from teachers");
// });

// router.get("/students/", (req, res) => {
//   res.send("Hello from students");
// });

// Status 404 if the route is not found
router.use("*", (req, res) => [res.status(404).send("Endpoint not found")]);
module.exports = router;
