const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    Activities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
  },
  {
    timestamps: true,
  }
);
const Section = mongoose.model("Section", SectionSchema);
module.exports = Section;
