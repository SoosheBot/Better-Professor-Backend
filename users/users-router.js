const router = require("express").Router();

const Users = require("./users-model.js");
const { validateUserId } = require("./users-helper");
const { checkRole } = require("../middleware/role-validation");

const Students = require("../students/students-model");

router.get("/", checkRole("admin"), (req, res) => {
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

router.get("/:id/messages", (req, res) => {
  const { id } = req.params;
  Users.findUserMessages(id)
    .then(messages => {
      if (messages) {
        res.status(200).json(messages);
      } else {
        res
          .status(400)
          .json({ errorMessage: "Could not find this student's messages" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Failed to get messages." });
    });
});

router.get("/:id/students", checkRole("admin"), validateUserId, (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then(professor => {
      if (!professor) {
        res.status(400).json({ error: "This ID does not exist." });
      } else {
        Users.findUserInfo(id)
          .then(students => {
            res.status(201).json(students);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: "Could not find students of professor with this ID."
            });
          });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "Could not retrieve this student's messages." });
    });
});

router.get("/all-students/:id", checkRole("admin"), (req, res) => {
  if (!req.params.id) {
    res.status(404).json({
      errorMessage: "This ID does not exist"
    });
  }
  Users.findById(req.params.id)
    .then(professor => {
      if (!professor) {
        res.status(404).json({
          errorMessage: "ID does not exist."
        });
      } else {
        Users.findUserInfo(req.params.id).then(student => {
          res.status(200).json({ professor, student });
        });
      }
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({
        errorMessage:
          "Could not get professor from database, cannot find students."
      });
    });
});

router.post("/", (req, res) => {
  const users = { ...req.body };
  Users.add(users)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not add professor." });
    });
});

router.post("/:id/messages", (req, res) => {
  const messages = { ...req.body };
  Users.add(messages)
    .then(user => {
      res.status(201).json(messages);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not add message." });
    });
});

router.post("/:id/students", (req, res) => {
  const students = { ...req.body };
  Users.add(students)
    .then(student => {
      res.status(201).json(students);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not add student." });
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

module.exports = router;
