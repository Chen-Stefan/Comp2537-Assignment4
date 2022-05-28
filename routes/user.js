const router = require("express").Router();
const bodyparser = require("body-parser");
const passport = require('passport');
const User = require('../models/User');
const CryptoJS = require('crypto-js');

router.use(bodyparser.urlencoded({
  extended: true
}));

// Render register page when clicking "register" on login page

router.get('/register', async(req, res) => {
  res.render('pages/register');
});

// Register new user and save to database

router.post('/register', async (req, res) => {
  const {username, email, password} = req.body;
  let errors = [];
  // Check password length
  if(password.length < 6) {
    errors.push({msg: 'Password should be at least 6 characters'});
  }

  if(errors.length > 0) {
    res.render('pages/register', {
      errors,
      username,
      email,
      password
    });       
  } else {
    // Check if user already exist
     const user = await User.findOne({email: email});
     const user_ = await User.findOne({username: username})
        if(user) {
          errors.push({msg: 'Email is already registered, please try again'});
          res.render('pages/register', {
            errors,
            username,
            email,
            password
          });       
        } 
        if(user_){
          errors.push({msg: 'Username already exists, please try again'});
          res.render('pages/register', {
            errors,
            username,
            email,
            password
          });       
        } 
        if(!user && !user_) {
          const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET).toString()
          });
          
          try{
            const savedUser = await newUser.save();
            req.flash('success_msg', 'You are now registered, please log in');
            res.redirect('/');
          } catch (err) {
            res.status(500).json(err);
          }
        }
    }
})

// Log in user

router.post('/login', async (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/landing',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next);
});

// Log out user
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
  });
});

module.exports = router;