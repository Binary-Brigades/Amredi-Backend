const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    publicId: String, //Cloudinary public ID
    url: String, //full image URL
  },

  time: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

exports.Post = mongoose.model("Post", postSchema);
