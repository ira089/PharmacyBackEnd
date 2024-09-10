import Order from "../models/Orders.js";

export const addOrder = data => Order.create(data);