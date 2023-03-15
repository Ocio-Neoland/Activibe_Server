const express = require("express");
const SectionRoutes = express.Router();
const {
  getAllSections,
  getSectionByID,
  createSections,
  updateSections,
  deleteSections,
} = require("../controllers/section.controller.js");

SectionRoutes.get("/", getAllSections);
SectionRoutes.get("/:id", getSectionByID);
SectionRoutes.post("/", createSections);
SectionRoutes.patch("/:id", updateSections);
SectionRoutes.delete("/:id", deleteSections);

module.exports = SectionRoutes;
