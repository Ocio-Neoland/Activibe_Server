const Activity = require("../models/activity.model");

const getAllActivities = async (req, res, next) => {
  try {
    const Activities = await Activity.find().populate("Comment Feed");
    res.status(200).json(Activities);
  } catch (error) {
    return next(error);
  }
};

const getActivityByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Activity = await Activity.findById(id).populate("Comment Feed");
    return res.status(200).json(Activity);
  } catch (error) {
    return next(error);
  }
};

const createActivities = async (req, res, next) => {
  try {
    const newActivity = new Activity(req.body);
    const createdActivity = await newActivity.save();
    return res.status(201).json(createdActivity);
  } catch (error) {
    return next(error);
  }
};

const updateActivities = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedActivity = await Activity.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedActivity);
  } catch (error) {
    return next(error);
  }
};

const deleteActivities = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteActivities = await Activity.findByIdAndDelete(id);
    res.status(200).json(deleteActivities);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllActivities,
  getActivityByID,
  createActivities,
  updateActivities,
  deleteActivities,
};
