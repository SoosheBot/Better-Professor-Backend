const router = require("express").Router();

const authenticate = require("../auth/auth-middleware");
const Users = require("./users-model.js");
const { validateUserId } = require("./users-helpers");

router.get("/", authenticate, checkRole("admin"), (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.send(err));
});

router.get("/:id", checkRole("admin"), validateUserId, (req, res) => {
  const { id } = req.params;
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

// router.get("/:id/deadlines", (req, res) => {
//   const { id } = req.params;
//   Users.findDeadlines(id)
//     .then(deadlines => {
//       if (deadlines) {
//         res.status(200).json(deadlines);
//       } else {
//         res
//           .status(400)
//           .json({ errorMessage: "Could not find this student's deadlines" });
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ errorMessage: "Failed to get deadlines." });
//     });
// });

router.post("/", (req,res) => {
  const users = {...req.body};
  Users.add(users)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(err => {
    res.status(500).json({ errorMessage:"Could not add user."});
  });
});

router.put("/:id", validateUserId, (req, res) => {
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

router.delete("/:id", validateUserId, (req, res) => {
  const id = req.params.id;
  Users.remove(id)
    .then(user => {
      res.json(`User ${user} has been deleted`);
    })
    .catch(err => {
      res.status(500).json({ message: "The user could not be removed" });
    });
});

function checkRole(role) {
  return (req, res, next) => {
    if (req.decodedToken && req.decodedToken.role === role) {
      next();
    } else {
      res
        .status(403)
        .json({
          error:
            "Admin access only. You do not have permission to view this page."
        });
    }
  };
}

module.exports = router;
