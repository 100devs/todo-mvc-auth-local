const sendEmail = require("../config/sendEmail")
const User = require("../models/User")
const Token = require("../models/Token")
const validator = require("validator")
const crypto = require('crypto')
const passport = require("passport")

exports.getPasswordRecover = (req, res) => {
    if (req.user) {
        return res.redirect('/recover')
    }
    res.render('recover', {
        title: 'Recover Password Request'
    })
}

exports.postPasswordRecover = async (req, res) =>{

        const validationErrors = []
        if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
        if (validationErrors.length) {
            req.flash('errors', validationErrors)
            return res.redirect('/recover')
        }
        req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

        const user = await User.findOne({ email: req.body.email })
        
        if (!user) {
            req.flash('errors', { msg: 'Account with that email address does not exist.' })
            return res.redirect('/recover')
        }

        let token = await Token.findOne({ userId: user._id })
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex")
            }).save()
        }

       if(user && token){
        const link = `http://localhost:${process.env.PORT}/password-reset/${user._id}/${token.token}`
        await sendEmail(user.email, "Password Reset Request", `Please reset your password using this link: ${link}`)
        res.redirect('/login')
       }
}

exports.getPasswordReset = (req, res) => {
    if (req.user) {
        return res.redirect('/password-reset/:userid/:token')
    }
    res.render('password-reset', {
        title: 'Password Reset'
    })
}

exports.postPasswordReset = async(req,res) =>{

  
   
        const validationErrors = []
        if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
        if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })

        if (validationErrors.length) {
            req.flash('errors', validationErrors)
        
        }

    const user = await User.findById(req.params.userId)
    //if (!user) {
    //    req.flash('errors', { msg: 'Invalid link or expired. Please try to reset your password again.' })
    //}
    const token = await Token.findOne({ userId: req.params.userId, token: req.params.token, })
    //if (!token) {
    //    req.flash('errors', { msg: 'Invalid link or expired. Please try to reset your password again.' })
    //}   

        
    
        
        console.log(user, token)
        user.password = req.body.password
        await user.save()
        await token.delete()
        res.redirect("/todos")
    
}