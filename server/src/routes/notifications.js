const express = require("express");
const router = express.Router({ mergeParams: true });
const notificationsController = require("../controllers/notifications");

router.post('/send-email', (req, res) => {
    // TODO: get email options from request body

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: 's306971@studenti.polito.it',
      subject: 'Notification Subject',
      text: 'Hello, this is a notification email.',
    }
    notificationsController.sendMail(mailOptions)
    .then((info)=> res.status(200).send('Email sent successfully'))
    .catch((error)=> res.status(500).json({
        message :`Internal Server Error while sanding email to : ${mailOptions.to}`,
        error: error
    }))
})

module.exports = router;
