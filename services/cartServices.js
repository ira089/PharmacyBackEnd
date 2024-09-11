import Cart from "../models/Cart.js";

export const addCart = data => Cart.create(data);