// https://mongoosejs.com/docs/guide.html#definition

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

/**
 * todo: name of the groups
 * completed: inform if the
 */
const GroupSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  validated: {
    type: Boolean,
    required: false,
  },
  adminId: {
    type: Schema.ObjectId,
     ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
},
  hidden: {
    type: Boolean,
    require: true,
  },
  cityBased: {
    type:Boolean,
    required: false
  },
  city: {
    type:String,
    required: true
  }





})

module.exports = mongoose.model('Group', GroupSchema)
