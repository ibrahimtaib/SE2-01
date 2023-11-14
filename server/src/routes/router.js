const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const middleware = require("../middleware");
router.use("/login", authRouter);
router.use("*", middleware.verifyToken);
router.use("/teachers/*", middleware.verifyTeacher);
router.use("/students/*", middleware.verifyStudent);
// Status 404 if the route is not found
router.use("*", (req, res) => [res.status(404).send("Endpoint not found")]);
module.exports = router;
