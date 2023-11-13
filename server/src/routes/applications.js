const express = require("express");
const router = express.Router({ mergeParams: true });
const proposalsController = require("../controllers/applications");

router.get("/applications/:teacherId", async (req, res) => {
  const teacherId = req.params.teacherId;

  try {
    const applications = await proposalsController.getApplicationsByTeacherId(teacherId);
    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
