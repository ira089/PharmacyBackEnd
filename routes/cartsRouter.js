import express from "express";
import {isValidId} from '../middlewares/isValidId.js'
import cartsControllers from "../controllers/cartsControllers.js";
import isValidId from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";

import { movieAddSchema, movieUpdateSchema } from "../schemas/moviesSchemas.js";
import validateBody from "../decorators/validateBody.js";

const cartsRouter = express.Router();
cartsRouter.use(authenticate);

cartsRouter.get("/", cartsControllers.cartsAll);
cartsRouter.put("/update", isValidId,  cartsControllers.updQuantity);
cartsRouter.post("/checkout", isValidId,  cartsControllers.checkOrder);


export default cartsRouter;