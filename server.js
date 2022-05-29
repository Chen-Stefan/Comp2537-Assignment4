const express = require("express");
const app = express();      
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const dotenv = require("dotenv");
const userRoute = require('./routes/user');
const timelineRoute = require('./routes/timeline');
const pokeProfileRoute = require('./routes/pokeProfile');
const userProfileRoute = require('./routes/userProfile');
const {checkAuthenticated} = require('./routes/auth');

// EJS

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public')); 

// Body parser
app.use(bodyparser.urlencoded({
  extended: true
}));

// Passport config
require('./passport')(passport);

// Express session middleware
app.use(session({
  secret: 'oppai',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware

app.use(passport.initialize());
app.use(passport.session());

// Connect flash middleware
app.use(flash());

// Global variable
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


// .env

dotenv.config();

// MongoDB connect

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Root route, render the login page

app.get('/', function (req, res) {
  res.render('pages/login')
});

// Landing route: render the landing page when user sucessfully logged in. Pass in the username as an object
// to show in the welcome message after login

app.get('/landing', checkAuthenticated, async(req, res) => {
  res.render('pages/landing', {
    username: req.user.username
  });
});

// Other routes

app.use(express.json());
app.use('/timeline', timelineRoute);
app.use('/user', userRoute);
app.use('/timeline', timelineRoute);
app.use('/pokeProfile', pokeProfileRoute);
app.use('/profile', userProfileRoute);


app.listen(process.env.PORT || 5000, function (err) { 
  if(err) console.log(err);
});

