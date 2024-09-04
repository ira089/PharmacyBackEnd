import Review from "../models/Review.js";
export const getAllReviews = ()=> Review.find();