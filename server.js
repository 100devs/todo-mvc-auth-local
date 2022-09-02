const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const logger = require('morgan');
// const connectDB = require('./config/database');
const mainRoutes = require('./routes/main');
const todoRoutes = require('./routes/todos');

require('dotenv').config({ path: './config/.env' });

// Passport config
require('./config/passport')(passport);

// connectDB()

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));
// Sessions
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
);

<<<<<<< HEAD
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/', mainRoutes);
app.use('/todos', todoRoutes);

app.listen(process.env.PORT, () => {
	console.log('Server is running, you better catch it!');
});
=======
app.use(flash())
  
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    


//comment added by nick
>>>>>>> f447e853fc0a45fa255cb623d98e5ee87d1b803c
