//Trips Controller
const Trip = require('../models/Trip')
const User = require('../models/User')

module.exports = {
   showTrips: async (req, res) => {
      try {
         let user = await User.findOne({
            _id: req.user._id,
         })
         let userName = req.user.userName;
         let allUserTrips = await Trip.find({
            userId: req.user._id,
         });
         res.render('trips', {
            user,
            allUserTrips,
            userName,
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
   edit: async (req, res) => {
         console.log(req);
      try {
         let userName = req.user.userName;
         const trip = await Trip.findOne({
            _id: req.params.id,
         })
         const formatDateFrom = trip.dateFrom.toLocaleDateString()
         const formatDateTo = trip.dateTo.toLocaleDateString()
         if (!trip) return res.render('error/404')
         if (req.user.id != trip.userId) {
            res.redirect('/dashboard', trip)
         } else {
            console.log(trip)
            res.render('edit', {
               trip,
               formatDateFrom,
               formatDateTo,
               userName
            })
         }
      } catch (err) {
         console.log(err)
      }
   },
   editPut: async (req, res) => {
      try {
         let trip = await Trip.findById(req.params.id)
         if (!trip) return res.render('error/404')
         if (req.user.id != trip.userId) {
            res.redirect('dashboard')
         } else {
            let params = {}
            for (let prop in req.body)
               if (req.body[prop]) params[prop] = req.body[prop]
            trip = await Trip.findOneAndUpdate({ _id: req.params.id }, params, {
               new: true,
               runValidators: true,
            })
         }
         res.redirect('/trips') // going to redirect this to a singleTripView soon
      } catch (err) {
         console.log(err)
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
