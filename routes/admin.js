const router = require("express").Router();
const bodyparser = require("body-parser");
const User = require('../models/User');
const {checkAuthenticatedAndAdmin} = require('./auth');

router.use(bodyparser.urlencoded({
  extended: true
}));

// Load all the users from DB and Rrenders the admin dashboard

router.get('/', checkAuthenticatedAndAdmin, async (req, res) => {
  const users = await User.find();
  res.render('pages/admin', {
      username: req.user.username,
      users: users
  });
})


// Delete user by ID and redirects to the admin page (refreshes)
// req.body.delete_id 读取了delete button的value, 在ejs里给它赋的值就是对应user的id
router.delete('/delete/:id', checkAuthenticatedAndAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id).then(() => {   
    res.redirect('/admin');
  })
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