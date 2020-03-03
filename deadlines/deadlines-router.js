const router = require("express").Router();

const Deadlines = require("./deadlines-model");

router.get("/", (req, res) => {
  Deadlines.find()
    .then(deadlines => {
      res.status(200).json(deadlines);
    })
    .catch(err => res.send(err));
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

module.exports = router;