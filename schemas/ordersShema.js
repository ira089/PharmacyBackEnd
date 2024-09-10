import Joi from "joi";
import * as userConstants from "../constants/userConstants.js";

export const cartAddItemSchema = Joi.object({
  product: Joi.string().required(),
  quantity: Joi.string().pattern(userConstants.quantityRegepxp).required(),
});

export const cartAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  paymentMethod: Joi.string()
    .valid(...userConstants.paymentMethodList)
    .required(),
  price: Joi.string().pattern(userConstants.priceRegepxp).required(),
  products: Joi.string().pattern(userConstants.quantityRegepxp).required(),
  cart: Joi.array().items(cartAddItemSchema).required(),
});

export const cartUpdSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  address: Joi.string(),
  paymentMethod: Joi.string().valid(...userConstants.paymentMethodList),
  total: Joi.string().pattern(userConstants.priceRegepxp).required(),
  totalQuantity: Joi.string().pattern(userConstants.quantityRegepxp).required(),
  productsUser: Joi.array().items(cartAddItemSchema).required(),
});
