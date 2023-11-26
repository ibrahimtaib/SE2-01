const express = require("express");
const router = express.Router({ mergeParams: true });
const applicationsController = require("../controllers/applications.js");
const applicationController = require("../controllers/application.js");

//TODO: This should be in application, we need to clarify about name of the files and we should make javadocs
router.post("/", async (req, res) => {
  const { PROPOSAL_ID, STUDENT_ID } = req.body;

  console.log(PROPOSAL_ID);
  if (isNaN(PROPOSAL_ID)) {
    return res.status(400).json({
      error: "Invalid proposal id",
    });
  }

  applicationController
    .createApplication({ PROPOSAL_ID, STUDENT_ID: "" + STUDENT_ID })
    .then((application) => {
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
    const applications =
      await applicationsController.getApplicationsStudentsProposalsDegreesByTeacherId(
        teacherId
      );
    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/proposal/:proposalId/student/:studentId", async (req, res) => {
  const PROPOSAL_ID = req.params.proposalId;
  const STUDENT_ID = req.params.studentId;

  if (isNaN(PROPOSAL_ID)) {
    return res.status(400).json({
      error: "Invalid proposal id",
    });
  }
  applicationController
    .getStudentApplication({
      PROPOSAL_ID: +PROPOSAL_ID,
      STUDENT_ID: STUDENT_ID,
    })
    .then((applications) => {
      res.status(200).json(applications);
    })
    .catch((error) => {
      console.error(error);
      res.status(error?.status !== undefined ? error.status : 500).json(error);
    });
});

module.exports = router;

router.get("/proposal/:proposalId", async (req, res) => {
  const proposalId = req.params.proposalId;

  try {
    const proposal = await applicationsController.getProposalById(proposalId);
    res.status(200).json(proposal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/student/:studentId", async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const student = await applicationsController.getStudentById(studentId);
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
