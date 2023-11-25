const express = require("express");
const router = express.Router({ mergeParams: true });
const applicationsController = require("../controllers/applications.js");
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

  if (isNaN(PROPOSAL_ID) || isNaN(STUDENT_ID)) {
    return res.status(400).json({
      error: "Invalid proposal or student id",
    });
  }
  applicationController
    .getStudentApplication({
      PROPOSAL_ID: +PROPOSAL_ID,
      STUDENT_ID: +STUDENT_ID,
    })
    .then((applications) => {
      res.status(200).json(applications);
    })
    .catch((error) => {
      console.error(error);
      res.status(error?.status !== undefined ? error.status : 500).json(error);
    });
});

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

router.post("/accept-application/:applicationId", async (req, res) => {
  const applicationId = req.params.applicationId;

  try {
    const result = await applicationsController.acceptApplication(applicationId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/refuse-application/:applicationId", async (req, res) => {
  const applicationId = req.params.applicationId;

  try {
    const result = await applicationsController.refuseApplication(applicationId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-proposal-id/:applicationId", async (req, res) => {
  const applicationId = req.params.applicationId;

  try {
    const proposalId = await applicationsController.getProposalIdByApplicationId(applicationId);
    res.status(200).json({ proposalId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/reject-waiting-applications/:proposalId", async (req, res) => {
  const proposalId = req.params.proposalId;

  try {
    const result = await applicationsController.rejectWaitingApplicationsByProposalId(proposalId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
