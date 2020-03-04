const router = require("express").Router();

const Messages = require("./messages-model.js");
const { validateMessagesId } = require("./messages-helper");

router.get("/", checkRole("admin"), (req, res) => {
  Messages.find()
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch(err => res.send(err));
});

router.get("/:id", checkRole("admin"), validateMessagesId, (req, res) => {
  const { id } = req.params;
  Messages.findById(id)
    .then(messages => {
      res.status(201).json(messages);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The messages information could not be retrieved." });
    });
});

router.post("/", (req, res) => {
  const messages = { ...req.body };
  Messages.add(messages)
    .then(message => {
      res.status(201).json(message);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not add message." });
    });
});

router.put("/:id", validateMessagesId, (req, res) => {
  const body = { ...req.body };
  const { id } = req.params;

  Messages.update(id, body)
    .then(changed => {
      res.status(201).json(changed);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not update messages at this ID" });
    });
});

router.delete("/:id", validateMessagesId, (req, res) => {
  const id = req.params.id;
  Messages.remove(id)
    .then(messages => {
      res.json(`Message ${messages} has been deleted`);
    })
    .catch(err => {
      res.status(500).json({ message: "The message could not be removed" });
    });
});

function checkRole(role) {
  return (req, res, next) => {
    if (req.decodedToken && req.decodedToken.role === role) {
      next();
    } else {
      res.status(403).json({
        error:
          "Admin access only. You do not have permission to view this page."
      });
    }
  };
}

module.exports = router;
