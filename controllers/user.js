const { userModel } = require("../models/userModel");
const { hashPassword } = require("../utils/hashPassword");

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
   const data = req.body
   if("password" in data){
      data.password = await hashPassword(data.password)
   }
  const user = await userModel.findByIdAndUpdate(req.payload.aud, {"$set": data}, {new: true});
  return res.status(200).json(user);
};
