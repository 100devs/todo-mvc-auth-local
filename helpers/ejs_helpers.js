module.exports = {
   editIcon: function(userId, tripUserId, tripId) {
      if (userId._id.toString() == tripUserId.toString()) {
         return `<a href="/trips/edit/${tripId}">edit</a>`
      }
      return ''
   },
}

// ! arguments --> trip id, user id, trip user id
