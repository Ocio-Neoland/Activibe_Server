const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/token");

const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      //   password: req.body.password,
      //   userName: req.body.userName,
    });
    if (!user) {
      return next("User not found");
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken(user._id, user.email);
      return res
        .status(200)
        .json({ user: { email: user.email, _id: user._id }, token: token });
    }
  } catch (error) {
    return next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const userExist = await User.findOne({ email: newUser.email });
    if (userExist) {
      return next("User already exist");
    }
    const createdUser = await newUser.save();
    createdUser.password = null;
    return res.status(201).json(createdUser);
  } catch (error) {
    return next(error);
  }
};
const getUserByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);
    res.status(200).json(deleteUser);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
  getUserByID,
  updateUser,
  deleteUser,
};
