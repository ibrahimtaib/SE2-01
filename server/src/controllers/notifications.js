const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
});

module.exports = {
    sendMail :async (proposalTitle, student, teacher, action) => { 
        const subject = action === 'accept' ? 'Congratulations your Application has been Accepted' : 
        ' We are sorry your application has been  Rejected';

        const text = `Hello ${student.name} ${student.surname}, 
        this is a notification email following your application for the proposal:  ${proposalTitle}
        after the evaluation of the Mr ${teacher.name} ${teacher.surname} you have been ${action}ed.
        we invite you to check the platform for further details.
        Best Regards,
        `
        ;

        const email = 'jaouadouchaib2@gmail.com'

        const mailOptions = {
            from: teacher.email,
            to: email, //TODO : student.email need to be added to mailgin authorized recipients,
            subject,
            text: text,
        }
        console.log("transporter", transporter);
        return new Promise((resolve, reject) =>{
            transporter.sendMail(mailOptions)
            .then((info) => {
                resolve(info)
                console.log('Email sent: ' + info.response);
            })
            .catch((error)=>{
                console.error(error);
                return reject({error});
            });
        })
    }

}
