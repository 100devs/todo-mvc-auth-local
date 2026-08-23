import dotenv from "dotenv"
dotenv.config();
import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import session from 'express-session'
import connectMongo from 'connect-mongo'
import flash from 'express-flash'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/database.js'
import configurePassport from './config/passport.js'
import mainRoutes from './routes/main.js'
import todoRoutes from './routes/todos.js'

const app = express()
const MongoStore = connectMongo(session)

// Passport config
configurePassport(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(helmet())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
// Sessions
app.use(
    session({
      secret: process.env.SESSION_SECRET || 'development-only-secret-change-me',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use('/', mainRoutes)
app.use('/todos', todoRoutes)

const port = process.env.PORT || 2121
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
