const router = require("express").Router();

const Users = require("./users-model.js");
const { validateUserId } = require("./users-helper");

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
router.get("/students/:id", validateUserId, (req,res) => {
  const { id } = req.params;
   Users.findUserStudents(id)
   .then()
   .catch(err => {
         console.log(err);
         res.status(500).json({error: "Could not find students of this professor by that ID"})
       })
});
// router.get("/students/:id", validateUserId, (req,res) => {
//   const { id } = req.params;
//   Users.findUserStudents(id)
//           .then(students => {
//             res.status(200).json(students);
//           })
//           .catch(error => {
//             console.log(error);
//             res.status(500).json({
//               errorMessage: "Problem getting children from database"
//             })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json({error: "Could not find students of this professor by that ID"})
//   })
// });

router.get("/all-students/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(404).json({
      errorMessage: "This ID does not exist"
    });
  }
  Users.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          errorMessage: "Professor with that Id does not exist"
        });
      } else {
        Users.findUserStudents(req.params.id)
        .then(student => {
          return res.status(200).json({ user, student });
        });
      }
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({
        errorMessage: "Could not get professor from database"
      });
    });
});

router.post("/", (req,res) => {
  const users = {...req.body};
  Users.add(users)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(err => {
    res.status(500).json({ errorMessage:"Could not add professor."});
  });
});

router.post("/:id/students", (req,res) => {
  const students = {...req.body};
  Users.add(students)
  .then(user => {
    res.status(201).json(students);
  })
  .catch(err => {
    res.status(500).json({ errorMessage:"Could not add student."});
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
