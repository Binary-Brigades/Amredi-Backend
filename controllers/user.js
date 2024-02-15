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
    );
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// controllers/userController.js

exports.assignRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    // Find the user by ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user's role
    user.role = role;

    // Save the updated user
    await user.save();

    return res
      .status(200)
      .json({ message: "Role assigned successfully", user });
  } catch (error) {
    console.error("Error assigning role:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
