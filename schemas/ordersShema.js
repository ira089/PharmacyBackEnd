import Joi from "joi";
import * as userConstants from "../constants/userConstants.js";


export const orderSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  address: Joi.string(),
  paymentMethod: Joi.string()
    .valid(...userConstants.paymentMethodList),
    total: Joi.string().pattern(userConstants.priceRegepxp).required(),
    totalQuantity: Joi.string().pattern(userConstants.quantityRegepxp).required(),
    status: Joi.string().valid(...userConstants.orderStatusList),
});

export const orderItemsSchema = Joi.object({
  idProduct: Joi.string().required(),
  idOrder: Joi.string().required(),
  quantity: Joi.string().pattern(userConstants.quantityRegepxp).required(),
  })

// export const orderUpdSchema = Joi.object({
//   name: Joi.string(),
//   email: Joi.string(),
//   phone: Joi.string(),
//   address: Joi.string(),
//   paymentMethod: Joi.string().valid(...userConstants.paymentMethodList),
//   total: Joi.string().pattern(userConstants.priceRegepxp).required(),
//   totalQuantity: Joi.string().pattern(userConstants.quantityRegepxp).required(),
 
// });
