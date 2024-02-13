const { userModel } = require("../models/userModel");
const { hashPassword } = require("../utils/hashPassword");
const { formatUserData } = require("../utils/utils");

exports.userProfile = async (req, res, next) => {
  const user = await userModel.findById(req.payload.aud);
  const userProfile = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  };
  return res.status(200).json(userProfile);
};

exports.editProfile = async (req, res, next) => {
  const data = req.body;
  if ("password" in data) {
    data.password = await hashPassword(data.password);
  }
  const user = await userModel.findByIdAndUpdate(
    req.payload.aud,
    { $set: data },
    { new: true }
  );
  return res.status(200).json(user);
};

exports.connect = async (req, res, next) => {
  try {
    const userID = req.payload.aud;
    const user = await userModel.findById(userID);
    const location = user.location;
    const data = await formatUserData(
      process.env.maxDistance,
      location,
      user.userID
    )
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
