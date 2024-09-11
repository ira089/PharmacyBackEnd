import Orderitem from "../models/Orderitem.js";

export const allOrderItemsService = (filter = {}) => Orderitem.find(filter, "-createdAt -updatedAt").populate("owner", "total totalQuantity");

export const addOrderItemService = data => Orderitem.create(data);

export const updOrderItemService = (filter, data) =>
    Orderitem.findOneAndUpdate(filter, data);

export const deleteOrderItemService = filter => Orderitem.findOneAndDelete(filter);