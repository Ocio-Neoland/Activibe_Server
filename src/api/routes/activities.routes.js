const express = require("express");
const ActivityRoutes = express.Router();
const { upload } = require("../middlewares/img.middleware");
const { isAuth } = require("../middlewares/user.middleware");

const {
  getAllActivities,
  getActivityByID,
  createActivities,
  updateActivities,
  deleteActivities,
} = require("../controllers/activity.controller.js");

ActivityRoutes.get("/", getAllActivities);
ActivityRoutes.get("/:id", getActivityByID);
ActivityRoutes.post("/", [isAuth], upload.single("image"), createActivities);
ActivityRoutes.patch(
  "/:id",
  [isAuth],
  upload.single("image"),
  updateActivities
);
ActivityRoutes.delete("/:id", [isAuth], deleteActivities);

module.exports = ActivityRoutes;
