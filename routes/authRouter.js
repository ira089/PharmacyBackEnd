import express from "express";
import authControllers from "../controllers/authControllers.js";
import * as usersSchemas from "../schemas/usersSchemas.js";
import validateBody from "../decorators/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import { orderSchema } from "../schemas/ordersShema.js";
import { isValidId } from "../middlewares/isValidId.js";
// import upload from "../middlewares/uploads.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(usersSchemas.userSignupSchema),
  authControllers.signup
);

authRouter.post(
  "/login",
  validateBody(usersSchemas.userSigninSchema),
  authControllers.signin
);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/logout", authenticate, authControllers.signout);

authRouter.get("/current/full", authenticate, authControllers.currentUserFull);

authRouter.put(
  "/current/upd/:id",
  authenticate,
  isValidId,
  validateBody(orderSchema),
  authControllers.updateOrder
);

// authRouter.get("/verify/:verificationToken", authControllers.verify );

// authRouter.post("/verify", validateBody(usersSchemas.userEmailSchema), authControllers.resendVerify );

export default authRouter;
