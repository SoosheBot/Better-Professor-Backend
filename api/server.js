const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const logger = require('../middleware/logger');
const authenticate = require("../auth/auth-middleware");
const { checkRole } = require("../middleware/role-validation");

const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");
const studentsRouter = require("../students/students-router");
const tasksRouter = require("../tasks/tasks-router");
const messagesRouter = require("../messages/messages-router");
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);

server.use("/api/auth", authRouter);
server.use("/api/users", authenticate, checkRole("admin"), usersRouter);
server.use("/api/students", studentsRouter); //removed authenticated to work around a FE bug
server.use("/api/tasks", tasksRouter);
server.use("/api/messages", messagesRouter);

server.get("/", (req, res) => {
  res.send({ api: "Is up and running."});
});

module.exports = server;