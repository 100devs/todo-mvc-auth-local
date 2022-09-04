//Trips Controller
const Trip = require('../models/Trip')

module.exports = {
   showTrips: async (req, res) => {
      try {
         let allUserTrips = await Trip.find({
            userId: req.user._id,
         });
         res.render('trips', {
            allUserTrips
         })
      } catch (err) {
         console.log(err)
      }
   },

   createTrip: async (req, res) => {
      try {
         console.log(req.user._id)
         res.render('createTrip')
      } catch (err) {
         console.log(err)
      }
   },

   createPostTrip: async (req, res) => {
      try {
         await Trip.create({
            tripTitle: req.body.tripTitle,
            option1: req.body.option1,
            option2: req.body.option2,
            option3: req.body.option3,
            dateFrom: req.body.dateFrom,
            dateTo: req.body.dateTo,
            tripMembers: req.body.tripMembers,
            userId: req.user._id,
         });
         console.log("Trip created");
         res.redirect("/trips");
      } catch (err) {
         console.log(err);
         res.render("error/500");
      }
   },

   deleteTrip: async (req, res) => {
      try {
         await Trip.remove({
            _id: req.params.id
         })
         console.log('Trip deleted')
         res.redirect("/trips");
      } catch (err) {
         console.error(err)
         res.render("error/500");
      }
   }

}    
