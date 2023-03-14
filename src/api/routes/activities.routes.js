const express = require("express");
const ActivityRoutes = express.Router();
const {
  getAllActivities,
  getActivityByID,
  createActivities,
  updateActivities,
  deleteActivities,
} = require("../controllers/activity.controller.js");

ActivityRoutes.get("/", getAllActivities);
ActivityRoutes.get("/:id", getActivityByID);
ActivityRoutes.post("/", createActivities);
ActivityRoutes.patch("/:id", updateActivities);
ActivityRoutes.delete("./:id", deleteActivities);

module.exports = ActivityRoutes;
