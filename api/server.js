const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const logger = require('../middleware/logger');
const authenticate = require("../auth/auth-middleware");
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");
const tasksRouter = require("../tasks/tasks-router");
const deadlinesRouter = require("../deadlines/deadlines-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);

server.use("/api/auth", authRouter);
server.use("/api/users", authenticate, usersRouter);
server.use("/api/tasks", tasksRouter);
server.use("/api/deadlines", deadlinesRouter);

server.get("/", (req, res) => {
  res.send({ api: "Is up and running."});
});

module.exports = server;