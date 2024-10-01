import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config.js";
import HttpError from "../helpers/HttpError.js";
import greateOrder from "../helpers/greateOrder.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as authServices from "../services/authServices.js";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await authServices.signup({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
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
  const pendingOrders = await greateOrder(user.id);

  res.status(200).json({
    token: token,
    name: user.name,
    email: user.email,
    phone: user.phone,
    orders: pendingOrders,
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
  const { email, name, phone } = req.user;
  const pendingOrders = await greateOrder(_id);

  res.status(201).json({
    email,
    name,
    phone,
    orders: pendingOrders,
  });
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
