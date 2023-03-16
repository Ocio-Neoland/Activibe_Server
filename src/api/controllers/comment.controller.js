const Comment = require("../models/comment.model");
const User = require("../models/user.model");
const Activity = require("../models/activity.model");
const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find().populate("idUser idActivity");
    res.status(200).json(comments);
  } catch (error) {
    return next(error);
  }
};

const getCommentByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id).populate("idUser idActivity");
    return res.status(200).json(comment);
  } catch (error) {
    return next(error);
  }
};

const createComments = async (req, res, next) => {
  try {
    const newComment = new Comment(req.body);
    const findUser = await User.findById(req.body.idUser);
    const findActivity = await Activity.findById(req.body.idActivity);
    findUser.comments.push(newComment._id);
    findActivity.comments.push(newComment._id);
    const updateUser = await User.findByIdAndUpdate(req.body.idUser, findUser);
    const updateActivity = await Activity.findByIdAndUpdate(
      req.body.idActivity,
      findActivity
    );
    const createdComment = await newComment.save();
    return res.status(201).json({ createdComment, updateUser, updateActivity });
  } catch (error) {
    return next(error);
  }
};

const updateComments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedComment = await Comment.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedComment);
  } catch (error) {
    return next(error);
  }
};

const deleteComments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteComments = await Comment.findByIdAndDelete(id);
    res.status(200).json(deleteComments);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllComments,
  getCommentByID,
  createComments,
  updateComments,
  deleteComments,
};
