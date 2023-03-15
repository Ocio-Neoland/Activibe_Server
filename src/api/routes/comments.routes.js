const express = require("express");
const CommentRoutes = express.Router();
const { isAuth } = require("../middlewares/user.middleware");
const {
  getAllComments,
  getCommentByID,
  createComments,
  updateComments,
  deleteComments,
} = require("../controllers/comment.controller.js");
CommentRoutes.get("/", getAllComments);
CommentRoutes.get("/:id", getCommentByID);
CommentRoutes.post("/", [isAuth], createComments);
CommentRoutes.patch("/:id", [isAuth], updateComments);
CommentRoutes.delete("/:id", [isAuth], deleteComments);

module.exports = CommentRoutes;
