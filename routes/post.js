const postRouter = require("express").Router();

const postController = require("../controllers/postController");
const { verifyAccessToken } = require("../helpers/getJwt");

// get all posts
postRouter.get("/post/getall", verifyAccessToken, postController.getAllPosts);
// Create a new post
postRouter.post("/post/create", verifyAccessToken, postController.createPost);
// like a post
postRouter.post(
  "/post/:postId/like",
  verifyAccessToken,
  postController.likePost
);

module.exports = { postRouter };
