const Users = require("./users-model");

module.exports = function isAdmin() {
    return function(req, res, next) {
      const user = req.body;
      if (!user || !user.role === 'admin') {
        return res.status(403).send({error: { status:403, message:'Access denied.'}});
      }
      next();
    }
  }
