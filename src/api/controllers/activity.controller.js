const Activity = require("../models/activity.model");
const { deleteImgCloudinary } = require("../middlewares/img.middleware");
const User = require("../models/user.model");
const Section = require("../models/section.model");

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
    const findUser = await User.findById(req.body.createdBy);
    const findSection = await Section.findOne({ name: newActivity.type });
    findUser.createdActivities.push(newActivity._id);

    findSection.activities.push(newActivity._id);
    const updateUser = await User.findByIdAndUpdate(
      req.body.createdBy,
      findUser
    );
    const updateSection = await Section.findByIdAndUpdate(
      findSection._id,
      findSection
    );
    const createdActivity = await newActivity.save();
    return res.status(201).json({ createdActivity });
  } catch (error) {
    return next(error);
  }
};

const chooseFavorite = async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id);
    const user = await User.findById(req.body.userId);
    if (!activity.favorites.includes(req.body.userId)) {
      await activity.updateOne({ $push: { favorites: req.body.userId } });
      await user.updateOne({ $push: { favorites: req.params.id } });
      res.status(200).json("The activity has been liked");
    } else {
      await activity.updateOne({ $pull: { favorites: req.body.userId } });
      await user.updateOne({ $pull: { favorites: req.params.id } });
      res.status(200).json("The activity has been disliked");
    }
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
  chooseFavorite,
};
