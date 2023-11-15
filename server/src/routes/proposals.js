const proposalsController = require("../controllers/proposals");
const express = require("express");
const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
  proposalsController
    .createProposal(req.body)
    .then((proposal) => {
      res.status(200).json(proposal);
    })
    .catch((error) => res.status(500).json(error));
});

router.get("/", async (req, res) => {
  proposalsController
    .getProposals()
    .then((proposals) => {
      res.status(200).json(proposals);
    })
    .catch((error) => res.status(500).json(error));
});

module.exports = router;