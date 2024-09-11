import Joi from "joi";
import * as userConstants from "../constants/userConstants.js";

export const cartAddItemSchema = Joi.object({
    idProduct: Joi.string().required(),
    quantity: Joi.string().pattern(userConstants.quantityRegepxp).required(),
    })

export const cartAddSchema = Joi.object({
    total: Joi.string().pattern(userConstants.priceRegepxp).required(),
    totalQuantity: Joi.string().pattern(userConstants.quantityRegepxp).required(),
    cart: Joi.array().items(cartAddItemSchema).required(),
    })