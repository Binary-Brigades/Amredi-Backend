const joi = require("joi");

exports.registerSchema = joi.object({
  first_name: joi.string().alphanum().min(3).max(30).required(),
  last_name: joi.string().alphanum().min(3).max(30).required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  phone_number: joi.string().required(),
  confirm_password: joi.ref("password"),
  location: joi.object().keys({
    type: joi.string().required(),
    coordinates: joi.array().items(joi.number().required()),
  }),
});
