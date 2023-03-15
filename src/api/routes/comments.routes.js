const express = require("express");
const CommentRoutes = express.Router();
const {
  getAllComments,
  getCommentByID,
  createComments,
  updateComments,
  deleteComments,
} = require("../controllers/comment.controller.js");
CommentRoutes.get("/", getAllComments);
CommentRoutes.get("/:id", getCommentByID);
CommentRoutes.post("/", createComments);
CommentRoutes.patch("/:id", updateComments);
CommentRoutes.delete("/:id", deleteComments);

module.exports = CommentRoutes;
