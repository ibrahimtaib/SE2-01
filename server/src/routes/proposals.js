const express = require("express");
const router = express.Router({ mergeParams: true });
const proposalsController = require("../controllers/proposals");

router.post("/", async (req, res) => {
  try {
    const proposal = await proposalsController.createProposal(req.body);
    res.status(200).json(proposal);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.get("/cds", async (req, res) => {
  try {
    const cdsList = await proposalsController.getAllCds();
    res.status(200).json(cdsList);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.get("/types", async (req, res) => {
  try {
    const typeList = await proposalsController.getAllTypes();
    res.status(200).json(typeList);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.get("/levels", async (req, res) => {
  try {
    const levelList = await proposalsController.getAllLevels();
    res.status(200).json(levelList);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const proposals = await proposalsController.getProposals();
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.get("/archiveExpiredProposals", async (req, res) => {
  try {
    const dueDate = new Date();
    const updatedProposals = await proposalsController.archiveExpiredProposals(dueDate);
    res.status(200).json(updatedProposals);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.get("/archiveProposal/:id", async (req, res) => {
  try {
    id = req.params.id;
    console.log(id);
    const updatedProposal = await proposalsController.archiveProposal(id);
    res.status(200).json(updatedProposal);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.get("/title/:searchString", async (req, res) => {
  const searchString = req.params.searchString;

  try {
    const proposals = await proposalsController.getProposalsByTitle(
      searchString
    );
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/cosupervisor/:cosupervisors", async (req, res) => {
  const cosupervisors = req.params.cosupervisors;

  try {
    const proposals = await proposalsController.getProposalsByCosupervisor(
      cosupervisors
    );
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/supervisor/:nameOrSurname", async (req, res) => {
  const nameOrSurname = req.params.nameOrSurname;

  try {
    const proposals = await proposalsController.getProposalsBySupervisor(
      nameOrSurname
    );
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/keywords/:keywords", async (req, res) => {
  const keywords = req.params.keywords;
  try {
    const proposals = await proposalsController.getProposalsByKeywords(
      keywords
    );
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/groups/:groups", async (req, res) => {
  const groups = req.params.groups;
  try {
    const proposals = await proposalsController.getProposalsByGroups(groups);
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/type/:type", async (req, res) => {
  const type = req.params.type;

  try {
    const proposals = await proposalsController.getProposalsByType(type);
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/expiration/:date", async (req, res) => {
  const date = req.params.date;

  try {
    const proposals = await proposalsController.getProposalsByExpirationDate(
      date
    );
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/level/:level", async (req, res) => {
  const level = req.params.level;

  try {
    const proposals = await proposalsController.getProposalsByLevel(level);
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/cds/:cds", async (req, res) => {
  const cds = req.params.cds;
  try {
    const proposals = await proposalsController.getProposalsByCDS(cds);
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/teacher/:teacherId", async (req, res) => {
  const teacherId = req.params.teacherId;

  try {
    const proposals = await proposalsController.getTeacherProposals(teacherId);
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/cosupervisor/:cosupervisorId", async (req, res) => {
  const cosupervisorId = req.params.cosupervisorId;
  try {
    const proposals = await proposalsController.getCoSupervisorProposals(cosupervisorId);
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/filter", async (req, res) => {
  const filters = req.body.filters;
  try {
    const filteredProposals = await proposalsController.filterProposals(
      filters
    );
    res.status(200).json(filteredProposals);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//update proposals
router.post("/update", async (req, res) => {
  proposalsController
    .updateProposal(req.body)
    .then((proposal) => {
      res.status(200).json(proposal);
    })
    .catch((error) => res.status(500).json(error));
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    res.status(400).json({ status: 400, error: "Wrong Id format" });
    return;
  }
  proposalsController
    .deleteProposal(+id)
    .then((message) => res.status(message.status).json(message))
    .catch((error) => res.status(error.status).json(error));
});

module.exports = router;
