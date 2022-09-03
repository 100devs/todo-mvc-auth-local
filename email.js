const cron = require("node-cron");
const nodemailer = require("nodemailer");
module.exports = {
    cronJob: () => {
       // schedule testing
        cron.schedule("*/10 * * * * *", () => {
            console.log("Saying hello from the cronjob")
        });

        // changed cron schedule so it will send email at midnight every day.
        cron.schedule("0 10 12 * * *", () => {
            sendMail();
            console.log("Mail sent.");
        })
    }
}

// sources:

// https://www.geeksforgeeks.org/how-to-run-cron-jobs-in-node-js/
// for after may 30, 2022:
// https://stackoverflow.com/questions/71477637/nodemailer-and-gmail-after-may-30-2022
// https://nodemailer.com/smtp/oauth2/
// https://stackoverflow.com/questions/59388041/how-to-write-cronjobs-in-seperate-file-nodejs
// 
function sendMail() {
    transporter = nodemailer.createTransport({
        service: 'OUTLOOK365',
        port:587,
        secure:false,
        auth:{
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        }
    })
    transporter.verify(function (error, success) {
        if (error) {
        console.log(error);
        } else {
        console.log("Server is ready to take our messages");
        }
    });
    let mailDetails = {
        from: "Node Mailer Test",
        to: process.env.DESTINATION_EMAIL, // change this to be the user email later.
        subject: "Test email using Cron Job",
        text: "Node.js cron job email" + "testing for 100Devs"
    };
    transporter.sendMail(mailDetails, (err, data) => {
        if(err) {
        console.log("An Error occurred. ", err)
        } else {
        consoel.log("Email sent successfully.")
        }
    })    
}