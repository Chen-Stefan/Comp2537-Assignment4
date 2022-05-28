const express = require("express");
// var session = require("express-session")
// const res = require("express/lib/response");
const app = express();      
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const timelineRoute = require('./routes/timeline');
const profileRoute = require('./routes/profile');

// EJS

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public')); 

// Body parser
app.use(bodyparser.urlencoded({
  extended: true
}));

// .env

dotenv.config();

// MongoDB connect

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Root route
app.get('/', function (req, res) {
  res.render('pages/login')
})

// Routes

app.use(express.json());
app.use('/timeline', timelineRoute);
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/timeline', timelineRoute);
app.use('/profile', profileRoute);


app.listen(process.env.PORT || 5000, function (err) { 
  if(err) console.log(err);
})  

