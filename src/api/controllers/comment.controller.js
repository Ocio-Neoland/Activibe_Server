const Comment = require("../models/comment.model");

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
    const createdComment = await newComment.save();
    return res.status(201).json(createdComment);
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
