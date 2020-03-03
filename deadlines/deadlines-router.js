const router = require("express").Router();

const Deadlines = require("./deadlines-model");

router.get("/", (req, res) => {
  Deadlines.find()
    .then(deadlines => {
      res.status(200).json(deadlines);
    })
    .catch(err => res.send(err));
});

router.get("/:id", (req, res) => {
  Tasks.find();
  const id = req.params.id;
  if (!id) {
    res
      .status(404)
      .json({ message: "The deadline with the specified id does not exist." });
  } else {
    Tasks.findById(id)
      .then(task => {
        res.status(201).json(task);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "The deadline information could not be retrieved." });
      });
  }
});

router.post("/", (req, res) => {
    const body = { ...req.body };
    Deadlines.add(body)
      .then(deadline => {
        res.status(201).json(deadline);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "Error adding deadline" });
      });
  });

  router.put("/:id", validateDeadlineId, (req, res) => {
    const body = { ...req.body };
    const { id } = req.params;
    Tasks.update(id, body)
      .then(updated => {
        res.status(201).json(updated);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "Could not update deadline." });
      });
  });
  
  router.delete("/:id", validateDeadlineId, (req, res) => {
    const { id } = req.params;
    Tasks
      .remove(id)
      .then(deadline => {
        res
          .status(200)
          .json({ message: `Deadline ${deadline} at id# ${id} was deleted.` });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Could not delete deadline." });
      });
  });
  
  // custom middleware
  function validateDeadlineId(req, res, next) {
    Tasks.find(req.params.id)
      .then(checkId => {
        if (checkId) {
          req.checkId = checkId;
          next();
        } else {
          res.status(404).json({ error: "Deadline ID may not exist." });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "Could not verify deadline ID" });
      });
  }
  

module.exports = router;