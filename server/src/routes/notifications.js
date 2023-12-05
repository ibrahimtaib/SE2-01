const express = require("express");
const router = express.Router({ mergeParams: true });
const notificationsController = require("../controllers/notifications");

router.post('/send-email', (req, res) => {
    const {proposalTitle, student, teacher,action} = req.body;

    const subject = action === 'accept' ? 'Congratulations your Application has been Accepted' : 
        action === 'reject' ? 'We are sorry your application has been Rejected' :
        'New Application for your proposal has been submitted';

    const text = action == 'apply'? 
    `Hello ${teacher.name} ${teacher.surname},
this is a notification email to inform you that an new application has been submitted for you proposal:  ${proposalTitle}
by the student ${student.name} ${student.surname},
we invite you to check the platform for further details.
Best Regards,`
    :
    `Hello ${student.name} ${student.surname}, 
this is a notification email following your application for the proposal:  ${proposalTitle}
after the evaluation of the Mr ${teacher.name} ${teacher.surname} you have been ${action}ed.
 we invite you to check the platform for further details.
Best Regards,`;

    const toEmail = 'jaouadouchaib2@gmail.com'
    const fromEmail = action === 'apply'? "Thesis-Manager@polito.it" : teacher.email;

    const mailOptions = {
        from: fromEmail,
        to: toEmail, //TODO : student.email need to be added to mailgin authorized recipients,
        subject,
        text: text,
    }

    notificationsController.sendMail(mailOptions)
    .then((info)=> res.status(200).json({message :'Email sent successfully', info: info.response}))
    .catch((error)=> res.status(500).json({
        message :`Internal Server Error while sanding email to : ${'jaouadouchaib2@gmail.com'}`,
        error: error
    }))
})

module.exports = router;
