const teachersController = require("../controllers/teachers");
const express = require("express");
const router = express.Router({ mergeParams: true });


router.get("/", async (req, res) => {
  teachersController
    .getTeachers()
    .then((teachers) => {
      res.status(200).json(teachers);
    })
    .catch((error) => res.status(500).json(error));
});

module.exports = router;