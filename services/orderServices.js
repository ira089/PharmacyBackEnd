import Order from "../models/Order";

export const addOrderService = (data) => Order.create(data);

export const updOrderService = (filter, data) =>
  Order.findOneAndUpdate(filter, data);
