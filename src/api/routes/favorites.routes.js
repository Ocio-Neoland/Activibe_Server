const express = require("express");
const FavoritesRoutes = express.Router();
const {
  getAllFavorites,
  getFavoriteByID,
  createFavorites,
  updatefavorites,
  deleteFavorites,
} = require("../controllers/favorite.controller");
FavoritesRoutes.get("/", getAllFavorites);
FavoritesRoutes.get("/:id", getFavoriteByID);
FavoritesRoutes.post("/", createFavorites);
FavoritesRoutes.patch("/:id", updatefavorites);
FavoritesRoutes.delete("/:id", deleteFavorites);

module.exports = FavoritesRoutes;
