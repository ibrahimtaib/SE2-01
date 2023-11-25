const express = require('express');
const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
      user: 'postmaster@sandbox27ac996dd16049d48cfeb9423a86bbe0.mailgun.org',
      pass: '2798cb164ecad8fa3b14c5697fee5933-5d2b1caa-a544d6bf',
    },
});

module.exports = {
    sendMail :async (mailOptions) => { 
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
