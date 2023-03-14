const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true, trim: true },
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    idActivity: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
