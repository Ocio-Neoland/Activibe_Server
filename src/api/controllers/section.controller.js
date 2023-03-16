const Section = require("../models/section.model");

//  getAll, CRUD

const getAllSections = async (req, res, next) => {
  try {
    const sections = await Section.find().populate("activities");
    res.status(200).json(sections);
  } catch (error) {
    return next(error);
  }
};

const getSectionByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const section = await Section.findById(id).populate("activities");
    return res.status(200).json(section);
  } catch (error) {
    return next(error);
  }
};

const createSections = async (req, res, next) => {
  try {
    const newSection = new Section(req.body);
    const createdSection = await newSection.save();
    return res.status(201).json(createdSection);
  } catch (error) {
    return next(error);
  }
};

const updateSections = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedSection = await Section.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedSection);
  } catch (error) {
    return next(error);
  }
};

const deleteSections = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteSections = await Section.findByIdAndDelete(id);
    res.status(200).json(deleteSections);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllSections,
  getSectionByID,
  createSections,
  updateSections,
  deleteSections,
};
