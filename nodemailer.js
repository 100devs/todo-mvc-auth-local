const nodemailer = require('nodemailer')

require('dotenv').config({path: './config/.env'})

// const {email} = req.body.email

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

        // async function sendMail({ to, subject, html }) {
        //     return smtpTransport.sendMail({ to, subject, html });
        // }

exports.sendMail = function(sendTo){
        
        const msg = {
            from: '"Due List" <node-todo-list@outlook.com>', // sender address
            to: `${sendTo}`, // list of receivers
            subject: "Due Date Notification", // Subject line
            text: "Hello! This is an email to notify you that a due date is ", // plain text body
        }
        transporter.sendMail(msg, function(err, info) {
            if(err){
                console.log(err)
                return
            }
            console.log("Sent email to: " + msg.to)
        })
        // const info = await transporter.sendMail(msg)
    }



// const options = {
//     from: "node-todo-list@outlook.com",
//     to: "",
//     subject: "Due Date upcoming!",
//     text: "Due Date within 5 days!"
// }


  // send mail with defined transport object


// transporter.sendMail(options, function(err, info) {
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log("Sent: " + info.response)
// })