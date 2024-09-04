import express from "express";
import reviewControllers from "../controllers/reviewControllers.js";

const reviewsRouter = express.Router();

reviewsRouter.get("/", reviewControllers.reviewsAll);


export default reviewsRouter;