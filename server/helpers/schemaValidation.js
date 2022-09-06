const joi = require('joi');

const authSchema = joi.object({
  username: joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/).required(),

  email: joi.string().email().lowercase().required(),

  country: joi.string().allow(null).allow(''),
});

module.exports = { authSchema };
