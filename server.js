const express = require("express");
const logger = require("morgan");
const dotenv = require("dotenv");
const createError = require("http-errors");
const { router } = require("./routes/auth");
require("./helpers/mongoDBHelper");

dotenv.config();
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.get("/", async (req, res) => {
  res.status(200).json({
    "Hello there": "Welcome to the amredi app",
  });
});

app.use("/api/v1", router)
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