const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')
const nodemailer = require('nodemailer')

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect('/dashboard')
  }
  res.render('login', {
    title: 'Login'
  })
}

exports.postLogin = (req, res, next) => {
  const validationErrors = []
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
  if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })

  if (validationErrors.length) {
    req.flash('errors', validationErrors)
    return res.redirect('/login')
  }
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err) }
    if (!user) {
      req.flash('errors', info)
      return res.redirect('/login')
    }
    req.logIn(user, (err) => {
      if (err) { return next(err) }
      req.flash('success', { msg: 'Success! You are logged in.' })
      res.redirect(req.session.returnTo || '/dashboard')
    })
  })(req, res, next)
}

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err) console.log('Error : Failed to destroy the session during logout.', err)
    req.user = null
    res.redirect('/')
  })
}

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect('/dashboard')
  }
  res.render('signup', {
    title: 'Create Account'
  })
}

exports.postSignup = (req, res, next) => {
  const validationErrors = []
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
  if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
  if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })

  if (validationErrors.length) {
    req.flash('errors', validationErrors)
    return res.redirect('../signup')
  }
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  })

  User.findOne({
    $or: [
      { email: req.body.email },
      { userName: req.body.userName }
    ]
  }, (err, existingUser) => {
    if (err) { return next(err) }
    if (existingUser) {
      req.flash('errors', { msg: 'Account with that email address or username already exists.' })
      return res.redirect('../signup')
    }
    user.save((err) => {
      if (err) { return next(err) }
      req.logIn(user, (err) => {
        if (err) {
          return next(err)
        }
        res.redirect('/dashboard')
      })
    })
  })
}

exports.sendEmail = (req, res) => {
  const output = `
    <p> New Contact Email
    <h3> Contact Details </h3>
    <ul>
       <li>Name: ${req.body.name}</li>
       <li>Email: ${req.body.email}</li>
       <li>Number: ${req.body.number}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: 'canastratest@hotmail.com',
      pass: 'Test143!',
    },
    tls: {
      rejectUnauthorized: false
    }
  });


  let mailOptions = {
    from: '"Nodemailer Contact 👻" <canastratest@hotmail.com>',
    to: "canastraleo123@gmail.com",
    subject: "Travel Contact Message",
    text: "Hello world?",
    html: output,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }


    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  })

  res.render('contact', { msg: 'Email Sent' })
}
