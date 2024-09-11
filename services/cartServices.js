import Cart from "../models/Cart.js";

export const getCart = (filter = {}) => {
  return Cart.find(filter, "-createdAt -updatedAt");
};

export const addCart = (data) => Cart.create(data);

export const updateCartByFilter = (filter, data) =>
  Cart.findOneAndUpdate(filter, data);
