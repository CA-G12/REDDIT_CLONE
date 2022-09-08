const joi = require('joi');

const signupSchema = joi.object({
  email: joi.string().email().lowercase().required(),

  username: joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: joi.string()
    .pattern(/^[a-zA-Z0-9]{8,30}$/).required(),

  country: joi.string().allow(null).allow(''),
});

const loginSchema = joi.object({
  email: joi.string().email().lowercase().required(),
});

const postSchema = joi.object({
  content: joi.string().required(),
  image: joi.string().lowercase().pattern(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).allow(null),
  user_id: joi.number(),
});

module.exports = { signupSchema, loginSchema, postSchema };
