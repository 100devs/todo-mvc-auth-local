const nodemailer = require("nodemailer")

const sendEmail = async(email, subject, text) =>{
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })

        const result = await transporter.sendMail({
            from: process.env.USER,
            to:email,
            subject: subject,
            text: text,
    })
        console.log(result)
    }catch(error){
        console.log(error)
    }
}

module.exports = sendEmail