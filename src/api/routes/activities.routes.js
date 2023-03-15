const express = require("express");
const ActivityRoutes = express.Router();
const { upload } = require("../middlewares/img.middleware");
const {
  getAllActivities,
  getActivityByID,
  createActivities,
  updateActivities,
  deleteActivities,
} = require("../controllers/activity.controller.js");

ActivityRoutes.get("/", getAllActivities);
ActivityRoutes.get("/:id", getActivityByID);
ActivityRoutes.post("/", upload.single("image"), createActivities);
ActivityRoutes.patch("/:id", updateActivities);
ActivityRoutes.delete("/:id", deleteActivities);

module.exports = ActivityRoutes;
