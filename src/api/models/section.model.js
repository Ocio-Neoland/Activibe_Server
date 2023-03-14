const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema(
  {
    sections: {
      Naturaleza: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
      JuegosDeMesa: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
      Adrenalina: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
      Deportes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
      Exoticos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
      Otros: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
    },
  },
  {
    timestamps: true,
  }
);
const Section = mongoose.model("Section", SectionSchema);
module.exports = Section;
