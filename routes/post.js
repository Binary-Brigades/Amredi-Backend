const postRouter = require("express").Router();

const postController = require("../controllers/postController");
const { verifyAccessToken } = require("../helpers/getJwt");

// get all posts
postRouter.get("/post/getall", verifyAccessToken, postController.getAllPosts);
// Create a new post
postRouter.post("/post/create", verifyAccessToken, postController.createPost);

module.exports = { postRouter };
