import express from "express";
import orderItemsControllers from "../controllers/orderItemsControlles.js";
import authenticate from "../middlewares/authenticate.js";
import { orderItemsSchema} from "../schemas/ordersShema.js";
import validateBody from "../decorators/validateBody.js";
import {isValidId} from "../middlewares/isValidId.js";

const orderItemsRouter = express.Router();
orderItemsRouter.use(authenticate);

orderItemsRouter.get("/", orderItemsControllers.allOrderItem);
orderItemsRouter.put("/:id", isValidId, validateBody(orderItemsSchema), orderItemsControllers.updOrderItem);
orderItemsRouter.post("/", validateBody(orderItemsSchema), orderItemsControllers.addOrderItem);
orderItemsRouter.delete("/:id", isValidId, validateBody(orderItemsSchema), orderItemsControllers.delOrderItem);


export default orderItemsRouter;