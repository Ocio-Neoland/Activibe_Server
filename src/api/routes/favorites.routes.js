const express = require("express");
const FavoritesRoutes = express.Router();
const { isAuth } = require("../middlewares/user.middleware");

const {
  getAllFavorites,
  getFavoriteByID,
  createFavorites,
  updatefavorites,
  deleteFavorites,
} = require("../controllers/favorite.controller");
FavoritesRoutes.get("/", getAllFavorites);
FavoritesRoutes.get("/:id", getFavoriteByID);
FavoritesRoutes.post("/", [isAuth], createFavorites);
FavoritesRoutes.patch("/:id", [isAuth], updatefavorites);
FavoritesRoutes.delete("/:id", [isAuth], deleteFavorites);

module.exports = FavoritesRoutes;
