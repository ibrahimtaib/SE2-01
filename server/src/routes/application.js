const applicationController = require("../controllers/application.js");
const express = require("express");
const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
  applicationController
    .createApplication(req.body)
    .then((application) => {
      res.status(200).json(application);
    })
    .catch((error) => {
      console.error(error);
      res.status(error?.status !== undefined ? error.status : 500).json(error);
    });
});
router.get("/:proposalId", async (req, res) => {
  applicationController
    .getApplicationsByProposalId({
      PROPOSAL_ID: req.params.proposalId,
      STUDENT_ID: req.body.STUDENT_ID,
    })
    .then((applications) => {
      res.status(200).json(applications);
    })
    .catch((error) => {
      console.error(error);
      res.status(error?.status !== undefined ? error.status : 500).json(error);
    });
});
module.exports = router;
