const router = require("express").Router();

const Projects = require("./projects-model");

router.get("/", (req, res) => {
  Projects.find()
  .then(projects => {
    res.status(200).json(projects);
  })
  .catch(err => res.send(err));
});

router.get("/:id", (req, res) => {
  Projects.find()
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ message: "The project with the specified id does not exist." });
  } else {
    Projects.findById(id)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(err => {
      res.status(500).json({ message: 'The project information could not be retrieved.' });
    })
  }
});

router.get("/:id/deadlines", (req, res) => {
  Projects.find()
    .then()
    .catch();
});

router.post("/", (req, res) => {
  Projects.add()
    .then()
    .catch();
});

router.put("/:id", (req, res) => {
  Projects.update()
    .then()
    .catch();
});

router.delete("/:id", (req, res) => {
  Projects.remove()
    .then()
    .catch();
});

module.exports = router;
