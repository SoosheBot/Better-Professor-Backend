const router = require('express').Router();

const Users = require('./users-model.js');

router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.send(err));
});

router.get('/:id', validateUser, (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ message: "The user with the specified id does not exist." });
  } else {
    Users.findById(id)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({ message: 'The user information could not be retrieved.' });
    })
  }
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ message: "The user with the specified ID does not exist." })
  }
  Users.remove(id)
   .then(user => {
     res.json(user);
   })
    .catch(err => {
      res.status(500).json({ message: 'The user could not be removed' });
    })
});


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

module.exports = router;