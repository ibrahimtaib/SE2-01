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
    
        return new Promise((resolve, reject) =>{
            transporter.sendMail(mailOptions)
            .then((info) => {
                resolve(info)
            })
            .catch((error)=>{
                return reject({error});
            });
        })
    }

}
