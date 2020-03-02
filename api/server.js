const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const logger = require('../middleware/logger');

const authenticate = require("../auth/auth-middleware.js");
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");
// const studentsRouter = require("../students/students-router");


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);

server.use("/api/auth", authRouter);
server.use("/api/users", authenticate, usersRouter);
// server.use("/api/students", authenticate, studentsRouter);

server.get("/", (req, res) => {
  res.send("It's alive!!");
});

module.exports = server;