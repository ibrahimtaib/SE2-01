const coursesController = require("../controllers/proposals");
const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  coursesController
    .getCourses()
    .then((courses) => {
      res.status(200).json(courses);
    })
    .catch((error) => res.status(500).json(error));
});

module.exports = router;