const express = require("express");
const router = express.Router();
const proposalsRouter = require("./proposals")

router.use('/proposals', proposalsRouter)
// Status 404 if the route is not found
router.use("*", (req, res) => [res.status(404).send("Endpoint not found")]);
module.exports = router;
