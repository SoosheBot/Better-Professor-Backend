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

router.get("/:id", authenticate, checkRole("admin"), validateUserId, (req, res) => {
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

router.put("/:id", checkRole(["admin", "user"]), validateUserId, (req, res) => {
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
