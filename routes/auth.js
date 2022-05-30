function checkAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Please log in first to view this resource');
  res.redirect('/');
}

function checkAuthenticatedAndAdmin(req, res, next) {
  if(req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }
  req.flash('error_msg', 'You are not Authorized to do that');
  res.redirect('/');
}

module.exports = {checkAuthenticated, checkAuthenticatedAndAdmin};

