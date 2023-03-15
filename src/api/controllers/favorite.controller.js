const Favorite = require("../models/favorite.model");

const getAllFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find().populate("idUser activities");
    res.status(200).json(favorites);
  } catch (error) {
    return next(error);
  }
};

const getFavoriteByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const favorite = await Favorite.findById(id).populate("idUser activities");
    return res.status(200).json(favorite);
  } catch (error) {
    return next(error);
  }
};

const createFavorites = async (req, res, next) => {
  try {
    const newFavorite = new Favorite(req.body);
    const createdFavorite = await newFavorite.save();
    return res.status(201).json(createdFavorite);
  } catch (error) {
    return next(error);
  }
};

const updatefavorites = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedFavorite = await Favorite.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedFavorite);
  } catch (error) {
    return next(error);
  }
};

const deleteFavorites = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteFavorite = await Favorite.findByIdAndDelete(id);
    res.status(200).json(deleteFavorite);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllFavorites,
  getFavoriteByID,
  createFavorites,
  updatefavorites,
  deleteFavorites,
};
