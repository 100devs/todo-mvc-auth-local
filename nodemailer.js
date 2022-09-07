const nodemailer = require('nodemailer')

require('dotenv').config({path: './config/.env'})


        const transporter = nodemailer.createTransport({
            
            // host: 'smtp.ethereal.email',
            service: "hotmail",
            // port: 587,
            // secure: false,
            auth: {
                user: 'node-todo-list@outlook.com',
                pass: process.env.PASS
            }
        })

exports.sendMail = function(sendTo, taskDue){
        
        const msg = {
            from: '"Due List" <node-todo-list@outlook.com>', // Sender address
            to: `${sendTo}`, // List of receivers
            subject: "Due Date Notification", // Subject line
            text: `Hello! This is an email to notify you that the task "${taskDue}" is due in 5 days!`, // Plain text body
        }
        transporter.sendMail(msg, function(err, info) {
            if(err){
                console.log(err)
                return
            }
            console.log("Sent email to: " + msg.to)
        })
    }