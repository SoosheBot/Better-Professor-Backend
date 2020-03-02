const router = require("express").Router();

const Students = require("./students-model");

router.get("/",  (req, res) => {
  Students.find()
  .then(students => {
    res.status(200).json(students);
  })
  .catch(err => res.send(err));
});

router.get("/:id", (req, res) => {
  Students.findById()
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ message: "The student with the specified id does not exist." });
  } else {
    Students.findById(id)
    .then(student => {
      res.status(201).json(student)
    })
    .catch(err => {
      res.status(500).json({ message: 'The student information could not be retrieved.' });
    })
  }
});

router.get("/:id/projects", (req, res) => {
  Students.findProjects()
    .then()
    .catch();
});

router.post("/", (req, res) => {
  Students.add()
    .then()
    .catch();
});

router.put("/:id", validateStudent, validateId, (req, res) => {
    const body = {...req.body };
    const { id } = req.params;
    Students.update(id, body)
      .then(changed => {
        res.status(201).json(changed);
      })
      .catch(err => {
        res.status(500).json({ error: "Could not update student at this ID" });
      });
});

router.delete("/:id", validateId, (req, res) => {
  const { id } = req.params;
  Students.remove(id)
    .then(removed => {
      res.status(200).json(removed);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not delete student." });
    });
});


function validateId(req, res, next) {
    // do your magic!
    Students.findById(req.params.id)
    .then(valid => {
      if (valid) {
        req.valid = valid;
        next();
      } else {
        res.status(400).json({ errorMessage: "Invalid student ID" });
      }
    });
  };

  function validateStudent(req,res,next) {
    if (req.body.student) {
        next();
    } else {
        res.status(400).json({ error: "Please add student information correctly"});
    }
  };

module.exports = router;
