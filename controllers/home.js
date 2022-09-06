const Trip = require('../models/Trip'); // user data
const User = require('../models/User'); // user data

module.exports = {
   getIndex: (req, res) => {
      res.render('index.ejs')
   },
   dashboard: async (req, res) => {
      try {
         let userName = req.user.userName;
         res.render('dashboard', {
            userName
         })
      } catch (err) {
         console.log(err)
      }
   },
   getContact: (req, res) => {
      try {
         let userName = req.user.userName;
         res.render('contact', {
            userName
         })
      } catch (err) {
         console.log(err)
      }
   },

}
