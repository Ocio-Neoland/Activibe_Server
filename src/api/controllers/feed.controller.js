const Feed = require("../models/feed.model");
const Activity = require("../models/activity.model");
const User = require("../models/user.model");

const getAllFeeds = async (req, res, next) => {
  try {
    const feeds = await Feed.find().populate("idUser idActivity").populate({
      path: "idActivity",
      populate: "feeds",
    });
    res.status(200).json(feeds);
  } catch (error) {
    return next(error);
  }
};

const getFeedByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const feed = await Feed.findById(id).populate("idUser idActivity");
    return res.status(200).json(feed);
  } catch (error) {
    return next(error);
  }
};

const createFeeds = async (req, res, next) => {
  try {
    const newFeed = new Feed(req.body);
    const findUser = await User.findById(req.body.idUser).populate("feeds");
    const findActivity = await Activity.findById(req.body.idActivity).populate(
      "feeds"
    );

    findUser.feeds.push(newFeed._id);
    findActivity.feeds.push(newFeed._id);

    const updateUser = await User.findByIdAndUpdate(req.body.idUser, findUser);
    const updateActivity = await Activity.findByIdAndUpdate(
      req.body.idActivity,
      findActivity
    ).populate("feeds");

    const createdFeed = await newFeed.save();

    return res.status(201).json({
      createdFeed,
      updateUser,
      updateActivity,
      // mediaStars,
    });
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
