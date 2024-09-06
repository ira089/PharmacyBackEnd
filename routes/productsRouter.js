import express from "express";
import {isValidId} from '../middlewares/isValidId.js'
import productsControllers from "../controllers/productsControllers.js";

const productsRouter = express.Router();

productsRouter.get("/", productsControllers.productsAll);
productsRouter.get("/:id", isValidId,  productsControllers.getById);


export default productsRouter;