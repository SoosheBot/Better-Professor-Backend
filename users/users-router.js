const router = require("express").Router();

const Users = require("./users-model.js");

const { validateUserId, isAdmin } = require("./users-helpers");

router.get("/", isAdmin, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.send(err));
});

router.get("/:id", validateUserId, isAdmin, (req, res) => {
    Users.findById(id)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "The user information could not be retrieved." });
      });
  
});

// router.post("/", isAdmin, (req, res) => {
//   const body = { ...req.body };
//   Users.add(body)
//     .then(task => {
//       res.status(201).json(task);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ errorMessage: "Error adding task" });
//     });
// });

router.put("/:id", validateUserId,  (req, res) => {
  const body = { ...req.body };
  const { id } = req.params;
  Users.update(id, body)
    .then(changed => {
      res.status(201).json(changed);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not update user at this ID" });
    });
});

router.delete("/:id", isAdmin, (req, res) => {
  const id = req.params.id;
  if (!id) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
  Users.remove(id)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "The user could not be removed" });
    });
});



module.exports = router;
