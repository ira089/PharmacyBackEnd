import express from "express";
import productsControllers from "../controllers/productsControllers.js";

const productsRouter = express.Router();

productsRouter.get("/", productsControllers.productsAll);


export default productsRouter;