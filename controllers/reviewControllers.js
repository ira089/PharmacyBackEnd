import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as reviewServices from "../services/reviewServices.js";

const reviewsAll = async (req, res) => {
  const reviews = await reviewServices.getAllReviews();
  console.log(reviews)
  res.status(200).json(reviews);
};

export default {
  reviewsAll: ctrlWrapper(reviewsAll),
  
};