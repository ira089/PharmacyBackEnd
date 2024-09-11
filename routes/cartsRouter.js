import express from "express";
import cartControllers from "../controllers/cartControllers.js";
import authenticate from "../middlewares/authenticate.js";
import { cartAddSchema} from "../schemas/cartsSchema.js";
import validateBody from "../decorators/validateBody.js";

const cartsRouter = express.Router();
cartsRouter.use(authenticate);

cartsRouter.get("/", cartControllers.cartsAll);
cartsRouter.put("/update", validateBody(cartAddSchema),  cartControllers.updQuantity);
cartsRouter.post("/checkout", validateBody(cartAddSchema),  cartControllers.addProductCart);


export default cartsRouter;