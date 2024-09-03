import express from "express";
import storeControllers from "../controllers/storeControllers.js";

const storesRouter = express.Router();

storesRouter.get("/", storeControllers.store);

export default storesRouter;
