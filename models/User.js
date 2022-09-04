// https://mongoosejs.com/docs/guide.html#definition

const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    sparse: true,
    required: true
   },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type:String,
    require: true,
  },
  /*
  totalAttempt: {
    type: Number,
    default: 0,
    validate: {
      validator: function(value) {
        return value === 3;
      },
      message: 'You have already done three attempts.'
    }
  }
  */
}, { collection: 'users'})


// Password hash middleware.

 UserSchema.pre('save', function save(next) {
  const user = this
  if (!user.isModified('password')) { return next() }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err) }
      user.password = hash
      next()
    })
  })
})


// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}


//UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema)
