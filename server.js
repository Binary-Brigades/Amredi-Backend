const express = require("express");
const logger = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const createError = require("http-errors");
const { authRouter } = require("./routes/auth");
const { userRouter } = require("./routes/user");
const postRoutes = require("./routes/post");
require("./helpers/mongoDBHelper");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const upload = multer();

// Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

dotenv.config();
const app = express();

// middlewares
app.use(upload.any());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cors());

app.get("/", async (req, res) => {
  res.status(200).json({
    "Hello there": "Welcome to the amredi app",
  });
});

app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", postRoutes);

// error handling
app.use(async (req, res, next) => {
  const error = createError.NotFound("The page does not exist");
  next(error);
});

app.use(async (error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).json({
    message: error.message,
    status: error.status,
  });
});

const port = process.env.PORT || 5000;

app.listen(port, (error) => {
  if (error) {
    console.error(`An error has occured: ${error}`);
  }
  console.log(`app running on http://127.0.0.1:${port}`);
});
