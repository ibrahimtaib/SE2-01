const virtualClockController = require("../controllers/virtualClock");
const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  let virtualClock = virtualClockController.getVirtualClock();
  console.log(virtualClock);
  res.status(200).json(virtualClock);
});

router.post("/", async (req, res) => {
  const { newDate } = req.body;
  let virtualClock = virtualClockController.setVirtualClock(new Date(newDate));
  res.status(200).json(virtualClock);
});

router.delete("/", async (req, res) => {
  let virtualClock = virtualClockController.resetVirtualClock();
  res.status(200).json("Virtual clock reset");
});

module.exports = router;
