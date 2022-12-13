const passport = require('passport') //auth
const validator = require('validator') // validator
const User = require('../models/User')

 exports.getLogin = (req, res) => {
    if (req.user) { //if session exists
      return res.redirect('/todos')
    }
    res.render('login', //if it doesnt render login.ejs
     {
      title: 'Login'
    })
  }
  
  exports.postLogin = (req, res, next) => {
    const validationErrors = [] //error array
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' }) //if its not a valid email push error
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' }) //if pass is empty push message
  
    if (validationErrors.length) { //if there is something in the validator array
      req.flash('errors', validationErrors) //I assume this makes the messages appear
      return res.redirect('/login') //returns to login
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false }) //normalizes email
  
    passport.authenticate('local', (err, user, info) => { // I assume user comes from req and its passed by the authenticate function
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info) //if it doesnt find the user 
        return res.redirect('/login')
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) } // case of an error
        req.flash('success', { msg: 'Success! You are logged in.' }) //seems like its not do anything
        res.redirect(req.session.returnTo || '/todos')
      })
    })(req, res, next) //exceutes the function
  }
  
  exports.logout = (req, res) => {
    req.logout(() => {
      console.log('User has logged out.')
    }) 
  //logouts ( not really sure what this does probably change the req body or res body) does nothing if taken out
    req.session.destroy((err) => { //destroys sessions i think this does something to the cookies 
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      res.redirect('/')
    })
  }
  
  exports.getSignup = (req, res) => {
    if (req.user) { // if req has a session goes to dashboard
      return res.redirect('/todos')
    }
    res.render('signup', {
      title: 'Create Account'
    })
  }
  
  exports.postSignup = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' }) //validates email
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' }) //min characters
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' }) 
  
    if (validationErrors.length) { //if we have errors we have to redirect to the same page
      req.flash('errors', validationErrors)
      return res.redirect('/signup')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    //creates a new user
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    })
  
    User.findOne({$or: [
      {email: req.body.email},
      {userName: req.body.userName}
    ]}, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' }) //flashes if email or username is taken
        return res.redirect('../signup') 
      }
      user.save((err) => {
        if (err) { return next(err) } //saves the user on atlas
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          res.redirect('/todos')
        })
      })
    })
  }