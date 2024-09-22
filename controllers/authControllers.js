import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as authServices from "../services/authServices.js";
import Order from "../models/Order.js";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  let newUser = await authServices.signup({
    ...req.body,
    password: hashPassword,
  });
  const newOrder = await authServices.addOrder({ owner: newUser._id });

  newUser.orders.push(newOrder._id);
  await newUser.save();
  newUser = await authServices.userFull(newUser._id);

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      orders: newUser.orders,
    },
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompane = await bcrypt.compare(password, user.password);
  if (!passwordCompane) {
    throw HttpError(401, "Email or password is wrong");
  }
  const { _id: id } = user;
  const payload = { id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "27h" });
  await authServices.updateUser({ _id: id }, { token });

  const newUser = await authServices.userFull(user.id);

  res.status(200).json({
    token: token,
    name: user.name,
    email: user.email,
    phone: user.phone,
    orders: newUser.orders,
  });
};

const getCurrent = async (req, res) => {
  const { email, name, phone } = req.user;
  res.status(201).json({ email, name, phone });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await authServices.updateUser({ _id }, { token: "" });

  res.status(204).json({
    message: "Signout success",
  });
};

const currentUserFull = async (req, res) => {
  const { _id } = req.user;
  try {
    let foundUser = await authServices.userFull(_id);
    const hasPendingOrder = foundUser.orders.some(
      (order) => order.status === "Pending"
    );
    if (foundUser.orders.length === 0 || !hasPendingOrder) {
      const newOrder = new Order({ owner: foundUser._id });
      await newOrder.save();

      foundUser.orders.push(newOrder._id);
      await foundUser.save();

      foundUser = await authServices.userFull(_id);
    }

    const { password, ...user } = foundUser.toObject();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateOrder = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await authServices.updateOrder({ owner, _id: id }, req.body);
  if (!result) {
    throw HttpError(404, `Order with id=${id} not found`);
  }
  res.json(result);
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  currentUserFull: ctrlWrapper(currentUserFull),
  updateOrder: ctrlWrapper(updateOrder),
};
