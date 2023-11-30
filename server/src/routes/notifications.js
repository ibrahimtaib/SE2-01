const express = require("express");
const router = express.Router({ mergeParams: true });
const notificationsController = require("../controllers/notifications");

router.post('/send-email', (req, res) => {
    // TODO: get email options from request body
    console.log("send-email request recieved ----", req.body);
    const {applicationId, student, action} = req.body;

    notificationsController.sendMail(applicationId, student, action)
    .then((info)=> res.status(200).send('Email sent successfully'))
    .catch((error)=> res.status(500).json({
        message :`Internal Server Error while sanding email to : ${'jaouadouchaib2@gmail.com'}`,
        error: error
    }))
})

module.exports = router;
