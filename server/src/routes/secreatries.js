const secretariesController = require("../controllers/secreataries");
const express = require("express");
const router = express.Router({ mergeParams: true });


router.get("/", async (req, res) => {
    secretariesController
    .getSecretaries()
    .then((secretaries) => {
      res.status(200).json(secretaries);
    })
    .catch((error) => res.status(500).json(error));
});

router.get("/:id", async (req, res) => {
    secretariesController
    .getSecretariesById(parseInt(req.params.id))
    .then((secretary) => {
      res.status(200).json(secretary);
    })
    .catch((error) => res.status(500).json(error));
});

module.exports = router;