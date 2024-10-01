import * as authServices from "../services/authServices.js";

const greateOrder = async (id) => {
  let foundUser = await authServices.userFull(id);
  const hasPendingOrder = foundUser.orders.some(
    (order) => order.status === "Pending"
  );
  if (foundUser.orders.length === 0 || !hasPendingOrder) {
    const newOrder = await authServices.addOrder({ owner: foundUser.id });
    foundUser.orders.push(newOrder.id);
    await foundUser.save();
    foundUser = await authServices.userFull(id);
  }

  const pendingOrders = foundUser.orders.filter(
    (order) => order.status === "Pending"
  );
  return pendingOrders;
};

export default greateOrder;
