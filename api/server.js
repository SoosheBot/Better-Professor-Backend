const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const logger = require('../middleware/logger');


const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");
const tasksRouter = require("../tasks/tasks-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/tasks", tasksRouter);

server.get("/", (req, res) => {
  res.send({ api: "Is up and running."});
});



module.exports = server;