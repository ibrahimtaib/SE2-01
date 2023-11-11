const express = require("express");
const router = express.Router({ mergeParams: true });
const proposalsController = require("../controllers/proposals");

router.get("/title/:searchString", async (req, res) => {
  const searchString = req.params.searchString;

  try {
    const proposals = await proposalsController.getProposalsByTitle(searchString);
    res.status(200).json(proposals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/cds/:cds", async (req, res) => {
    const cds = req.params.cds;
 
    try {
      const proposals = await proposalsController.getProposalsByCDS(cds);
      res.status(200).json(proposals);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;