const postRouter = require("express").Router();

const postController = require("../controllers/postController");
const { verifyAccessToken } = require("../helpers/getJwt");

// get all posts
postRouter.get("/post/getall", verifyAccessToken, postController.getAllPosts);
// get post by id
postRouter.get("/post/:postId/getpost", postController.getPostById);
// get posts by a user
postRouter.get(
  "/post/user/getposts",
  verifyAccessToken,
  postController.getPostsByUser
);
// Create a new post
postRouter.post("/post/create", verifyAccessToken, postController.createPost);
// get likes from a post
postRouter.get(
  "/post/:postId/getlikes",
  verifyAccessToken,
  postController.getPostLikes
);
// like a post
postRouter.post(
  "/post/:postId/like",
  verifyAccessToken,
  postController.likePost
);

module.exports = { postRouter };
