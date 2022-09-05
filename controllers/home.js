const Trip = require('../models/Trip'); // user data
const User = require('../models/User'); // user data

module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs')
    },
   dashboard: async (req, res) => {
      try {
         let user = req.user.userName;

         res.render('dashboard', {
            // allUserTrips,
            user
         })
      } catch (err) {
         console.log(err)
      }
   },
}
