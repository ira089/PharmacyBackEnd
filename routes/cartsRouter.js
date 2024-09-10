import express from "express";
import orderControllers from "../controllers/orderControllers.js";
import authenticate from "../middlewares/authenticate.js";

import { cartAddSchema,cartUpdSchema} from "../schemas/ordersShema.js";
import validateBody from "../decorators/validateBody.js";

const cartsRouter = express.Router();
cartsRouter.use(authenticate);

cartsRouter.get("/", orderControllers.cartsAll);
cartsRouter.put("/update", validateBody(cartUpdSchema),  orderControllers.updQuantity);
cartsRouter.post("/checkout", validateBody(cartAddSchema),  orderControllers.checkOrder);


export default cartsRouter;