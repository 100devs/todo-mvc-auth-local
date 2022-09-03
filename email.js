const cron = require("node-cron");
const nodemailer = require("nodemailer"); // node mailer 

const mongoose = require('mongoose')
const User = require('./models/User')


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
// https://www.youtube.com/watch?v=-rcRf7yswfM
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
        console.log("Email sent successfully.")
        }
    })    
}

// to use gmail services, go to https://console.cloud.google.com/getting-started?pli=1
const {google} = require('googleapis');
const CLIENT_ID = process.env.GMAIL_NODEMAILER_CLIENT_ID
const CLIENT_SECRET = process.env.GMAIL_NODEMAILER_CLIENT_SECRET
const REDIRECT_URI = process.env.GMAIL_NODEMAILER_REDIRECT_URI
const REFRESH_TOKEN = process.env.GMAIL_NODEMAILER_REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,  CLIENT_SECRET,  REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: process.env.GMAIL_NODEMAILER_REFRESH_TOKEN})

async function sendGmail() {
    // only require googleapis when you use sendGmail();
    
    try {
        
        const accessToken = await oAuth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            type: 'Oauth2',
            user: process.env.GMAIL_NODEMAILER_USER,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
            }
        }) 
    } catch(error) {
        return error
    }
    
}

function retreiveEmails() {
    const a = '';
}