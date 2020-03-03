const Users = require("./users-model");

//custom middleware
function validateUser(user) {
  let errors = [];

  if (
    !user.lastname ||
    user.lastname.length < 2 ||
    !user.firstname ||
    user.firstname.length < 2 ||
    !user.username ||
    user.username.length < 2
  ) {
    errors.push(
      "Please enter a user last name, firstname, and username. All must contain at least 2 characters"
    );
  }

  if (!user.password || user.password.length < 4) {
    errors.push("Password must contain at least 4 characters");
  }

  if (!user.email || user.email.length < 4) {
    errors.push("Email must contain at least 4 characters");
  }

  return {
    isSuccessful: errors.length > 0 ? false : true,
    errors
  };
}

function checkDuplicates(req, res, next) {
  const { username, email } = req.body;

  Users.findBy({ username })
    .then(user => {
      if (user) {
        res.status(400).json({ message: "Username is already taken" });
      } else {
        Users.findBy({ email }).then(user => {
          if (user) {
            res.status(400).json({ message: "Email is already taken" });
          } else {
            next();
          }
        });
      }
    })
    .catch(err => console.log(err));
}

function validateUserId(req, res, next) {
  const { id } = req.params;

  Users.findById(id)
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(404).json({ message: "Invalid user id." });
      }
    })
    .catch(err => res.status(500).json({ err: "Could not get user'" }));
}



module.exports = {
  validateUser,
  checkDuplicates,
  validateUserId,
  
};
