module.exports = {
  checkAuthenticated: function(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in first to view this resource');
    res.redirect('/');
  }
}