const cloudinary = require("cloudinary").v2;
const { Project } = require("../models/projectModel");
const { Group } = require("../models/groupModel");
const { userModel } = require("../models/userModel");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.createProject = async (req, res) => {
  try {
    const user = await userModel.findById(req.payload.aud);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const group = await Group.findById(req.params.groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    // Ensure only the group's admin can create projects
    if (group.createdBy.toString() !== req.payload.aud.toString()) {
      return res
        .status(403)
        .json({ error: "Only the group admin can create projects" });
    }

    const imageFiles = req.files; //  multiple files can be uploaded
    if (!imageFiles || imageFiles.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const imageUrls = [];

    // Iterate through each image file, upload it to Cloudinary, and store its URL
    for (const imageFile of imageFiles) {
      const imageBuffer = imageFile.buffer.toString("base64");
      const result = await cloudinary.uploader.upload(
        `data:${imageFile.mimetype};base64,${imageBuffer}`,
        {
          folder: "amrediprojects", // Replace 'your_folder_name' with your desired folder name on Cloudinary
        }
      );
      imageUrls.push(result.secure_url);
    }

    const { name, description, category } = req.body;

    const project = await Project.create({
      name,
      description,
      category,
      createdBy: user._id,
      groupId: group._id, // Assign the group ID to the project
      imageUrls,
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Error creating project" });
  }
};
