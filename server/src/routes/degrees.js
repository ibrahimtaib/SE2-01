const degreesController = require("../controllers/degrees");
const express = require("express");
const router = express.Router({ mergeParams: true });


router.get("/", async (req, res) => {
  try {
    const degrees = await degreesController.getDegrees();
    res.status(200).json(degrees);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;