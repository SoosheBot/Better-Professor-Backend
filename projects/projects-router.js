const router = require("express").Router();

const Projects = require("./projects-model");

router.get("/", (req, res) => {
  Projects.find()
    .then()
    .catch();
});

router.get("/:id", (req, res) => {
  Projects.find()
    .then()
    .catch();
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
