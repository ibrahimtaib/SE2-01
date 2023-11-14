const express = require("express");
const router = express.Router();
const proposalsRouter = require("./proposals")
const applicationsRouter = require("./applications")


// Status 404 if the route is not found


router.use('/proposals', proposalsRouter)
router.use('/applications', applicationsRouter)
router.use("*", (req, res) => [res.status(404).send("Endpoint not found")]);
module.exports = router;
