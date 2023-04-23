//Trips Controller
// const mongoose = require('mongoose')
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
         // console.log(req.params);
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
      // if( !mongoose.Types.ObjectId.isValid(id) ) return false;
      // console.log(req.params)
      try {
         let user = await User.findById(req.user._id);
         let userName = user.userName;
         res.render('createTrip', {
            userName
         })
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
            tripHost: req.user.userName,
            membersWhoVoted: [],
            userId: req.user._id,
            upVotes: 0,
            downVotes: 0,
         });
         console.log("Trip created");
         res.redirect("/trips");
      } catch (err) {
         console.log(err);
         res.render("error/500");
      }
   },
   edit: async (req, res) => {
      console.log(req.params)
      try {
         let userName = req.user.userName;
         let trip = await Trip.findOne({
            _id: req.params.id,
         })
         let formatDateFrom = trip.dateFrom.toLocaleDateString()
         let formatDateTo = trip.dateTo.toLocaleDateString()
         if (!trip) return res.render('error/404')
         if (req.user.id != trip.userId) {
            res.redirect('/dashboard', trip)
         } else {
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

         // restart voting system everytime trip is edited for now
         let freshVoters = [];
         let freshUpVotes = 0;
         let freshDownVotes = 0;
         await Trip.findOneAndUpdate(
            { _id: req.params.id },
            { membersWhoVoted: freshUpVotes },
            {
               new: true,
               runValidators: true,
            })
         await Trip.findOneAndUpdate(
            { _id: req.params.id },
            { upVotes: freshUpVotes },
            {
               new: true,
               runValidators: true,
            })
         await Trip.findOneAndUpdate(
            { _id: req.params.id },
            { downVotes: freshDownVotes },
            {
               new: true,
               runValidators: true,
            })

         res.redirect(`/trips/${trip._id}`);
      } catch (err) {
         console.log(err)
      }
   },
   deleteTrip: async (req, res) => {
      try {
         await Trip.deleteOne({
            _id: req.params.id
         })
         console.log('Trip deleted')
         res.redirect("/trips");
      } catch (err) {
         console.error(err)
         res.render("error/500");
      }
   },
   viewTrip: async (req, res) => {
      // console.log(req.params)
      // console.log(req.query)
      // console.log(req);
      // ObjectId(req);
      try {
         let userName = req.user.userName;
         let user = await User.findById(req.user._id);
         let trip = await Trip.findOne({
            _id: req.params.id,
         });
         res.render('viewTrip', {
            userName,
            trip,
            user
         })
      } catch (err) {
         console.log(err)
      }
   },
   vote: async (req, res) => {
      try {
         let trip = await Trip.findById(req.params.id)

         if (trip.membersWhoVoted.includes(req.user.id)) {
            console.log(`User ${req.user.userName}, :id ${req.user.id} already voted`)
            res.redirect(`/trips/${trip._id}`);
         } else {
            if (req.route.path === '/upvote/:id') {
               let newUpVotes = trip.upVotes + 1;
               await Trip.findOneAndUpdate(
                  { _id: req.params.id },
                  { upVotes: newUpVotes },
                  {
                     new: true,
                     runValidators: true,
                  })
            }
            if (req.route.path === '/downvote/:id') {
               let newDownVotes = trip.downVotes + 1;
               await Trip.findOneAndUpdate(
                  { _id: req.params.id },
                  { downVotes: newDownVotes },
                  {
                     new: true,
                     runValidators: true,
                  })
            }
            trip.membersWhoVoted.push(req.user.id);
            let newMemberPolls = trip.membersWhoVoted
            await Trip.findOneAndUpdate(
               { _id: req.params.id },
               { membersWhoVoted: newMemberPolls },
               {
                  new: true,
                  runValidators: true,
               })
            res.redirect(`/trips/${trip._id}`);
         }
      } catch (err) {
         console.log(err)
      }
   }
}
