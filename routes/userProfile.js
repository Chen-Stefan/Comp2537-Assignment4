const router = require("express").Router();
const bodyparser = require("body-parser");
const User = require('../models/User');
const {checkAuthenticated} = require('./auth');

router.use(bodyparser.urlencoded({
  extended: true
}));


// Gets the current user's info and renders it to the client

router.get('/', checkAuthenticated, async (req, res) => {

  res.render('pages/userProfile', {
      username: req.user.username,
      email: req.user.email,
      is_admin: req.user.is_admin? 'Yes' : 'No',
  });
})


// Gets a user's info by userId and renders it to the Admin

// router.get('/:id', checkAuthenticated, async (req, res) => {
//   const user = await db.getUserById(req.params.id)
//   const posts = await db.getAllPostsByUserID(req.params.id)

//   res.render('pages/profile', {
//       username: user.username,
//       email: user.email,
//       upvotes_received: user.upvotes_received,
//       is_admin: user.is_admin? 'Yes' : 'No',
//       posts: posts,
//   });
// })

module.exports = router;