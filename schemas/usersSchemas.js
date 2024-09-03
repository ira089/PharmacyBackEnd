import Joi from "joi";
import * as userConstants from "../constants/userConstants.js";

export const userSignupSchema = Joi.object({
  email: Joi.string().pattern(userConstants.emailRegepxp).required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  phone: Joi.string().pattern(userConstants.phoneRegepxp).required(),
});

export const userSigninSchema = Joi.object({
    email: Joi.string().pattern(userConstants.emailRegepxp).required(),
    password: Joi.string().required(),
  });


