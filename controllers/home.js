const Trip = require('../models/Trip'); // user data
const User = require('../models/User'); // user data

module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs')
    },
   dashboard: async (req, res) => {
      try {
         let allUserTrips = await Trip.find({
            userId: req.user._id,
         });
         res.render('dashboard', {
            allUserTrips
         })
      } catch (err) {
         console.log(err)
      }
   },
}
