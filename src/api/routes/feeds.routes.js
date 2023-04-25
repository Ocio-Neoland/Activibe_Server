const express = require("express");
const FeedRoutes = express.Router();
const { isAuth } = require("../middlewares/user.middleware");

const {
  getAllFeeds,
  getFeedByID,
  createFeeds,
  updateFeeds,
  deleteFeeds,
} = require("../controllers/feed.controller.js");

FeedRoutes.get("/", getAllFeeds);
FeedRoutes.get("/:id", getFeedByID);
FeedRoutes.post("/", [isAuth], createFeeds);
FeedRoutes.patch("/:id", [isAuth], updateFeeds);
FeedRoutes.delete("/:id", [isAuth], deleteFeeds);

module.exports = FeedRoutes;
