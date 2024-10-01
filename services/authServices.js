import User from "../models/User.js";
import Order from "../models/Order.js";

export const findUser = (filter) => User.findOne(filter);

export const signup = (data) => User.create(data);

export const addOrder = (data) => Order.create(data);

export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);

export const clearUsers = () => User.deleteMany({});

export const userFull = (id) =>
  User.findById(id).select("-createdAt -updatedAt").populate({
    path: "orders",
    select: "-owner -createdAt -updatedAt",
  });

export const updateOrder = (filter, data) =>
  Order.findOneAndUpdate(filter, data);
