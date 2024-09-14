import * as orderItemService from "../services/orderItemsService.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const addOrderItem = async (req, res) => {
  console.log(req.body);
  const { idOrder: owner } = req.body;
  const result = await orderItemService.addOrderItemService({
    ...req.body,
    owner,
  });

  res.status(201).json(result);
};

const allOrderItem = async (req, res) => {
  const { id: owner } = req.params;
  const result = await orderItemService.allOrderItemsService({ owner });
  if (!result) {
    throw HttpError(404, `Cart not found`);
  }
  res.json({
    result,
  });
};

const updOrderItem = async (req, res) => {
  const { idOrder: owner } = req.body;
  const { id } = req.params;
  const result = await orderItemService.updOrderItemService(
    { owner, _id: id },
    req.body
  );
  if (!result) {
    throw HttpError(404, `Cart not found`);
  }

  res.json(result);
};

const delOrderItem = async (req, res) => {
  // const { idOrder: owner } = req.body;
  const { id } = req.params;
  const result = await orderItemService.deleteOrderItemService({
    _id: id,
  });
  if (!result) {
    throw HttpError(404, `Cart not found`);
  }

  res.json(result);
};

export default {
  addOrderItem: ctrlWrapper(addOrderItem),
  allOrderItem: ctrlWrapper(allOrderItem),
  updOrderItem: ctrlWrapper(updOrderItem),
  delOrderItem: ctrlWrapper(delOrderItem),
};
