const Activity = require("../models/activity.model");
const { deleteImgCloudinary } = require("../middlewares/img.middleware");

const getAllActivities = async (req, res, next) => {
  try {
    const Activities = await Activity.find().populate("comments feeds");
    res.status(200).json(Activities);
  } catch (error) {
    return next(error);
  }
};

const getActivityByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id).populate("comments feeds");
    return res.status(200).json(activity);
  } catch (error) {
    return next(error);
  }
};

const createActivities = async (req, res, next) => {
  try {
    const newActivity = new Activity({
      ...req.body,
      image: req.file
        ? req.file.path
        : "https://res.cloudinary.com/dy4mossqz/image/upload/v1678118078/utils/Placeholder_view_vector.svg_z87jyu.png",
    });
    const createdActivity = await newActivity.save();
    return res.status(201).json(createdActivity);
  } catch (error) {
    return next(error);
  }
};

const updateActivities = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newActivity = new Activity(req.body);
    newActivity._id = id;
    const originalActivity = await Activity.findById(id);
    if (req.file) {
      deleteImgCloudinary(originalActivity.image);
      newActivity.image = req.file.path;
    }
    await Activity.findByIdAndUpdate(id, newActivity);
    return res.status(200).json(newActivity);
  } catch (error) {
    return next(error);
  }
};

const deleteActivities = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteActivities = await Activity.findByIdAndDelete(id);
    if (deleteActivities.image) {
      deleteImgCloudinary(deleteActivities.image);
      return res.status(200).json(deleteActivities);
    }
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
