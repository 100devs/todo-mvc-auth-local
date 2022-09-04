const User = require("../models/User")
const validator = require("validator")
const crypto = require('crypto')
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
const nodemailer = require("nodemailer")
const async = require("async")


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
       
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            User.findOne({ email: req.body.email }, function (err, user) {
                if (!user) {
                    req.flash('errors', 'No account with that email address exists.');
                    return res.redirect('/recover');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS
                }
            })
            const mailOptions = {
                to: user.email,
                from: process.env.USER,
                subject: 'Christmas List Central Password Reset Request',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            transporter.sendMail(mailOptions, function (err) {
                req.flash('errors', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], function (err) {
        if (err) return next(err);
        res.redirect('/recover');
    })
}

exports.getPasswordReset = (req, res) => {
    if (req.user) {
        return res.redirect('/reset/:token')
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
    async.waterfall([
        function (done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
                if (!user) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }

                user.password = req.body.password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function (err) {
                    req.logIn(user, function (err) {
                        done(err, user);
                    });
                });
            });
        },
    ], function (err) {
        res.redirect('/todos');
    })
}