exports.createPost = async (req, res) => {
  try {
    const { title, description, images } = req.body;
    const createdBy = req.user.id;

    // Upload images to Cloudinary and store public IDs
    const imageUploads = images.map(async (image) => {
      const result = await cloudinary.uploader.upload(image, {
        folder: "amredi",
      });
      return { publicId: result.public_id, url: result.secure_url };
    });

    const uploadedImages = await Promise.all(imageUploads);

    // Create the post with image public IDs
    const post = await Post.create({
      title,
      description,
      images: uploadedImages,
      createdBy,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    // Fetch posts from the database
    const posts = await Post.find();

    // Return posts with correct image URLs
    const postsWithImages = posts.map((post) => ({
      ...post.toObject(),
      images: post.images.map((image) => ({
        ...image,
        url: `YOUR_CLOUDINARY_BASE_URL/${image.publicId}`, // Construct image URL using public ID
      })),
    }));

    res.json(postsWithImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
