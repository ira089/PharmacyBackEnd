import Product from "../models/Product.js";
// export const getAllproducts = ()=> Product.find();

export const getAllproducts = (filter = {}, setting = {}) => {
    return Product.find(filter, null, setting);
};

export const countProducts = filter => Product.countDocuments(filter);