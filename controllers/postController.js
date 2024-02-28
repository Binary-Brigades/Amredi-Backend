const cloudinary = require("cloudinary").v2;
const { Post } = require("../models/postModel");
const { userModel } = require("../models/userModel");
const { ObjectId } = require("mongodb");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.createPost = async (req, res) => {
  console.log(req.payload.aud);
  // const createdBy = req.payload.aud;
  try {
    // Assuming only one file is uploaded
    if (req.files) {
      const imageFile = req?.files[0];
      const user = await userModel.findById(req.payload.aud);
      // console.log(user);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Access other form fields from req.body
      const { title, description } = req.body;

      // Convert image buffer to Base64 string
      const imageBuffer = imageFile?.buffer?.toString("base64");

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
    } else {
      const user = await userModel.findById(req.payload.aud);
      // console.log(user);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Access other form fields from req.body
      const { title, description } = req.body;
      // Create the post with the uploaded image URL
      const post = await Post.create({
        title,
        description,
        image: {
          publicId: null,
          url: null,
        },
        createdBy: user._id,
      });

      res.status(201).json({
        message: "Post created successfully",
        post,
      });
    }
    // Query the database to retrieve user information
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Error creating post" });
  }
};

// get all posts
exports.getAllPosts = async (req, res) => {
  try {
    // Retrieve all posts from the database
    let posts = await Post.find();
    let postArray = [];

    // Loop through each post to populate createdBy with user's name
    for (let post of posts) {
      let postData = {
        image: "",
        _id: "",
        title: "",
        description: "",
        createdBy: "",
        likes: [""],
        time: "",
      };
      // Find the user who created the post
      const user = await userModel.findById(post.createdBy);

      if (!user) {
        console.log("User not found");
        return res.status(500).json({ error: "User not found" });
      }

      postData.image = post.image.url;
      postData._id = post._id;
      postData.title = post.title;
      postData.description = post.description;
      postData.createdBy = `${user.first_name} ${user.last_name}`;
      postData.likes = post.likes;
      postData.time = post.time;
      postArray.push(postData);
    }
    console.log(postArray);
    // Send the modified posts array as response
    res.status(200).json(postArray);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
};
// get post by id
exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
};

// get posts by a user
exports.getPostsByUser = async (req, res) => {
  try {
    const userId = req.payload.aud;

    // Find posts by user ID
    const posts = await Post.find({ createdBy: userId });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
};
// Like a post
exports.likePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.payload.aud; // user ID in req.payload

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user has already liked the post
    if (post.likes.includes(userId)) {
      return res
        .status(400)
        .json({ error: "You have already liked this post" });
    }

    // Add user's ID to the post's likes array
    post.likes.push(userId);
    await post.save();

    // Get the updated number of likes on the post
    const updatedPost = await Post.findById(postId).populate("likes");
    const numberOfLikes = updatedPost.likes.length;

    res.status(201).json({ message: "Post liked successfully", numberOfLikes });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ error: "Error liking post" });
  }
};

// get all likes from a post
exports.getPostLikes = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.payload.aud; // user ID in req.payload

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    // Get number of likes on the post
    const updatedPost = await Post.findById(postId).populate("likes");
    const numberOfLikes = updatedPost.likes.length;

    const postLikes = {
      postId: postId,
      numberOfLikes: numberOfLikes,
    };
    res.status(200).json({ postLikes });
  } catch (error) {
    console.error("Error getting likes:", error);
    res.status(500).json({ error: "Error liking post" });
  }
};
