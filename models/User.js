const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
})


// Password hash middleware.
 
UserSchema.pre('save', async function save(next) {
    const user = this
    if (!user.isModified('password')) { return next() }
    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(user.password, salt)
    user.password = hash
})


// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}


module.exports = mongoose.model('User', UserSchema)
