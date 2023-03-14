const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: false, trim: true },
    description: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    coordinates: { type: String, required: false, trim: true },
    type: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Naturaleza",
        "JuegosDeMesa",
        "Adrenalina",
        "Deportes",
        "Exoticos",
        "Otros",
      ],
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    feeds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feed" }],
    validate: { type: Boolean, default: false, enum: [false, true] },
  },
  {
    timestamps: true,
  }
);
const Activity = mongoose.model("Activity", ActivitySchema);
module.exports = Activity;
