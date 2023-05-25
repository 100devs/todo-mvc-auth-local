const mongoose = require('mongoose')

//connectDB function
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.DB_STRING, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            })
            //Telling the user that they're connected to the MongoDB
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB