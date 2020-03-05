const router = require("express").Router();

const Tasks = require("./tasks-model");
const { validateTaskId } = require("./tasks-helper");

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


module.exports = router;
