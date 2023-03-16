const express = require("express");
const UserRoutes = express.Router();
const { upload } = require("../middlewares/img.middleware");
const { isAuth } = require("../middlewares/user.middleware");

const {
  getAllUsers,
  loginUser,
  registerUser,
  getUserByID,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller.js");

UserRoutes.get("/:id", getUserByID);
UserRoutes.get("/", [isAuth], getAllUsers);
UserRoutes.post("/", upload.single("avatar"), registerUser);
UserRoutes.post("/login", loginUser);
UserRoutes.patch("/:id", [isAuth], upload.single("avatar"), updateUser);
UserRoutes.delete("/:id", [isAuth], deleteUser);

module.exports = UserRoutes;
