const router = require("express").Router();
const bodyparser = require("body-parser");
const User = require('../models/User');
const CryptoJS = require('crypto-js');
// const jwt = require('jsonwebtoken');

router.use(bodyparser.urlencoded({
  extended: true
}));

// Render register page when clicking "register" on login page

router.get('/register', async(req, res) => {
  res.render('pages/register')
})

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
          errors.push({msg: 'Email is already registered, please try again'})
          res.render('pages/register', {
            errors,
            username,
            email,
            password
          });       
        } 
        if(user_){
          errors.push({msg: 'Username already exists, please try again'})
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
            console.log('Registration successful! User account has been created')
            res.render('pages/landing');
          } catch (err) {
            res.status(500).json(err);
          }
        }
    }
})

// Login user

router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({username: req.body.username});
      if (!user) {
        return 'User does not exist, please create a new user';          // 用session 和ejs来display error, 把login.html变成ejs

      }
      const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET);
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      if (originalPassword != req.body.password) {
        return res.json('Password is incorrect, please try again');
      }
          
      // const accessToken = jwt.sign(
      //   {
      //   id: user._id, 
      //   isAdmin:  user.isAdmin
      //   },
      //   process.env.JWT_SECRET,
      //   {expiresIn: '30d'}
      // );
      const {password, ...others} = user._doc;
      // if request successful take the user to the landing page
      res.redirect('/landing.html');       
  } catch (err) {
    console.log('Login not successful!');
  }
})

module.exports = router;