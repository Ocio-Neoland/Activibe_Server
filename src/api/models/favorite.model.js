const mongoose = require("mongoose");
const FavoriteSchema = new mongoose.Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    activities: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Favorite = mongoose.model("Favorite", FavoriteSchema);
module.exports = Favorite;
