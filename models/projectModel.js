const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User schema
    required: true,
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group", // Reference to the Group schema
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  imageUrls: [
    {
      type: String, // Store the URLs of the images uploaded to Cloudinary
      required: true,
    },
  ],
});

module.exports = mongoose.model("Project", projectSchema);
