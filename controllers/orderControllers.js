import * as orderServices from "../services/orderServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const addOrder = async (req, res) => {
  //   console.log(req.body);
  const { _id: owner } = req.user;
  const result = await orderServices.addOrderService({
    ...req.body,
    owner,
  });
  res.status(201).json(result);
};

// const cartsAll = () => {};

const updOrder = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  console.log(owner);
  console.log(id);
  const result = await orderServices.updOrderService(
    { owner, _id: id },
    req.body
  );
  if (!result) {
    throw HttpError(404, `Order not found`);
  }
  res.json(result);
};

export default {
  addOrder: ctrlWrapper(addOrder),
  updOrder: ctrlWrapper(updOrder),
};
