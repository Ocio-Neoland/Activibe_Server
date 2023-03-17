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
  chooseFavorite,
  getRankingTop10,
} = require("../controllers/activity.controller.js");

ActivityRoutes.get("/", getAllActivities);
ActivityRoutes.get("/top10", getRankingTop10);
ActivityRoutes.get("/:id", getActivityByID);
ActivityRoutes.post("/", [isAuth], upload.single("image"), createActivities);
ActivityRoutes.patch(
  "/:id",
  [isAuth],
  upload.single("image"),
  updateActivities
);
ActivityRoutes.delete("/:id", [isAuth], deleteActivities);
ActivityRoutes.put("/favorites/:id", chooseFavorite);

module.exports = ActivityRoutes;
