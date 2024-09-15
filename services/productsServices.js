import Product from "../models/Product.js";

export const getAllproducts = (filter = {}, setting = {}) => {
  return Product.find(filter, setting);
};

export const countProducts = (filter) => Product.countDocuments(filter);

export const getProductById = (id) => Product.findById(id);
