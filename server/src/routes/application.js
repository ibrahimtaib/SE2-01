const proposalsController = require("../controllers/applications");
const express = require("express");
const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
  applicationController
    .createProposal(req.body)
    .then((proposal) => {
      res.status(200).json(application);
    })
    .catch((error) => res.status(500).json(error));
});

module.exports = router;