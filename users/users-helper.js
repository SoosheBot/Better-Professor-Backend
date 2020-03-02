module.exports = {
  validateUser,
  checkDupe
};

function validateUser(user) {
  let errors = [];

  if (!user.username || user.username.length < 2) {
    errors.push("Username must contain at least 2 characters");
  }

  if (!user.password || user.password.length < 4) {
    errors.push("Password must contain at least 4 characters");
  }

  return {
    isSuccessful: errors.length > 0 ? false : true,
    errors
  };
}

function checkDupe(req, res, next) {
  const { username } = req.body;

  Users.findBy({ username })
    .then(user => {
      if (user) {
        res
          .status(400)
          .json({
            message: "Username is already taken, please select another."
          });
      } else {
        next();
      }
    })
    .catch(err => console.log(err));
}
