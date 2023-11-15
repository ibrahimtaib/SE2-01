const applicationController = require("../controllers/application.js");
const express = require("express");
const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
  console.log("QUI");
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

module.exports = router;
