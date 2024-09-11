import express from "express";
import orderControllers from "../controllers/orderControllers.js";
import authenticate from "../middlewares/authenticate.js";
import { orderSchema} from "../schemas/ordersShema.js";
import validateBody from "../decorators/validateBody.js";

const orderRouter = express.Router();
orderRouter.use(authenticate);

// orderRouter.get("/", cartControllers.cartsAll);
orderRouter.put("/update", validateBody(orderSchema), orderControllers.updOrder);
orderRouter.post("/", validateBody(orderSchema), orderControllers.addOrder);


export default orderRouter;