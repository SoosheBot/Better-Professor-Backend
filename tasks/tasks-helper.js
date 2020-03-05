const Tasks = require("./tasks-model");
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

module.exports = {
  validateTaskId
}
