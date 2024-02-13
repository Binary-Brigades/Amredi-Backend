const cloudinary = require("cloudinary").v2;
const { Post } = require("../models/postModel");
const { userModel } = require("../models/userModel");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.createPost = async (req, res) => {
  console.log(req.payload.aud);
  // const createdBy = req.payload.aud;
  try {
    const imageFile = req.files[0]; // Assuming only one file is uploaded
    if (!imageFile) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    // Query the database to retrieve user information
    const user = await userModel.findById(req.payload.aud);
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Access other form fields from req.body
    const { title, description } = req.body;

    // Convert image buffer to Base64 string
    const imageBuffer = imageFile.buffer.toString("base64");

    // Upload the image to Cloudinary as Base64 string
    const result = await cloudinary.uploader.upload(
      `data:${imageFile.mimetype};base64,${imageBuffer}`,
      {
        folder: "amredi",
      }
    );

    // Create the post with the uploaded image URL
    const post = await Post.create({
      title,
      description,
      image: {
        publicId: result.public_id,
        url: result.secure_url,
      },
      createdBy: user._id,
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Error creating post" });
  }
};
