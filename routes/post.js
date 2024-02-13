const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { verifyAccessToken } = require("../helpers/getJwt");

// Create a new post
router.post("/post",verifyAccessToken ,postController.createPost);

module.exports = router;
