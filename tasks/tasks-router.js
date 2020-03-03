const router = require("express").Router();

const Tasks = require("./tasks-model");

router.get("/", (req, res) => {
  Tasks.find()
    .then(tasks => {
      res.status(200).json(tasks);
    })
    .catch(err => res.send(err));
});

router.get("/:id", (req, res) => {
  Tasks.find();
  const id = req.params.id;
  if (!id) {
    res
      .status(404)
      .json({ message: "The task with the specified id does not exist." });
  } else {
    Tasks.findById(id)
      .then(task => {
        res.status(201).json(task);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "The task information could not be retrieved." });
      });
  }
});

router.get("/:id/deadlines", (req, res) => {
  Tasks.findDeadline(req.params.id)
    .then(deadlines => {
      res.status(200).json(deadlines);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "Could not retrieve deadlines with this task ID" });
    });
});

router.post("/", (req, res) => {
  const body = { ...req.body };
  Tasks.add(body)
    .then(task => {
      res.status(201).json(task);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error adding task" });
    });
});

router.put("/:id", validateTaskId, (req, res) => {
  const body = { ...req.body };
  const { id } = req.params;
  Tasks.update(id, body)
    .then(updated => {
      res.status(201).json(updated);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not update task." });
    });
});

router.delete("/:id", validateTaskId, (req, res) => {
  const { id } = req.params;
  Tasks
    .remove(id)
    .then(task => {
      res
        .status(200)
        .json({ message: `Task ${task} at id# ${id} was deleted.` });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not delete task" });
    });
});

// custom middleware
function validateTaskId(req, res, next) {
  Tasks.find(req.params.id)
    .then(checkId => {
      if (checkId) {
        req.checkId = checkId;
        next();
      } else {
        res.status(404).json({ error: "Task ID may not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Could not verify deadline ID" });
    });
}

// function validateTask(req, res, next) {
//   if (req.body) {
//     next();
//   } else if (!req.body.name || !req.body.deadline) {
//     res
//       .status(400)
//       .json({ message: "Missing required information--name, description" });
//   } else {
//     res.status(404).json({ message: "Could not validate task." });
//   }
// }

module.exports = router;
