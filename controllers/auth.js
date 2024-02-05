const createError = require("http-errors");
const { registerSchema } = require("../helpers/shemaValidation");
const { userModel } = require("../models/userModel");

exports.Register = async (req, res, next) => {
  try {
    const data = req.body;
    const regex = /^\+\d{1,3}\d{3,}$/;
    const result = registerSchema.validate(data);
    if (result.error) {
      const error = result.error.details[0].message;
      throw createError.BadRequest(error);
    }
    else if(!regex.test(data.phone_number)){
      throw createError.BadRequest("Invalid phone number..")
    }
    const existUser = await userModel.findOne({email: data.email})
    if (existUser){
      throw createError.Conflict( `${data.email} already taken`)
    }
    const exist_phone = await userModel.findOne({phone_number: data.phone_number})
    if(exist_phone){
      throw createError.Conflict( `${data.phone_number} already taken`)
    }
    const user = userModel(data)
    const savedUser = await user.save()


    return res.status(200).json(savedUser);
  } catch (error) {
    next(error);
  }
};
