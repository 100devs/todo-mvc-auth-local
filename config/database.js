const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
      err => {
        if (!err) {
              console.log(`MongoDB Connected:`)
        } else {
        console.log("Error in database connection: " + err);
      }
    }
  )
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB
