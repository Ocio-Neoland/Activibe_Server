const express = require("express");
const UserRoutes = express.Router();
const { upload } = require("../middlewares/img.middleware");
const {
  loginUser,
  registerUser,
  getUserByID,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller.js");

UserRoutes.get("/", getUserByID);
UserRoutes.post("/", upload.single("avatar"), registerUser);
UserRoutes.post("/", loginUser);
UserRoutes.patch("/:id", updateUser);
UserRoutes.delete("./:id", deleteUser);

module.exports = UserRoutes;
