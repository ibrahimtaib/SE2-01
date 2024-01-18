const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
      user: 'postmaster@sandbox27ac996dd16049d48cfeb9423a86bbe0.mailgun.org',
      pass: '3965701e0417a66d8dc760d72b68334a-5d2b1caa-fd7df0ce',
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
