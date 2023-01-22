const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "post must have a string"],
    },
    body: {
      type: String,
      require: [true, "post must have a body"],
    },
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;
