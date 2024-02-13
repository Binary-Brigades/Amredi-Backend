const postRouter = require("express").Router();

const postController = require("../controllers/postController");
const { verifyAccessToken } = require("../helpers/getJwt");


// get all posts
postRouter.get("post/getall", getAllPosts);
// Create a new post
postRouter.post("/post/create", verifyAccessToken, postController.createPost);



// const {
//   getAllPosts,
//   getPostById,
//   getPostsByUser,
// } = require("../controllers/postController");

// // Fetch all posts
// router.get("/", getAllPosts);
