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
    sendMail :async (mailOptions) => { 
    
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
