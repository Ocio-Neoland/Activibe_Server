const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/token");
const { deleteImgCloudinary } = require("../middlewares/img.middleware");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate(
      "comments favorites createdActivities feeds"
    );
    res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

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
    const newUser = new User({
      ...req.body,
      avatar: req.file
        ? req.file.path
        : "https://res.cloudinary.com/dy4mossqz/image/upload/v1678118078/utils/Placeholder_view_vector.svg_z87jyu.png",
    });
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
    const user = await User.findById(id).populate("comments feeds");
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newUser = new User(req.body);
    newUser._id = id;
    const originalUser = await User.findById(id);
    if (req.file) {
      deleteImgCloudinary(originalUser.avatar);
      newUser.avatar = req.file.path;
    }
    await User.findByIdAndUpdate(id, newUser);
    return res.status(200).json(newUser);
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (user.avatar) {
      deleteImgCloudinary(user.avatar);
      return res.status(200).json(user);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllUsers,
  loginUser,
  registerUser,
  getUserByID,
  updateUser,
  deleteUser,
};
