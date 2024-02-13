const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// Create a new post
router.post("/post", postController.createPost);

module.exports = router;
