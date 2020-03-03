function isAdmin() {
    return function(req,res,next) {
        if (req.user && req.user.is_admin === true) {
            next();
        } else {
            res.status(403).json({ message: "You are not authorized to access this user list"});
        }
    }
  }

module.exports = {
    isAdmin
}

