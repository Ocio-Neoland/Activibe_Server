const express = require("express");
const FeedRoutes = express.Router();
const {
  getAllFeeds,
  getFeedByID,
  createFeeds,
  updateFeeds,
  deleteFeeds,
} = require("../controllers/feed.controller.js");

FeedRoutes.get("/", getAllFeeds);
FeedRoutes.get("/:id", getFeedByID);
FeedRoutes.post("/", createFeeds);
FeedRoutes.patch("/:id", updateFeeds);
FeedRoutes.delete("/:id", deleteFeeds);

module.exports = FeedRoutes;
