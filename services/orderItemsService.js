import Orderitem from "../models/Orderitem.js";

export const allOrderItemsService = (filter = {}) =>
  Orderitem.find(filter, "-createdAt -updatedAt").populate(
    "owner",
    "total totalQuantity"
  );

export const addOrderItemService = async (data) => {
  const newItem = await Orderitem.create(data);
  return Orderitem.findById(newItem._id).select("_id idProduct quantity");
};

export const updOrderItemService = (filter, data) =>
  Orderitem.findOneAndUpdate(filter, data, { new: true }).select(
    "_id idProduct quantity"
  );

export const deleteOrderItemService = (filter) =>
  Orderitem.findOneAndDelete(filter).select("_id idProduct quantity");
