import User from "../models/User.js";
import Order from "../models/Order.js";

export const findUser = (filter) => User.findOne(filter);

export const signup = (data) => User.create(data);

export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);

export const clearUsers = () => User.deleteMany({});

export const userFull = (id) => User.findById(id).populate("orders", "-owner");
// export const userFull = (id) => User.findById(id);
