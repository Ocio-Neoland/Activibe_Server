const mongoose = require("mongoose");
const FeedSchema = new mongoose.Schema(
  {
    feed: {
      type: String,
      required: true,
      trim: true,
    },
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    idActivity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
    },
    stars: {
      type: Number,
      required: true,
      trim: true,
      enum: [1, 2, 3, 4, 5],
    },
  },
  {
    timestamps: true,
  }
);

const Feed = mongoose.model("Feed", FeedSchema);
module.exports = Feed;
