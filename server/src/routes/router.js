const express = require("express");
const router = express.Router();
const teachersRouter = require('./teachers');
const degreesRouter = require('./degrees')
const proposalsRouter = require("./proposals")
const applicationsRouter = require("./applications")
const authRouter = require("./auth.js")
const secretariesRouter = require("./secreatries.js");

const notificationsRouter = require("./notifications");

// Status 404 if the route is not found

router.use('/proposals', proposalsRouter)
router.use('/teachers', teachersRouter)
router.use('/degrees', degreesRouter)
router.use('/applications', applicationsRouter)
router.use('/', authRouter)
router.use("/notifications", notificationsRouter);
router.use("/secretaries", secretariesRouter);
router.use("*", (req, res) => [res.status(404).send("Endpoint not found")]);
module.exports = router;
