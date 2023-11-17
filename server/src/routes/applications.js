const express = require("express");
const router = express.Router({ mergeParams: true });
const proposalsApplication = require("../controllers/applications");
const applicationController = require("../controllers/application.js");


router.post("/", async (req, res) => {
  console.log("QUI");
  applicationController
    .createApplication(req.body)
    .then((application) => {
      console.log("QUA");
      res.status(200).json(application);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

router.get("/:teacherId/", async (req, res) => {
  const teacherId = req.params.teacherId;

  try {
    const applications = await proposalsApplication.getApplicationsStudentsProposalsDegreesByTeacherId(teacherId);
    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/proposal/:proposalId", async (req, res) => {
  const proposalId = req.params.proposalId;

  try {
    const proposal = await proposalsApplication.getProposalById(proposalId);
    res.status(200).json(proposal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/student/:studentId", async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const student = await proposalsApplication.getStudentById(studentId);
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
