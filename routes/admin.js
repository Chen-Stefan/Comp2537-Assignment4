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

router.get('/', checkAuthenticatedAndAdmin, async (req, res) => {
  const users = await User.find();
  res.render('pages/admin', {
      username: req.user.username,
      users: users
  });
})



// Get user by ID

router.get('/find/:id', async (req, res) => {
  try {
    await User.findById(req.params.id);
    const {password, ...others} = user._doc;
    res.status(200).json({others});
  } catch (err) {
    res.status(500).json(err);
  }
})








module.exports = router;