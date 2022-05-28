const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');

// Load user model
const User = require('./models/User');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({usernameField: 'username'}, (username, password, done) => {
      // Match user
      User.findOne({username: username})
      .then(user => {
        if(!user) {
          return done(null, false, {message: 'Username entered is not registered'});
        }
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if (password != originalPassword) {
          return done(null, false, {message: 'Password is incorrect, please try again'});
        } else {
          return done(null, user);
        }
      })
      .catch(err => console.log(err));
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}

