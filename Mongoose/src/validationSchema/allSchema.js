const Joi = require("joi");

// Registration validation schema
const registrationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().max(264).required(),
  password: Joi.string().min(6).max(128).required(),
});

// Login validation schema
const loginSchema = Joi.object({
  email: Joi.string().email().max(264).required(),
  password: Joi.string().min(2).max(128).required(),
});

module.exports = {
  registrationSchema,
  loginSchema,
};
