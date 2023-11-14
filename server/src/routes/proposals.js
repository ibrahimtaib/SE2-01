const express = require("express");
const router = express.Router({ mergeParams: true });
const proposalsController = require("../controllers/proposals");

router.get("/cds", async (req, res) => {
  proposalsController
    .getAllCds()
    .then((cdsList) => {
      res.status(200).json(cdsList);
    })
    .catch((error) => res.status(500).json(error));
});

router.get("/", async (req, res) => {
  proposalsController
    .getProposals()
    .then((proposals) => {
      res.status(200).json(proposals);
    })
    .catch((error) => res.status(500).json(error));
});

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

router.get("/cosupervisor/:surname", async (req, res) => {
  const surname = req.params.surname;

  try {
    const proposals = await proposalsController.getProposalsByCosupervisor(surname);
    res.status(200).json(proposals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/supervisor/:surname", async (req, res) => {
  const surname = req.params.surname;

  try {
    const proposals = await proposalsController.getProposalsBySupervisor(surname);
    res.status(200).json(proposals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/keywords/:keywords", async (req, res) => {
  const keywords = req.params.keywords;
  try {
    const proposals = await proposalsController.getProposalsByKeywords(keywords);
    res.status(200).json(proposals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/groups/:groups", async (req, res) => {
  const groups = req.params.groups;
  try {
    const proposals = await proposalsController.getProposalsByGroups(groups);
    res.status(200).json(proposals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/type/:type", async (req, res) => {
  const type = req.params.type;

  try {
    const proposals = await proposalsController.getProposalsByType(type);
    res.status(200).json(proposals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/expiration/:date", async (req, res) => {
  const date = req.params.date;

  try {
    const proposals = await proposalsController.getProposalsByExpirationDate(date);
    res.status(200).json(proposals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/level/:level", async (req, res) => {
  const level = req.params.level;

  try {
    const proposals = await proposalsController.getProposalsByLevel(level);
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

  router.get("/filter", async (req, res) => {
    const filters = req.body.filters; 

    try {
      const filteredProposals = await proposalsController.filterProposals(filters);
      res.status(200).json(filteredProposals);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  



module.exports = router;