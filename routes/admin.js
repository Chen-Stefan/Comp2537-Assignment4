const router = require("express").Router();
const bodyparser = require("body-parser");
const passport = require('passport');
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const {checkAuthenticatedAndAdmin} = require('./auth');

router.use(bodyparser.urlencoded({
  extended: true
}));

// Loads all the users from DB and Rrenders the admin dashboard

router.get('/', checkAuthenticatedAndAdmin, (req, res) => {
  db.getAllUsers().then(function([rows, fields]) {
      res.render('pages/admin', {
          username: req.user.username,
          users: rows
      });
  })
})







module.exports = router;