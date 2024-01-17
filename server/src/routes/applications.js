const express = require("express");
const router = express.Router({ mergeParams: true });
const applicationsController = require("../controllers/applications.js");
const applicationController = require("../controllers/application.js");

//TODO: This should be in application, we need to clarify about name of the files and we should make javadocs
router.post("/", async (req, res) => {
  const { PROPOSAL_ID, STUDENT_ID, comment } = req.body;

  if (isNaN(PROPOSAL_ID)) {
    return res.status(400).json({
      error: "Invalid proposal id",
    });
  }

  applicationController
    .createApplication({ PROPOSAL_ID, STUDENT_ID: "" + STUDENT_ID , comment })
    .then((application) => {
      res.status(200).json(application);
    })
    .catch((error) => {
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
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//for the clerk gettin all pending applications
router.get("/clerk/applications", async (req, res) => {
  const PROPOSAL_ID = req.params.proposalId;
  const STUDENT_ID = req.params.studentId;
  applicationController
    .getAllPendingApplications({
    })
    .then((applications) => {
      res.status(200).json(applications);
    })
    .catch((error) => {
      res.status(error?.status !== undefined ? error.status : 500).json(error);
    });
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
      res.status(error?.status !== undefined ? error.status : 500).json(error);
    });
});
router.get("/decisions/:studentId/", async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const applications = await applicationsController.getApplicationsDecisionsByStudentId(studentId);
    res.status(200).json(applications);
  } catch (error) {
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
      res.status(error?.status !== undefined ? error.status : 500).json(error);
    });
});

router.get("/proposal/:proposalId", async (req, res) => {
  const proposalId = req.params.proposalId;

  try {
    const proposal = await applicationsController.getProposalById(proposalId);
    res.status(200).json(proposal);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/student/:studentId", async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const student = await applicationsController.getStudentById(studentId);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/cancel-by-proposal/:proposalId", async (req, res) => {
  const proposalId = req.params.proposalId;

  try {
    const canceledApplications = await applicationsController.cancelApplicationsByProposalId(proposalId);
    res.status(200).json(canceledApplications);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/accept-application/:applicationId", async (req, res) => {
  const applicationId = req.params.applicationId;

  try {
    const result = await applicationsController.acceptApplication(applicationId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/refuse-application/:applicationId", async (req, res) => {
  const applicationId = req.params.applicationId;

  try {
    const result = await applicationsController.refuseApplication(applicationId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-proposal-id/:applicationId", async (req, res) => {
  const applicationId = req.params.applicationId;

  try {
    const proposalId = await applicationsController.getProposalIdByApplicationId(applicationId);
    res.status(200).json({ proposalId });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/reject-waiting-applications/:proposalId", async (req, res) => {
  const proposalId = req.params.proposalId;

  try {
    const result = await applicationsController.rejectWaitingApplicationsByProposalId(proposalId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/decisions/:studentId", async (req, res) => {
  const studentId = req.params.studentId;
  try {
    const applications = await applicationsController.getApplicationsDecisionsByStudentId(studentId);
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/requestedThesis/:studentId", async (req, res) => {
  const studentId = req.params.studentId;
  try {
    const applications = await applicationsController.getThesisRequestByStudentId(studentId);
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/newThesisRequest", async (req, res) => {
  const teacherId = req.body.teacher;
  const {teacher,...data} = req.body;

  try {
    const result = await applicationsController.submitNewThesisRequest({...data, teacherId, status: "pending"});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/applicationsCount/:studentId', async (req, res) => {
  const studentId = req.params.studentId;
  try {
    const applicationsCount = await applicationsController.getApplicationsCountByStudentId(studentId);
    res.status(200).json({ applicationsCount });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
