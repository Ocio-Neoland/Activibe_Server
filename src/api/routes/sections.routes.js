const express = require("express");
const SectionRoutes = express.Router();
const { isAuth } = require("../middlewares/user.middleware");

const {
  getAllSections,
  getSectionByID,
  createSections,
  updateSections,
  deleteSections,
} = require("../controllers/section.controller.js");

SectionRoutes.get("/", getAllSections);
SectionRoutes.get("/:id", getSectionByID);
SectionRoutes.post("/", [isAuth], createSections);
SectionRoutes.patch("/:id", [isAuth], updateSections);
SectionRoutes.delete("/:id", [isAuth], deleteSections);

module.exports = SectionRoutes;
