// implement your posts router here
const express = require("express");
const router = express.Router();
const Posts = require("./posts-model.js");
router.get("/api/posts", (req, res) => {
  Posts.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});
router.get("/api/posts/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Adopter not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error retrieving the post",
      });
    });
});
router.post("/api/post", (req, res) => {
  Posts.insert(req.body)
    .then((newPost) => {
      if (newPost) {
        res.status(201).json({
          message: "succesfully created",
          newPost: newPost,
        });
      } else {
        res.status(500).json({
          message: "error creating resource",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});
router.delete("/api/post/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then((deleted) => {
      if (deleted === 1) {
        res.status(200).json({
          message: "deleted succesfully",
        });
      } else {
        res.status(404).json({
          message: "No such post exists",
        });
      }
      console.log(deleted);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    });
});
router.get("/api/posts/:id/comments", (req, res) => {
  try {
    Posts.findPostComments(req.params.id).then((result) => {
      if (result) {
        console.log(result);
        res.status(200).json({
          result: result,
        });
      } else {
        res.status(500).json({
          message: "resource not found",
        });
      }
    });
  } catch {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = router;
