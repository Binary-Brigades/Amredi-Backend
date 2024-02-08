const jwt = require("jsonwebtoken");
const createError = require("http-errors")
require("dotenv").config();

const generateAccessToken = async (data) => {
  return new Promise((resolve, reject) => {
    const payload = {
      email: data.email,
    };
    const secretKey = process.env.AccessTokenSecretKey;
    const expire_time = process.env.AccessTokenExpires;
    const options = {
      expiresIn: expire_time,
      audience: data.userID,
      issuer: "application",
    };
    jwt.sign(payload, secretKey, options, (error, token) =>{
      if(error){
         console.log(error.message)
         const err = createError.InternalServerError("error when generating token ");
        return reject(err);
      }
      resolve(token)
    })
  });
};

module.exports = { generateAccessToken }