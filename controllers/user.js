const { userModel } = require("../models/userModel");

exports.userProfile = async (req, res, next) => {
  const user = await userModel.findById(req.payload.aud);
  const userProfile = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  };
  
  return res.status(200).json(userProfile);
};
