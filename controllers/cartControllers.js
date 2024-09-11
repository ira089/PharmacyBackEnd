import * as cartServices from "../services/cartServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const addProductCart = async (req, res) => {
  console.log(req.body);
  const { _id: owner } = req.user;
  //   const cart = req.body.cartUser.map((el) => ({
  //     owner: el.idProduct,
  //     quantity: el.quantity,
  //   }));
  //   console.log(cart)
  const result = await cartServices.addCart({
    ...req.body,
    owner,
  });

  res.status(201).json(result);
};

const cartsAll = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await cartServices.getCart({ owner });
  if (!result) {
    throw HttpError(404, `Cart not found`);
  }
  res.json({
    result,
  });
};

const updQuantity = async (req, res) => {
  const { _id: owner } = req.user;
  // const { id } = req.params;
  const result = await cartServices.updateCartByFilter({ owner }, req.body);
  if (!result) {
    throw HttpError(404, `Cart not found`);
  }

  res.json(result);
};

export default {
  addProductCart: ctrlWrapper(addProductCart),
  cartsAll: ctrlWrapper(cartsAll),
  updQuantity: ctrlWrapper(updQuantity),
};
