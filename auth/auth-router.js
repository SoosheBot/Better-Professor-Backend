const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/secrets");

const { checkDuplicates, validateUser } = require("../users/users-helpers");

const Users = require("../users/users-model");

router.post("/register", checkDuplicates, (req, res) => {
  let user = req.body;

  const validateResult = validateUser(user);
  
  if (validateResult.isSuccessful === true) {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    
    Users.add(user)
      .then(saved => {
        if (user.username && user.lastname && user.firstname && user.password && user.email) {
          res.status(201).json(saved);
        } else {
          res
            .status(404)
            .json({ message: "Missing info. User requires a username, lastname, firstname, password and email" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "Registration error." });
      });
  } else {
    res.status(400).json({
      message: "Invalid user info, see errors",
      errors: validateResult.errors
    });
  }
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: "Invalid credentials, cannot login." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Login error." });
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ err: "Could not log out" });
      } else {
        res
          .status(200)
          .json({ message: "You are now logged out. Seeya later." });
      }
    });
  } else {
    res
      .status(200)
      .json({
        message: "Logout success. For your security, please close this window."
      });
  }
});

function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
    lastname: user.lastname,
    firstname: user.firstname,
    email: user.email,
    user: user.password
  };

  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
