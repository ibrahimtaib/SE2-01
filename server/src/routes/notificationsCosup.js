const express = require("express");
const router = express.Router({ mergeParams: true });
const notificationsController = require("../controllers/notifications");

router.post('/send-email', (req, res) => {
    const {proposalTitle, student, teacher,action} = req.body;

    const subject = action === 'accept' ? 'Congratulations your Application has been Accepted' : 
        action === 'reject' ? 'We are sorry your application has been Rejected' :
        action === 'request-reject' ? 'We are sorry your Thesis Request has been Rejected' :
        action === 'request-accept' ? 'Congratulations your Thesis Request has been Accepted' :
        action === 'request' ? 'New Thesis request has been submitted with you as a supervisor' :
        action === 'expiration-week' ? 'Notification about expiring proposal' :
        'New Application for your proposal has been submitted';

    const emailText = action == 'apply'? 
    `Hello ${teacher.name} ${teacher.surname},
this is a notification email to inform you that an new application has been submitted for you proposal:  ${proposalTitle}
by the student ${student.name} ${student.surname},
we invite you to check the platform for further details.
Best Regards,`

    : action == 'expiration-week' 
    ? `Hello,
this is a notification email to inform you that the following proposal is expiring in a week:  ${proposalTitle}
we invite you to check the platform for further details.
Best Regards,`

    : action == 'request-accept' || action == 'request-reject'
    ? `Hello, 
this is a notification email following the Thesis Request Titled:  ${proposalTitle}
after the evaluation of the Mr ${teacher.name} ${teacher.surname} the  request has been ${action.split('-')[1]}ed.
we invite you to check the platform for further details.
Best Regards,`

    : action == 'request-accept' || action == 'request-reject'
    ? `Hello, 
this is a notification email following the Thesis Request Titled:  ${proposalTitle}
after the evaluation of the Mr ${teacher.name} ${teacher.surname} the  request has been ${action.split('-')[1]}ed.
we invite you to check the platform for further details.
Best Regards,`

    : action == 'request'
    ? `Hello ${teacher.name} ${teacher.surname},
this is a notification email to inform you that an new theis request titled :  ${proposalTitle} has been submitted with you as a supervisor
by the student ${student.name} ${student.surname},
we invite you to check the platform for further details.
Best Regards,`

    : `Hello ${student.name} ${student.surname}, 
this is a notification email following your application for the proposal:  ${proposalTitle}
after the evaluation of the Mr ${teacher.name} ${teacher.surname} you have been ${action}ed.
we invite you to check the platform for further details.
Best Regards,`;

    const toEmail = 's309075@studenti.polito.it'
    const fromEmail = "Thesis-Manager@polito.it";

    const mailOptions = {
        from: fromEmail,
        to: toEmail, //TODO : student.email need to be added to mailgin authorized recipients,
        subject,
        text: emailText,
    }

    notificationsController.sendMail(mailOptions)
    .then((info)=> {
        console.log("Email sent successfully To:", toEmail)
        console.log("With Subject:", subject)
        console.log("And the following text:", emailText)
        res.status(200).json({message :'Email sent successfully', info: info.response})
    })
    .catch((error)=> {
        res.status(200).json({
        message :`Internal Server Error while sanding email to : ${toEmail}`,
        error: error
        })
        console.log("Error while sanding email to:", toEmail);
    })
})

module.exports = router;
