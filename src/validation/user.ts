import Joi from "joi";

export const createUserRequestValidation = Joi.object({
  username: Joi.string().required().alphanum().max(32).trim(),
  password: Joi.string().required().min(8).trim(),
});
