import * as orderServices from "../services/orderServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const checkOrder = async (req, res) => {
//   console.log(req.body);
  const { _id: owner } = req.user;
  const cart = req.body.cart.map((el) => ({
    owner: el.product,
    quantity: el.quantity,
  }));
  console.log(cart)
 
  const result = await orderServices.addOrder({
    ...req.body,
    owner,
    cart
  });

  res.status(201).json(result);
};

const cartsAll = () => {};

const updQuantity = () => {};

export default {
  checkOrder: ctrlWrapper(checkOrder),
  cartsAll: ctrlWrapper(cartsAll),
  updQuantity: ctrlWrapper(updQuantity),
};
