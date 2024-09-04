import { Schema, model } from "mongoose";
import * as hooks from "./hooks.js";

const reviewShema = new Schema({
  name: {
    type: String,
    required: true,
  },
  testimonial: {
    type: String,
    required: true,
  },
});

reviewShema.post("save", hooks.handleSaveError);
reviewShema.pre("findOneAndUpdate", hooks.setUpdateSetting);
reviewShema.post("findOneAndUpdate", hooks.handleSaveError);

const Review = model("review", reviewShema);
export default Review;
