const createError = require("http-errors");
const { registerSchema } = require("../helpers/shemaValidation");
const { userModel } = require("../models/userModel");
const { generatePassword } = require("../utils/generateOTP");
const { sendMail } = require("../utils/sendMail");

exports.Register = async (req, res, next) => {
  try {
    const data = req.body;
    const regex = /^\+\d{1,3}\d{3,}$/;
    const result = registerSchema.validate(data);
    if (result.error) {
      const error = result.error.details[0].message;
      throw createError.BadRequest(error);
    } else if (!regex.test(data.phone_number)) {
      throw createError.BadRequest("Invalid phone number..");
    }
    const existUser = await userModel.findOne({ email: data.email });
    if (existUser) {
      throw createError.Conflict(`${data.email} already taken`);
    }
    const exist_phone = await userModel.findOne({
      phone_number: data.phone_number,
    });
    if (exist_phone) {
      throw createError.Conflict(`${data.phone_number} already taken`);
    }
    const code = generatePassword(4);
    const message = `
    <h1>Hello ${data.first_name}</h1><h3>Thank you for registering an account with Amredi</h3>
    <p>Use the code below to verify your account</p>
    <h4><bold>${code}</bold></h4>
    `;
    const mailResponse = await sendMail({
      html: message,
      subject: "Account Verification",
      email: data.email,
    });
    console.log(mailResponse)
    data.code = code;
    const user = new userModel(data);
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "user registerd successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyAccount = async(req, res, next) =>{
  try {
    const {code }= req.body
    if(!code){
      throw createError.BadRequest("verification code required")
    }
    const user = await userModel.findOne({code: code})
    if(!user){
      throw createError.Unauthorized("Invalid code")
    }
    await userModel.findOneAndUpdate({code: code},{"$set": {"verified": true}}, {new: true})
    // {new: true} -> returns the updated version of the document
    return res.status(202).json({
      "status": "success. account verified successfully"
    })
  } catch (error) {
    next(error)
    
  }
}
