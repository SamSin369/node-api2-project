// implement your server here
// require your posts router and connect it here
// require your server and launch it here
const express = require("express");
const postRouter = require("./posts/posts-router");
const server = express();

server.use(express.json());

server.use(postRouter);

server.use("*", (req, res) => {
  res.status(404).send("Error: Resource not found");
});

module.exports = server;
