const thesisRequestsController = require("../controllers/thesisRequests");
const express = require("express");
const router = express.Router({ mergeParams: true });


router.get("/", async (req, res) => {
    thesisRequestsController
    .getThesisRequests()
    .then((ThesisRequests) => {
      res.status(200).json(ThesisRequests);
    })
    .catch((error) => res.status(500).json(error));
});

router.get("/pending", async (req, res) => {
    thesisRequestsController
    .getPendingThesisRequests()
    .then((secretaries) => {
      res.status(200).json(secretaries);
    })
    .catch((error) => res.status(500).json(error));
});

router.get("/secretary-accepted", async (req, res) => {
  thesisRequestsController
  .getSecretaryAcceptedThesisRequests()
  .then((secretaries) => {
    res.status(200).json(secretaries);
  })
  .catch((error) => res.status(500).json(error));
});

router.get("/teacher/:id", async (req, res) => {
  thesisRequestsController
  .getThesisRequestsByTeacherId(req.params.id)
  .then((secretaries) => {
    res.status(200).json(secretaries);
  })
  .catch((error) => res.status(500).json(error));
});

router.get("/secretary-rejected", async (req, res) => {
  thesisRequestsController
  .getSecretaryRejectedThesisRequests()
  .then((secretaries) => {
    res.status(200).json(secretaries);
  })
  .catch((error) => res.status(500).json(error));
});

router.get("/:id", async (req, res) => {
    thesisRequestsController
    .getThesisRequestsById(parseInt(req.params.id))
    .then((secretary) => {
      res.status(200).json(secretary);
    })
    .catch((error) => res.status(500).json(error));
});

router.put("/secretary/:action/:id", async (req, res) => {
  if (req.params.action !== "accept" && req.params.action !== "reject") return res.status(500).json({error: "Invalid action"});
    thesisRequestsController
    .actionOnThesisRequestBySecretary(req.params.action, parseInt(req.params.id))
    .then((request) => {
      res.status(200).json(request);
    })
    .catch((error) => res.status(500).json(error));
  
});

router.put("/teacher/:action/:id", async (req, res) => {
  if (req.params.action !== "accept" && req.params.action !== "reject") return res.status(500).json({error: "Invalid action"});
  thesisRequestsController
  .actionOnThesisRequestByTeacher(req.params.action, parseInt(req.params.id))
  .then((secretary) => {
    res.status(200).json(secretary);
  })
  .catch((error) => res.status(500).json(error));
});

module.exports = router;