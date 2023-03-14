const Feed = require("../models/feed.model");

const getAllFeeds = async (req, res, next) => {
  try {
    const Feeds = await Feed.find().populate("User Activity");
    res.status(200).json(Feeds);
  } catch (error) {
    return next(error);
  }
};

const getFeedByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Feed = await Feed.findById(id);
    return res.status(200).json(Feed);
  } catch (error) {
    return next(error);
  }
};

const createFeeds = async (req, res, next) => {
  try {
    const newFeed = new Feed(req.body);
    const createdFeed = await newFeed.save();
    return res.status(201).json(createdFeed);
  } catch (error) {
    return next(error);
  }
};

const updateFeeds = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedFeed = await Feed.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedFeed);
  } catch (error) {
    return next(error);
  }
};

const deleteFeeds = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteFeeds = await Feed.findByIdAndDelete(id);
    res.status(200).json(deleteFeeds);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllFeeds,
  getFeedByID,
  createFeeds,
  updateFeeds,
  deleteFeeds,
};
